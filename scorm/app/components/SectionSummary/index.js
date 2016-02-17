import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import ContentPanelMixin from 'app/components/mixins/ContentPanel';
import PropsStateMixin from 'app/components/mixins/PropsState';
import MiniDashboardContainerMixin from 'app/components/mixins/MiniDashboardContainer';
import template from './template.html';
import './style.styl';

const SectionSummary = View.extend({
  className: 'SectionSummary',

  defaultContentProps: {
    hasAurora: true,
  },

  defaultProps: {
    onContinue: () => {},
    summaryTitle: 'Section complete',
    summaryContent: `
      <p>Quick recap of what was covered and explain what the next section is about...</p>
      <p>Lorem ipsum dolor sit amet, iusto lacus vivamus quisque orci pellentesque, justo massa diam eget, condimentum ut in tempor velit sodales, lacinia sodales aenean commodo in, quam quisque ante malesuada posuere.</p>
    `,
  },

  events: {
    'click .SectionSummary__continueButton': 'handleContinueButtonClick',
  },

  render() {
    this.$el.html(template({...this.props}));
    return this;
  },

  handleContinueButtonClick() {
    this.props.onContinue(this);
  },

});

export default mixin(SectionSummary, PropsStateMixin, ContentPanelMixin, MiniDashboardContainerMixin);
