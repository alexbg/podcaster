import { podcastFactory } from "~/factory/podcastFactory";
import type { ApiPodcast } from "./apiInterfaces";
import type { Podcast } from "~/factory/factoryInterface";
import podcasts from './../mock/podcasts';
import managePodcast from "~/database/manager/podcast";

const APIURL = 'https://itunes.apple.com/';

export async function podcastsApi(refresh: boolean = false): Promise<Podcast[] | undefined> {
  try {
    if (refresh) {
      console.log('HAGO EL FETCH Y GUARDO EN LA BASE DE DATOS');
      const finalPodcast = podcasts.feed.entry.map((entry) => {
        return podcastFactory(entry);
      })
      if (finalPodcast.length) {
        await managePodcast.bulkAddPodcasts(finalPodcast);
      }
      console.log(finalPodcast);
      return finalPodcast;
    } else {
      let finalPodcast = await managePodcast.getAll();
      if(!finalPodcast?.length) {
        finalPodcast = podcasts.feed.entry.map((entry) => {
          return podcastFactory(entry);
        });
        if (finalPodcast?.length) {
          await managePodcast.bulkAddPodcasts(finalPodcast);
        }
      }

      console.log(finalPodcast);
      return finalPodcast;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}