import { each, reduce, includes, delay, values } from 'lodash';
import { toggleClass, addClass } from 'app/util/css';
import { scrollToOffset } from 'app/util/anim';
import { mergeIntoArray } from 'app/util/array';
import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import PropsStateMixin from 'app/components/mixins/PropsState';
import template from './template.html';
import './style.styl';
import './panel.styl';
import './panelClosed.styl';
import './panelOpen.styl';

import $ from 'jquery';

const layoutTypes = {
  TWO_BY_TWO: 'twoByTwo',
  THREE_INLINE: 'threeInline',
};

const PanelGrid = View.extend({
  className: 'PanelGrid',

  defaultState: {
    currentPanel: null,
    viewedPanels: [],
  },

  defaultProps: {
    // FIXME: Dirty hack, look into proper column declaration
    layoutType: layoutTypes.TWO_BY_TWO,
    isMobile: () => false,
    panels: [],
    onPanelViewed: () => {},
    onAllPanelsViewed: () => {},
  },

  events: {
    'click .PanelGrid__panel': 'onPanelClicked',
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:currentPanel', this.onCurrentPanelChanged);
    this.listenTo(state, 'change:viewedPanels', this.onViewedPanelsChanged);
  },

  render() {
    this.el.innerHTML = template({each, ...this.props});
    this.panelItems = reduce(this.props.panels, (items, { key }) => (
      {...items, [key]: this.el.querySelector(`.PanelGrid__panel[data-key="${key}"]`)}
    ), {});

    const { layoutType } = this.props;
    const layoutClass = includes(values(layoutTypes), layoutType)
      ? layoutType
      : layoutTypes.TWO_BY_TWO;

    addClass(this.el, `PanelGrid_${layoutClass}`);

    this.onCurrentPanelChanged().onViewedPanelsChanged();
    return this;
  },

  allPanelsViewed() {
    return this.state.get('viewedPanels').length === this.props.panels.length;
  },

  onPanelClicked(event) {
    const viewedPanels = this.state.get('viewedPanels');
    const currentPanel = this.state.get('currentPanel');
    const key = event.currentTarget.getAttribute('data-key');

    this.state.set({
      viewedPanels: mergeIntoArray(viewedPanels, key),
      currentPanel: currentPanel === key ? null : key,
    });
  },

  onCurrentPanelChanged() {
    const currentPanel = this.state.get('currentPanel');
    each(this.panelItems, (element, key) => toggleClass(element, 'PanelGrid__panel_current', key === currentPanel));
    this.props.onPanelViewed(currentPanel);

    if (this.props.isMobile()) {
      const panelEl = this.panelItems[currentPanel];
      if (panelEl) delay(() => scrollToOffset($(panelEl).offset().top - 100, 400), 100);
    }

    return this;
  },

  onViewedPanelsChanged() {
    const viewedPanels = this.state.get('viewedPanels');
    each(this.panelItems, (element, key) => toggleClass(element,
      'PanelGrid__panel_viewed', includes(viewedPanels, key)));
    if (this.allPanelsViewed()) this.props.onAllPanelsViewed();
    return this;
  },

});

PanelGrid.layoutTypes = {...layoutTypes};

export default mixin(PanelGrid, PropsStateMixin);
