import Dexie, { type EntityTable } from 'dexie';

import type { Episode } from './manager/episode';
import type { Expire } from './manager/expire';
import type { Podcast } from '~/factory/factoryInterface';

const db = new Dexie('PodcastsApp') as Dexie & {
  podcast: EntityTable<
    Podcast,
    'id' // primary key "id" (for the typings only)
  >;
  episode: EntityTable<
    Episode,
    'id'
  >;
  expire: EntityTable<
    Expire,
    'id'
  >;
};

db.version(1).stores({
  podcast: '&id, title, description',
  episode: '&id, podcastId',
  expire: '&id'
});

export default db;

