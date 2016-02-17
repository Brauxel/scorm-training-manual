// Lousy experiments in backbone state

import { map, reduce, bind } from 'lodash';
import { Events } from 'backbone';

export function createStateEmitter(state, changeKeys = []) {
  const emitter = {...Events};
  const changeEvents = map(changeKeys, key => `change:${key}`).join(' ');
  emitter.listenTo(state, changeEvents, () => emitter.trigger('change'));
  return emitter;
}

export function bindToState(state, stateFunctions) {
  return reduce(stateFunctions, (bound, selector, key) => (
    {...bound, [key]: bind(selector, null, state)}
  ), {});
}

