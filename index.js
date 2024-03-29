async function client_fetch(url) {
  return await new Promise((resolve, reject) => {
    $httpClient.get(url, async (error, response, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}
async function directRefetch(key, url, expireInfoKey) {
  const data = await client_fetch(url);
  $persistentStore.write(data, key);
  let cacheExpireInfo = $persistentStore.read(expireInfoKey);
  const expireInfo = JSON.parse(cacheExpireInfo);
  const item = expireInfo.find((item) => item.key === key);
  item.update = new Date().toISOString();
  $persistentStore.write(JSON.stringify(expireInfo), expireInfoKey);
  return data;
}

/**
 * Reads the value associated with the given key from the cache.
 * @param {string} key - The key to retrieve the value for.
 * @param {number} [maxAge=3600] - The maximum age of the cached value in seconds. 0 for always refetch, -1 for always use cache.
 * @returns {*} The cached value associated with the key, or null if the key is not found or expired.
 */
export default async function cache_read(
  key,
  url,
  maxAge = 3600,
  expireInfoKey = "json.cacheHelper.expireInfo"
) {
  let cacheExpireInfo = $persistentStore.read(expireInfoKey);
  if (!cacheExpireInfo) {
    console.log("Cache info store not found, creating new one.");
    const data = await client_fetch(url);
    $persistentStore.write(data, key);
    cacheExpireInfo = [];
    cacheExpireInfo.push({ key, update: new Date().toISOString() });
    $persistentStore.write(JSON.stringify(cacheExpireInfo), expireInfoKey);
    return data;
  }
  cacheExpireInfo = JSON.parse(cacheExpireInfo);
  const item = cacheExpireInfo.find((item) => item.key === key);
  if (!item) {
    console.log("Cache info for this url not found, refetching.");
    const data = await client_fetch(url);
    $persistentStore.write(data, key);
    cacheExpireInfo.push({ key, update: new Date().toISOString() });
    $persistentStore.write(JSON.stringify(cacheExpireInfo), expireInfoKey);
    return data;
  }
  if (maxAge === -1) {
    console.log("maxAge = -1, always use cache.");
    return $persistentStore.read(key);
  }
  if (maxAge === 0) {
    console.log("maxAge = 0, always refetch.");
    return await directRefetch(key, url, expireInfoKey);
  }
  const now = new Date();
  const update = new Date(item.update);
  const diff = (now - update) / 1000;
  if (diff > maxAge) {
    return await directRefetch(key, url, expireInfoKey);
  } else {
    return $persistentStore.read(key);
  }
}
