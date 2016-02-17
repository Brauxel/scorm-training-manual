import 'styles/ContentPanel.styl';
import { Model, Events } from 'backbone';
import { extendKeys } from 'app/util/object';

export default {
  defaultContentProps: {
    reverseContent: false,
    hasAurora: false,
    padded: true,
    mobileEmitter: {...Events},
  },

  defaultContentState: {
    isVisible: false,
    hasEntered: false,
  },

  initialize(props) {
    this.contentState = new Model(extendKeys(this.defaultContentState, props));
    this.contentProps = extendKeys(this.defaultContentProps, props);
    this.listenTo(this.contentState, 'change:isVisible', this.handleVisibleChange);
    this.listenTo(this.contentState, 'change:hasEntered', this.handleEnteredChange);

    return this;
  },

  render() {
    this.$el
      .addClass('ContentPanel')
      .toggleClass('ContentPanel_padded', this.contentProps.padded)
      .toggleClass('ContentPanel_hasAurora', this.contentProps.hasAurora)
      .toggleClass('ContentPanel_reverseContent', this.contentProps.reverseContent);

    this
      .handleVisibleChange()
      .handleEnteredChange();

    return this;
  },

  show() {
    this.contentState.set('isVisible', true);
  },

  hide() {
    this.contentState.set('isVisible', false);
  },

  enter() {
    this.contentState.set('hasEntered', true);
  },

  setIsMobile(state) {
    this.contentState.set('isMobile', state);
  },

  handleVisibleChange() {
    this.$el.toggleClass('ContentPanel_hidden', !this.contentState.get('isVisible'));
    return this;
  },

  handleEnteredChange() {
    // Implement
    return this;
  },
};
