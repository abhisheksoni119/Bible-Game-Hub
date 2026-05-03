import { useState, useEffect, useRef, useMemo, useCallback, cloneElement } from "react";
import { Helmet } from "react-helmet-async";
import { Puzzle, RotateCcw, Trophy, Eye, EyeOff, Shuffle, Image as ImageIcon, Timer as TimerIcon, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";
import { bibleScenes, type BibleScene } from "@/lib/bible-scenes";
import { BEST_KEYS, formatTime, getBest, saveBest, type BestRecord } from "@/lib/local-bests";
import { useSound } from "@/lib/sounds";

type Difficulty = 12 | 24 | 48 | 96;
const DIFFS: { value: Difficulty; rows: number; cols: number; label: string }[] = [
  { value: 12, rows: 3, cols: 4, label: "Easy (12)" },
  { value: 24, rows: 4, cols: 6, label: "Medium (24)" },
  { value: 48, rows: 6, cols: 8, label: "Hard (48)" },
  { value: 96, rows: 8, cols: 12, label: "Expert (96)" },
];

interface Piece {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
  placed: boolean;
}

const BOARD_W = 480;
const BOARD_H = 320;
const SNAP_THRESHOLD = 22;

// Deterministic seeded RNG so puzzle edges stay stable across re-renders for a given scene + difficulty.
function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function hashSeed(sceneId: string, diff: number) {
  let h = 2166136261 >>> 0;
  const str = `${sceneId}:${diff}`;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

interface EdgeMap {
  // For each piece (r,c): top, right, bottom, left edge value: +1 tab outward, -1 blank inward, 0 flat (border)
  edges: { top: number; right: number; bottom: number; left: number }[][];
}

function buildEdges(rows: number, cols: number, seed: number): EdgeMap {
  const rand = seededRng(seed);
  // Horizontal seams: hSeam[r][c] for r in 0..rows-2 — value applies to upper piece's bottom edge.
  const hSeam: number[][] = [];
  for (let r = 0; r < rows - 1; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) row.push(rand() < 0.5 ? -1 : 1);
    hSeam.push(row);
  }
  // Vertical seams: vSeam[r][c] for c in 0..cols-2 — value applies to left piece's right edge.
  const vSeam: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols - 1; c++) row.push(rand() < 0.5 ? -1 : 1);
    vSeam.push(row);
  }
  const edges: EdgeMap["edges"] = [];
  for (let r = 0; r < rows; r++) {
    const row: EdgeMap["edges"][number] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        top: r === 0 ? 0 : -hSeam[r - 1][c],
        bottom: r === rows - 1 ? 0 : hSeam[r][c],
        left: c === 0 ? 0 : -vSeam[r][c - 1],
        right: c === cols - 1 ? 0 : vSeam[r][c],
      });
    }
    edges.push(row);
  }
  return { edges };
}

function piecePath(
  pw: number,
  ph: number,
  tab: number,
  e: { top: number; right: number; bottom: number; left: number }
): string {
  // Piece's flat rectangle sits at (tab, tab) within a (pw + 2*tab) x (ph + 2*tab) box.
  const x0 = tab;
  const y0 = tab;
  const x1 = tab + pw;
  const y1 = tab + ph;
  const out: string[] = [];
  out.push(`M ${x0} ${y0}`);

  // TOP edge: left -> right, outward = -y
  if (e.top === 0) {
    out.push(`L ${x1} ${y0}`);
  } else {
    const mid = (x0 + x1) / 2;
    const half = tab * 0.55;
    const peak = y0 - e.top * tab;
    out.push(`L ${mid - half} ${y0}`);
    out.push(`C ${mid - tab} ${peak} ${mid + tab} ${peak} ${mid + half} ${y0}`);
    out.push(`L ${x1} ${y0}`);
  }

  // RIGHT edge: top -> bottom, outward = +x
  if (e.right === 0) {
    out.push(`L ${x1} ${y1}`);
  } else {
    const mid = (y0 + y1) / 2;
    const half = tab * 0.55;
    const peak = x1 + e.right * tab;
    out.push(`L ${x1} ${mid - half}`);
    out.push(`C ${peak} ${mid - tab} ${peak} ${mid + tab} ${x1} ${mid + half}`);
    out.push(`L ${x1} ${y1}`);
  }

  // BOTTOM edge: right -> left, outward = +y
  if (e.bottom === 0) {
    out.push(`L ${x0} ${y1}`);
  } else {
    const mid = (x0 + x1) / 2;
    const half = tab * 0.55;
    const peak = y1 + e.bottom * tab;
    out.push(`L ${mid + half} ${y1}`);
    out.push(`C ${mid + tab} ${peak} ${mid - tab} ${peak} ${mid - half} ${y1}`);
    out.push(`L ${x0} ${y1}`);
  }

  // LEFT edge: bottom -> top, outward = -x
  if (e.left === 0) {
    out.push(`L ${x0} ${y0}`);
  } else {
    const mid = (y0 + y1) / 2;
    const half = tab * 0.55;
    const peak = x0 - e.left * tab;
    out.push(`L ${x0} ${mid + half}`);
    out.push(`C ${peak} ${mid + tab} ${peak} ${mid - tab} ${x0} ${mid - half}`);
    out.push(`L ${x0} ${y0}`);
  }

  out.push("Z");
  return out.join(" ");
}

