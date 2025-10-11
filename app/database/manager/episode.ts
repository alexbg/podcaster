import db from '../db';

interface Episode {
  id: number;
  podcastId: number;
  duration: string;
  title: string;
  description: string;
}


class EpisodeManager {
  constructor() {}

  async addEpisode(episode: Episode) {
    try {
      await db.episode.add(episode);
    } catch (error) {
      console.error(error);
    }
  }

  async bulkAddEpisodes(episodes: Episode[]) {
    try {
      // debugger;
      // const all = await this.getEpisodes();
      // if (all) {
      //   const ids = all.map((data) => {
      //     return data.id;
      //   });
      //   await db.podcast.bulkDelete(ids);
      // }
      await db.episode.bulkAdd(episodes);
    } catch (error) {
      console.error(error);
    }
  }

  async getEpisodes(podcastId: number): Promise<Episode[] | undefined> {
    try {
      return db.episode.where('podcastId').equals(podcastId).toArray();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

}

const episodeManager = new EpisodeManager();

export default episodeManager;
export type { Episode }