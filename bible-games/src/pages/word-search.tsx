import { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Search, RotateCcw, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const WORDS = ["JESUS", "FAITH", "NOAH", "MOSES", "GRACE", "PSALM", "HOPE"];
const SIZE = 12;

type Cell = { letter: string; row: number; col: number };

function placeWords(words: string[]): { grid: Cell[][]; placements: { word: string; cells: { r: number; c: number }[] }[] } {
  const grid: string[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
  const placements: { word: string; cells: { r: number; c: number }[] }[] = [];
  const dirs = [
    [0, 1], [1, 0], [1, 1], [-1, 1],
  ];

  for (const word of words) {
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      const endR = r + dr * (word.length - 1);
      const endC = c + dc * (word.length - 1);
      if (endR < 0 || endR >= SIZE || endC < 0 || endC >= SIZE) continue;
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[r + dr * i][c + dc * i];
        if (cell !== "" && cell !== word[i]) { ok = false; break; }
      }
      if (!ok) continue;
      const cells: { r: number; c: number }[] = [];
      for (let i = 0; i < word.length; i++) {
        grid[r + dr * i][c + dc * i] = word[i];
        cells.push({ r: r + dr * i, c: c + dc * i });
      }
      placements.push({ word, cells });
      placed = true;
    }
  }
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === "") grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }
  const cellGrid: Cell[][] = grid.map((row, r) => row.map((letter, c) => ({ letter, row: r, col: c })));
  return { grid: cellGrid, placements };
}

