// Experimental

import { includes, union } from 'lodash';

export function completeActivity(state, activityID) {
  const activityIDs = state.get('completedActivityIDs');
  if (includes(activityIDs, activityID)) return;
  state.set({completedActivityIDs: union(activityIDs, [activityID])});
}

export function setBookmarkRoute(state, route) {
  state.set({bookmarkRoute: route});
}

export function clearBookmarkRoute(state) {
  setBookmarkRoute(state, null);
}

export function setIsMobile(state, isMobile) {
  state.set({isMobile});
}

export function setWindowScrollY(state, windowScrollY) {
  state.set({windowScrollY});
}
