import db from '../db';
import type { Podcast } from '~/factory/factoryInterface';


class PodcastManager {
  constructor(){}

  async addPodcast(podcaster: Podcast) {
    try {
      await db.podcast.add(podcaster);
    } catch(error) {
      console.error(error);
    }
  }

  async bulkAddPodcasts(podcasters: Podcast[]) {
    try {
      debugger;
      const all = await this.getAll();
      if (all) {
        const ids = all.map((data) => {
          return data.id;
        });
        await db.podcast.bulkDelete(ids);
      }
      debugger;
      await db.podcast.bulkAdd(podcasters);
    } catch(error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      return await db.podcast.toArray();
    } catch(error) {
      console.error(error);
    }
  }
}

const managePodcast = new PodcastManager();

export default managePodcast;