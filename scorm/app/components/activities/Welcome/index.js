import Activity from '../Activity';
import { mixin } from 'backbone.cocktail';
import ActivityAutocomplete from 'app/components/mixins/ActivityAutocomplete';
import welcomeImage from './welcomeImage.png';
import template from './template.html';
import './style.styl';

const Welcome = Activity.extend({
  className: 'Welcome',

  defaultContentProps: {
    hasAurora: true,
  },

  renderActivityContent() {
    return template({welcomeImage});
  },

});

export default mixin(Welcome, ActivityAutocomplete);
