
export const START = 'start';
export const MOVE = 'move';
export const CANCEL = 'cancel';
export const END = 'end';

export function getTouchEvents() {
  const hasTouch = 'ontouchstart' in window;

  return {
    [START]: hasTouch ? 'touchstart' : 'mousedown',
    [MOVE]: hasTouch ? 'touchmove' : 'mousemove',
    [CANCEL]: hasTouch ? 'touchcancel' : 'mouseup',
    [END]: hasTouch ? 'touchend' : 'mouseup',
  };
}

export function getTouchEvent(type) {
  return getTouchEvents()[type];
}

export function firstTouchFromEvent(event) {
  const origEvent = event.originalEvent;
  return origEvent.touches
    ? {x: origEvent.touches[0].clientX, y: origEvent.touches[0].clientY}
    : {x: origEvent.pageX, y: origEvent.pageY};
}
