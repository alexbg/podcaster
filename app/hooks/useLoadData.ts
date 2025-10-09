import cachePromise from "../cache/cachePromise";
import { useMemo } from "react";

interface Config<T> {
  key: string,
  fetchMethod: () => Promise<T>,
  staleTime?: Date
}

export default function useLoadData<T>({key, fetchMethod, staleTime}: Config<T>) {
  const resource = useMemo(() => {
    console.log('NO ESTA GUARDADO');
    if (!key || !fetchMethod) {
      console.error('Require key and method in useLoadData');
      return Promise.resolve([]);
    }
    if (!staleTime) {
      staleTime = new Date();
      staleTime.setDate(staleTime.getDate() + 10);
      console.log(staleTime);
    }
    return cachePromise.loadOrCreate<T>(key, fetchMethod, staleTime)

  }, [key]);
  

  return resource;
}