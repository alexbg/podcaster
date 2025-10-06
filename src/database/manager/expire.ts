import db from './../db';

interface Expire {
  id: string;
  expireAt: Date;
}

class ExpireManager {
  constructor(){}

  refresh(id: string) {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    db.expire.add({id, expireAt: nextDay})
  }

  async checkRefresh(id: string) {
    const expire = await db.expire.get(id);
    if (expire && expire.expireAt > new Date()) {
      return false;
    }
    return true;
  }

}

const expireManager = new ExpireManager();

export type { Expire }

export default expireManager;