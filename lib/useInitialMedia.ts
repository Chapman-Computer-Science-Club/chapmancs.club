import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

export function useInitial(read: () => boolean) {
  return useSyncExternalStore(noSubscribe, read, () => false);
}

export function useInitialMedia(query: string) {
  return useInitial(() => matchMedia(query).matches);
}
