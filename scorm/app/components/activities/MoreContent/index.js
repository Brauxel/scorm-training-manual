import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import moreContentImage from './moreContentImage.png';
import template from './template.html';
import './style.styl';

const MoreContent = Activity.extend({
  className: 'MoreContent',

  renderActivityContent() {
    return template({moreContentImage});
  },

});

export default mixin(MoreContent, ActivityAutocomplete);
