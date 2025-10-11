import { Suspense, use } from "react";
import { NavLink } from "react-router";
import { podcastsApi } from "~/api/api";
import type { Podcast } from "~/factory/factoryInterface";
import useLoadData from "~/hooks/useLoadData";

// export async function clientLoader({
//   params,
// }: Route.ClientLoaderArgs) {
//   // const patata = await podcastsApi();
//   return '';
// }

function Patata() {
  const prueba = useLoadData<Podcast[]>({key: 'podcasts', fetchMethod: podcastsApi});
  if (prueba) {
    const patata = use(prueba);
    console.log(patata);
  }
  return <div>Cargado</div>
}


export default function Index() {

  return (
    <>
      <NavLink to={'/detail/10'}>Patata</NavLink>
      <Suspense fallback={<>LOADING...</>}>
        <Patata />
      </Suspense>
    </>
  )
}