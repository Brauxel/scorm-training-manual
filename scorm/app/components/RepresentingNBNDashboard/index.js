import { View, Events } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { each, map, includes } from 'lodash';
import { classNamesIf } from 'app/util/css';
import PropsStateMixin from 'app/components/mixins/PropsState';
import ContentPanelMixin from 'app/components/mixins/ContentPanel';
import template from './template.html';
import './style.styl';

const RepresentingNBNDashboard = View.extend({
  className: 'RepresentingNBNDashboard',

  defaultContentProps: {

  },

  defaultContentState: {
    isVisible: true,
  },

  defaultProps: {
    topicID: null,
    getSections: () => [],
    getCompletedSections: () => [],
    getAvailableSections: () => [],
    moduleProgressEmitter: {...Events},
    fakeComplete: false,
  },

  propsStateReady(props) {
    this.listenTo(props.moduleProgressEmitter, 'change', this.render());
  },

  render() {
    const allComplete = this.props.getSections().length === this.props.getCompletedSections().length;

    this.el.innerHTML = template({
      each,
      allComplete,
      items: this.getRenderState(this.props),
    });

    return this;
  },

  getRenderState(props) {
    const { getSections, getCompletedSections, getAvailableSections, topicID } = props;
    const completedSectionIDs = map(getCompletedSections(), ({ id }) => id);
    const availableSectionIDs = map(getAvailableSections(), ({ id }) => id);

    return map(getSections(), ({ id, title }, index) => {
      const isComplete = includes(completedSectionIDs, id);
      const isAvailable = includes(availableSectionIDs, id);

      return {
        key: id,
        tag: isAvailable ? 'a' : 'div',
        className: classNamesIf({
          'DashboardItem_complete': isComplete,
          'DashboardItem_available': isAvailable,
        }),
        figure: index + 1,
        title: title,
        url: isAvailable ? `#${topicID}/${id}` : null,
      };
    });
  },
});

export default mixin(RepresentingNBNDashboard, ContentPanelMixin, PropsStateMixin);
