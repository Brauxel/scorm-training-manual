
import { reduce, map, inRange } from 'lodash';

/*
  'point' {x, y}
  'bounds' {top, right, bottom, left}
*/

export function boundsWidth(bounds) {
  return bounds.width !== undefined
    ? bounds.width
    : bounds.right - bounds.left;
}

export function boundsHeight(bounds) {
  return bounds.height !== undefined
    ? bounds.height
    : bounds.bottom - bounds.top;
}

export function pointRelativeToBounds(point, bounds) {
  return {
    x: point.x - bounds.left,
    y: point.y - bounds.top,
  };
}

export function boundsRelativeToBounds(bounds, toBounds) {
  const top = bounds.top - toBounds.top;
  const left = bounds.left - toBounds.left;
  return {
    top: top,
    right: left + boundsWidth(bounds),
    bottom: top + boundsHeight(bounds),
    left: left,
  };
}

export function isInBounds(point, bounds) {
  return inRange(point.x, bounds.left, bounds.right + 1)
          && inRange(point.y, bounds.top, bounds.bottom + 1);
}

export function boundsCenter(bounds) {
  return {
    x: bounds.left + (boundsWidth(bounds) / 2),
    y: bounds.top + (boundsHeight(bounds) / 2),
  };
}

export function pointsDistance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

export function boundsDistance(bounds1, bounds2) {
  return pointsDistance.apply(null, map([bounds1, bounds2], boundsCenter));
}

export function pointBoundsDistance(point, bounds) {
  return pointsDistance(point, boundsCenter(bounds));
}

export function boundsDoCollide(bounds1, bounds2) {
  return ! (bounds1.right < bounds2.left
            || bounds1.left > bounds2.right
            || bounds1.bottom < bounds2.top
            || bounds1.top > bounds2.bottom);
}

export function pointIsWithinBounds(point, bounds) {
  return point.x >= bounds.left
          && point.x <= bounds.right
          && point.y >= bounds.top
          && point.y <= bounds.bottom;
}

// returns {?Object point, ?Number index, Number dist}
export function closestPoint(fromPoint, toPoints) {
  return reduce(toPoints || [], (closest, point, index) => {
    const distance = pointsDistance(fromPoint, point);
    if (distance < closest.distance) return {point, distance, index};
    return closest;
  }, {point: undefined, distance: Number.MAX_VALUE, index: undefined});
}
