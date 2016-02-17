import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import figure from './opsMaintain.png';
import template from './template.html';
import './style.styl';

const OpportunitiesOpsMaintain = Activity.extend({
  className: 'OpportunitiesOpsMaintain',

  renderActivityContent() {
    return template({figure});
  },

});

export default mixin(OpportunitiesOpsMaintain, ActivityAutocomplete);
