import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Puzzle, RotateCcw, Trophy, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
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
  gradient: string;
  emoji: string;
};

const scenes: Scene[] = [
  {
    title: "Noah's Ark",
    verse: "And the rain was upon the earth forty days and forty nights.",
    ref: "Genesis 7:12",
    gradient: "linear-gradient(135deg, #4a90e2 0%, #87ceeb 50%, #f4a460 100%)",
    emoji: "🚢",
  },
  {
    title: "Garden of Eden",
    verse: "And the Lord God planted a garden eastward in Eden.",
    ref: "Genesis 2:8",
    gradient: "linear-gradient(135deg, #2d5016 0%, #6cb04c 50%, #c8e6a0 100%)",
    emoji: "🌳",
  },
  {
    title: "The Nativity",
    verse: "And she brought forth her firstborn son, and laid him in a manger.",
    ref: "Luke 2:7",
    gradient: "linear-gradient(135deg, #1a1a3e 0%, #b8860b 50%, #fff8dc 100%)",
    emoji: "⭐",
  },
  {
    title: "The Empty Tomb",
    verse: "He is not here: for he is risen, as he said.",
    ref: "Matthew 28:6",
    gradient: "linear-gradient(135deg, #ffd700 0%, #fff5e1 50%, #87ceeb 100%)",
    emoji: "✝️",
  },
  {
    title: "Walking on Water",
    verse: "Be of good cheer; it is I; be not afraid.",
    ref: "Matthew 14:27",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #4a90e2 50%, #b0d4f1 100%)",
    emoji: "🌊",
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
  const scene = scenes[sceneIdx];
  const solved = isSolved(pieces);

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
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-transparent border-primary/40 text-primary">Scene: {scene.title}</Badge>
            <Badge className="bg-primary text-primary-foreground">Moves: {moves}</Badge>
          </div>
        }
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-5 md:p-7">
            <p className="text-center text-xs font-bold text-muted-foreground tracking-wider mb-3">
              CLICK TWO PIECES TO SWAP THEIR POSITIONS
            </p>

            <div
              className="grid mx-auto rounded-2xl overflow-hidden bg-muted/30 p-1"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                gap: "4px",
                maxWidth: "420px",
                aspectRatio: "1",
              }}
            >
              {pieces.map((pieceVal, idx) => {
                const correct = pieceVal === idx;
                const row = Math.floor(pieceVal / SIZE);
                const col = pieceVal % SIZE;
                const isCenter = pieceVal === Math.floor(TOTAL / 2);
                const isSelected = selected === idx;
                return (
                  <motion.button
                    key={idx}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => swap(idx)}
                    disabled={solved}
                    className={`relative rounded-md overflow-hidden transition-all
                      ${isSelected ? "ring-4 ring-primary scale-95" :
                        correct && solved ? "" :
                        "hover:ring-2 hover:ring-primary/60 cursor-pointer"}`}
                    style={{
                      background: scene.gradient,
                      backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                      backgroundPosition: `${(col / (SIZE - 1)) * 100}% ${(row / (SIZE - 1)) * 100}%`,
                    }}
                  >
                    {isCenter && (
                      <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl drop-shadow-lg">
                        {scene.emoji}
                      </span>
                    )}
                    {!solved && (
                      <span className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${correct ? "bg-primary text-primary-foreground" : "bg-white/80 text-foreground"}`}>
                        {pieceVal + 1}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {solved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-primary/30 bg-primary/10 p-5 text-center"
              >
                <Trophy className="w-10 h-10 text-primary mx-auto mb-1" />
                <p className="font-bold text-lg">{scene.title} — Complete!</p>
                <p className="text-sm italic text-muted-foreground my-2">"{scene.verse}"</p>
                <p className="text-sm text-primary font-semibold mb-4">— {scene.ref} ({moves} moves)</p>
                <Button onClick={newScene}><Shuffle className="mr-2 w-4 h-4" /> Next Scene</Button>
              </motion.div>
            )}

            <div className="mt-5 flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-1" /> Reshuffle
              </Button>
              <Button variant="ghost" size="sm" onClick={newScene}>
                <Shuffle className="w-4 h-4 mr-1" /> New Scene
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="How to Play Bible Jigsaw Puzzle">
          <p>
            Each round shuffles a beautiful biblical scene — Noah's Ark, the Garden of Eden, the Nativity, the Empty Tomb, and more — into nine scrambled tiles. Click any piece to select it (it'll glow gold), then click a second piece to swap their positions. When every tile is back in its original spot, the picture comes together and you'll see the scripture verse it represents.
          </p>
          <p>
            Numbered badges appear on each piece while you solve. They turn gold the moment that piece is in the right place — perfect for tracking your progress. Solve in as few swaps as possible, then move on to the next scene.
          </p>
        </ContentBlock>
        <ContentBlock title="Scripture Brought to Life Through Puzzles">
          <p>
            There's something deeply satisfying about watching a fragmented image slowly come back together. Bible Jigsaw Puzzle channels that feeling through five iconic scenes from scripture, each paired with the verse it depicts. Whether you're rebuilding the rainbow over Noah's Ark or assembling the star above Bethlehem, every completed puzzle is a quiet meditation on God's Word made visible.
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
