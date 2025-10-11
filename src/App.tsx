import { Suspense, use, useEffect, useState } from 'react';
import './App.css';
import managePodcast from '../app/database/manager/podcast';
import db from '../app/database/db';
import episodeManager from '../app/database/manager/episode';
import useCheck from '../app/hooks/useCheck';
import useLoadData from '../app/hooks/useLoadData';
import { podcastsApi } from '../app/api/api';


const instancePromise = new Promise<string>((resolve): void => {
        setTimeout(() => {
          console.log("HA TERMINADO");
          resolve('ESTA ES LA PATATA');
        }, 4000);
      });

function Prueba() {
  const data = useLoadData<string>(100);
  // let data = undefined;
  // if (p) {
  //   data = use(p);
  // }
  // useCheck();
  console.log(data);
  return <>SE HA CARGADO TODO</>
}
function App() {
  const [num,setNum] = useState<number>(0)
  console.log('APP');

  useEffect(() => {
    podcastsApi();
  }, [])

  // useEffect(() => {
  //   console.log('START USEEFFECT');
  //   managePodcaster.addPodcaster({
  //     podcasterId: 100,
  //     title: 'Patata',
  //     description: 'Esta es la descripcion',
  //     smallImage: 'url small image',
  //     largeImage: 'url large image'
  //   });
    
  //   episodeManager.bulkAddEpisodes([{
  //     episodeId: 200,
  //     podcasterId: 100,
  //     duration: '10:00',
  //     title: 'Episode OF Patata',
  //     description: 'Episode description'
  //   },
  //   {
  //     episodeId: 201,
  //     podcasterId: 100,
  //     duration: '11:00',
  //     title: 'Episode OF Patata 2',
  //     description: 'Episode description 2'
  //   },
  //   {
  //     episodeId: 202,
  //     podcasterId: 100,
  //     duration: '11:00',
  //     title: 'Episode OF Patata 3',
  //     description: 'Episode description 3'
  //   }
  //   ])
  // }, []);


  // db.podcaster.get(100).then((value) => {
  //   console.log('podcaster:', value);
  //   if (value) {
  //     db.episode.where('podcasterId').equals(value.podcasterId).toArray().then((episodes) => {
  //       console.log('episodes', episodes);
  //     })
  //   }
  // })


  return (
    <>
      <button onClick={() => {setNum((oldValue: number) => oldValue + 1)}}>MORE</button>
      NUMERO: {num}
      <Suspense fallback={<>LOADING...</>}>
        <Prueba/>
      </Suspense>
    </>
  )
}

export default App
