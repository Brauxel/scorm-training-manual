import Backbone from 'backbone';
import { mixin } from 'backbone.cocktail';
import { each } from 'lodash';
import { addClass, toggleClass } from 'app/util/css';
import ContentPanelMixin from 'app/components/mixins/ContentPanel';
import PropsStateMixin from 'app/components/mixins/PropsState';
import MiniDashboardContainerMixin from 'app/components/mixins/MiniDashboardContainer';
import template from './template.html';
import './style.styl';

const Activity = Backbone.View.extend({
  template,

  defaultProps: {
    onComplete: () => {},
    onContinue: () => {},
  },

  defaultState: {
    isComplete: false,
  },

  events: {
    'click .Activity__scrollDownButton': 'handleContinueButtonClick',
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:isComplete', this.handleCompleteChange);
    this.activityPropsStateReady(props, state);
  },

  render() {
    this.el.innerHTML = this.template({
      content: this.renderActivityContent(this.props, this.state),
    });

    addClass(this.el, 'Activity');
    this.handleCompleteChange(false);
    this.activityDidRender(this.el, this.props, this.state);

    return this;
  },

  complete() {
    this.state.set({isComplete: true});
  },

  isComplete() {
    return this.state.get('isComplete');
  },

  handleCompleteChange(trigger = true) {
    toggleClass(this.el, 'Activity_isComplete', Boolean(this.state.get('isComplete')));
    if (trigger) this.props.onComplete(this);
  },

  handleContinueButtonClick() {
    this.props.onContinue(this);
  },

  remove(...args) {
    this.activityWillRemove();
    return Backbone.View.prototype.remove.apply(this, args);
  },

  // Lifecycle

  renderActivityContent() {
    // implement
    return '';
  },

  activityPropsStateReady() {
    // implement
  },

  activityDidRender() {
    // implement
  },

  activityWillRemove() {
    // implement
  },

});

Activity.extend = function extendActivity(child) {
  const view = Backbone.View.extend.apply(this, arguments);
  each(['events', 'defaultProps', 'defaultState', 'defaultContentProps', 'defaultContentState'], attr => {
    view.prototype[attr] = {...this.prototype[attr] || {}, ...child[attr] || {}};
  });
  return view;
};

export default mixin(Activity, PropsStateMixin, ContentPanelMixin, MiniDashboardContainerMixin);
