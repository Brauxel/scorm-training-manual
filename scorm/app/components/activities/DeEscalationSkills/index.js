import { each, toArray } from 'lodash';
import { toggleClass, addClass, removeClass } from 'app/util/css';
import { scrollToElement } from 'app/util/anim';
import Activity from '../Activity';
import template from './template.html';
import './style.styl';

const answerOptions = [
  {
    key: 'ignore',
    content: `
      Ignore her and continue on with your job so you can finish as quick as possible
    `,
  },
  {
    key: 'call',
    content: `
      Call your supervisor
    `,
  },
  {
    key: 'calm',
    content: `
      Remain calm, acknowledge Mrs. A’s complaint and politely explain why the work is taking longer
    `,
  },
];

export default Activity.extend({
  className: 'DeEscalationSkills',

  defaultProps: {
    isMobile: () => false,
    correctAnswerKey: 'calm',
    answerOptions: [...answerOptions],
  },

  defaultState: {
    selectedAnswer: null,
  },

  events: {
    'click .DeEscalationSkills__option': 'onOptionClicked',
    'click .DeEscalationSkills__feedback': 'onFeedbackClicked',
    'click .DeEscalationSkills__checkAnswerButton': 'onCheckAnswerClicked',
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change:selectedAnswer', this.onSelectedAnswerChange);
  },

  renderActivityContent() {
    return template({
      each,
      ...this.props,
    });
  },

  activityDidRender() {
    this.optionEls = toArray(this.el
      .querySelectorAll('.DeEscalationSkills__option'));
    this.feedbackContainerEl = this.el
      .querySelector('.DeEscalationSkills__feedbackContainer');
    this.checkAnswerEl = this.el
      .querySelector('.DeEscalationSkills__checkAnswerButton');

    this.onSelectedAnswerChange();
  },

  //

  onSelectedAnswerChange() {
    const selected = this.state.get('selectedAnswer');

    each(this.optionEls, (el) => {
      const key = el.getAttribute('data-key');
      toggleClass(el, 'DeEscalationSkills__option_selected', selected === key);
    });

    if (!selected) {
      removeClass(this.feedbackContainerEl,
        'DeEscalationSkills__feedbackContainer_visible');
    }

    toggleClass(this.checkAnswerEl, 'disabled', !selected);
  },

  //

  onOptionClicked(event) {
    const current = this.state.get('selectedAnswer');
    const key = event.currentTarget.getAttribute('data-key');
    this.state.set({selectedAnswer: key === current ? null : key});
  },

  onCheckAnswerClicked() {
    const selected = this.state.get('selectedAnswer');
    const isCorrect = selected === this.props.correctAnswerKey;

    this.feedbackContainerEl
      .querySelector('.DeEscalationSkills__feedback__title')
      .innerHTML = isCorrect ? 'Well done!' : 'Not quite';

    if (selected) {
      addClass(this.feedbackContainerEl,
        'DeEscalationSkills__feedbackContainer_visible');

      if (this.props.isMobile()) {
        scrollToElement(this.feedbackContainerEl, {offset: -100});
      }

      this.complete();
    }
  },

  onFeedbackClicked() {
    this.state.set({selectedAnswer: null});
  },

});
