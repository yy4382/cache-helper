/**
 * Reads the value associated with the given key from the cache.
 * @param {string} key - The key to retrieve the value for.
 * @param {number} [maxAge=3600] - The maximum age of the cached value in seconds. 0 for always refetch, -1 for always use cache.
 * @returns {*} The cached value associated with the key, or null if the key is not found or expired.
 */
declare function cache_read(
  key: string,
  url: string,
  maxAge?: number,
  expireInfoKey?: string
): any;

export default cache_read;
