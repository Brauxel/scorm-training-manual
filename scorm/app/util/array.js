import { includes } from 'lodash';

/*
  To assist with setting array state attributes on Backbone models. If the array already has the item to be merged, the array itself is returned, therefore preventing a change from being triggered. If the item is not in the array, it will return a new array with the item included, causing a change to be triggered.
*/
export function mergeIntoArray(arr, item) {
  if (includes(arr, item)) return arr;
  return arr.concat(item);
}
