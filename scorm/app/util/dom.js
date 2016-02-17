
import { map, flow, reduce, first, toArray } from 'lodash';
import $ from 'jquery';
import {
  boundsCenter,
  pointsDistance,
  boundsRelativeToBounds,
  closestPoint,
  boundsDoCollide,
} from './geometry';

export function elBounds(el) {
  return (el.jquery ? el[0] : el).getBoundingClientRect();
}

export const elCenter = flow(elBounds, boundsCenter);

export function elDistance(el1, el2) {
  return pointsDistance(...map([el1, el2], elCenter));
}

export function elRelativeBounds(el, to) {
  return boundsRelativeToBounds(elBounds(el), elBounds(to));
}

export function closestEl(el, toEls) {
  const { index } = closestPoint(elCenter(el), map(toEls, elCenter));
  return toEls[index];
}

export function topFromDocument(el) {
  return elBounds(el).top + window.pageYOffset;
}

export function elsDoCollide(el1, el2) {
  return boundsDoCollide(...map([el1, el2], elBounds));
}

export function toHTMLAttrString(attrsObject) {
  return reduce(attrsObject, (attrs, val, key) => {
    return attrs.concat(`${key}="${val}"`);
  }, []).join(' ');
}

export function prependTo(element, toPrepend) {
  const firstChild = first(element.children || []);
  if (!firstChild) {
    element.appendChild(toPrepend);
    return;
  }
  element.insertBefore(toPrepend, firstChild);
}

// Force a redraw
export function triggerRedraw($el) {
  $el.hide().show(0);
}

export function lockDocumentScroll() {
  $('html, body').css({overflow: 'hidden'});
}

export function releaseDocumentScroll() {
  $('html, body').css({overflow: ''});
}

export function isChildOf(child, parent) {
  return toArray(parent.children).indexOf(child) !== -1;
}

// Mod from http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport

export function isElementInViewport(el) {
  const rect = elBounds(el);

  return (rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

