import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

export function useInitialMedia(query: string) {
  return useSyncExternalStore(
    noSubscribe,
    () => matchMedia(query).matches,
    () => false
  );
}
