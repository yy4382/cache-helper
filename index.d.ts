/**
 * Reads the value associated with the given key from the cache.
 * @param {string} key - The key to retrieve the value for.
 * @param {string} url - The URL to fetch the data from if it's not in the cache.
 * @param {number} [maxAge=3600] - The maximum age of the cached value in seconds. 0 for always refetch, -1 for always use cache. Optional.
 * @param {string} [expireInfoKey=json.cacheHelper.expireInfo] - The key used to store the expiration information. Optional.
 * @returns {string} The cached data.
 */
declare function cache_read(
  key: string,
  url: string,
  maxAge?: number,
  expireInfoKey?: string
): any;

export default cache_read;