export default function WordSearch() {
  const [seed, setSeed] = useState(0);
  const { grid, placements } = useMemo(() => placeWords(WORDS), [seed]);
  const [selecting, setSelecting] = useState<{ r: number; c: number }[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());

  const startSelect = useCallback((r: number, c: number) => setSelecting([{ r, c }]), []);
  const continueSelect = useCallback((r: number, c: number) => {
    setSelecting((prev) => {
      if (!prev.length) return prev;
      const start = prev[0];
      const dr = Math.sign(r - start.r);
      const dc = Math.sign(c - start.c);
      if (dr === 0 && dc === 0) return [start];
      const len = Math.max(Math.abs(r - start.r), Math.abs(c - start.c)) + 1;
      const next: { r: number; c: number }[] = [];
      for (let i = 0; i < len; i++) {
        next.push({ r: start.r + dr * i, c: start.c + dc * i });
        if (next[i].r < 0 || next[i].r >= SIZE || next[i].c < 0 || next[i].c >= SIZE) return prev;
      }
      return next;
    });
  }, []);

  const endSelect = useCallback(() => {
    if (selecting.length < 2) { setSelecting([]); return; }
    const word = selecting.map((s) => grid[s.r][s.c].letter).join("");
    const reverse = [...word].reverse().join("");
    const match = placements.find((p) => (p.word === word || p.word === reverse) && !found.has(p.word));
    if (match) {
      setFound((prev) => new Set([...prev, match.word]));
      setFoundCells((prev) => {
        const n = new Set(prev);
        match.cells.forEach((c) => n.add(`${c.r}-${c.c}`));
        return n;
      });
    }
    setSelecting([]);
  }, [selecting, grid, placements, found]);

  function reset() { setSeed((s) => s + 1); setFound(new Set()); setFoundCells(new Set()); setSelecting([]); }

  const progress = (found.size / WORDS.length) * 100;
  const allFound = found.size === WORDS.length;

  const isSelected = (r: number, c: number) => selecting.some((s) => s.r === r && s.c === c);
  const isFound = (r: number, c: number) => foundCells.has(`${r}-${c}`);

  return (
    <>
      <Helmet>
        <title>Bible Word Search – Free Scripture Word Game | Bible Games Online</title>
        <meta name="description" content="Find hidden Bible words in our free Bible Word Search puzzle. Tap the first letter, drag to the last letter, and discover scripture." />
      </Helmet>

      <GameHero
        icon={<Search className="w-6 h-6" />}
        title="Bible Word Search"
        subtitle="Find the hidden biblical words. Tap the first letter, then tap the last letter of a word to select it."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2 rounded-3xl border border-border bg-card shadow-card-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-muted-foreground">Progress</span>
                <span className="text-sm font-bold text-primary">{found.size} / {WORDS.length} found</span>
              </div>
              <Progress value={progress} className="h-2 mb-5" />

              <div
                className="grid no-select select-none"
                style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`, gap: "2px" }}
                onMouseLeave={endSelect}
                onMouseUp={endSelect}
                onTouchEnd={endSelect}
              >
                {grid.map((row, r) => row.map((cell, c) => {
                  const sel = isSelected(r, c);
                  const fnd = isFound(r, c);
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`ws-cell aspect-square flex items-center justify-center rounded font-bold text-sm md:text-base cursor-pointer transition-all
                        ${fnd ? "bg-primary/20 text-primary" : sel ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted/40"}`}
                      onMouseDown={() => startSelect(r, c)}
                      onMouseEnter={(e) => e.buttons === 1 && continueSelect(r, c)}
                      onTouchStart={() => startSelect(r, c)}
                      onTouchMove={(e) => {
                        const t = e.touches[0];
                        const el = document.elementFromPoint(t.clientX, t.clientY);
                        const rr = el?.getAttribute("data-r");
                        const cc = el?.getAttribute("data-c");
                        if (rr && cc) continueSelect(+rr, +cc);
                      }}
                      data-r={r}
                      data-c={c}
                    >
                      {cell.letter}
                    </div>
                  );
                }))}
              </div>

              <div className="mt-5 text-center">
                <Button onClick={reset} variant="outline">
                  <RotateCcw className="mr-2 w-4 h-4" /> New Game
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card shadow-card p-5 h-fit">
              <h3 className="font-bold mb-3 flex items-center justify-between">
                Words to Find
                <Badge variant="secondary" className="text-xs">{WORDS.length}</Badge>
              </h3>
              <ul className="space-y-2">
                {WORDS.map((w) => (
                  <li
                    key={w}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold border transition-all
                      ${found.has(w) ? "border-primary/30 bg-primary/10 text-primary line-through" : "border-border bg-background"}`}
                  >
                    {w}
                    {found.has(w) && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </li>
                ))}
              </ul>
              {allFound && (
                <div className="mt-4 text-center rounded-xl bg-primary/10 border border-primary/30 p-3">
                  <Trophy className="w-8 h-8 text-primary mx-auto mb-1" />
                  <p className="text-sm font-bold text-primary">All found!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ExploreMoreGames cards={exploreOthers("word-search", 4)} />

      <GameContent>
        <ContentBlock title="The Benefits of Bible Word Search Puzzles">
          <p>
            Word search is a calm, focused way to engage with scripture. As you scan the grid, your brain quietly reinforces familiar Bible names, places, and key terms. Every new game generates a completely fresh puzzle, so two grids are never the same.
          </p>
          <p>Words can hide horizontally, vertically, or diagonally. Tap the first letter, drag to the last letter to mark a word — found words stay highlighted in gold so you can track your progress.</p>
        </ContentBlock>

        <ContentBlock title="Bible Word Search Online">
          <p>
            Our online Bible word search makes scripture review feel like play. Names, places, and key words from both Testaments — including beloved verses from Psalms — are tucked into the grid for you to uncover. No printables, no paper. Whether you're looking for a short activity between study sessions or a calm way to wind down, searching for words like GRACE, FAITH, ANGEL, and MOSES keeps your mind anchored in scripture without feeling like a screen-pressure test.
          </p>
        </ContentBlock>

        <ContentBlock title="Bible Puzzle Games">
          <p>
            Puzzle-style Bible games go beyond simple recall — they ask you to think, search, and reason. Word search is just the beginning. The family of scripture puzzle games on this site (crosswords, matching pairs, and word-guessing challenges, each demanding a slightly different kind of mental engagement) collectively turn scripture into an enjoyable mental workout.
          </p>
        </ContentBlock>

        <ContentBlock title="Bible Word Guessing Games">
          <p>
            Wordle-style gameplay has become one of the most popular casual puzzle formats around — and the Bible version puts a faith-based twist on it. You have six attempts to guess a five-letter Bible word, with each guess giving you color-coded feedback (green for the letter in the right spot, yellow for the right letter in the wrong place).
          </p>
          <p>
            The same effect comes from this game: every search trains your eye to spot Bible words with renewed intentionality. As a quick daily challenge that sharpens both vocabulary and pattern thinking, give it a try in our <a href="/bible-wordle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Wordle</a> game.
          </p>
        </ContentBlock>
      </GameContent>

      <FaqSection />
    </>
  );
}
