import Velocity from 'velocity-animate';
import { isElementInViewport } from './dom';

/*
  Keep a reference to the html element since we scroll it quite often
*/
const htmlEl = document.querySelector('html');

export const DURATION_NORMAL = 600;

/*
  Provide Promise to Velocity, since a Promise implementation will be polyfilled via Babel runtime for older browsers. Export thin wrappers to ensure Velocity is run with Promises available.
*/
Velocity.Promise = Promise;

export function velocityAnim(element, props = {}, opts = {}) {
  return Velocity(element, props, opts);
}

export function velocityStop(element) {
  return Velocity(element, 'stop');
}


// Scroll document to specified offset
export function scrollToOffset(toOffset, duration = DURATION_NORMAL) {
  Velocity(htmlEl, 'stop');
  return Velocity(htmlEl, 'scroll', {
    offset: `${toOffset}px`,
    duration,
  });
}

export function scrollToElement(element, options) {
  const animOpts = {
    // Will only scroll if element is outside viewport
    onlyOutsideViewport: false,
    duration: DURATION_NORMAL,
    ...options,
  };

  if (animOpts.onlyOutsideViewport && isElementInViewport(element)) {
    (animOpts.complete || (() => {}))([element]);
    return Promise.resolve([element]);
  }

  Velocity(element, 'stop');
  return Velocity(element, 'scroll', animOpts);
}
