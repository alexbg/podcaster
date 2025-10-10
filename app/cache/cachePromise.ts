import expireManager from "../database/manager/expire";

interface PromiseInfo {
  promise: Promise<unknown>;
  staleTime?: Date
}

class CachePromise {
  private cache = new Map<string, PromiseInfo>();
  private limit = 5;
  constructor(limit?: number) {
    if (limit !== undefined) {
      this.limit = limit;
    }
  }

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
      if (promiseInfo.staleTime && promiseInfo.staleTime < new Date()) {
        debugger;
        return this.createPromise(key, fetchMethod, staleTime, true);
      }
      return promiseInfo;
    }
  }

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
