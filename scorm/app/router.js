/* global DEVELOPMENT */

import Backbone, { Router } from 'backbone';
import { last, trim } from 'lodash';
import { pascalCase } from 'app/util/string';
import EventBus from 'app/EventBus';
import {
  sections,
  SectionSummary,
  RepresentingNBNDashboard,
  RepresentingNBNSectionSummary,
  MiniDashboard,
  ModuleSummary,
} from 'app/components';

export default Router.extend({
  routes: {
    '': 'protoHome',
    'big-picture(/resume/:resume)': 'bigPicture',
    'nbn-brand(/resume/:resume)': 'NBNBrand',
    'representing-nbn(/resume/:resume)': 'representingNBNDashboard',
    'representing-nbn/:section(/resume/:resume)': 'representingNBNSection',
    'module-summary(/resume/:resume)': 'moduleSummary',
  },

  initialize({ appStateEmitters, appStateSelectors, appStateActions }) {
    this.appStateEmitters = appStateEmitters;
    this.appStateSelectors = appStateSelectors;
    this.appStateActions = appStateActions;
    this.listenTo(EventBus, 'navigate', route => this.navigate(route, {trigger: true}));
  },

  execute(callback, args) {
    const currentRoute = trim(Backbone.history.fragment, '#');
    const resumeIndex = currentRoute.indexOf('/resume/');
    // Don't create an extra history state for resumed routes
    if (resumeIndex > -1) {
      const cleaned = currentRoute.substring(0, resumeIndex);
      this.navigate(cleaned, {
        trigger: false,
        replace: true,
      });
    }

    return (callback || (() => {})).apply(this, args || []);
  },

  showSectionRoute({ id, component, nextURL, miniDashboardTopic, isResumedSection }) {
    const miniDashboard = miniDashboardTopic
      ? {
        component: MiniDashboard,
        props: {
          getSections: () => this.appStateSelectors.getSectionsForTopic(miniDashboardTopic),
          getCompletedSections: () => this
            .appStateSelectors.getCompletedSectionsForTopic(miniDashboardTopic),
          currentSection: id,
          moduleProgressEmitter: this.appStateEmitters.moduleProgress,
        },
      }
      : {};

    EventBus.trigger('showPage', {
      component,
      props: {
        sectionID: id,
        nextURL,
        miniDashboard,
        isResumedSection,
        // DIRTY HACK! Find a better way.
        summaryComponent: miniDashboardTopic
          ? RepresentingNBNSectionSummary
          : SectionSummary,
        moduleProgressEmitter: this.appStateEmitters.moduleProgress,
        mobileEmitter: this.appStateEmitters.isMobile,
        isMobile:
          () => this.appStateSelectors.isMobile(),
        getActivities:
          () => this.appStateSelectors.getActivitiesForSection(id),
        getCompletedActivities:
          () => this.appStateSelectors.getCompletedActivitiesForSection(id),
        onActivityComplete:
          activityID => this.appStateActions.completeActivity(activityID),
      },
    });
  },

  // Handlers

  protoHome() {
    this.navigate('big-picture', {trigger: true, replace: true});
  },

  bigPicture(resume) {
    this.showSectionRoute({
      id: 'big-picture-section',
      component: sections.BigPicture,
      nextURL: 'nbn-brand',
      isResumedSection: Boolean(resume),
    });
  },

  NBNBrand(resume) {
    this.showSectionRoute({
      id: 'nbn-brand-section',
      component: sections.NBNBrand,
      nextURL: 'representing-nbn',
      isResumedSection: Boolean(resume),
    });
  },

  representingNBNDashboard() {
    EventBus.trigger('showPage', {
      component: RepresentingNBNDashboard,
      props: {
        topicID: 'representing-nbn',
        getSections:
          () => this.appStateSelectors
                  .getSectionsForTopic('representing-nbn'),
        getCompletedSections:
          () => this.appStateSelectors
                  .getCompletedSectionsForTopic('representing-nbn'),
        getAvailableSections:
          () => this.appStateSelectors
                  .getAvailableSectionsForTopic('representing-nbn'),
        moduleProgressEmitter: this.appStateEmitters.moduleProgress,
      },
    });
  },

  representingNBNSection(sectionSlug, resume) {
    const lastSection = last(
      this.appStateSelectors.getSectionsForTopic('representing-nbn')) || {};
    const allComplete = this.appStateSelectors.isModuleComplete();

    this.showSectionRoute({
      id: sectionSlug,
      component: sections[pascalCase(sectionSlug)],
      isResumedSection: Boolean(resume),
      miniDashboardTopic: 'representing-nbn',
      nextURL: (sectionSlug === lastSection.id) && allComplete
        ? 'module-summary'
        : 'representing-nbn',
    });
  },

  moduleSummary() {
    EventBus.trigger('showPage', {component: ModuleSummary});
  },

});
