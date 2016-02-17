import { pick, keys } from 'lodash';

export function extendKeys(target, src) {
  return {...target, ...pick(src, keys(target))};
}
