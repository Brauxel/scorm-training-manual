import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import template from './template.html';
import './style.styl';

const CodeOfConduct = Activity.extend({
  className: 'CodeOfConduct',

  renderActivityContent() {
    return template();
  },

});

export default mixin(CodeOfConduct, ActivityAutocomplete);
