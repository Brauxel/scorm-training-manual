/* global DEBUG */

import { merge, defer } from 'lodash';
import { initSession, retrieveData } from 'app/scorm';
import * as content from './content';
import initApp from './initApp';

function gatherInitState() {
  return retrieveData()
    .then(storedProgress => {
      if (DEBUG) {
        console.log(`:: Gather app state ${JSON.stringify(storedProgress)}`);
      }
      const progress = merge({
        bookmarkRoute: null,
        completedActivityIDs: [],
      }, storedProgress);

      return {...progress, ...content};
    });
}

if (DEBUG) console.log(':: Init Session');
initSession()
  // Always gather init state even if SCORM fetch does not go through
  .then(
    // Success
    () => gatherInitState(),
    // Error
    () => gatherInitState()
  )
  // Defer so we have a correct window width when initializing the app.
  // Important for determining if we need to load mobile specific modules.
  .then(initState => defer(() => initApp(initState)))
  .catch(error => { if (DEBUG) console.warn(error); });
