/* global DEVELOPMENT, DEBUG, PRODUCTION */

/*
  Needs special import since pipwerk's SCORM implementation does not expose itself to any module system
*/
import {
  SCORM,
} from 'exports?pipwerks!scorm-api-wrapper/src/JavaScript/SCORM_API_wrapper.js';
import { LMS_KEYS, LMS_VALUES } from 'app/constants';

const { DATA_STORE_KEY, LESSON_STATUS_KEY } = LMS_KEYS;
const { COMPLETE_STATUS, INCOMPLETE_STATUS } = LMS_VALUES;

function storeScorm(key, data) {
  return new Promise((resolve, reject) => {
    const scormResult = SCORM.set(key, data);
    if (scormResult) {
      resolve(scormResult);
    } else {
      reject('Could not store to SCORM LMS');
    }
  });
}

function storeLocal(key, data) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, data);
      resolve();
    } catch (error) {
      reject(`Could not store to localStorage: ${error}`);
    }
  });
}

function fetchScorm(key) {
  return new Promise((resolve, reject) => {
    const data = SCORM.get(key);
    if (data && data !== 'null') {
      resolve(data);
    } else {
      reject('Could not read from SCORM LMS');
    }
  });
}

function fetchLocal(key) {
  let data;
  return new Promise((resolve, reject) => {
    try {
      data = localStorage.getItem(key);
      resolve(data || '');
    } catch (error) {
      reject(`Could not retrieve from localStorage: ${error}`);
    }
  });
}


export function initSession() {
  return new Promise((resolve, reject) => {
    if (SCORM.connection.isActive) {
      resolve(true);
    } else {
      const initResult = SCORM.init();
      if (initResult) resolve(initResult);
      else reject('Could not init SCORM LMS connection');
    }
  });
}

export function finishSession() {
  if (DEBUG) console.log(':: finishing scorm session');
  return new Promise((resolve, reject) => {
    /*
      No need to call save manually, SCORM_API_WRAPPER will commit the session before terminating
    */
    const result = SCORM.connection.isActive ? SCORM.quit() : true;
    if (result) resolve(result);
    else reject('Could not finish SCORM session');
  });
}

export function setLessonComplete(isComplete) {
  if (DEBUG) console.log(`Setting lesson complete ${isComplete}`);
  return storeScorm(LESSON_STATUS_KEY, isComplete
    ? COMPLETE_STATUS
    : INCOMPLETE_STATUS)
    .catch(scormError => {
      if (DEBUG) {
        console.warn(`Could not save completion status: ${scormError}`);
      }
    });
}

export function storeData(data) {
  let dataString;
  try {
    dataString = JSON.stringify(data);
  } catch (error) {
    console.warn(`Could not convert to JSON: ${error}`);
    dataString = '';
  }

  if (DEBUG) {
    console.log(`Attempting to store data ${dataString}`);
  }

  return storeScorm(DATA_STORE_KEY, dataString)
    .then(
      // Success
      () => Promise.resolve(),
      // Error
      (scormError) => {
        if (DEBUG) console.warn(scormError);
        if (DEVELOPMENT) {
          console.log('Attempting write to localStorage fallback');
          return storeLocal(DATA_STORE_KEY, dataString)
            .catch(localError => {
              if (DEBUG) console.warn(localError);
            });
        }

        return Promise.resolve();
      }
    );
}

export function retrieveData() {
  return fetchScorm(DATA_STORE_KEY)
    .catch(scormError => {
      if (DEBUG) console.warn(scormError);
      if (DEVELOPMENT) {
        console.log('Attempting read from localStorage fallback');
        return fetchLocal(DATA_STORE_KEY)
          .catch(localError => {
            if (DEBUG) console.warn(localError);
            return '';
          });
      }

      return Promise.resolve('');
    })
    .then(stored => {
      try {
        return JSON.parse(stored);
      } catch (error) {
        if (DEBUG) {
          console.warn(`Could not convert stored to JSON: ${error}, ${stored}`);
        }
        return {};
      }
    });
}
