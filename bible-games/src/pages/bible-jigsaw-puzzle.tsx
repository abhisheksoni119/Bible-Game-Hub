import { useState, useEffect, useRef, useMemo, useCallback, cloneElement } from "react";
import { Helmet } from "react-helmet-async";
import { Puzzle, RotateCcw, Trophy, Eye, EyeOff, Shuffle, Image as ImageIcon, Timer as TimerIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";
import { bibleScenes, type BibleScene } from "@/lib/bible-scenes";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const scene = bibleScenes[sceneIdx];

  const cfg = useMemo(() => DIFFS.find((d) => d.value === difficulty)!, [difficulty]);
  const pieceW = BOARD_W / cfg.cols;
  const pieceH = BOARD_H / cfg.rows;

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
      setSceneIdx(sIdx);
      setDifficulty(diff);
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
    if (pieces.length > 0 && pieces.every((p) => p.placed)) {
      setWon(true);
      setRunning(false);
    }
  }, [pieces]);

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
                  <p className="text-sm text-muted-foreground mb-3">
                    {scene.title} assembled in {Math.floor(seconds / 60)}:
                    {String(seconds % 60).padStart(2, "0")}.
                  </p>
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
                {pieces.map((p) => (
                  <div
                    key={p.id}
                    onPointerDown={(e) => onPointerDown(e, p)}
                    className={`absolute overflow-hidden ${p.placed ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
                    style={{
                      left: p.x + (p.placed ? 0 : 0),
                      top: p.y + (p.placed ? 20 : 0),
                      width: pieceW,
                      height: pieceH,
                      zIndex: p.placed ? 1 : drag?.id === p.id ? 100 : 10,
                      borderRadius: 2,
                      boxShadow: p.placed
                        ? "none"
                        : drag?.id === p.id
                        ? "0 8px 20px rgba(0,0,0,0.3)"
                        : "0 2px 6px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
                      outline: p.placed ? "none" : "1px solid rgba(0,0,0,0.15)",
                      transition: drag?.id === p.id ? "none" : "box-shadow 0.15s",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: -p.col * pieceW,
                        top: -p.row * pieceH,
                        width: BOARD_W,
                        height: BOARD_H,
                        pointerEvents: "none",
                      }}
                    >
                      <SceneSvg scene={scene} />
                    </div>
                  </div>
                ))}
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
