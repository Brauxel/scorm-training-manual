import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import template from './template.html';
import './style.styl';

const BrandChecklist = Activity.extend({
  className: 'BrandChecklist',

  renderActivityContent() {
    return template();
  },

});

export default mixin(BrandChecklist, ActivityAutocomplete);
