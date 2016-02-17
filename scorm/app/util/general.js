export function predicateResult(predicate) {
  return typeof predicate === 'function' ? predicate() : Boolean(predicate);
}
