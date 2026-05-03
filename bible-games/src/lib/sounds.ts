import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "bible-games:sound-enabled";

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

interface ToneSpec {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
  sweepTo?: number;
}

function playTones(tones: ToneSpec[]) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  for (const t of tones) {
    const start = now + (t.delay ?? 0);
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = t.type ?? "sine";
    osc.frequency.setValueAtTime(t.freq, start);
    if (t.sweepTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, t.sweepTo), start + t.duration);
    }
    const peak = t.gain ?? 0.15;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + t.duration);
    osc.connect(g).connect(ac.destination);
    osc.start(start);
    osc.stop(start + t.duration + 0.02);
  }
}

export type SoundName = "match" | "mismatch" | "snap" | "win";

const PRESETS: Record<SoundName, ToneSpec[]> = {
  match: [
    { freq: 660, duration: 0.12, type: "triangle", gain: 0.18 },
    { freq: 880, duration: 0.18, type: "triangle", gain: 0.18, delay: 0.08 },
  ],
  mismatch: [
    { freq: 220, duration: 0.18, type: "sawtooth", gain: 0.12, sweepTo: 110 },
  ],
  snap: [
    { freq: 520, duration: 0.08, type: "square", gain: 0.1 },
    { freq: 780, duration: 0.1, type: "triangle", gain: 0.12, delay: 0.04 },
  ],
  win: [
    { freq: 523.25, duration: 0.18, type: "triangle", gain: 0.2 },
    { freq: 659.25, duration: 0.18, type: "triangle", gain: 0.2, delay: 0.14 },
    { freq: 783.99, duration: 0.22, type: "triangle", gain: 0.2, delay: 0.28 },
    { freq: 1046.5, duration: 0.36, type: "triangle", gain: 0.22, delay: 0.46 },
  ],
};

function readEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeEnabled(v: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function useSound() {
  const [enabled, setEnabled] = useState<boolean>(() => readEnabled());

  useEffect(() => {
    writeEnabled(enabled);
  }, [enabled]);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      playTones(PRESETS[name]);
    },
    [enabled]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        // prime audio context on user gesture
        getCtx();
      }
      return next;
    });
  }, []);

  return { enabled, toggle, play };
}
