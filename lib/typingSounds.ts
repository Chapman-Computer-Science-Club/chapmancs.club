import { useSyncExternalStore } from "react";

const CLIPS = [1, 2, 3, 4, 5].map((n) => `/sounds/typing${n}.wav`);

let downloads: Promise<ArrayBuffer[]> | undefined;
let ctx: AudioContext | undefined;
let decoded: Promise<AudioBuffer[]> | undefined;
let last = -1;

let muted: boolean | undefined;
const listeners = new Set<() => void>();

function isMuted() {
  if (muted === undefined) {
    try {
      muted = localStorage.getItem("sound") === "off";
    } catch {
      muted = false;
    }
  }
  return muted;
}

export function toggleMuted() {
  muted = !isMuted();
  try {
    localStorage.setItem("sound", muted ? "off" : "on");
  } catch {}
  listeners.forEach((l) => l());
  playTypingSound();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMuted() {
  return useSyncExternalStore(subscribe, isMuted, () => false);
}

// Don't start sounds until first tap
export function preloadTypingSounds() {
  downloads ??= Promise.all(CLIPS.map((src) => fetch(src).then((r) => r.arrayBuffer())));
}

// Random clip, never the same twice in a row. Silent until the visitor has pressed a key or tapped.
export async function playTypingSound() {
  if (isMuted()) return;
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  try {
    preloadTypingSounds();
    ctx ??= new AudioContext();
    const audio = ctx;
    decoded ??= downloads!.then((bufs) => Promise.all(bufs.map((b) => audio.decodeAudioData(b))));
    const clips = await decoded;
    if (audio.state === "suspended") await audio.resume();

    let i = Math.floor(Math.random() * (last < 0 ? clips.length : clips.length - 1));
    if (last >= 0 && i >= last) i++;
    last = i;

    const source = audio.createBufferSource();
    source.buffer = clips[i];
    source.playbackRate.value = 0.95 + Math.random() * 0.1;
    source.connect(audio.destination);
    source.start();
  } catch {}
}
