import { each } from 'lodash';
import { mixin } from 'backbone.cocktail';
import Activity from '../Activity';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import template from './template.html';
import './style.styl';

const EscalatingQueries = Activity.extend({
  className: 'EscalatingQueries',

  defaultContentProps: {
    hasAurora: true,
  },

  renderActivityContent() {
    return template({
      each,
      steps: [
        'Acknowledge the customer’s concern.',
        'Do not engage in defensive or argumentative behaviour.',
        'Provide the customer with options.',
        'If they wish to speak with your supervisor, give them the company contact number.',
        'Direct the customer to <span class="nbnMention">nbn</span>’s Contact Centre.',
      ],
    });
  },

});

export default mixin(EscalatingQueries, ActivityAutocomplete);
