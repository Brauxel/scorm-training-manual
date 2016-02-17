import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { map } from 'lodash';
import Flickity from 'flickity';
import template from './template.html';
import panelTemplate from './panelTemplate.html';
import PropsStateMixin from 'app/components/mixins/PropsState';
import 'flickity/css/flickity.css';
import './style.styl';

const Carousel = View.extend({
  className: 'Carousel',

  defaultProps: {
    panels: [{figure: '', caption: '', id: ''}],
    onPanelViewed: () => {},
  },

  render() {
    this.$el.html(template({panels: this.renderPanels(this.props.panels)}));

    this.flick = new Flickity(this.el);
    this.flick.on('cellSelect', () => {
      const index = this.flick.selectedIndex;
      this.props.onPanelViewed(index, this.getPanelAtIndex());
    });
    return this;
  },

  getPanelAtIndex(index) {
    return this.props.panels[index];
  },

  renderPanels(panels) {
    return map(panels, panel => panelTemplate({className: '', ...panel})).join('');
  },

  remove() {
    if (this.flick) this.flick.off();
    View.prototype.remove.apply(this);
  },
});

export default mixin(Carousel, PropsStateMixin);
