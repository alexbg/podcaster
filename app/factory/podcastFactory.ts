import type { Entry } from "~/api/apiInterfaces";
import type { Podcast } from "./factoryInterface";

export function podcastFactory(apiPodcast: Entry): Podcast {
  return {
    title: apiPodcast.title.label,
    author: apiPodcast['im:artist'].label,
    summary: apiPodcast.summary.label,
    smallImage: apiPodcast['im:image'][0].label,
    image: apiPodcast['im:image'][2].label,
    id: apiPodcast.id.attributes['im:id']
  }
}