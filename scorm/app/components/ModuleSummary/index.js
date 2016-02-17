import { View } from 'backbone';
import { mixin } from  'backbone.cocktail';
import ContentPanelMixin from 'app/components/mixins/ContentPanel';
import template from './template.html';
import './style.styl';

const ModuleSummary = View.extend({
  className: 'ModuleSummary',

  render() {
    this.el.innerHTML = template();
    this.show();
    return this;
  },

});

export default mixin(ModuleSummary, ContentPanelMixin);
