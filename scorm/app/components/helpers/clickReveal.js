import $ from 'jquery';
import { map, each, noop, find, partial } from 'lodash';

function handleClick($revealables, attrKey, onClick, $clickable) {
  const key = $clickable.attr(attrKey);
  const $revealable = find($revealables, $item => $item.attr(attrKey) === key);

  if (! $revealable) return;

  each($revealables, $item => $item.toggleClass('clickReveal__revealable_visible', $item === $revealable));
  onClick(key, $clickable, $revealable);
}

export function makeClickReveal(clickables, revealables, { onClick = noop, attrKey = 'data-key' }) {
  let $clickables = map(clickables, clickable => $(clickable));
  let $revealables = map(revealables, revealable => $(revealable));
  const clickFn = partial(handleClick, $revealables, attrKey, onClick);

  each($clickables, $clickable => $clickable.on('click', () => clickFn($clickable)));

  return function destroy() {
    each($clickables, $clickable => $clickable.off());
    $clickables = [];
    $revealables = [];
  };
}
