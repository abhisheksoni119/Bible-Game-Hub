import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { LayoutGrid, RotateCcw, Trophy, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const SIZE = 4;
const TOTAL = SIZE * SIZE;

const verses = [
  {
    ref: "Psalm 23:1",
    words: ["The", "LORD", "is", "my", "shepherd", "I", "shall", "not", "want", "He", "leads", "me", "in", "still", "waters", ""],
  },
  {
    ref: "John 3:16",
    words: ["For", "God", "so", "loved", "the", "world", "that", "He", "gave", "His", "only", "begotten", "Son", "to", "save", ""],
  },
  {
    ref: "Philippians 4:13",
    words: ["I", "can", "do", "all", "things", "through", "Christ", "who", "strengthens", "me", "every", "day", "in", "all", "ways", ""],
  },
  {
    ref: "Proverbs 3:5",
    words: ["Trust", "in", "the", "LORD", "with", "all", "your", "heart", "and", "lean", "not", "on", "your", "own", "mind", ""],
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
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-transparent border-primary/40 text-primary">Verse: {verse.ref}</Badge>
            <Badge className="bg-primary text-primary-foreground">Moves: {moves}</Badge>
          </div>
        }
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-md">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-5 md:p-7">
            <div
              className="grid mx-auto"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                gap: "6px",
                maxWidth: "360px",
              }}
            >
              {board.map((tileVal, idx) => {
                const isBlank = tileVal === TOTAL - 1;
                const word = verse.words[tileVal];
                const correct = tileVal === idx;
                return (
                  <motion.button
                    key={idx}
                    layout
                    transition={{ type: "spring", stiffness: 600, damping: 35 }}
                    onClick={() => !isBlank && move(idx)}
                    disabled={isBlank}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 text-center font-bold transition-all
                      ${isBlank ? "bg-transparent" :
                        solved ? "bg-primary text-primary-foreground shadow-gold" :
                        correct ? "bg-primary/15 text-primary border border-primary/40" :
                        "bg-card border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer"}`}
                  >
                    {!isBlank && (
                      <>
                        <span className="text-[10px] font-semibold opacity-60 leading-none">{tileVal + 1}</span>
                        <span className="text-xs md:text-sm leading-tight mt-0.5 break-words">{word}</span>
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {solved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-center"
              >
                <Trophy className="w-10 h-10 text-primary mx-auto mb-1" />
                <p className="font-bold text-lg">Verse Revealed!</p>
                <p className="text-sm text-muted-foreground italic mb-1">"{verse.words.filter(Boolean).join(" ")}"</p>
                <p className="text-sm text-primary font-semibold mb-3">— {verse.ref} ({moves} moves)</p>
                <Button onClick={newVerse}><Shuffle className="mr-2 w-4 h-4" /> Next Verse</Button>
              </motion.div>
            )}

            <div className="mt-5 flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-1" /> Reshuffle
              </Button>
              <Button variant="ghost" size="sm" onClick={newVerse}>
                <Shuffle className="w-4 h-4 mr-1" /> New Verse
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Tip: use arrow keys to slide the blank space.
            </p>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="How to Play Bible Tiles">
          <p>
            Each round scrambles a familiar Bible verse across 15 movable tiles plus one empty space. Click any tile next to the empty square — it slides into place. Your job is to rearrange the tiles in the correct order so the verse reads top to bottom, left to right. Solve it in as few moves as possible, then advance to a new verse.
          </p>
          <p>
            Prefer keyboard play? Use the arrow keys: each press slides whichever tile is opposite the direction you press, just like the classic 15-puzzle. Tiles already in their correct spot light up gold so you can track your progress at a glance.
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
