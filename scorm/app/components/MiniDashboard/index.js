import { map, each, includes } from 'lodash';
import { View, Events } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { classNamesIf } from 'app/util/css';
import PropsStateMixin from 'app/components/mixins/PropsState';
import template from './template.html';
import './style.styl';

const MiniDashboard = View.extend({
  className: 'MiniDashboard',

  defaultProps: {
    currentSection: null,
    getSections: () => [],
    getCompletedSections: () => [],
    moduleProgressEmitter: {...Events},
  },

  propsStateReady({ moduleProgressEmitter }) {
    this.listenTo(moduleProgressEmitter, 'change', this.render);
  },

  render() {
    this.el.innerHTML = template({
      each,
      items: this.getRenderState(this.props),
    });
    return this;
  },

  getRenderState(props) {
    const { getSections, getCompletedSections, currentSection } = props;
    const completedSectionIDs = map(getCompletedSections(), ({ id }) => id);

    return map(getSections(), ({ id }, index) => {
      const isComplete = includes(completedSectionIDs, id);
      const isCurrent = id === currentSection;

      return {
        figure: index + 1,
        className: classNamesIf({
          'MiniDashboardItem_complete': isComplete,
          'MiniDashboardItem_current': isCurrent,
        }),
      };
    });
  },
});

export default mixin(MiniDashboard, PropsStateMixin);
