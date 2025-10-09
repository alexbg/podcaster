import expireManager from "../database/manager/expire";

class CachePromise {
  private cache = new Map<string, Promise<unknown>>();
  private limit = 5;
  constructor(limit?: number) {
    if (limit !== undefined) {
      this.limit = limit;
    }
  }

  async loadOrCreate<T>(
    key: string,
    fetchMethod: () => Promise<T>,
    staleTime: Date
  ) {
    // TODO  Guardar en la base de datos los staleTime y que sea de esta cache, a si lo manejo desde aqui y siempre compruebo si necesito actualizarlos o no

    // Check in the database if it need to refresh the cache
    // The database will have a key with the key used in cache and the Date
    // Example

    // TODO This one is a problem
    // const needToRefresh = await expireManager.hasToRefresh(key);

    // TODO THIS IS WRONG THING MORE ABOUT IT
     // It should't create a promise, because the suspense get refresh, because it return a new promise every time
    const patata = new Promise((resolve, reject) => {
      expireManager.hasToRefresh(key).then((needToRefresh) => {
        if (this.cache.get(key) && !needToRefresh) {
          // debugger;
          return resolve(this.cache.get(key) as Promise<T>);
        }

        if (this.cache.size >= this.limit) {
          const key = [...this.cache.keys()][0];
          this.cache.delete(key);
        }

        // Promise that create the fetch and is the one that is saved in the cache
        fetchMethod().then(async (data) => {
          await expireManager.createRefresh(key, staleTime);
          debugger;
          this.cache.set(key, patata);
          return resolve(data);
        });
      });
    });
    return patata;

    // const needToRefresh = false;

    // if (this.cache.get(key) && !needToRefresh) {
    //   return this.cache.get(key) as Promise<T>;
    // }

    // if (this.cache.size >= this.limit) {
    //   const key = [...this.cache.keys()][0];
    //   this.cache.delete(key);
    // }

    // // Promise that create the fetch and is the one that is saved in the cache
    // const promise = fetchMethod().then(async (data) => {
    //   await expireManager.createRefresh(key, staleTime);
    //   return data;
    // });
    // this.cache.set(key, promise);
    // return promise;
  }

  get<T>(key: string) {
    return this.cache.get(key) as Promise<T> | undefined;
  }
}

const cachePromise = new CachePromise();

export default cachePromise;
