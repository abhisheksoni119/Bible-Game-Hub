export interface BestRecord {
  time: number;
  moves?: number;
}

function read(key: string): Record<string, BestRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function write(key: string, data: Record<string, BestRecord>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function getBest(key: string, slot: string): BestRecord | null {
  const data = read(key);
  return data[slot] ?? null;
}

export interface SaveBestResult {
  newBestTime: boolean;
  newBestMoves: boolean;
  previous: BestRecord | null;
  current: BestRecord;
}

export function saveBest(
  key: string,
  slot: string,
  record: BestRecord
): SaveBestResult {
  const data = read(key);
  const previous = data[slot] ?? null;
  const newBestTime = !previous || record.time < previous.time;
  const newBestMoves =
    record.moves !== undefined &&
    (!previous || previous.moves === undefined || record.moves < previous.moves);

  const merged: BestRecord = {
    time: previous ? Math.min(previous.time, record.time) : record.time,
  };
  if (record.moves !== undefined || previous?.moves !== undefined) {
    const candidates = [previous?.moves, record.moves].filter(
      (m): m is number => typeof m === "number"
    );
    merged.moves = candidates.length ? Math.min(...candidates) : undefined;
  }

  data[slot] = merged;
  write(key, data);
  return { newBestTime, newBestMoves, previous, current: merged };
}

export function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const BEST_KEYS = {
  tiles: "bibleGames.bests.tiles",
  jigsaw: "bibleGames.bests.jigsaw",
} as const;
