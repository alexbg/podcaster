import { podcastFactory } from "~/factory/podcastFactory";
import type { ApiPodcast } from "./apiInterfaces";
import type { Podcast } from "~/factory/factoryInterface";
import podcasts from './../mock/podcasts';
import managePodcaster from "~/database/manager/podcaster";

const APIURL = 'https://itunes.apple.com/';

export async function podcastsApi(refresh: boolean = false): Promise<Podcast[] | undefined> {
  try {
    // const podcasts: ApiPodcast = await fetch(`${APIURL}/us/rss/toppodcasts/limit=100/genre=1310/json`).then((data) => data.json());
    // Check first the database
    if (refresh) {
      // Hacer el fetch y guardar en la base de datos
      console.log('HAGO EL FETCH Y GUARDO EN LA BASE DE DATOS');
      const finalPodcast = podcasts.feed.entry.map((entry) => {
        return podcastFactory(entry);
      })
      if (finalPodcast.length) {
        await managePodcaster.bulkAddPodcaster(finalPodcast);
      }
      console.log(finalPodcast);
      return finalPodcast;
    } else {
      // Buscar en la base de datos
      // Si no esta, hacer el fetch y guardar en la base de datos
      let podcasts = managePodcaster.getAll();
      if(!podcasts) {
        podcasts = podcasts.feed.entry.map((entry) => {
          return podcastFactory(entry);
        });
      }

      console.log(podcasts);
      return podcasts;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}