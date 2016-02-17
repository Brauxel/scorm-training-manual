import { View } from 'backbone';
import { noop } from 'lodash';
import { mixin } from 'backbone.cocktail';
import { velocityAnim } from 'app/util/anim';
import { addClass, removeClass, toggleClass } from 'app/util/css';
import PropsStateMixin from 'app/components/mixins/PropsState';
import template from './template.html';
import './style.styl';

const BookmarkPanel = View.extend({
  className: 'BookmarkPanel',

  defaultProps: {
    resumeFromBookmark: () => {},
    ignoreBookmark: () => {},
  },

  defaultState: {
    isVisible: false,
    onHideCallback: noop,
  },

  events: {
    'click .BookmarkPanel__button_resume': 'onResumeClick',
    'click .BookmarkPanel__button_ignore': 'onIgnoreClick',
  },

  render() {
    const initVisible = this.state.get('isVisible');
    this.el.setAttribute('style', `opacity: ${initVisible ? 1 : 0}`);
    toggleClass(this.el, 'BookmarkPanel_inactive', !initVisible);

    this.el.innerHTML = template();

    return this;
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:isVisible', this.onVisibleChange);
  },

  onResumeClick() {
    this.state.set({onHideCallback: this.props.resumeFromBookmark});
    this.hide();
  },

  onIgnoreClick() {
    this.state.set({onHideCallback: this.props.ignoreBookmark});
    this.hide();
  },

  hide() {
    this.state.set({isVisible: false});
  },

  show() {
    this.state.set({isVisible: true});
  },

  onVisibleChange(state) {
    const { isVisible, onHideCallback } = {...state.attributes};

    if (isVisible) {
      velocityAnim(this.el, {opacity: 1})
        .then(() => {
          removeClass(this.el, 'BookmarkPanel_inactive');
          state.set({onHideCallback: noop});
        });
    } else {
      addClass(this.el, 'BookmarkPanel_inactive');
      velocityAnim(this.el, {opacity: 0})
        .then(() => {
          onHideCallback();
          state.set({onHideCallback: noop});
        });
    }
  },
});

export default mixin(BookmarkPanel, PropsStateMixin);
