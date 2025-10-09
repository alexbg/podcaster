import db from '../db';

interface Episode {
  episodeId: number;
  podcasterId: number;
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
      await db.episode.bulkAdd(episodes);
    } catch (error) {
      console.error(error);
    }
  }

  async getEpisodes(podcasterId: number): Promise<Episode[] | undefined> {
    try {
      return db.episode.where('podcasterId').equals(podcasterId).toArray();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

}

const episodeManager = new EpisodeManager();

export default episodeManager;
export type { Episode }