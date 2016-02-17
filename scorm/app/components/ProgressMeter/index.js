import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { clamp } from 'app/util/number';
import PropsStateMixin from 'app/components/mixins/PropsState';
import template from './template.html';
import './style.styl';

const ProgressMeter = View.extend({
  className: 'ProgressMeter',

  defaultState: {
    progress: 0,
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:progress', this.handleProgressChange);
  },

  render() {
    this.$el.html(template(this.state.toJSON()));
    this.barContainer = this.$('.ProgressMeter__barContainer');
    this.bar = this.$('.ProgressMeter__bar');
    this.showProgress(this.state.get('progress'));
    return this;
  },

  setProgress(progress) {
    this.state.set('progress', clamp(progress, 0, 1));
  },

  handleProgressChange() {
    this.showProgress(this.state.get('progress'));
  },

  showProgress(progress) {
    this.bar.css('width', `${progress * 100}%`);
    return this;
  },

});

export default mixin(ProgressMeter, PropsStateMixin);
