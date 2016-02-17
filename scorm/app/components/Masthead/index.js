import { View, Events } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { map, includes, has } from 'lodash';
import { toggleClass } from 'app/util/css';
import PropsStateMixin from 'app/components/mixins/PropsState';
import template from './template.html';
import './style.styl';

const Masthead = View.extend({
  className: 'Masthead',

  defaultProps: {
    appState: null,
    getTopics: () => [],
    getCompletedTopics: () => [],
    getAvailableTopics: () => [],
    moduleProgressEmitter: {...Events},
  },

  defaultState: {
    moduleMenuActive: false,
    isVisible: true,
  },

  events: {
    'click .Masthead__moduleMenuToggle': 'onMenuToggleClick',
    'click .Masthead__moduleMenu__link': 'onMenuLinkClick',
  },

  propsStateReady({ moduleProgressEmitter }, state) {
    this.listenTo(state, 'change', this.onStateChange);
    this.listenTo(moduleProgressEmitter, 'change', this.onModuleProgressChange);
  },

  render() {
    const currentState = this.state.toJSON();
    const topicState = {
      topics: this.props.getTopics(),
      completedTopics: this.props.getCompletedTopics(),
      availableTopics: this.props.getAvailableTopics(),
    };

    this.el.innerHTML = template({
      ...currentState,
      moduleMenuLinks: this.constructModuleMenuLinks(topicState),
    });

    toggleClass(this.el, 'Masthead_hidden', !currentState.isVisible);
    return this;
  },

  constructModuleMenuLinks({ topics, availableTopics, completedTopics }) {
    const availableTopicIDs = map(availableTopics, ({ id }) => id);
    const completedTopicIDs = map(completedTopics, ({ id }) => id);

    return map(topics, ({ id, title }) => {
      const isAvailable = includes(availableTopicIDs, id);
      const isCompleted = includes(completedTopicIDs, id);

      const tag = isAvailable ? 'a' : 'div';
      return `
        <${tag}
          class="Masthead__moduleMenu__link"
          data-available=${isAvailable}
          data-completed=${isCompleted}
          href="#${id}"
        >
          ${title}
        </${tag}>
      `;
    }).join('');
  },

  hide() {
    this.state.set('isVisible', false);
  },

  show() {
    this.state.set('isVisible', true);
  },

  onMenuToggleClick() {
    this.state.set('moduleMenuActive', !this.state.get('moduleMenuActive'));
  },

  onMenuLinkClick() {
    this.state.set('moduleMenuActive', false);
  },

  onModuleProgressChange() {
    this.render();
  },

  onStateChange({ changed }) {
    if (has(changed, 'moduleMenuActive')) this.render();

    if (has(changed, 'isVisible')) {
      this.$el.toggleClass('Masthead_hidden', !this.state.get('isVisible'));
    }
  },

});

export default mixin(Masthead, PropsStateMixin);

