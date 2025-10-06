import Dexie, { type EntityTable } from 'dexie';
import type { Podcaster } from './manager/podcaster';
import type { Episode } from './manager/episode';
import type { Expire } from './manager/expire';

const db = new Dexie('Podcaster') as Dexie & {
  podcaster: EntityTable<
    Podcaster,
    'podcasterId' // primary key "id" (for the typings only)
  >;
  episode: EntityTable<
    Episode,
    'episodeId'
  >;
  expire: EntityTable<
    Expire,
    'id'
  >;
};

db.version(1).stores({
  podcaster: '&podcasterId, title, description',
  episode: '&episodeId, podcasterId',
  expire: '&id'
});

export default db;

