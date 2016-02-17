import {
  map, each, includes, find, toArray,
  defer, partial, bind,
} from 'lodash';
import { velocityAnim } from 'app/util/anim';
import { toHTMLAttrString, prependTo } from 'app/util/dom';
import { addClass, removeClass, toggleClass } from 'app/util/css';
import Activity from 'app/components/activities/Activity';
import DragDrop from 'app/components/helpers/DragDrop';
import NbnPulseLogo from 'app/components/NbnPulseLogo';
import VideoPlayer from 'app/components/VideoPlayer';
import network from './network.svg';
import dragDrops from '../items';
import template from './template.html';
import './network.styl';
import './style.styl';

const WhatIsABrand = Activity.extend({
  className: 'YourRole',

  defaultState: {
    currentMessageKey: null,
    completedDrags: [],
  },

  defaultProps: {
    dragDrops,
  },

  events: {
    'click .YourRole__videoLink': 'onVideoLinkClick',
    'click .YourRole__dropTarget .YourRole__dragable': 'onDroppedClick',
  },

  renderActivityContent() {
    return template({
      each,
      toHTMLAttrString,
      ...this.props,
      network,
    });
  },

  activityDidRender() {
    this.backgroundEl = document.createElement('div');
    addClass(this.backgroundEl, 'YourRole__background');
    prependTo(this.el, this.backgroundEl);

    this.network = this.el.querySelector('.YourRole__network');
    this.dragables =
      toArray(this.el.querySelectorAll('.YourRole__dragable'));
    this.dropTargets =
      toArray(this.el.querySelectorAll('.YourRole__dropTarget'));
    this.messages =
      toArray(this.el.querySelectorAll('.YourRole__dragMessage'));

    const onFadeIn = () => {
      removeClass(
        this.el.querySelector('.YourRole__mainContentContainer'),
        'YourRole__mainContent_hidden'
      );
      this.initDragDrop();
    };

    const onLogoClick = () => {
      this.pulseLogo.setAnim(NbnPulseLogo.ANIM_TYPES.NONE);
      this.pulseLogo.remove();
      this.fadeIn().then(onFadeIn);
    };

    this.pulseLogo = new NbnPulseLogo({
      caption: 'Click here',
      onClick: onLogoClick,
    });
    this.el.appendChild(this.pulseLogo.el);
    this.pulseLogo.render();

    this.listenTo(this.state, 'change:completedDrags', this.handleCompletedDragsChange);
    this.listenTo(this.state, 'change:currentMessageKey', this.handleMessageKeyChange);

    this.handleMessageKeyChange()
      .handleCompletedDragsChange();
  },

  fadeIn() {
    return velocityAnim(this.backgroundEl, {opacity: 1}, {duration: 1000});
  },

  //

  onDroppedClick(event) {
    this.state
      .set({currentMessageKey: event.currentTarget.getAttribute('data-key')});
  },

  //

  initDragDrop() {
    this.dragDrops = map(this.dragables,
      dragable => new DragDrop(dragable, this.dropTargets, bind(this.handleDrop, this)));

    return this;
  },

  handleDrop($drag, $drop) {
    const completedDrags = this.state.get('completedDrags');
    const dragKey = $drag.attr('data-key');
    const dropKey = $drop.attr('data-key');

    $drop.find('.dropTarget__dragableContainer').html($drag);

    if (find(completedDrags, {dragKey})) return;
    this.state.set({
      completedDrags: completedDrags.concat({dragKey, dropKey}),
      currentMessageKey: dragKey,
    });
  },

  handleMessageKeyChange() {
    const key = this.state.get('currentMessageKey');
    toggleClass(this.el.querySelector('.YourRole__intro'), 'hidden', Boolean(key));
    defer(() => each(this.messages, message => {
      toggleClass(message, 'hidden', message.getAttribute('data-key') !== key);
    }));

    return this;
  },

  handleCompletedDragsChange() {
    const completedDrags = this.state.get('completedDrags');
    this.updateDropTargets(map(completedDrags, ({dropKey}) => dropKey));
    if (this.props.dragDrops.length === completedDrags.length) this.complete();
    return this;
  },

  updateDropTargets(drops) {
    const networkClass = partial(toggleClass, this.network);
    const inDrops = partial(includes, drops);

    each(this.dropTargets, el => {
      toggleClass(el, 'highlightNode', inDrops(el.getAttribute('data-key')));
    });

    networkClass('connector1Highlight', inDrops('drop1'));
    networkClass('connector2Highlight', inDrops('drop1'));
    networkClass('connector3Highlight', inDrops('drop2'));
    networkClass('connector4Highlight', inDrops('drop2'));
    networkClass('connector5Highlight', inDrops('drop3'));
    networkClass('connector6Highlight', inDrops('drop3'));

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
  },

});

export default WhatIsABrand;
