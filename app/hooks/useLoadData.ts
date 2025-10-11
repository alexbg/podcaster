import cachePromise from "../cache/cachePromise";
import { useMemo } from "react";

interface Config<T> {
  key: string,
  fetchMethod: () => Promise<T>,
  staleTime?: Date
}

export default function useLoadData<T>({key, fetchMethod, staleTime}: Config<T>) {
  if (!staleTime) {
    staleTime = new Date();
    staleTime.setDate(staleTime.getDate() + 10);
    console.log(staleTime);
  }

  return cachePromise.loadOrCreate(key, fetchMethod, staleTime).promise

  // return resource;
}