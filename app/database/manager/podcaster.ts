import db from '../db';

interface Podcaster {
  podcasterId: number;
  title: string;
  description: string;
  smallImage: string;
  largeImage: string;
}

class PodcasterManager {
  constructor(){}

  async addPodcaster(podcaster: Podcaster) {
    try {
      await db.podcaster.add(podcaster);
    } catch(error) {
      console.error(error);
    }
  }

  async bulkAddPodcaster(podcasters: Podcaster[]) {
    try {
      await db.podcaster.bulkAdd(podcasters);
    } catch(error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      // TODO organize the Podcaster and Factory podcasts, because they have to be the same and aren't
      return await db.podcaster.where('podcasterId').equals('podcasts').toArray();
    } catch(error) {
      console.error(error);
    }
  }
}

const managePodcaster = new PodcasterManager();

export type { Podcaster };
export default managePodcaster;