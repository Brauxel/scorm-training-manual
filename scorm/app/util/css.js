import { find, keys, memoize, union, without, includes, reduce } from 'lodash';
import { predicateResult } from './general';

const vendorPrefixedTransform = {
  'WebkitTransform': '-webkit-transform',
  'MozTransform': '-moz-transform',
  'OTransform': '-o-transform',
  'msTransform': '-ms-transform',
};

function getTransformProp() {
  const propKey = find(keys(vendorPrefixedTransform),
    key => key in document.body.style);
  return propKey ? vendorPrefixedTransform[propKey] : 'transform';
}

function classNameArray(element) {
  return (element.getAttribute('class') || '').split(' ');
}

// Export

export const getCSSTransformProp = memoize(getTransformProp);

export function getCSSTransform(transform) {
  return {
    [getCSSTransformProp()]: transform,
  };
}

export function classNamesIf(descriptors) {
  return reduce(descriptors, (classNames, predicate, className) => {
    return classNames.concat(predicateResult(predicate) ? className : []);
  }, []).join(' ');
}

export function hasClass(element, className = '') {
  return includes(classNameArray(element), className);
}

export function addClass(element, className = '') {
  element.setAttribute('class',
    union(classNameArray(element), className.split(' ')).join(' '));
}

export function removeClass(element, className = '') {
  element.setAttribute('class',
    without(classNameArray(element), ...className.split(' ')).join(' '));
}

export function toggleClass(element, className = '', predicate) {
  const add = predicate === undefined
    ? !hasClass(element, className)
    : predicateResult(predicate);
  (add ? addClass : removeClass)(element, className);
}
