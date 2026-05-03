import { useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Puzzle, RotateCcw, Trophy, Shuffle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

type Scene = {
  title: string;
  verse: string;
  ref: string;
  svg: string;
};

const noahSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='%23fbbf24'/><stop offset='0.5' stop-color='%2360a5fa'/><stop offset='1' stop-color='%231e3a8a'/>
    </linearGradient>
  </defs>
  <rect width='600' height='600' fill='url(%23sky)'/>
  <circle cx='480' cy='130' r='55' fill='%23fef3c7' opacity='0.9'/>
  <path d='M 50 200 Q 300 100 550 200 L 550 230 Q 300 130 50 230 Z' fill='%23ef4444'/>
  <path d='M 50 230 Q 300 130 550 230 L 550 260 Q 300 160 50 260 Z' fill='%23f59e0b'/>
  <path d='M 50 260 Q 300 160 550 260 L 550 290 Q 300 190 50 290 Z' fill='%23fde047'/>
  <path d='M 50 290 Q 300 190 550 290 L 550 320 Q 300 220 50 320 Z' fill='%2384cc16'/>
  <path d='M 50 320 Q 300 220 550 320 L 550 350 Q 300 250 50 350 Z' fill='%2306b6d4'/>
  <path d='M 50 350 Q 300 250 550 350 L 550 380 Q 300 280 50 380 Z' fill='%237c3aed'/>
  <path d='M 0 480 Q 100 460 200 480 T 400 480 T 600 480 L 600 600 L 0 600 Z' fill='%23075985'/>
  <path d='M 0 510 Q 100 490 200 510 T 400 510 T 600 510 L 600 600 L 0 600 Z' fill='%230369a1' opacity='0.7'/>
  <ellipse cx='300' cy='460' rx='160' ry='30' fill='%237c2d12'/>
  <rect x='180' y='400' width='240' height='70' rx='15' fill='%23a16207'/>
  <rect x='220' y='340' width='160' height='75' rx='8' fill='%23ca8a04'/>
  <rect x='250' y='360' width='30' height='35' fill='%23451a03'/>
  <rect x='320' y='360' width='30' height='35' fill='%23451a03'/>
  <polygon points='220,340 380,340 350,310 250,310' fill='%23dc2626'/>
  <circle cx='100' cy='100' r='12' fill='%23ffffff' opacity='0.6'/>
  <circle cx='150' cy='80' r='8' fill='%23ffffff' opacity='0.6'/>
  <circle cx='80' cy='160' r='6' fill='%23ffffff' opacity='0.6'/>
</svg>`;

const edenSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='edensky' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='%23fde68a'/><stop offset='1' stop-color='%2386efac'/>
    </linearGradient>
  </defs>
  <rect width='600' height='600' fill='url(%23edensky)'/>
  <circle cx='480' cy='110' r='65' fill='%23fbbf24'/>
  <circle cx='480' cy='110' r='90' fill='%23fde047' opacity='0.4'/>
  <path d='M 0 400 Q 200 380 400 410 T 600 400 L 600 600 L 0 600 Z' fill='%2316a34a'/>
  <path d='M 0 460 Q 200 440 400 470 T 600 460 L 600 600 L 0 600 Z' fill='%23166534'/>
  <path d='M 100 600 L 130 480 Q 130 460 150 460 L 180 460 Q 200 460 200 480 L 230 600 Z' fill='%23713f12'/>
  <ellipse cx='165' cy='400' rx='120' ry='100' fill='%2316a34a'/>
  <ellipse cx='110' cy='370' rx='70' ry='60' fill='%2322c55e'/>
  <ellipse cx='220' cy='370' rx='70' ry='60' fill='%2322c55e'/>
  <ellipse cx='165' cy='320' rx='80' ry='70' fill='%2384cc16'/>
  <circle cx='130' cy='380' r='10' fill='%23dc2626'/>
  <circle cx='200' cy='400' r='10' fill='%23dc2626'/>
  <circle cx='165' cy='340' r='10' fill='%23dc2626'/>
  <path d='M 380 600 L 400 500 Q 400 485 415 485 L 435 485 Q 450 485 450 500 L 470 600 Z' fill='%23713f12'/>
  <ellipse cx='425' cy='450' rx='90' ry='80' fill='%23166534'/>
  <ellipse cx='380' cy='430' rx='55' ry='50' fill='%2316a34a'/>
  <ellipse cx='470' cy='430' rx='55' ry='50' fill='%2316a34a'/>
  <path d='M 270 600 Q 280 500 290 480 L 310 480 Q 320 500 330 600 Z' fill='%2306b6d4' opacity='0.7'/>
</svg>`;

const nativitySvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <radialGradient id='night' cx='0.5' cy='0.3'><stop offset='0' stop-color='%23312e81'/><stop offset='1' stop-color='%230f172a'/></radialGradient>
    <radialGradient id='star' cx='0.5' cy='0.5'><stop offset='0' stop-color='%23fef9c3'/><stop offset='0.4' stop-color='%23fde047'/><stop offset='1' stop-color='%23ca8a04' stop-opacity='0'/></radialGradient>
  </defs>
  <rect width='600' height='600' fill='url(%23night)'/>
  <circle cx='300' cy='160' r='180' fill='url(%23star)' opacity='0.7'/>
  <path d='M 300 80 L 315 145 L 380 160 L 315 175 L 300 240 L 285 175 L 220 160 L 285 145 Z' fill='%23fef9c3'/>
  <path d='M 300 110 L 305 155 L 350 160 L 305 165 L 300 210 L 295 165 L 250 160 L 295 155 Z' fill='%23ffffff'/>
  <circle cx='100' cy='100' r='2' fill='%23ffffff'/>
  <circle cx='150' cy='200' r='1.5' fill='%23ffffff'/>
  <circle cx='480' cy='80' r='2' fill='%23ffffff'/>
  <circle cx='520' cy='180' r='1.5' fill='%23ffffff'/>
  <circle cx='80' cy='250' r='1.5' fill='%23ffffff'/>
  <circle cx='540' cy='280' r='2' fill='%23ffffff'/>
  <path d='M 0 500 Q 150 430 300 470 T 600 460 L 600 600 L 0 600 Z' fill='%23713f12'/>
  <path d='M 0 540 Q 200 500 400 530 T 600 520 L 600 600 L 0 600 Z' fill='%23451a03'/>
  <rect x='220' y='420' width='160' height='100' fill='%23ca8a04'/>
  <polygon points='220,420 380,420 300,360' fill='%23a16207'/>
  <rect x='270' y='460' width='60' height='40' rx='5' fill='%23fde047'/>
  <ellipse cx='300' cy='495' rx='25' ry='8' fill='%23fef3c7'/>
  <circle cx='300' cy='480' r='10' fill='%23fef3c7'/>
  <line x1='240' y1='420' x2='240' y2='520' stroke='%23713f12' stroke-width='3'/>
  <line x1='360' y1='420' x2='360' y2='520' stroke='%23713f12' stroke-width='3'/>
</svg>`;

const tombSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='dawn' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='%23fef3c7'/><stop offset='0.4' stop-color='%23fbbf24'/><stop offset='1' stop-color='%23dc2626'/>
    </linearGradient>
    <radialGradient id='sun' cx='0.5' cy='0.5'><stop offset='0' stop-color='%23ffffff'/><stop offset='0.5' stop-color='%23fef9c3'/><stop offset='1' stop-color='%23fbbf24' stop-opacity='0'/></radialGradient>
  </defs>
  <rect width='600' height='600' fill='url(%23dawn)'/>
  <circle cx='300' cy='250' r='200' fill='url(%23sun)'/>
  <circle cx='300' cy='250' r='70' fill='%23fef9c3'/>
  <g stroke='%23fef9c3' stroke-width='4' opacity='0.6'>
    <line x1='300' y1='100' x2='300' y2='150'/>
    <line x1='300' y1='350' x2='300' y2='400'/>
    <line x1='150' y1='250' x2='200' y2='250'/>
    <line x1='400' y1='250' x2='450' y2='250'/>
    <line x1='190' y1='140' x2='225' y2='175'/>
    <line x1='375' y1='325' x2='410' y2='360'/>
    <line x1='410' y1='140' x2='375' y2='175'/>
    <line x1='225' y1='325' x2='190' y2='360'/>
  </g>
  <path d='M 0 480 Q 150 410 350 440 T 600 430 L 600 600 L 0 600 Z' fill='%23713f12'/>
  <path d='M 0 540 Q 200 510 400 530 T 600 525 L 600 600 L 0 600 Z' fill='%23451a03'/>
  <ellipse cx='300' cy='480' rx='130' ry='40' fill='%23475569'/>
  <path d='M 220 440 Q 220 380 300 380 Q 380 380 380 440 L 380 480 L 220 480 Z' fill='%23334155'/>
  <path d='M 235 440 Q 235 395 300 395 Q 365 395 365 440 L 365 470 L 235 470 Z' fill='%231e293b'/>
  <ellipse cx='450' cy='470' rx='55' ry='50' fill='%23475569'/>
  <ellipse cx='450' cy='470' rx='40' ry='35' fill='%2364748b'/>
  <line x1='305' y1='200' x2='305' y2='280' stroke='%23713f12' stroke-width='6'/>
  <line x1='280' y1='225' x2='330' y2='225' stroke='%23713f12' stroke-width='6'/>
</svg>`;

const waterSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='nightsea' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='%231e3a8a'/><stop offset='0.5' stop-color='%233b82f6'/><stop offset='1' stop-color='%231e293b'/>
    </linearGradient>
  </defs>
  <rect width='600' height='600' fill='url(%23nightsea)'/>
  <circle cx='150' cy='130' r='50' fill='%23fef9c3'/>
  <circle cx='150' cy='130' r='75' fill='%23fef9c3' opacity='0.2'/>
  <circle cx='420' cy='90' r='2' fill='%23ffffff'/>
  <circle cx='480' cy='150' r='1.5' fill='%23ffffff'/>
  <circle cx='350' cy='110' r='1.5' fill='%23ffffff'/>
  <circle cx='520' cy='200' r='2' fill='%23ffffff'/>
  <path d='M 0 350 Q 100 330 200 350 T 400 350 T 600 350 L 600 600 L 0 600 Z' fill='%231e40af'/>
  <path d='M 0 400 Q 100 380 200 400 T 400 400 T 600 400 L 600 600 L 0 600 Z' fill='%232563eb' opacity='0.7'/>
  <path d='M 0 460 Q 100 440 200 460 T 400 460 T 600 460 L 600 600 L 0 600 Z' fill='%233b82f6' opacity='0.5'/>
  <path d='M 0 520 Q 100 500 200 520 T 400 520 T 600 520 L 600 600 L 0 600 Z' fill='%2360a5fa' opacity='0.4'/>
  <ellipse cx='150' cy='400' rx='80' ry='15' fill='%23fef9c3' opacity='0.3'/>
  <ellipse cx='150' cy='420' rx='60' ry='10' fill='%23fef9c3' opacity='0.2'/>
  <ellipse cx='300' cy='400' rx='40' ry='8' fill='%23ffffff' opacity='0.4'/>
  <path d='M 290 280 Q 290 260 305 260 Q 320 260 320 280 L 320 290 Q 320 295 305 295 Q 290 295 290 290 Z' fill='%23fef3c7'/>
  <path d='M 270 290 L 340 290 L 360 400 L 305 410 L 250 400 Z' fill='%23ffffff'/>
  <ellipse cx='305' cy='400' rx='55' ry='12' fill='%23fef9c3' opacity='0.6'/>
  <line x1='305' y1='250' x2='305' y2='270' stroke='%23fef9c3' stroke-width='2' opacity='0.8'/>
  <ellipse cx='480' cy='420' rx='60' ry='10' fill='%23713f12'/>
  <path d='M 430 410 L 530 410 L 510 425 L 450 425 Z' fill='%23a16207'/>
  <line x1='480' y1='370' x2='480' y2='410' stroke='%23713f12' stroke-width='2'/>
  <path d='M 478 370 L 510 395 L 478 395 Z' fill='%23ffffff'/>
</svg>`;

function svgDataUri(svg: string): string {
  const normalized = svg.replace(/%23/g, "#").replace(/\s+/g, " ").trim();
  const encoded = encodeURIComponent(normalized);
  return `url("data:image/svg+xml,${encoded}")`;
}

const scenes: Scene[] = [
  {
    title: "Noah's Ark",
    verse: "And the rain was upon the earth forty days and forty nights.",
    ref: "Genesis 7:12",
    svg: noahSvg,
  },
  {
    title: "Garden of Eden",
    verse: "And the Lord God planted a garden eastward in Eden.",
    ref: "Genesis 2:8",
    svg: edenSvg,
  },
  {
    title: "The Nativity",
    verse: "And she brought forth her firstborn son, and laid him in a manger.",
    ref: "Luke 2:7",
    svg: nativitySvg,
  },
  {
    title: "The Empty Tomb",
    verse: "He is not here: for he is risen, as he said.",
    ref: "Matthew 28:6",
    svg: tombSvg,
  },
  {
    title: "Walking on Water",
    verse: "Be of good cheer; it is I; be not afraid.",
    ref: "Matthew 14:27",
    svg: waterSvg,
  },
];

const SIZE = 3;
const TOTAL = SIZE * SIZE;

function shufflePieces(): number[] {
  let arr: number[];
  do {
    arr = Array.from({ length: TOTAL }, (_, i) => i).sort(() => Math.random() - 0.5);
  } while (arr.every((v, i) => v === i));
  return arr;
}

function isSolved(arr: number[]) {
  return arr.every((v, i) => v === i);
}

export default function BibleJigsawPuzzle() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [pieces, setPieces] = useState<number[]>(shufflePieces);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const scene = scenes[sceneIdx];
  const solved = isSolved(pieces);
  const inPlace = useMemo(() => pieces.filter((v, i) => v === i).length, [pieces]);
  const bgImage = useMemo(() => svgDataUri(scene.svg), [scene]);

  const swap = useCallback((idx: number) => {
    if (solved) return;
    if (selected === null) {
      setSelected(idx);
      return;
    }
    if (selected === idx) {
      setSelected(null);
      return;
    }
    const next = [...pieces];
    [next[selected], next[idx]] = [next[idx], next[selected]];
    setPieces(next);
    setMoves((m) => m + 1);
    setSelected(null);
  }, [pieces, selected, solved]);

  function reset() {
    setPieces(shufflePieces());
    setMoves(0);
    setSelected(null);
  }

  function newScene() {
    setSceneIdx((i) => (i + 1) % scenes.length);
    setPieces(shufflePieces());
    setMoves(0);
    setSelected(null);
  }

  return (
    <>
      <Helmet>
        <title>Bible Jigsaw Puzzle – Assemble Biblical Scenes | Bible Games Online</title>
        <meta name="description" content="Play Bible Jigsaw Puzzle online — piece together beautiful biblical scenes from Noah's Ark to the Nativity. Free, family-friendly puzzle game." />
      </Helmet>

      <GameHero
        icon={<Puzzle className="w-6 h-6" />}
        title="Bible Jigsaw Puzzle"
        subtitle="Click any two pieces to swap them. Rebuild the scene to reveal a moment from scripture."
        meta={
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="bg-transparent border-primary/40 text-primary">{scene.title}</Badge>
            <Badge className="bg-primary text-primary-foreground">Moves: {moves}</Badge>
            <Badge variant="outline" className="bg-transparent border-white/20 text-white/80">{inPlace}/9 in place</Badge>
          </div>
        }
      />

      <section className="py-12 bg-gradient-to-b from-background via-background to-muted/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid md:grid-cols-[1fr_180px] gap-6 items-start">
            <div className="rounded-3xl border border-border bg-card shadow-card-lg p-4 md:p-6 relative overflow-hidden order-2 md:order-1">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

              <p className="relative text-center text-xs font-bold text-muted-foreground tracking-widest mb-3 uppercase">
                {selected === null ? "Click a piece to select it" : "Now click another piece to swap"}
              </p>

              <div
                className="relative grid mx-auto rounded-2xl p-2 shadow-inner bg-slate-900/95"
                style={{
                  gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                  gap: "6px",
                  maxWidth: "480px",
                  aspectRatio: "1",
                }}
              >
                {pieces.map((pieceVal, idx) => {
                  const correct = pieceVal === idx;
                  const row = Math.floor(pieceVal / SIZE);
                  const col = pieceVal % SIZE;
                  const isSelected = selected === idx;
                  return (
                    <motion.button
                      key={idx}
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      onClick={() => swap(idx)}
                      disabled={solved}
                      aria-label={`Piece ${pieceVal + 1} at position ${idx + 1}.${correct ? " Correctly placed." : ""}${isSelected ? " Selected." : ""}`}
                      className={`relative rounded-lg overflow-hidden transition-all duration-200 group
                        ${isSelected
                          ? "ring-4 ring-primary ring-offset-2 ring-offset-slate-900 scale-95 z-10"
                          : solved
                            ? "ring-1 ring-primary/30"
                            : "hover:ring-2 hover:ring-primary/70 hover:z-10 hover:scale-[1.03] cursor-pointer shadow-lg"}`}
                      style={{
                        backgroundImage: bgImage,
                        backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                        backgroundPosition: `${(col / (SIZE - 1)) * 100}% ${(row / (SIZE - 1)) * 100}%`,
                      }}
                    >
                      <span className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                          boxShadow: solved
                            ? "inset 0 0 0 1px rgba(251,191,36,0.3)"
                            : "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
                        }}
                      />
                      {!solved && (
                        <span className={`absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shadow-md transition-all
                          ${correct
                            ? "bg-gradient-to-br from-primary to-amber-500 text-white scale-110"
                            : isSelected
                              ? "bg-white text-primary scale-110"
                              : "bg-white/90 text-slate-800 group-hover:bg-white"}`}>
                          {pieceVal + 1}
                        </span>
                      )}
                      {correct && !solved && (
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary shadow-gold animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-4">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-amber-500"
                    animate={{ width: `${(inPlace / TOTAL) * 100}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                </div>
              </div>

              <AnimatePresence>
                {solved && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-amber-500/10 p-5 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-amber-500 mb-2 shadow-gold">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <p className="font-bold text-xl mb-1">{scene.title} — Complete!</p>
                    <p className="font-serif italic text-base text-foreground/90 leading-relaxed">"{scene.verse}"</p>
                    <p className="text-sm text-primary font-bold mt-2 mb-4">— {scene.ref} · solved in {moves} moves</p>
                    <Button onClick={newScene} size="lg" className="font-bold"><Shuffle className="mr-2 w-4 h-4" /> Play Next Scene</Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex gap-2 justify-center flex-wrap">
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-1.5" /> Reshuffle
                </Button>
                <Button variant="ghost" size="sm" onClick={newScene}>
                  <Shuffle className="w-4 h-4 mr-1.5" /> New Scene
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview((v) => !v)} className="md:hidden">
                  {showPreview ? <EyeOff className="w-4 h-4 mr-1.5" /> : <Eye className="w-4 h-4 mr-1.5" />}
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>
              </div>
            </div>

            {showPreview && (
              <div className="order-1 md:order-2 md:sticky md:top-24">
                <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2 text-center">Reference</p>
                <div
                  className="rounded-xl shadow-card-lg border-2 border-primary/30 aspect-square w-full max-w-[180px] mx-auto"
                  style={{
                    backgroundImage: bgImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-label={`Reference image: ${scene.title}`}
                />
                <p className="text-center text-xs text-muted-foreground mt-2 font-medium">{scene.title}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="How to Play Bible Jigsaw Puzzle">
          <p>
            Each round shuffles a beautiful biblical scene — Noah's Ark with a rainbow, the Garden of Eden, the Nativity under a glowing star, the Empty Tomb at sunrise, or Christ Walking on Water beneath the moon — into nine scrambled tiles. Click any piece to select it (it'll glow gold), then click a second piece to swap their positions.
          </p>
          <p>
            A small reference image stays beside the board so you always know what the finished picture should look like. Numbered badges on each piece turn gold the instant they're in their correct spot, and a progress bar tracks how close you are to completing the scene.
          </p>
        </ContentBlock>
        <ContentBlock title="Scripture Brought to Life Through Puzzles">
          <p>
            There's something deeply satisfying about watching a fragmented image slowly come back together. Bible Jigsaw Puzzle channels that feeling through five iconic scenes from scripture, each illustrated as a vibrant scene and paired with the verse it depicts. Whether you're rebuilding the rainbow over Noah's Ark or assembling the star above Bethlehem, every completed puzzle is a quiet meditation on God's Word made visible.
          </p>
          <p>
            Enjoy more visual and tile-based puzzles in <Link href="/bible-tiles/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Tiles</Link> (a sliding-puzzle take on hidden verses), test your scripture vocabulary in <Link href="/bible-wordle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Wordle</Link>, or sharpen pattern recognition in <Link href="/bible-word-games/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Word Search</Link>.
          </p>
        </ContentBlock>
        <ContentBlock title="Family-Friendly and Ad-Free">
          <p>
            Bible Jigsaw Puzzle is built to be safe for kids and engaging for adults. There are no ads, no sign-ups, and no time pressure — just the simple joy of putting a beautiful image back together while reflecting on a meaningful Bible verse. Great for Sunday school, family devotion time, or a quiet moment alone with scripture.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("jigsaw", 4)} />
      <FaqSection />
    </>
  );
}
