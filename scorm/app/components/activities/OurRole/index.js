import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import template from './template.html';
import './style.styl';

const OurRole = Activity.extend({
  className: 'OurRole',

  defaultContentProps: {
    hasAurora: true,
  },

  renderActivityContent() {
    return template();
  },

});

export default mixin(OurRole, ActivityAutocomplete);
