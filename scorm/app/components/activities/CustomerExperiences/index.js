import { has, each } from 'lodash';
import { mergeIntoArray } from 'app/util/array';
import { scrollToElement } from 'app/util/anim';
import Activity from 'app/components/activities/Activity';
import template from './template.html';
import './style.styl';

export default Activity.extend({
  className: 'CustomerExperiences',

  defaultState: {
    currentReveal: null,
    revealed: [],
  },

  defaultProps: {
    numReveals: 2,
    isMobile: () => false,
  },

  events: {
    'click .CustomerExperiences__eqSide': 'onRevealerClick',
  },

  renderActivityContent() {
    return template();
  },

  activityDidRender() {
    this.contentContainerEl = this.el
      .querySelector('.CustomerExperiences__activityContent');
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change', this.onActivityStateChange);
  },

  onActivityStateChange(state) {
    const { changed } = state;

    if (has(changed, 'revealed')) {
      const revealed = this.state.get('revealed');
      this.reveal(revealed);
      if (revealed.length >= this.props.numReveals) this.complete();
    }
  },

  onRevealerClick(event) {
    const key = event.currentTarget.getAttribute('data-key');
    const revealed = this.state.get('revealed');

    if (this.props.isMobile()) {
      scrollToElement(this.contentContainerEl, {offset: -100});
    }

    this.state.set({
      currentReveal: key,
      revealed: mergeIntoArray(revealed, key),
    });
  },

  reveal(revealed) {
    each(revealed, key => {
      this.$(`.CustomerExperiences__eqSide[data-key="${key}"]`).addClass('isActive');
      this.$(`.CustomerExperiences__feedbackItem[data-key="${key}"]`).addClass('isRevealed');
    });
  },

});
