import { View, Events } from 'backbone';
import { mixin } from 'backbone.cocktail';
import EventBus from 'app/EventBus';
import { addClass, removeClass } from 'app/util/css';
import { scrollToOffset } from 'app/util/anim';
import PropsStateMixin from 'app/components/mixins/PropsState';
import Masthead from 'app/components/Masthead';
import BookmarkPanel from 'app/components/BookmarkPanel';
import template from './template.html';
import './style.styl';

const AppRoot = View.extend({
  template: template,

  defaultProps: {
    getTopics: () => [],
    getAvailableTopics: () => [],
    getCompletedTopics: () => [],
    hasBookmark: () => false,
    resumeFromBookmark: () => {},
    ignoreBookmark: () => {},
    moduleProgressEmitter: {...Events},
  },

  propsStateReady() {
    this.listenTo(EventBus, 'showPage', this.onShowPageRequest);
  },

  render() {
    this.el.innerHTML = this.template();

    this.rootEl =
      this.el.querySelector('.AppRoot');
    this.bookmarkPanelContainer =
      this.rootEl.querySelector('.AppRoot__bookmarkPanelContainer');
    this.pageContainer =
      this.rootEl.querySelector('.AppRoot__pageContainer');

    this.masthead = new Masthead({
      ...this.props,
    });

    this.rootEl
      .querySelector('.AppRoot__mastheadContainer')
      .appendChild(this.masthead.el);

    this.bookmarkPanel = new BookmarkPanel({
      ...this.props,
    });

    this.bookmarkPanelContainer.appendChild(this.bookmarkPanel.el);

    this.masthead.render();
    this.bookmarkPanel.render();

    return this;
  },

  onShowPageRequest(payload) {
    const {component: Ctor, props} = payload;

    if (this.currentPage) this.currentPage.remove();
    scrollToOffset(0, 0);
    this.masthead.show();
    this.hideBookmarkPanel();

    this.currentPage = new Ctor({
      showMasthead: () => this.masthead.show(),
      hideMasthead: () => this.masthead.hide(),
      showBookmarkPanel: () => this.showBookmarkPanel(),
      hideBookmarkPanel: () => this.hideBookmarkPanel(),
      ...props || {},
    });
    this.pageContainer.appendChild(this.currentPage.el);
    this.currentPage.render();
  },

  showBookmarkPanel() {
    if (!this.props.hasBookmark()) {
      return;
    }
    addClass(this.bookmarkPanelContainer, 'active');
    this.bookmarkPanel.show();
  },

  hideBookmarkPanel() {
    this.bookmarkPanel.hide();
    removeClass(this.bookmarkPanelContainer, 'active');
  },

});

export default mixin(AppRoot, PropsStateMixin);
