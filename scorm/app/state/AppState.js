/* global DEBUG */

import { Model } from 'backbone';

const AppState = Model.extend({
  defaults: {
    completedActivityIDs: [],
    bookmarkURL: null,
    isMobile: false,
    topics: {},
    sections: {},
    activities: {},
  },
});

export default AppState;
