import Backbone from 'backbone';
import { mixin } from 'backbone.cocktail';
import {
  map,
  each,
  take,
  extend,
  takeWhile,
  once,
  includes,
  debounce,
  last,
} from 'lodash';
import { addClass } from 'app/util/css';
import { pascalCase } from 'app/util/string';
import EventBus from 'app/EventBus';
import { scrollToElement } from 'app/util/anim';
import PropsStateMixin from 'app/components/mixins/PropsState';
import * as activityComponents from 'app/components/activities';
import SectionSummary from 'app/components/SectionSummary';

const Section = Backbone.View.extend({
  defaultProps: {
    sectionID: '',
    summaryComponent: SectionSummary,
    miniDashboard: {},
    mobileEmitter: {...Backbone.Events},
    moduleProgressEmitter: {...Backbone.Events},
    isMobile: () => false,
    getActivities: () => [],
    getCompletedActivities: () => [],
    onActivityComplete: () => {},
    nextURL: null,
    isResumedSection: false,
  },

  propsStateReady({ moduleProgressEmitter, mobileEmitter }) {
    addClass(this.el, `Section Section_${pascalCase(this.props.sectionID)}`);

    const debouncedCompleteHandler = debounce(() => this.handleCompletedChanged(), 200, {
      leading: true,
      trailing: true,
    });

    const debouncedMobileStateHandler = debounce(() => this.handleMobileStateChanged(), 200, {
      leading: true,
      trailing: true,
    });

    this.listenTo(moduleProgressEmitter, 'change', debouncedCompleteHandler);
    this.listenTo(mobileEmitter, 'change', debouncedMobileStateHandler);
  },

  getActivityContainer() {
    return this.$('.Section__activityContainer');
  },

  getSummaryContainer() {
    return this.$('.Section__summaryContainer');
  },

  getActivities() {
    return this.props.getActivities();
  },

  getCompletedActivityIDs() {
    return map(this.props.getCompletedActivities(), ({ id }) => id);
  },

  registerActivities(activities, completedIDs) {
    const { component: MiniDashboardComponent, props: miniDashboardProps }
      = this.props.miniDashboard;

    this.activityViews = map(activities, (activity, idx) => {
      const { component, componentMobile, id, props = {} } = activity;
      const Component =
        this.props.isMobile() && activityComponents[componentMobile]
          ? activityComponents[componentMobile]
          : activityComponents[component];
      const miniDashboardInstance =
        MiniDashboardComponent && miniDashboardProps
          ? new MiniDashboardComponent(miniDashboardProps)
          : null;

      return new Component({
        onContinue: instance => this.handleActivityContinue(id, instance, idx),
        onComplete: once(instance => {
          return this.handleActivityComplete(id, instance, idx);
        }),
        isComplete: includes(completedIDs, id),
        mobileEmitter: this.props.mobileEmitter,
        isMobile: this.props.isMobile,
        ...(miniDashboardInstance
          ? {miniDashboardProps: {instance: miniDashboardInstance}}
          : {}),
        ...props,
      });
    });

    this.getActivityContainer().html(map(this.activityViews, ({ el }) => el));
    each(this.activityViews, activity => activity.render());

    return this;
  },

  registerSummary(props) {
    const { component: MiniDashboardComponent, props: miniDashboardProps }
      = this.props.miniDashboard;
    const miniDashboardInstance = MiniDashboardComponent && miniDashboardProps
        ? new MiniDashboardComponent(miniDashboardProps)
        : null;
    const SummaryComponent = this.props.summaryComponent;

    this.sectionSummaryView = new SummaryComponent({
      onContinue: instance => this.handleSummaryContinue(instance),
      ...(miniDashboardInstance
          ? {miniDashboardProps: {instance: miniDashboardInstance}}
          : {}),
      ...props,
    });

    this.getSummaryContainer().html(this.sectionSummaryView.el);
    this.sectionSummaryView.render();

    return this;
  },

  initShowable() {
    const availableItems = this.getAvailableSectionItems();
    each(availableItems, item => item.show());
    if (this.props.isResumedSection && last(availableItems)) {
      setTimeout(() => scrollToElement(last(availableItems).el), 200);
    }

    this.setupScroll();

    return this;
  },

  setupScroll() {
    // noop
  },

  //

  getAvailableSectionItems() {
    const completedIDs = this.getCompletedActivityIDs();
    const continuousComplete = takeWhile(this.getActivities(), ({ id }) => includes(completedIDs, id));

    return take(this.activityViews, continuousComplete.length + 1)
      .concat(continuousComplete.length === this.activityViews.length
        ? this.sectionSummaryView
        : []
      );
  },

  //

  handleMobileStateChanged() {
    each(this.activityViews, activity => {
      if (activity.setIsMobile) activity.setIsMobile(this.props.isMobile());
    });
  },

  //

  handleActivityComplete(id) {
    this.props.onActivityComplete(id);
    return this;
  },

  handleActivityContinue(id, instance) {
    const showable = this.getAvailableSectionItems();
    const next = showable[showable.indexOf(instance) + 1];
    if (next) scrollToElement(next.el);
    return this;
  },

  handleSummaryContinue() {
    if (this.props.nextURL) EventBus.trigger('navigate', this.props.nextURL);
  },

  handleCompletedChanged() {
    each(this.getAvailableSectionItems(), item => item.show());
  },

  //

  remove() {
    each(this.activityViews, activity => activity.remove());
    this.sectionSummaryView.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  },

});

Section.extend = function extendSection(child) {
  const view = Backbone.View.extend.apply(this, arguments);
  each(['events', 'defaultProps', 'defaultState'], attr => {
    view.prototype[attr] = extend({}, this.prototype[attr], child[attr]);
  });
  return view;
};

export default mixin(Section, PropsStateMixin);
