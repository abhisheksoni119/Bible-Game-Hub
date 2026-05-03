import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Layers, RotateCcw, Trophy, Lightbulb, Shuffle, Undo2, Timer as TimerIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";
import { BEST_KEYS, formatTime, getBest, saveBest, type BestRecord } from "@/lib/local-bests";

type Difficulty = "easy" | "medium" | "hard";

const SYMBOLS = [
  "🕊️", "🦁", "🐑", "🐟", "🐍", "🐪", "✝️", "⛵", "📜",
  "👑", "🌟", "🍞", "🍇", "🌿", "⛰️", "🔥", "💧", "🌈",
  "🛡️", "🗝️", "🍎", "🐝", "🌊", "🏺", "🪨", "🌳", "🐂",
  "📖", "🕯️", "⚓", "🌙", "☀️", "🪶", "🎺",
];

interface Tile {
  id: number;
  x: number;
  y: number;
  layer: number;
  symbol: string;
  removed: boolean;
}

interface LayerSpec {
  rows: number;
  cols: number;
  offsetX: number;
  offsetY: number;
}

const LAYOUTS: Record<Difficulty, { tilePx: number; layers: LayerSpec[] }> = {
  // Easy: 48 base + 24 top = 72 tiles. Top layer covers center, exposing edges + the top layer perimeter.
  easy: {
    tilePx: 52,
    layers: [
      { rows: 6, cols: 8, offsetX: 0, offsetY: 0 },
      { rows: 4, cols: 6, offsetX: 1, offsetY: 1 },
    ],
  },
  // Medium: 80 base + 24 mid = 104 tiles
  medium: {
    tilePx: 46,
    layers: [
      { rows: 8, cols: 10, offsetX: 0, offsetY: 0 },
      { rows: 4, cols: 6, offsetX: 2, offsetY: 2 },
    ],
  },
  // Hard: 96 base + 48 top = 144 tiles (classic turtle proportions)
  hard: {
    tilePx: 42,
    layers: [
      { rows: 8, cols: 12, offsetX: 0, offsetY: 0 },
      { rows: 6, cols: 8, offsetX: 2, offsetY: 1 },
    ],
  },
};

function buildTiles(diff: Difficulty): Tile[] {
  const layout = LAYOUTS[diff];
  const positions: Omit<Tile, "id" | "symbol" | "removed">[] = [];
  layout.layers.forEach((spec, layer) => {
    for (let r = 0; r < spec.rows; r++) {
      for (let c = 0; c < spec.cols; c++) {
        positions.push({ x: spec.offsetX + c, y: spec.offsetY + r, layer });
      }
    }
  });
  // Ensure even count
  if (positions.length % 2 === 1) positions.pop();
  // Build symbol pool (each appears in pairs)
  const need = positions.length / 2;
  const pool: string[] = [];
  for (let i = 0; i < need; i++) pool.push(SYMBOLS[i % SYMBOLS.length]);
  const all = [...pool, ...pool].sort(() => Math.random() - 0.5);
  return positions.map((p, i) => ({ ...p, id: i, symbol: all[i], removed: false }));
}

function isFree(tile: Tile, tiles: Tile[]): boolean {
  if (tile.removed) return false;
  const blockedAbove = tiles.some(
    (t) => !t.removed && t.layer === tile.layer + 1 && t.x === tile.x && t.y === tile.y
  );
  if (blockedAbove) return false;
  const left = tiles.some(
    (t) => !t.removed && t.layer === tile.layer && t.y === tile.y && t.x === tile.x - 1
  );
  const right = tiles.some(
    (t) => !t.removed && t.layer === tile.layer && t.y === tile.y && t.x === tile.x + 1
  );
  return !(left && right);
}

const WIN_VERSE = {
  text: '"I have fought the good fight, I have finished the race, I have kept the faith."',
  ref: "— 2 Timothy 4:7",
};

