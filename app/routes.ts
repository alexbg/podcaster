import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route('detail/:podcastId', 'routes/detail.tsx'),
  route('detail/:podcastId/episode/:episodeId', 'routes/media.tsx')
] satisfies RouteConfig;