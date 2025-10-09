import db from '../db';

interface Expire {
  id: string;
  expireAt: Date;
}

class ExpireManager {
  constructor(){}

  async createRefresh(id: string, staleTime: Date) {
    await db.expire.delete(id);
    return db.expire.add({id, expireAt: staleTime});
  }

  async hasToRefresh(id: string) {
    const expire = await db.expire.get(id);
    if (expire && expire.expireAt > new Date()) {
      console.log('ES FALSE');
      return false;
    }
    return true;
  }

}

const expireManager = new ExpireManager();

export type { Expire }

export default expireManager;