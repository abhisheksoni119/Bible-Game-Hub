import { useState, useCallback, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { LayoutGrid, RotateCcw, Trophy, Shuffle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const SIZE = 4;
const TOTAL = SIZE * SIZE;

type Verse = {
  ref: string;
  words: string[];
  palette: [string, string, string];
};

const verses: Verse[] = [
  {
    ref: "Psalm 23:1",
    words: ["The", "LORD", "is", "my", "shepherd", "I", "shall", "not", "want", "He", "leads", "me", "in", "still", "waters", ""],
    palette: ["#1e3a8a", "#3b82f6", "#a7d8ff"],
  },
  {
    ref: "John 3:16",
    words: ["For", "God", "so", "loved", "the", "world", "that", "He", "gave", "His", "only", "begotten", "Son", "to", "save", ""],
    palette: ["#7c2d12", "#dc2626", "#fecaca"],
  },
  {
    ref: "Philippians 4:13",
    words: ["I", "can", "do", "all", "things", "through", "Christ", "who", "strengthens", "me", "every", "day", "in", "all", "ways", ""],
    palette: ["#581c87", "#a855f7", "#e9d5ff"],
  },
  {
    ref: "Proverbs 3:5",
    words: ["Trust", "in", "the", "LORD", "with", "all", "your", "heart", "and", "lean", "not", "on", "your", "own", "mind", ""],
    palette: ["#064e3b", "#10b981", "#a7f3d0"],
  },
];

function isSolvable(arr: number[]): boolean {
  let inv = 0;
  const flat = arr.filter((v) => v !== TOTAL - 1);
  for (let i = 0; i < flat.length - 1; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inv++;
    }
  }
  const blankRow = SIZE - Math.floor(arr.indexOf(TOTAL - 1) / SIZE);
  return SIZE % 2 === 1 ? inv % 2 === 0 : (inv + blankRow) % 2 === 1;
}

function shuffleBoard(): number[] {
  let arr: number[];
  do {
    arr = Array.from({ length: TOTAL }, (_, i) => i).sort(() => Math.random() - 0.5);
  } while (!isSolvable(arr) || arr.every((v, i) => v === i));
  return arr;
}

function isSolved(arr: number[]): boolean {
  return arr.every((v, i) => v === i);
}

export default function BibleTiles() {
  const [verseIdx, setVerseIdx] = useState(0);
  const [board, setBoard] = useState<number[]>(shuffleBoard);
  const [moves, setMoves] = useState(0);
  const verse = verses[verseIdx];
  const solved = isSolved(board);
  const inPlace = useMemo(() => board.filter((v, i) => v === i && v !== TOTAL - 1).length, [board]);

  const move = useCallback((idx: number) => {
    if (solved) return;
    const blank = board.indexOf(TOTAL - 1);
    const r1 = Math.floor(idx / SIZE), c1 = idx % SIZE;
    const r2 = Math.floor(blank / SIZE), c2 = blank % SIZE;
    const adjacent = (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);
    if (!adjacent) return;
    const next = [...board];
    [next[idx], next[blank]] = [next[blank], next[idx]];
    setBoard(next);
    setMoves((m) => m + 1);
  }, [board, solved]);

  function reset() {
    setBoard(shuffleBoard());
    setMoves(0);
  }

  function newVerse() {
    setVerseIdx((i) => (i + 1) % verses.length);
    setBoard(shuffleBoard());
    setMoves(0);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (solved) return;
      const blank = board.indexOf(TOTAL - 1);
      const r = Math.floor(blank / SIZE), c = blank % SIZE;
      let target = -1;
      if (e.key === "ArrowUp" && r < SIZE - 1) target = (r + 1) * SIZE + c;
      else if (e.key === "ArrowDown" && r > 0) target = (r - 1) * SIZE + c;
      else if (e.key === "ArrowLeft" && c < SIZE - 1) target = r * SIZE + (c + 1);
      else if (e.key === "ArrowRight" && c > 0) target = r * SIZE + (c - 1);
      if (target >= 0) {
        e.preventDefault();
        move(target);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [board, move, solved]);

  const [c1, c2, c3] = verse.palette;
  const boardBg = `radial-gradient(circle at 30% 20%, ${c3}22, transparent 60%), linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;

  return (
    <>
      <Helmet>
        <title>Bible Tiles – Sliding Puzzle Bible Verse Game | Bible Games Online</title>
        <meta name="description" content="Play Bible Tiles online — slide tiles into the right order to reveal a hidden Bible verse. A scripture-themed sliding puzzle for all ages." />
      </Helmet>

      <GameHero
        icon={<LayoutGrid className="w-6 h-6" />}
        title="Bible Tiles"
        subtitle="Slide the tiles into the correct order to reveal a hidden Bible verse."
        meta={
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="bg-transparent border-primary/40 text-primary">{verse.ref}</Badge>
            <Badge className="bg-primary text-primary-foreground">Moves: {moves}</Badge>
            <Badge variant="outline" className="bg-transparent border-white/20 text-white/80">{inPlace}/15 in place</Badge>
          </div>
        }
      />

      <section className="py-12 bg-gradient-to-b from-background via-background to-muted/40">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-4 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

            <div
              className="relative grid mx-auto rounded-2xl p-3 shadow-inner"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                gap: "8px",
                maxWidth: "420px",
                background: boardBg,
              }}
            >
              {board.map((tileVal, idx) => {
                const isBlank = tileVal === TOTAL - 1;
                const word = verse.words[tileVal];
                const correct = tileVal === idx;
                if (isBlank) {
                  return (
                    <div
                      key={idx}
                      className="aspect-square rounded-xl border-2 border-dashed border-white/20 bg-black/10"
                      aria-hidden
                    />
                  );
                }
                return (
                  <motion.button
                    key={idx}
                    layout
                    transition={{ type: "spring", stiffness: 600, damping: 35 }}
                    onClick={() => move(idx)}
                    aria-label={`Tile ${tileVal + 1}: ${word}. Position ${idx + 1} of 16.`}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 text-center font-bold relative overflow-hidden group transition-all
                      ${solved
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-gold ring-2 ring-primary/40"
                        : correct
                          ? "bg-gradient-to-br from-primary to-amber-500 text-primary-foreground shadow-md ring-2 ring-primary/60"
                          : "bg-gradient-to-br from-white to-slate-100 text-slate-900 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:from-amber-50 hover:to-white cursor-pointer"
                      }`}
                  >
                    <span className={`absolute top-1 left-1.5 text-[9px] font-black tracking-tight px-1.5 py-0.5 rounded-full
                      ${correct || solved ? "bg-white/30 text-white" : "bg-primary/15 text-primary"}`}>
                      {tileVal + 1}
                    </span>
                    {correct && !solved && (
                      <Check className="absolute top-1 right-1 w-3 h-3 text-white" />
                    )}
                    <span className="font-serif text-base md:text-lg leading-tight px-1 break-words drop-shadow-sm">{word}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4">
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-amber-500"
                  animate={{ width: `${(inPlace / 15) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Click any tile next to the empty square to slide it. Or use arrow keys.
              </p>
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
                  <p className="font-bold text-xl mb-1">Verse Revealed!</p>
                  <p className="font-serif italic text-base text-foreground/90 leading-relaxed">"{verse.words.filter(Boolean).join(" ")}"</p>
                  <p className="text-sm text-primary font-bold mt-2 mb-4">— {verse.ref} · solved in {moves} moves</p>
                  <Button onClick={newVerse} size="lg" className="font-bold"><Shuffle className="mr-2 w-4 h-4" /> Play Next Verse</Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-1.5" /> Reshuffle
              </Button>
              <Button variant="ghost" size="sm" onClick={newVerse}>
                <Shuffle className="w-4 h-4 mr-1.5" /> New Verse
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="How to Play Bible Tiles">
          <p>
            Each round scrambles a familiar Bible verse across 15 movable tiles plus one empty space. Click any tile next to the empty square — it slides into place. Your job is to rearrange the tiles in the correct order so the verse reads top to bottom, left to right. Solve it in as few moves as possible, then advance to a new verse.
          </p>
          <p>
            Prefer keyboard play? Use the arrow keys: each press slides whichever tile is opposite the direction you press, just like the classic 15-puzzle. Tiles already in their correct spot light up gold with a checkmark, and a progress bar at the bottom tracks how close you are to completing the verse.
          </p>
        </ContentBlock>
        <ContentBlock title="A Sliding Puzzle With Scripture at Its Heart">
          <p>
            Bible Tiles takes the classic sliding-tile puzzle that has entertained players for over a century and gives it spiritual depth. Instead of generic numbers, you're sliding the actual words of Psalm 23, John 3:16, Philippians 4:13, and other beloved passages into place. By the time you've solved a verse, you've read it dozens of times — making this one of the most enjoyable ways to passively memorize scripture.
          </p>
          <p>
            Looking for more puzzle-based scripture games? Piece together a complete biblical scene in our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jigsaw Puzzle</Link>, hunt hidden words in <Link href="/bible-word-games/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Word Search</Link>, or test your daily-puzzle skills with <Link href="/bible-wordle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Wordle</Link>.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("tiles", 4)} />
      <FaqSection />
    </>
  );
}
