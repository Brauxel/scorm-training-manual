/* global DEBUG */

import {
  all, includes, map, reduce, without, first,
  last, each, find, findIndex, toArray, partialRight,
} from 'lodash';
import $ from 'jquery';
import { mergeIntoArray } from 'app/util/array';
import { toggleClass } from 'app/util/css';
import { lockDocumentScroll, releaseDocumentScroll } from 'app/util/dom';
import Activity from '../Activity';
import ProgressMeterWithIndicators from
  'app/components/ProgressMeterWithIndicators';
import template from './template.html';
import { questions, summaries, summaryPanels } from './content';
import './questionOption.styl';
import './style.styl';
import './styleMobile.styl';

const UniformsHSE = Activity.extend({
  className: 'UniformsHSE',

  defaultProps: {
    questions: [...questions],
    summaryPanels: [...summaryPanels],
    summaries: {...summaries},
    isMobile: () => false,
    mobileEmitter: null,
  },

  defaultState: {
    currentQuestion: first(questions).key,
    completedQuestions: [],
    correctAnswers: [],
    currentSelections: [],
    allQuestionsComplete: false,
  },

  events: {
    'click .UniformsHSE__questionOption': 'onOptionClicked',
    'click .UniformsHSE__questionSubmit': 'onQuestionSubmitClick',
    'click .UniformsHSE__restartButton': 'onRestartButtonClick',
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change:completedQuestions',
      this.handleCompletedQuestionsChange);

    this.listenTo(state, 'change:correctAnswers',
      this.handleCorrectAnswersChange);

    this.listenTo(state, 'change:currentQuestion',
      this.handleCurrentQuestionChange);

    this.listenTo(state, 'change:currentSelections',
      this.handleCurrentSelectionsChange);

    this.listenTo(state, 'change:allQuestionsComplete',
      this.handleAllQuestionsCompleteChange);
  },

  renderActivityContent() {
    return template({
      each,
      renderScore: () => this.renderCurrentScore(),
      ...this.props,
    });
  },

  renderCurrentScore() {
    const correctAnswers = this.state.get('correctAnswers') || [];
    return `${correctAnswers.length}/${(this.props.questions || []).length}`;
  },

  activityDidRender() {
    this.questionTitleEl = this.el
      .querySelector('.UniformsHSE__questionTitle');

    this.feedbackPanelContainerEl = this.el
      .querySelector('.UniformsHSE__feedbackPanelContainer');

    this.summaryEl = this.el
      .querySelector('.UniformsHSE__summary');

    this.scoreEl = this.el
      .querySelector('.UniformsHSE__score');

    this.questionSubmitEl = this.el
      .querySelector('.UniformsHSE__questionSubmit');

    this.summaryFeedbackEl = this.el
      .querySelector('.UniformsHSE__summaryFeedback');

    this.optionEls = toArray(
      this.el.querySelectorAll('.UniformsHSE__questionOption')
    );

    this.questionEls = reduce(this.props.questions, (els, { key }) => {
      return {
        ...els,
        [key]: this.el
          .querySelector(`.UniformsHSE__question[data-key="${key}"]`),
      };
    }, {});

    this.feedbackEls = reduce(['correct', 'incorrect'],
      (feedbacks, type) => {
        return {
          ...feedbacks,
          [type]: this.el.querySelector(`.UniformsHSE__${type}Feedback`),
        };
      }, []);


    this.progressMeter = new ProgressMeterWithIndicators({
      progressSteps: this.props.questions.length,
    });

    this.el
      .querySelector('.UniformsHSE__progressMeterContainer')
      .appendChild(this.progressMeter.el);

    this.progressMeter.render();

    this.handleCurrentQuestionChange()
      .handleCurrentSelectionsChange()
      .handleCompletedQuestionsChange();
  },

  //

  getQuestionForOption(optionKey) {
    function questionHasOption({ options }) {
      return includes(map(options, ({ key }) => key), optionKey);
    }

    return find(this.props.questions, questionHasOption);
  },

  //

  onOptionClicked(event) {
    const key = event.currentTarget.getAttribute('data-key');
    const requiredKeys = this.getQuestionForOption(key).requiredKeys;
    const currentSelections = this.state.get('currentSelections');
    let newSelections;

    if (includes(currentSelections, key)) {
      newSelections = without(currentSelections, key);
    } else if (requiredKeys.length === 1) {
      newSelections = [key];
    } else {
      newSelections = currentSelections.concat(key);
    }

    this.state.set({currentSelections: newSelections});
  },

  onQuestionSubmitClick() {
    const {
      currentQuestion,
      currentSelections,
      completedQuestions,
      correctAnswers,
    } = this.state.toJSON();

    if (!currentSelections.length || !currentQuestion) return;

    const question = find(this.props.questions, {key: currentQuestion});
    const { requiredKeys } = question;

    const allCorrect =
      all(requiredKeys, required => includes(currentSelections, required))
      && currentSelections.length === requiredKeys.length;

    this.state.set({
      correctAnswers: allCorrect
        ? mergeIntoArray(correctAnswers, currentQuestion)
        : correctAnswers,
      completedQuestions:
            mergeIntoArray(completedQuestions, currentQuestion),
    });

    toggleClass(this.questionSubmitEl, 'hidden', true);
    toggleClass(this.feedbackPanelContainerEl, 'panelVisible', true);

    this.showFeedback(
      allCorrect ? 'correct' : 'incorrect',
      question.feedback[allCorrect ? 'correct' : 'incorrect'],
      () => {
        toggleClass(this.questionSubmitEl, 'hidden', false);
        toggleClass(this.feedbackPanelContainerEl, 'panelVisible', false);
        this.proceedToNextQuestion();
      }
    );
  },

  proceedToNextQuestion() {
    const completedQuestions = this.state.get('completedQuestions');

    if (completedQuestions.length === this.props.questions.length) {
      this.state.set({
        currentSelections: [],
        currentQuestion: null,
        allQuestionsComplete: true,
      });
    } else {
      const lastKey = last(completedQuestions);
      const nextIndex = findIndex(this.props.questions,
                                  ({ key }) => key === lastKey) + 1;
      this.state.set({
        currentSelections: [],
        currentQuestion: this.props.questions[nextIndex].key,
        allQuestionsComplete: false,
      });
    }
  },

  showFeedback(type, message, onClose) {
    const { isMobile, mobileEmitter } = this.props;
    const feedbackEl = this.feedbackEls[type];
    const messageEl = feedbackEl.querySelector('.UniformsHSE__feedbackMessage');
    const buttonEl = $(feedbackEl.querySelector('.UniformsHSE__feedbackButton'));
    const showHide = (onKey) => {
      each(this.feedbackEls, (el, key) => toggleClass(el, 'UniformsHSE__feedback_visible', key === onKey));
    };

    // FIXME: DIRTY HACK
    if (isMobile() && mobileEmitter) {
      lockDocumentScroll();
      this.listenTo(mobileEmitter, 'change', () => {
        if (!isMobile()) releaseDocumentScroll();
      });
    }


    messageEl.innerHTML = message;
    buttonEl.off().on('click', () => {
      showHide(null);
      releaseDocumentScroll();
      this.stopListening(mobileEmitter);
      onClose();
    });

    showHide(type);
  },

  //

  handleCurrentSelectionsChange() {
    const selections = this.state.get('currentSelections');
    toggleClass(this.questionSubmitEl, 'disabled', !selections.length);
    each(this.optionEls, option => {
      const key = option.getAttribute('data-key');
      toggleClass(option, 'UniformsHSE__questionOption_selected',
        includes(selections, key));
    });

    return this;
  },

  handleCurrentQuestionChange() {
    const currentQuestionKey = this.state.get('currentQuestion');
    const currentQuestion =
      find(this.props.questions, q => q.key === currentQuestionKey);

    this.questionTitleEl.innerHTML = (currentQuestion || {}).title || '&nbsp;';
    toggleClass(this.questionSubmitEl, 'hidden', !currentQuestion);
    each(this.questionEls, (question, key) => {
      toggleClass(question,
        'UniformsHSE__question_current', currentQuestionKey === key);
    });
    return this;
  },

  handleCorrectAnswersChange() {
    this.scoreEl.innerHTML = this.renderCurrentScore();
    return this;
  },

  handleCompletedQuestionsChange() {
    const completedQuestions = this.state.get('completedQuestions');
    const progress = completedQuestions.length / this.props.questions.length;
    this.progressMeter.setProgress(progress);

    return this;
  },

  handleAllQuestionsCompleteChange() {
    const allQuestionsComplete = this.state.get('allQuestionsComplete');
    const toggleClassOnComplete = partialRight(toggleClass, allQuestionsComplete);

    if (allQuestionsComplete) {
      this.complete();
      this.updateSummaryContent();
    }

    toggleClassOnComplete(this.summaryEl, 'UniformsHSE__summary_visible');
    toggleClassOnComplete(this.summaryFeedbackEl, 'UniformsHSE__feedback_visible');
    toggleClassOnComplete(this.el, 'UniformsHSE__inSummaryState');

    return this;
  },

  updateSummaryContent() {
    const { correctAnswers } = this.state.toJSON();
    const success = correctAnswers.length >= this.props.questions.length - 2;
    const summaryFeedbackMessageEl =
      this.summaryFeedbackEl.querySelector('.UniformsHSE__feedbackMessage');

    if (this.questionTitleEl) {
      this.questionTitleEl.innerHTML = this.props.summaries.title;
    }

    toggleClass(this.summaryFeedbackEl, 'success', success);
    summaryFeedbackMessageEl.innerHTML = success
      ? this.props.summaries.success
      : this.props.summaries.noSuccess;
  },

  onRestartButtonClick() {
    this.state.set({
      ...this.defaultState,
      isComplete: this.state.get('isComplete'),
    });
  },

});

export default UniformsHSE;