const tileFaqs = [
  {
    q: "How do I play Bible Tiles?",
    a: "Find and remove pairs of matching free tiles. A tile is 'free' when nothing sits on top of it and at least one of its left or right edges is open.",
  },
  {
    q: "What does the hint button do?",
    a: "Hint highlights one valid pair of free, matching tiles you can remove right now. Use it when you're stuck.",
  },
  {
    q: "What if no moves are left?",
    a: "Use Shuffle to randomly redistribute the remaining symbols across the unremoved tile positions, opening up fresh matches.",
  },
  {
    q: "Is there a time limit?",
    a: "No — play at your own pace. The timer is just for fun and personal best tracking.",
  },
];

export default function BibleTiles() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles("easy"));
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<Tile[][]>([]);
  const [hint, setHint] = useState<[number, number] | null>(null);
  const [won, setWon] = useState(false);
  const [best, setBest] = useState<BestRecord | null>(() => getBest(BEST_KEYS.tiles, "easy"));
  const [newBestTime, setNewBestTime] = useState(false);
  const [newBestMoves, setNewBestMoves] = useState(false);

  const layout = LAYOUTS[difficulty];

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  useEffect(() => {
    if (tiles.length > 0 && tiles.every((t) => t.removed) && !won) {
      setWon(true);
      setRunning(false);
      const result = saveBest(BEST_KEYS.tiles, difficulty, { time: seconds, moves });
      setBest(result.current);
      setNewBestTime(result.newBestTime);
      setNewBestMoves(result.newBestMoves);
    }
  }, [tiles, won, difficulty, seconds, moves]);

  function snapshot() {
    setHistory((h) => [...h.slice(-19), tiles.map((t) => ({ ...t }))]);
  }

  function pick(i: number) {
    if (won) return;
    const tile = tiles[i];
    if (!isFree(tile, tiles)) return;
    if (!running) setRunning(true);
    setHint(null);

    if (selected === null) {
      setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
    const a = tiles[selected];
    snapshot();
    setMoves((m) => m + 1);
    if (a.symbol === tile.symbol) {
      setTiles((prev) =>
        prev.map((t, j) => (j === i || j === selected ? { ...t, removed: true } : t))
      );
    }
    setSelected(null);
  }

  function reset(diff: Difficulty = difficulty) {
    setDifficulty(diff);
    setTiles(buildTiles(diff));
    setSelected(null);
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setHistory([]);
    setHint(null);
    setWon(false);
    setNewBestTime(false);
    setNewBestMoves(false);
    setBest(getBest(BEST_KEYS.tiles, diff));
  }

  function undo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setTiles(last);
    setSelected(null);
  }

  function findHint(): [number, number] | null {
    const free = tiles
      .map((t, i) => ({ t, i }))
      .filter(({ t }) => !t.removed && isFree(t, tiles));
    for (let a = 0; a < free.length; a++) {
      for (let b = a + 1; b < free.length; b++) {
        if (free[a].t.symbol === free[b].t.symbol) return [free[a].i, free[b].i];
      }
    }
    return null;
  }

  function showHint() {
    const h = findHint();
    if (h) setHint(h);
  }

  function shuffle() {
    snapshot();
    const remaining = tiles.filter((t) => !t.removed);
    const symbols = remaining.map((t) => t.symbol).sort(() => Math.random() - 0.5);
    let idx = 0;
    setTiles((prev) =>
      prev.map((t) => (t.removed ? t : { ...t, symbol: symbols[idx++] }))
    );
    setSelected(null);
    setHint(null);
  }

  // compute board size
  const { width, height } = useMemo(() => {
    let maxX = 0, maxY = 0;
    for (const spec of layout.layers) {
      maxX = Math.max(maxX, spec.offsetX + spec.cols);
      maxY = Math.max(maxY, spec.offsetY + spec.rows);
    }
    return { width: maxX * layout.tilePx, height: maxY * layout.tilePx };
  }, [layout]);

  const remaining = tiles.filter((t) => !t.removed).length;

  return (
    <>
      <Helmet>
        <title>Bible Tiles – Free Mahjong-Style Bible Matching Game | Bible Games Online</title>
        <meta
          name="description"
          content="Play Bible Tiles, a free Mahjong-style matching game with Bible-themed icons. Match pairs of free tiles across multiple layers — easy, medium and hard layouts."
        />
      </Helmet>

      <GameHero
        icon={<Layers className="w-6 h-6" />}
        title="Bible Tiles"
        subtitle="A peaceful Mahjong-style matching game with Bible icons. Remove pairs of free tiles to clear the board."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-5 md:p-7">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground mr-1">DIFFICULTY:</span>
                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                  <Button
                    key={d}
                    size="sm"
                    variant={difficulty === d ? "default" : "outline"}
                    onClick={() => reset(d)}
                    className="capitalize"
                  >
                    {d}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="gap-1">
                  <TimerIcon className="w-3.5 h-3.5" />
                  {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                </Badge>
                <Badge variant="secondary">Moves: {moves}</Badge>
                <Badge className="bg-primary text-primary-foreground">
                  Tiles: {remaining}/{tiles.length}
                </Badge>
                {best && (
                  <Badge variant="outline" className="gap-1" title={best.moves !== undefined ? `Best: ${formatTime(best.time)} · ${best.moves} moves` : `Best: ${formatTime(best.time)}`}>
                    <Trophy className="w-3.5 h-3.5" /> Best: {formatTime(best.time)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-5">
              <Button size="sm" variant="outline" onClick={showHint} disabled={won}>
                <Lightbulb className="w-4 h-4 mr-1" /> Hint
              </Button>
              <Button size="sm" variant="outline" onClick={shuffle} disabled={won || remaining === 0}>
                <Shuffle className="w-4 h-4 mr-1" /> Shuffle
              </Button>
              <Button size="sm" variant="outline" onClick={undo} disabled={history.length === 0}>
                <Undo2 className="w-4 h-4 mr-1" /> Undo
              </Button>
              <Button size="sm" variant="outline" onClick={() => reset()}>
                <RotateCcw className="w-4 h-4 mr-1" /> Restart
              </Button>
            </div>

            {/* Win banner */}
            <AnimatePresence>
              {won && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-primary/30 bg-primary/10 p-5 text-center mb-5"
                >
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-bold text-xl mb-1">You Cleared the Board!</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Finished in {moves} moves and {formatTime(seconds)}.
                  </p>
                  {(newBestTime || newBestMoves) && (
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {newBestTime && (
                        <Badge className="bg-primary text-primary-foreground">New best time!</Badge>
                      )}
                      {newBestMoves && (
                        <Badge className="bg-primary text-primary-foreground">Fewest moves!</Badge>
                      )}
                    </div>
                  )}
                  {best && !newBestTime && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Best on {difficulty}: {formatTime(best.time)}
                      {best.moves !== undefined ? ` · ${best.moves} moves` : ""}
                    </p>
                  )}
                  <blockquote className="italic text-foreground max-w-md mx-auto mb-1">
                    {WIN_VERSE.text}
                  </blockquote>
                  <p className="text-primary font-semibold text-sm mb-4">{WIN_VERSE.ref}</p>
                  <Button onClick={() => reset()}>Play Again</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Board */}
            <div className="overflow-auto no-select rounded-2xl p-4 md:p-6"
              style={{
                background:
                  "radial-gradient(ellipse at center, #064e3b 0%, #022c22 100%)",
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.45)",
              }}
            >
              <div
                className="relative mx-auto"
                style={{ width: width + 16, height: height + 16, minWidth: width + 16 }}
              >
                {tiles.map((tile, i) => {
                  if (tile.removed) return null;
                  const free = isFree(tile, tiles);
                  const isSelected = selected === i;
                  const isHinted = hint && (hint[0] === i || hint[1] === i);
                  return (
                    <motion.button
                      key={tile.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => pick(i)}
                      className={`absolute rounded-md flex items-center justify-center font-bold transition-colors
                        ${free ? "cursor-pointer" : "cursor-not-allowed"}
                      `}
                      style={{
                        width: layout.tilePx - 4,
                        height: layout.tilePx - 4,
                        left: tile.x * layout.tilePx + tile.layer * 4 + 8,
                        top: tile.y * layout.tilePx - tile.layer * 4 + 8,
                        zIndex: tile.layer * 100 + tile.y * 2 + 1,
                        fontSize: Math.floor(layout.tilePx * 0.55),
                        background: isSelected
                          ? "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)"
                          : isHinted
                          ? "linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)"
                          : free
                          ? "linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)"
                          : "linear-gradient(180deg, #d6d3d1 0%, #a8a29e 100%)",
                        color: isSelected ? "#fff" : free ? "#1c1917" : "#44403c",
                        opacity: free ? 1 : 0.55,
                        boxShadow: isSelected
                          ? "0 0 0 3px #fbbf24, 0 0 18px rgba(251,191,36,0.6), inset 0 -3px 0 rgba(0,0,0,0.2)"
                          : isHinted
                          ? "0 0 0 3px #fbbf24, 0 0 14px rgba(251,191,36,0.5), inset 0 -3px 0 rgba(0,0,0,0.1)"
                          : free
                          ? "inset 0 -4px 0 rgba(180,140,40,0.45), inset 0 1px 0 rgba(255,255,255,0.9), 0 3px 6px rgba(0,0,0,0.4), 0 0 0 1px rgba(120,80,20,0.5)"
                          : "inset 0 -2px 0 rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3), 0 0 0 1px rgba(80,80,80,0.5)",
                        textShadow: free ? "0 1px 0 rgba(255,255,255,0.4)" : "none",
                      }}
                    >
                      <span className="leading-none">{tile.symbol}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Tap two matching free tiles to remove them. A tile is free when nothing covers it and at least one side (left or right) is open.
            </p>
          </div>
        </div>
      </section>

      <ExploreMoreGames cards={exploreOthers("tiles", 4)} />

      <GameContent>
        <ContentBlock title="A Calming Bible Matching Game">
          <p>
            Bible Tiles takes the timeless mechanics of Mahjong solitaire and wraps them in scripture-themed icons — doves, lambs, scrolls, lions, crowns, and more. Find pairs of identical free tiles and remove them until the entire board is clear. It's a meditative, relaxing puzzle that pairs nicely with quiet study or evening unwinding.
          </p>
        </ContentBlock>
        <ContentBlock title="How the Game Works">
          <p>
            Tiles are stacked in layers. A tile is considered <strong>free</strong> only when no tile sits directly on top of it and at least one of its left or right edges is open. When two free tiles share the same symbol, you can match them and remove both. The board grows from a 72-tile flat layout on Easy to a classic 144-tile, two-layer arrangement on Hard.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Hint</strong> highlights a valid pair you can play right now.</li>
            <li><strong>Shuffle</strong> redistributes the remaining symbols when you're stuck.</li>
            <li><strong>Undo</strong> rolls back your last action.</li>
            <li><strong>Restart</strong> deals a fresh board at the current difficulty.</li>
          </ul>
        </ContentBlock>
        <ContentBlock title="Why Tile Games Help You Focus">
          <p>
            Matching games gently exercise visual scanning, short-term memory, and patient observation — the same mental muscles that serve you well in scripture study. Playing a few rounds of Bible Tiles before opening your Bible can be a calming way to settle your attention. Unlike timed quiz games, there's no pressure here; the goal is simply to clear the board, one quiet pair at a time.
          </p>
        </ContentBlock>
      </GameContent>

      <FaqSection items={tileFaqs} />
    </>
  );
}