const jigsawFaqs = [
  {
    q: "How do I move pieces?",
    a: "Click or tap and drag a puzzle piece. Drop it near its correct position on the board and it will snap into place and lock.",
  },
  {
    q: "Can I see what the finished image looks like?",
    a: "Yes — toggle the preview button at any time to see a faded version of the completed scene on the board to guide you.",
  },
  {
    q: "What do the difficulty levels mean?",
    a: "Easy = 12 pieces, Medium = 24, Hard = 48, Expert = 96. The image stays the same — only the number of pieces changes.",
  },
  {
    q: "Does it work on touchscreens?",
    a: "Yes, the puzzle works with mouse, trackpad, or touch on phones and tablets.",
  },
];

export default function BibleJigsawPuzzle() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(12);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [showPreview, setShowPreview] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [drag, setDrag] = useState<{ id: number; offX: number; offY: number; pointerId: number } | null>(null);
  const [best, setBest] = useState<BestRecord | null>(() => getBest(BEST_KEYS.jigsaw, `${bibleScenes[0].id}:12`));
  const [newBestTime, setNewBestTime] = useState(false);
  const { enabled: soundOn, toggle: toggleSound, play } = useSound();
  const winFiredRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scene = bibleScenes[sceneIdx];
  const bestSlot = `${scene.id}:${difficulty}`;

  const cfg = useMemo(() => DIFFS.find((d) => d.value === difficulty)!, [difficulty]);
  const pieceW = BOARD_W / cfg.cols;
  const pieceH = BOARD_H / cfg.rows;
  const tabSize = Math.min(pieceW, pieceH) * 0.22;

  const edgeMap = useMemo(
    () => buildEdges(cfg.rows, cfg.cols, hashSeed(scene.id, difficulty)),
    [cfg.rows, cfg.cols, scene.id, difficulty]
  );

  const piecePaths = useMemo(() => {
    const paths: string[][] = [];
    for (let r = 0; r < cfg.rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cfg.cols; c++) {
        row.push(piecePath(pieceW, pieceH, tabSize, edgeMap.edges[r][c]));
      }
      paths.push(row);
    }
    return paths;
  }, [cfg.rows, cfg.cols, pieceW, pieceH, tabSize, edgeMap]);

  const init = useCallback(
    (sIdx: number = sceneIdx, diff: Difficulty = difficulty) => {
      const config = DIFFS.find((d) => d.value === diff)!;
      const pw = BOARD_W / config.cols;
      const ph = BOARD_H / config.rows;
      const arr: Piece[] = [];
      let id = 0;
      for (let r = 0; r < config.rows; r++) {
        for (let c = 0; c < config.cols; c++) {
          // Random position in tray area (right side / below board)
          const trayWidth = 360;
          const trayStartX = BOARD_W + 40;
          arr.push({
            id: id++,
            row: r,
            col: c,
            x: trayStartX + Math.random() * (trayWidth - pw),
            y: 20 + Math.random() * (BOARD_H - ph),
            placed: false,
          });
        }
      }
      setPieces(arr);
      setSeconds(0);
      setRunning(false);
      setWon(false);
      setNewBestTime(false);
      setSceneIdx(sIdx);
      setDifficulty(diff);
      setBest(getBest(BEST_KEYS.jigsaw, `${bibleScenes[sIdx].id}:${diff}`));
    },
    [sceneIdx, difficulty]
  );

  useEffect(() => {
    init(sceneIdx, difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  useEffect(() => {
    if (pieces.length > 0 && pieces.every((p) => p.placed) && !won) {
      setWon(true);
      setRunning(false);
      const result = saveBest(BEST_KEYS.jigsaw, bestSlot, { time: seconds });
      setBest(result.current);
      setNewBestTime(result.newBestTime);
    }
  }, [pieces, won, bestSlot, seconds]);

  useEffect(() => {
    if (won && !winFiredRef.current) {
      winFiredRef.current = true;
      play("win");
      const fire = (originX: number) => {
        confetti({
          particleCount: 90,
          spread: 75,
          startVelocity: 45,
          origin: { x: originX, y: 0.6 },
          colors: ["#fbbf24", "#f59e0b", "#10b981", "#3b82f6", "#ec4899"],
        });
      };
      fire(0.25);
      setTimeout(() => fire(0.75), 200);
      setTimeout(() => fire(0.5), 400);
    }
    if (!won) winFiredRef.current = false;
  }, [won, play]);

  function shuffleTray() {
    setPieces((prev) =>
      prev.map((p) =>
        p.placed
          ? p
          : {
              ...p,
              x: BOARD_W + 40 + Math.random() * (360 - pieceW),
              y: 20 + Math.random() * (BOARD_H - pieceH),
            }
      )
    );
  }

  function getContainerPoint(e: React.PointerEvent | PointerEvent) {
    const rect = containerRef.current!.getBoundingClientRect();
    const scaleX = containerRef.current!.offsetWidth ? rect.width / containerRef.current!.offsetWidth : 1;
    return { x: (e.clientX - rect.left) / scaleX, y: (e.clientY - rect.top) / scaleX };
  }

  function onPointerDown(e: React.PointerEvent, piece: Piece) {
    if (piece.placed) return;
    if (!running) setRunning(true);
    const pt = getContainerPoint(e);
    setDrag({
      id: piece.id,
      offX: pt.x - piece.x,
      offY: pt.y - piece.y,
      pointerId: e.pointerId,
    });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    // bring to front
    setPieces((prev) => {
      const others = prev.filter((p) => p.id !== piece.id);
      const me = prev.find((p) => p.id === piece.id)!;
      return [...others, me];
    });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag) return;
    const pt = getContainerPoint(e);
    setPieces((prev) =>
      prev.map((p) => (p.id === drag.id ? { ...p, x: pt.x - drag.offX, y: pt.y - drag.offY } : p))
    );
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!drag) return;
    const piece = pieces.find((p) => p.id === drag.id);
    setDrag(null);
    if (!piece) return;
    const targetX = piece.col * pieceW;
    const targetY = piece.row * pieceH;
    const dx = piece.x - targetX;
    const dy = piece.y - targetY;
    if (Math.sqrt(dx * dx + dy * dy) < SNAP_THRESHOLD) {
      setPieces((prev) =>
        prev.map((p) => (p.id === piece.id ? { ...p, x: targetX, y: targetY, placed: true } : p))
      );
      play("snap");
    }
    // Pointer capture is released automatically by the browser on pointerup.
    void e;
  }

  const placedCount = pieces.filter((p) => p.placed).length;
  const containerHeight = Math.max(BOARD_H + 40, 380);
  const containerWidth = BOARD_W + 400;

  return (
    <>
      <Helmet>
        <title>Bible Jigsaw Puzzle – Free Drag & Drop Bible Scene Puzzles | Bible Games Online</title>
        <meta
          name="description"
          content="Assemble beautiful Bible scene jigsaw puzzles online — Noah's Ark, Garden of Eden, Nativity, Last Supper and more. Free, drag-and-drop, and works on phone, tablet and desktop."
        />
      </Helmet>

      <GameHero
        icon={<Puzzle className="w-6 h-6" />}
        title="Bible Jigsaw Puzzle"
        subtitle="Drag and drop the pieces to recreate beloved Bible scenes — from Noah's Ark to the Last Supper."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-5 md:p-7">
            {/* Scene picker */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">CHOOSE A SCENE</p>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {bibleScenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => init(idx, difficulty)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                      ${idx === sceneIdx ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"}`}
                    title={s.title}
                  >
                    <div className="w-24 h-16 relative bg-muted">
                      <SceneSvg scene={s} width={96} height={64} />
                    </div>
                    <p className="text-[10px] font-semibold px-1 py-1 text-center bg-card leading-tight">
                      {s.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground mr-1">PIECES:</span>
                {DIFFS.map((d) => (
                  <Button
                    key={d.value}
                    size="sm"
                    variant={difficulty === d.value ? "default" : "outline"}
                    onClick={() => init(sceneIdx, d.value)}
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="gap-1">
                  <TimerIcon className="w-3.5 h-3.5" />
                  {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                </Badge>
                <Badge className="bg-primary text-primary-foreground">
                  Placed: {placedCount}/{pieces.length}
                </Badge>
                {best && (
                  <Badge variant="outline" className="gap-1" title={`Best for ${scene.title} · ${difficulty} pieces`}>
                    <Trophy className="w-3.5 h-3.5" /> Best: {formatTime(best.time)}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <Button size="sm" variant="outline" onClick={() => setShowPreview((v) => !v)}>
                {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
              <Button size="sm" variant="outline" onClick={shuffleTray} disabled={won}>
                <Shuffle className="w-4 h-4 mr-1" /> Shuffle Tray
              </Button>
              <Button size="sm" variant="outline" onClick={() => init()}>
                <RotateCcw className="w-4 h-4 mr-1" /> Restart
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={toggleSound}
                aria-pressed={soundOn}
                title={soundOn ? "Mute sound" : "Unmute sound"}
              >
                {soundOn ? <Volume2 className="w-4 h-4 mr-1" /> : <VolumeX className="w-4 h-4 mr-1" />}
                {soundOn ? "Sound On" : "Sound Off"}
              </Button>
            </div>

            <AnimatePresence>
              {won && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-primary/30 bg-primary/10 p-5 text-center mb-5"
                >
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-bold text-xl mb-1">Puzzle Complete!</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {scene.title} assembled in {formatTime(seconds)}.
                  </p>
                  {newBestTime && (
                    <div className="flex justify-center mb-3">
                      <Badge className="bg-primary text-primary-foreground">New best time!</Badge>
                    </div>
                  )}
                  {best && !newBestTime && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Best for this scene at {difficulty} pieces: {formatTime(best.time)}
                    </p>
                  )}
                  <div className="max-w-sm mx-auto rounded-xl overflow-hidden border border-border mb-3">
                    <div className="w-full" style={{ aspectRatio: `${BOARD_W}/${BOARD_H}` }}>
                      <SceneSvg scene={scene} />
                    </div>
                  </div>
                  <blockquote className="italic text-foreground max-w-md mx-auto mb-1">
                    {scene.verse}
                  </blockquote>
                  <p className="text-primary font-semibold text-sm mb-4">— {scene.ref}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button onClick={() => init()}>Play Again</Button>
                    <Button
                      variant="outline"
                      onClick={() => init((sceneIdx + 1) % bibleScenes.length, difficulty)}
                    >
                      <ImageIcon className="w-4 h-4 mr-1" /> Try Another Scene
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Puzzle workspace */}
            <div className="overflow-auto no-select">
              <div
                ref={containerRef}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="relative mx-auto bg-muted/30 rounded-xl"
                style={{
                  width: containerWidth,
                  height: containerHeight,
                  minWidth: containerWidth,
                  touchAction: "none",
                }}
              >
                {/* Board outline */}
                <div
                  className="absolute rounded-lg border-2 border-dashed border-border bg-background overflow-hidden"
                  style={{ left: 0, top: 20, width: BOARD_W, height: BOARD_H }}
                >
                  {showPreview && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <SceneSvg scene={scene} />
                    </div>
                  )}
                  {/* Grid lines */}
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    width={BOARD_W}
                    height={BOARD_H}
                  >
                    {Array.from({ length: cfg.cols + 1 }, (_, i) => (
                      <line
                        key={`v${i}`}
                        x1={i * pieceW}
                        y1={0}
                        x2={i * pieceW}
                        y2={BOARD_H}
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    ))}
                    {Array.from({ length: cfg.rows + 1 }, (_, i) => (
                      <line
                        key={`h${i}`}
                        x1={0}
                        y1={i * pieceH}
                        x2={BOARD_W}
                        y2={i * pieceH}
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    ))}
                  </svg>
                </div>

                {/* Tray label */}
                <div
                  className="absolute text-xs font-semibold text-muted-foreground pointer-events-none"
                  style={{ left: BOARD_W + 40, top: 0 }}
                >
                  PIECES
                </div>

                {/* Pieces */}
                {pieces.map((p) => {
                  const path = piecePaths[p.row][p.col];
                  const boxW = pieceW + 2 * tabSize;
                  const boxH = pieceH + 2 * tabSize;
                  const isDragging = drag?.id === p.id;
                  // Drop-shadow filter follows the clip-path silhouette (unlike box-shadow).
                  const shadow = p.placed
                    ? "none"
                    : isDragging
                    ? "drop-shadow(0 6px 10px rgba(0,0,0,0.35))"
                    : "drop-shadow(0 2px 3px rgba(0,0,0,0.25))";
                  return (
                    <div
                      key={p.id}
                      onPointerDown={(e) => onPointerDown(e, p)}
                      className={`absolute ${p.placed ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
                      style={{
                        left: p.x - tabSize,
                        top: p.y - tabSize + (p.placed ? 20 : 0),
                        width: boxW,
                        height: boxH,
                        zIndex: p.placed ? 1 : isDragging ? 100 : 10,
                        filter: shadow,
                        transition: isDragging ? "none" : "filter 0.15s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          clipPath: `path('${path}')`,
                          WebkitClipPath: `path('${path}')`,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: tabSize - p.col * pieceW,
                            top: tabSize - p.row * pieceH,
                            width: BOARD_W,
                            height: BOARD_H,
                            pointerEvents: "none",
                          }}
                        >
                          <SceneSvg scene={scene} />
                        </div>
                      </div>
                      {/* Outline stroke that follows the puzzle silhouette */}
                      <svg
                        className="absolute inset-0 pointer-events-none"
                        width={boxW}
                        height={boxH}
                        viewBox={`0 0 ${boxW} ${boxH}`}
                      >
                        <path
                          d={path}
                          fill="none"
                          stroke={p.placed ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.45)"}
                          strokeWidth={p.placed ? 0.6 : 1}
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Drag pieces from the tray onto the board. Drop one near its correct slot and it locks into place.
            </p>
          </div>
        </div>
      </section>

      <ExploreMoreGames cards={exploreOthers("jigsaw", 4)} />

      <GameContent>
        <ContentBlock title="Beautiful Bible Scenes, Piece by Piece">
          <p>
            Bible Jigsaw Puzzle invites you to slow down and reassemble some of the most cherished moments in scripture — Creation and the Garden of Eden, Noah's Ark and the rainbow, Moses parting the Red Sea, David and Goliath, Daniel and the lions, the Nativity, the Last Supper, the empty tomb, Pentecost, and dozens more. Choose a scene, pick your difficulty, and let the pieces guide you back into the story.
          </p>
        </ContentBlock>
        <ContentBlock title="How to Play">
          <p>
            Over fifty biblical scenes are available, each rendered as a clean illustrated SVG so it stays crisp at any size. Pick a scene, choose how many pieces you want — 12 for a quick warm-up, 24 or 48 for a satisfying afternoon puzzle, or 96 for a real challenge — and start dragging pieces from the tray onto the board. When a piece is close enough to its correct position it snaps into place and locks.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Preview toggle</strong> shows a faded version of the finished scene as a guide.</li>
            <li><strong>Shuffle Tray</strong> rearranges loose pieces so you can find the one you need.</li>
            <li><strong>Restart</strong> deals a fresh puzzle from the same scene and difficulty.</li>
            <li>Works with mouse, trackpad and touch — no installation required.</li>
          </ul>
        </ContentBlock>
        <ContentBlock title="Why Jigsaw Puzzles Pair So Well With Scripture">
          <p>
            Jigsaw puzzles ask for a particular kind of attention — patient, visual, exploratory. That same attention is exactly what scripture rewards. By the time you've finished assembling the Last Supper or the Garden of Eden, you've spent meaningful minutes looking carefully at a moment from the Bible — its colors, its shapes, the people in it. The verse that appears at the end is something you've earned by sitting with the scene long enough to recreate it.
          </p>
        </ContentBlock>
      </GameContent>

      <FaqSection items={jigsawFaqs} />
    </>
  );
}

function SceneSvg({ scene, width, height }: { scene: BibleScene; width?: number; height?: number }) {
  return cloneElement(scene.svg, {
    width: width ?? "100%",
    height: height ?? "100%",
    style: { display: "block", width: width ?? "100%", height: height ?? "100%" },
  });
}
