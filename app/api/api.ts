import { podcastFactory } from "~/factory/podcastFactory";
import type { ApiPodcast } from "./apiInterfaces";
import type { Podcast } from "~/factory/factoryInterface";
import podcasts from './../mock/podcasts';

const APIURL = 'https://itunes.apple.com/';

export async function podcastsApi(): Promise<Podcast[]> {
  try {
    // const podcasts: ApiPodcast = await fetch(`${APIURL}/us/rss/toppodcasts/limit=100/genre=1310/json`).then((data) => data.json());
    // const podcasts: ApiPodcast = podcasts;
    const finalPodcast = podcasts.feed.entry.map((entry) => {
      return podcastFactory(entry);
    })
    console.log(finalPodcast);
    return finalPodcast;
  } catch (error) {
    console.error(error);
    return [];
  }
}