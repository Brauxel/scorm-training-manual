import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import valuePropositionImage from './valueProposition.png';
import template from './template.html';
import './style.styl';

const ValueProposition = Activity.extend({
  className: 'ValueProposition',

  defaultContentProps: {
    hasAurora: true,
  },

  renderActivityContent() {
    return template({valuePropositionImage});
  },

});

export default mixin(ValueProposition, ActivityAutocomplete);
