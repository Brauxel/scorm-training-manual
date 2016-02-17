import { each, take, toArray } from 'lodash';
import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { toggleClass } from 'app/util/css';
import PropsStateMixin from 'app/components/mixins/PropsState';
import ProgressMeter from 'app/components/ProgressMeter';
import template from './template.html';
import './style.styl';

const ProgressMeterWithIndicators = View.extend({
  className: 'ProgressMeterWithIndicators',

  defaultProps: {
    progressSteps: 1,
  },

  defaultState: {
    progress: 0,
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:progress', this.handleProgressChange);
  },

  render() {
    this.el.innerHTML = template({...this.props});
    this.progressMeter = new ProgressMeter(this.state.toJSON());
    this.el
      .querySelector('.ProgressMeterWithIndicators__progressMeterContainer')
      .appendChild(this.progressMeter.el);

    this.indicators = toArray(this.el
      .querySelectorAll('.ProgressMeterWithIndicators__indicator'));

    this.progressMeter.render();
    this.handleProgressChange();

    return this;
  },

  setProgress(progress) {
    this.state.set({progress});
  },

  handleProgressChange() {
    const progress = this.state.get('progress');
    const currentIndex = Math.floor(progress * this.props.progressSteps);
    this.progressMeter.setProgress(progress);

    each(this.indicators, (indicator, index) => {
      toggleClass(indicator, 'reached', index <= currentIndex);
      toggleClass(indicator, 'current', index === currentIndex);
    });
    return this;
  },

});

export default mixin(ProgressMeterWithIndicators, PropsStateMixin);
