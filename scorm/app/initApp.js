/* global DEBUG */

import { once, trim } from 'lodash';
import { storeData, setLessonComplete, finishSession } from 'app/scorm';
import $ from 'jquery';
import { BREAKPOINT_MOBILE } from './constants';
import Backbone from 'backbone';
import AppRoot from 'app/components/AppRoot';
import Router from 'app/router';
import EventBus from 'app/EventBus';
import { bindToState } from 'app/util/state';
import AppState from 'app/state/AppState';
import emitters from 'app/state/emitters';
import * as Selectors from 'app/state/selectors';
import * as Actions from 'app/state/actions';

import 'styles/base.styl';
import 'styles/utility.styl';
import 'styles/Modal.styl';

const $window = $(window);

export default function initApp(initState) {
  if (DEBUG) console.log(':: Init App');

  const appState = new AppState({
    ...initState,
    windowScrollY: $window.scrollTop(),
    isMobile: $window.innerWidth() <= BREAKPOINT_MOBILE,
  });
  const appStateSelectors = bindToState(appState, Selectors);
  const appStateActions = bindToState(appState, Actions);
  const appStateEmitters = emitters(appState);

  const router = new Router({
    appStateEmitters,
    appStateSelectors,
    appStateActions,
  });

  const appRoot = new AppRoot({
    el: document.getElementById('AppContainer'),
    getTopics: appStateSelectors.getTopics,
    getCompletedTopics: appStateSelectors.getCompletedTopics,
    getAvailableTopics: appStateSelectors.getAvailableTopics,
    moduleProgressEmitter: appStateEmitters.moduleProgress,
    hasBookmark: appStateSelectors.hasBookmarkRoute,
    resumeFromBookmark: () => {
      if (!appStateSelectors.hasBookmarkRoute()) return;
      router.navigate(
        `${appStateSelectors.getBookmarkRoute()}/resume/true`,
        {trigger: true}
      );
      appStateActions.clearBookmarkRoute(null);
    },
    ignoreBookmark: () => {
      appStateActions.clearBookmarkRoute(null);
    },
  });

  // Only store data once so we're not pinging the LMS constantly
  const finishOnce = once(function finish() {
    if (DEBUG) console.log(':: Finishing session');
    const onError = error => { if (DEBUG) console.warn(error); };
    /*
      Since these are implemented as ostensibly async functions, we'd ideally use a then-chain of promises to guarantee execution order, i.e.:
      storeData.then(setLessonComplete).then(finishSession).catch(onError);

      UNFORTUNATELY, IE10 doesn't seem to like promise chaining when doing window unload, so we call these in parallel. Unfortunately this gives us no guarantee on sequence, at least conceptually. Should be safe-ish, since LMS execution is pretty fast and we're not communication over xhr.
      TODO: Make synchronous, blocking versions of these wrappers to guarantee execution order and placate the IE fucking asshole beast, OR, investigate Promise libs e.g. bluebird that might provide strong IE10 support.
    */
    storeData({
      completedActivityIDs: appStateSelectors.completedActivityIDs(),
      bookmarkRoute: trim(Backbone.history.fragment, '#'),
    }).catch(onError);
    setLessonComplete(appStateSelectors.isModuleComplete()).catch(onError);
    finishSession().catch(onError);
  });

  $window.on('beforeunload', () => finishOnce());
  $window.on('unload', () => finishOnce());
  $window.on('scroll', () => EventBus
    .trigger('windowScroll', {scrollY: $window.scrollTop()}));
  $window.on('resize', () => appStateActions
    .setIsMobile($window.innerWidth() <= BREAKPOINT_MOBILE));

  appRoot.render();
  Backbone.history.start();
}
