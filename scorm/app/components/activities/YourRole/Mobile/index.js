import {
  each,
  includes,
  toArray,
  delay,
  find,
  without,
  map
} from 'lodash';
import { mergeIntoArray } from 'app/util/array';
import { addClass, removeClass, toggleClass } from 'app/util/css';
import { topFromDocument } from 'app/util/dom';
import { scrollToOffset, scrollToElement } from 'app/util/anim';
import Activity from 'app/components/activities/Activity';
import NbnPulseLogo from 'app/components/NbnPulseLogo';
import VideoPlayer from 'app/components/VideoPlayer';
import clickItems from '../items';
import template from './template.html';
import './style.styl';

const WhatIsABrand = Activity.extend({
  className: 'YourRoleMobile',

  defaultState: {
    currentMessageKey: null,
    completedClicks: [],
  },

  defaultProps: {
    clickItems,
  },

  events: {
    'click .YourRoleMobile__videoLink': 'onVideoLinkClick',
    'click .YourRoleMobile__clickable': 'onClickableClick',
    'click .YourRoleMobile__clickMessage__closeButton': 'onMessageCloseClick',
  },

  renderActivityContent() {
    return template({
      each,
      ...this.props,
    });
  },

  activityDidRender() {
    this.$el.prepend('<div class="YourRoleMobile__background"></div>');
    this.background = this.$('.YourRoleMobile__background');
    this.network = this.el.querySelector('.YourRoleMobile__network');
    this.clickables = toArray(this.el.querySelectorAll('.YourRoleMobile__clickable'));
    this.messages = toArray(this.el.querySelectorAll('.YourRoleMobile__clickMessage'));

    const onFadeIn = () => {
      this.$('.YourRoleMobile__mainContentContainer')
        .removeClass('YourRoleMobile__mainContent_hidden');
    };

    const onLogoClick = () => {
      this.pulseLogo.setAnim(NbnPulseLogo.ANIM_TYPES.NONE);
      this.pulseLogo.remove();
      this.fadeIn(onFadeIn);
    };

    this.pulseLogo = new NbnPulseLogo({
      caption: 'Tap here',
      onClick: onLogoClick,
    });
    this.el.appendChild(this.pulseLogo.el);
    this.pulseLogo.render();

    this.listenTo(this.state, 'change:completedClicks', this.handleCompletedClicksChange);
    this.listenTo(this.state, 'change:currentMessageKey', this.handleMessageKeyChange);

    this.handleMessageKeyChange()
      .handleCompletedClicksChange();
  },

  fadeIn(done) {
    this.background.stop().animate({opacity: 1}, 1000, () => done());
  },

  //

  onClickableClick(event) {
    const key = event.currentTarget.getAttribute('data-key');
    const currentMessageKey = this.state.get('currentMessageKey');
    const completedClicks = this.state.get('completedClicks');

    this.state.set({
      completedClicks: mergeIntoArray(completedClicks, key),
      currentMessageKey: key === currentMessageKey ? null : key,
    });

    return this;
  },

  onMessageCloseClick() {
    this.state.set({currentMessageKey: null});
  },

  //

  handleMessageKeyChange() {
    const key = this.state.get('currentMessageKey');
    const currentMessageEl = find(this.messages, message => {
      return message.getAttribute('data-key') === key;
    });
    const currentClickableEl = find(this.clickables, clickable => {
      return clickable.getAttribute('data-key') === key;
    });

    each(without(this.messages, currentMessageEl), el => addClass(el, 'hidden'));
    each(without(this.clickables, currentClickableEl), el => removeClass(el,
      'YourRoleMobile__clickable_currentClick'));
    if (currentMessageEl) removeClass(currentMessageEl, 'hidden');
    if (currentClickableEl) addClass(currentMessageEl, '.YourRoleMobile__clickable_currentClick');

    if (currentMessageEl && currentClickableEl) {
      const scrollTo =
        Math.min(...map([currentMessageEl, currentClickableEl], topFromDocument));
      scrollToOffset(scrollTo - 80);
    }

    return this;
  },

  handleCompletedClicksChange() {
    const completedClicks = this.state.get('completedClicks');
    each(this.clickables, clickable => {
      toggleClass(clickable,
        'YourRoleMobile__clickable_hasClick',
        includes(completedClicks, clickable.getAttribute('data-key')));
    });
    if (this.props.clickItems.length === completedClicks.length) this.complete();
    return this;
  },

  onVideoLinkClick(event) {
    const videoID = event.currentTarget.getAttribute('data-videoID');
    const videoPlayer = new VideoPlayer({
      videoID,
      isVisible: true,
      onClose: () => videoPlayer.remove(),
    });
    this.$el.append(videoPlayer.el);
    videoPlayer.render();
    delay(() => scrollToElement(videoPlayer.el), 200);
  },

});

export default WhatIsABrand;
