import expireManager from "../database/manager/expire";

interface PromiseInfo {
  promise: Promise<unknown>;
  staleTime?: Date
}

/**
 * Save in memory the promise, so it can be used later
 * 
 */
class CachePromise {
  private cache = new Map<string, PromiseInfo>();
  private limit = 5;
  constructor(limit?: number) {
    if (limit !== undefined) {
      this.limit = limit;
    }
  }

  /**
   * Load or create a new promise which return the data from fetchMethod
   * - If it is in the cache, it return a PromiseInfo, it PromiseInfo has the promise
   * - If it is in the cache and need to refresh because the staleTime is older than today, it call freshMethod again
   * and save it in the database
   * - If it isn't in the cache, search the staleTime in the database and create a new PromiseInfo with a new Promise
   * @param key string
   * @param fetchMethod (refresh: boolean) => Promise<T>
   * @param staleTime Date
   * @returns 
   */
  loadOrCreate<T>(
    key: string,
    fetchMethod: () => Promise<T>,
    staleTime: Date
  ) {
    const promiseInfo = this.cache.get(key);
    if (!promiseInfo) {
      debugger;
      return this.createPromiseWithCheckRefresh(key, fetchMethod, staleTime);
    } else {
      debugger;
      if (promiseInfo.staleTime && promiseInfo.staleTime < new Date()) {
        debugger;
        return this.createPromise(key, fetchMethod, staleTime, true);
      }
      return promiseInfo;
    }
  }

  // TODO merge the two method in one.
  /**
   * It return a PromiseInfo with a new Promise and check if the cache is expired
   * @param key 
   * @param fetchMethod 
   * @param staleTime 
   * @returns 
   */
  createPromiseWithCheckRefresh(key: string, fetchMethod: (refresh: boolean) => Promise<T>, staleTime: Date) {
    const promiseInfo: PromiseInfo = {promise: new Promise<T>((resolve, reject) => {

      expireManager.hasToRefresh(key).then((refresh) => {
        fetchMethod(refresh).then((data) => {
          if (refresh) {
            expireManager.createRefresh(key, staleTime).then(() => {
              resolve(data);
            });
          } else {
            resolve(data);
          }
        }).catch(() => {
          reject();
        });
      })
    }), staleTime}

    return this.setCache(key, promiseInfo);
  }

  createPromise<T>(key: string, fetchMethod: (refresh: boolean) => Promise<T>, staleTime: Date, refresh: boolean = false) {
    const promiseInfo: PromiseInfo = {promise: new Promise<T>((resolve, reject) => {
      fetchMethod(refresh).then((data) => {
        if (refresh) {
          expireManager.createRefresh(key, staleTime).then(() => {
            resolve(data);
          });
        } else {
          resolve(data);
        }
      }).catch(() => {
        reject();
      });
    }), staleTime}
    return this.setCache(key, promiseInfo);
  }

  setCache(key: string, promiseInfo: PromiseInfo) {
    if (this.cache.size >= this.limit) {
      const key = [...this.cache.keys()][0];
      this.cache.delete(key);
    }
    this.cache.set(key, promiseInfo);
    return promiseInfo;
  }
}

const cachePromise = new CachePromise();

export default cachePromise;
