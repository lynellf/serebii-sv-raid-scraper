/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {T[]}
 */
export function toArray(iterable) {
  return [...iterable];
}

/**
 * @template T
 * @param {Iterable<T>} iterable
 * @param {number} endAt
 * @returns {T}
 */
export function first(iterable = [], endAt = 1) {
  const arr = toArray(iterable);
  return arr.slice(0, endAt);
}

/**
 * @template T
 * @param {Iterable<T>} iterable
 * @param {number} startAt
 * @returns {T[]}
 */
export function rest(iterable = [], startAt = 1) {
  const arr = toArray(iterable);
  return arr.slice(startAt);
}

/**
 * @template T
 * @param {Iterable<T>} iterable collection of items to chunk
 * @param {number} size represents the upper bound of each chunk
 * @param {T[][]} chunks list of chunks
 * @returns {T[][]}
 */
export function chunkArr(iterable = [], size, chunks = []) {
  const arr = toArray(iterable);
  if (!arr.length) {
    return chunks;
  }

  return chunkArr(rest(arr, size), size, [...chunks, first(arr, size)]);
}
