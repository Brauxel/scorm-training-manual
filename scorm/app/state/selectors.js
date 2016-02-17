// Experimental

import {
  find, reduce, sortBy, all,
  includes, map, last, take, compact,
} from 'lodash';

function getOrderedComplete(items, completedItems) {
  const findCompleted = match => {
    return find(completedItems, ({ id }) => id === match);
  };

  return reduce(items, (ordered, { id }) => {
    return ordered.concat(findCompleted(id) || []);
  }, []);
}

function getOrderedAvailable(items, orderedCompletedItems) {
  const lastCompletedIndex = items.indexOf(last(orderedCompletedItems));
  return take(items, lastCompletedIndex + 2);
}

//

export function completedActivityIDs(state) {
  return state.get('completedActivityIDs');
}

export function getBookmarkRoute(state) {
  return state.get('bookmarkRoute');
}

export function hasBookmarkRoute(state) {
  return Boolean(getBookmarkRoute(state));
}

export function isMobile(state) {
  return state.get('isMobile');
}

export function windowScrollY(state) {
  return state.get('windowScrollY');
}

export function getTopics(state) {
  return sortBy(reduce(state.get('topics'), (list, attrs) => list.concat(attrs), []), 'order');
}

export function getSectionsForTopic(state, topicID) {
  const topic = state.get('topics')[topicID];
  if (!topic) return [];
  return compact(map(topic.sections, sectionID => {
    return state.get('sections')[sectionID];
  }));
}

export function getActivitiesForSection(state, sectionID) {
  const section = state.get('sections')[sectionID];
  if (!section) return [];
  return compact(map(section.activities, activityID => {
    return state.get('activities')[activityID];
  }));
}

//

export function getCompletedActivities(state) {
  const activities = state.get('activities');
  return compact(map(state.get('completedActivityIDs'), id => activities[id]));
}

export function getCompletedSections(state) {
  const activityIDs = state.get('completedActivityIDs');
  return reduce(state.get('sections'), (list, section) => {
    const allComplete = all(section.activities, activityID => {
      return includes(activityIDs, activityID);
    });
    return list.concat(allComplete ? section : []);
  }, []);
}

export function getCompletedTopics(state) {
  const completedSectionIDs = map(getCompletedSections(state), ({ id }) => id);
  return reduce(state.get('topics'), (list, topic) => {
    const allComplete = all(topic.sections, sectionID => {
      return includes(completedSectionIDs, sectionID);
    });
    return list.concat(allComplete ? topic : []);
  }, []);
}

//

export function getCompletedSectionsForTopic(state, topicID) {
  return getOrderedComplete(
    getSectionsForTopic(state, topicID),
    getCompletedSections(state)
  );
}

export function getCompletedActivitiesForSection(state, sectionID) {
  return getOrderedComplete(
    getActivitiesForSection(state, sectionID),
    getCompletedActivities(state)
  );
}

//

export function getAvailableTopics(state) {
  return getOrderedAvailable(getTopics(state), getCompletedTopics(state));
}

export function getAvailableSectionsForTopic(state, topicID) {
  return getOrderedAvailable(
    getSectionsForTopic(state, topicID),
    getCompletedSectionsForTopic(state, topicID)
  );
}

//

export function isModuleComplete(state) {
  const topicIDs = map(getTopics(state), ({ id }) => id);
  const completedTopicIDs = map(getCompletedTopics(state), ({ id }) => id);
  return all(topicIDs, id => includes(completedTopicIDs, id));
}
