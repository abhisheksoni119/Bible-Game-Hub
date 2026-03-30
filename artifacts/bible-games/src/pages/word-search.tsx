import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { wordSearchWords, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";
import { cn } from "@/lib/utils";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  {
    title: "Bible Wordle",
    description: "Guess the 5-letter Bible word in 6 tries — a fresh daily scripture word challenge.",
    href: "/bible-wordle/",
    emoji: "📖",
    cta: "Play Wordle",
  },
  {
    title: "Bible Wheel of Fortune",
    description: "Reveal a hidden Bible phrase one letter at a time before your chances run out.",
    href: "/bible-wheel-of-fortune/",
    emoji: "🎡",
    cta: "Spin the Wheel",
  },
  {
    title: "Scripture Trivia Quiz",
    description: "Think you know the Bible? Pick a category and difficulty, then answer 10 questions.",
    href: "/bible-trivia/",
    emoji: "🧠",
    cta: "Take the quiz",
  },
  {
    title: "Children's Bible Activities",
    description: "Safe, ad-free flip-card matching with Noah's Ark animals — great for kids of all ages.",
    href: "/kids-bible-games/",
    emoji: "🎮",
    cta: "Open kids games",
  },
];

const GRID_SIZE = 12;
const DIRECTIONS = [[0, 1], [1, 0], [1, 1], [-1, 1]];

interface Cell { row: number; col: number; letter: string; }

export default function WordSearch() {
  const [grid, setGrid]         = useState<Cell[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords]   = useState<string[]>([]);
  const [foundCells, setFoundCells]   = useState<Set<string>>(new Set());
  const [startCell, setStartCell]     = useState<{ row: number; col: number } | null>(null);
  const [hoverCell, setHoverCell]     = useState<{ row: number; col: number } | null>(null);
  const [isWon, setIsWon]             = useState(false);
  const [lastFoundWord, setLastFoundWord] = useState<string | null>(null);

  const previewPath = useMemo<{ row: number; col: number }[]>(() => {
    if (!startCell) return [];
    const end = hoverCell ?? startCell;
    const dr = end.row - startCell.row;
    const dc = end.col - startCell.col;
    if (dr === 0 && dc === 0) return [startCell];
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [startCell];
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;
    const path: { row: number; col: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      path.push({ row: startCell.row + stepR * i, col: startCell.col + stepC * i });
    }
    return path;
  }, [startCell, hoverCell]);

  const generateGrid = useCallback(() => {
    let newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));
    let placedWords: string[] = [];
    const selectedWords = [...wordSearchWords].sort(() => 0.5 - Math.random()).slice(0, 8);

    for (const word of selectedWords) {
      let placed = false, attempts = 0;
      while (!placed && attempts < 100) {
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        if (
          row + dir[0] * (word.length - 1) >= 0 && row + dir[0] * (word.length - 1) < GRID_SIZE &&
          col + dir[1] * (word.length - 1) >= 0 && col + dir[1] * (word.length - 1) < GRID_SIZE
        ) {
          let collision = false;
          for (let i = 0; i < word.length; i++) {
            const r = row + dir[0] * i, c = col + dir[1] * i;
            if (newGrid[r][c] !== "" && newGrid[r][c] !== word[i]) { collision = true; break; }
          }
          if (!collision) {
            for (let i = 0; i < word.length; i++) {
              newGrid[row + dir[0] * i][col + dir[1] * i] = word[i];
            }
            placed = true; placedWords.push(word);
          }
        }
        attempts++;
      }
    }

    const finalGrid: Cell[][] = newGrid.map((row, rIdx) =>
      row.map((cell, cIdx) => ({
        row: rIdx, col: cIdx,
        letter: cell === "" ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : cell,
      }))
    );

    setGrid(finalGrid); setWordsToFind(placedWords); setFoundWords([]);
    setFoundCells(new Set()); setIsWon(false); setStartCell(null);
    setHoverCell(null); setLastFoundWord(null);
  }, []);

  useEffect(() => { generateGrid(); }, [generateGrid]);

  const buildPath = (from: { row: number; col: number }, to: { row: number; col: number }) => {
    const dr = to.row - from.row, dc = to.col - from.col;
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const stepR = steps === 0 ? 0 : dr / steps;
    const stepC = steps === 0 ? 0 : dc / steps;
    const path: { row: number; col: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      path.push({ row: from.row + stepR * i, col: from.col + stepC * i });
    }
    return path;
  };

  const tryCommit = useCallback(
    (path: { row: number; col: number }[]) => {
      if (path.length < 2) return;
      const wordStr = path.map(p => grid[p.row][p.col].letter).join("");
      const reverseStr = wordStr.split("").reverse().join("");
      const match = wordsToFind.find(w => !foundWords.includes(w) && (w === wordStr || w === reverseStr));
      if (match) {
        const newFound = [...foundWords, match];
        setFoundWords(newFound); setLastFoundWord(match);
        setFoundCells(prev => {
          const next = new Set(prev);
          path.forEach(p => next.add(`${p.row},${p.col}`));
          return next;
        });
        setTimeout(() => setLastFoundWord(null), 2000);
        if (newFound.length === wordsToFind.length) {
          setIsWon(true); confetti({ particleCount: 160, spread: 90 });
        }
      }
      setStartCell(null); setHoverCell(null);
    },
    [grid, wordsToFind, foundWords]
  );

  const handleCellClick = (r: number, c: number) => {
    if (isWon) return;
    if (!startCell) {
      setStartCell({ row: r, col: c }); setHoverCell({ row: r, col: c });
    } else if (startCell.row === r && startCell.col === c) {
      setStartCell(null); setHoverCell(null);
    } else {
      const path = buildPath(startCell, { row: r, col: c });
      if (path) tryCommit(path);
      else { setStartCell(null); setHoverCell(null); }
    }
  };

  const handleCellEnter = (r: number, c: number) => {
    if (startCell) setHoverCell({ row: r, col: c });
  };

  const progress = wordsToFind.length > 0 ? foundWords.length / wordsToFind.length : 0;

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Word Search & Puzzle Games Online"
        description="Find hidden words in Bible word search games and solve puzzle challenges. Fun and educational Bible games for all ages."
        canonicalPath="/bible-word-games/"
      />
      <BreadcrumbSchema crumbs={[
        { name: "Home", path: "/" },
        { name: "Word Games", path: "/bible-word-games/" },
      ]} />
      <FAQSchema />
      <GameSchema
        name="Bible Word Search"
        url="https://biblegamesonline.net/bible-word-games/"
        description="Search for hidden scripture words — names, places, and key biblical terms — inside a freshly generated 12×12 letter grid. No two puzzles are ever the same."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/50" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <Search className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative">Bible Word Search</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-2xl mx-auto relative">
          Find the hidden biblical words. Tap the first letter, then tap the last letter of a word to select it.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Game Board */}
          <div className="flex-grow w-full bg-card border border-border/60 p-4 sm:p-6 rounded-3xl shadow-card-lg flex flex-col items-center">

            {/* Progress */}
            <div className="w-full mb-5">
              <div className="flex justify-between text-xs sm:text-sm font-semibold text-muted-foreground mb-2">
                <span>Progress</span>
                <span className="text-primary font-bold">{foundWords.length} / {wordsToFind.length} words</span>
              </div>
              <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Win banner */}
            <AnimatePresence>
              {isWon && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-5 w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-bold text-lg sm:text-xl text-center shadow-gold"
                >
                  🎉 You found all the words!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Word found toast */}
            <AnimatePresence>
              {lastFoundWord && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 px-5 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm shadow-md"
                >
                  ✓ Found: {lastFoundWord}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid */}
            <div
              className="w-full grid gap-0.5 sm:gap-1 mb-6 sm:mb-8 no-select"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
              onMouseLeave={() => setHoverCell(null)}
            >
              {grid.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const isFound   = foundCells.has(`${rIdx},${cIdx}`);
                  const isStart   = startCell?.row === rIdx && startCell?.col === cIdx;
                  const isHover   = hoverCell?.row === rIdx && hoverCell?.col === cIdx && !isStart;
                  const inPreview = !isFound && previewPath.some(p => p.row === rIdx && p.col === cIdx);

                  return (
                    <motion.button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      onMouseEnter={() => handleCellEnter(rIdx, cIdx)}
                      whileHover={!startCell && !isFound ? { scale: 1.08 } : {}}
                      whileTap={{ scale: 0.9 }}
                      animate={isFound ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.18 }}
                      className={cn(
                        "aspect-square w-full flex items-center justify-center text-[10px] sm:text-sm md:text-base font-bold rounded sm:rounded-lg transition-colors duration-75",
                        isFound
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : isStart
                          ? "bg-primary text-primary-foreground ring-1 sm:ring-2 ring-offset-0 sm:ring-offset-1 ring-primary shadow-md"
                          : isHover && inPreview
                          ? "bg-primary text-primary-foreground"
                          : inPreview
                          ? "bg-primary/40 text-foreground"
                          : "bg-white border border-secondary/10 ws-cell hover:bg-primary/8 hover:border-primary/30 text-foreground"
                      )}
                    >
                      {cell.letter}
                    </motion.button>
                  );
                })
              )}
            </div>

            <motion.button
              onClick={generateGrid}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" /> New Game
            </motion.button>
          </div>

          {/* Word List */}
          <div className="w-full lg:w-72 bg-card border border-border/60 p-4 sm:p-6 rounded-3xl shadow-card flex-shrink-0">
            <h3 className="text-base sm:text-lg font-bold mb-4 pb-3 border-b border-border flex items-center justify-between">
              Words to Find
              <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{foundWords.length}/{wordsToFind.length}</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {wordsToFind.map(word => {
                const isWordFound = foundWords.includes(word);
                return (
                  <motion.div
                    key={word}
                    animate={isWordFound ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "px-3 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-between gap-2",
                      isWordFound
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-muted/60 text-foreground border border-transparent"
                    )}
                  >
                    <span className={cn("truncate", isWordFound ? "line-through decoration-2" : "")}>{word}</span>
                    {isWordFound && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
        <RelatedGames games={RELATED} />
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">The Benefits of Bible Word Search Puzzles</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Word search is a calm, focused way to engage with scripture. As you scan the grid, you naturally reinforce your familiarity with biblical names, places, and key terms.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every new game generates a completely fresh puzzle. No two grids are ever the same.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Words hidden horizontally, vertically, and diagonally</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Click the first letter, then the last to mark a word</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Found words stay highlighted in gold so you can track progress</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Bible Word Search Online</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our online Bible word search hides scripture terms — names, places, and key words from both testaments — inside a freshly generated 12×12 grid every time you play. No two puzzles are ever identical, so you always get a new challenge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're looking for a short activity between study sessions or a calm way to wind down, searching for words like GRACE, PSALM, ANGEL, and MOSES keeps your mind anchored in scripture without any screen pressure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Bible Puzzle Games</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Puzzle-style Bible games go beyond simple recall — they ask you to think, search, and reason. Word search is just the beginning. The family of scripture puzzles spans letter grids, hidden phrases, matching pairs, and word-guessing challenges, each demanding a slightly different kind of mental engagement.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            What makes Bible puzzles particularly valuable is that the content itself is meaningful. Every word you uncover and every phrase you decode reinforces a name, place, or concept from the Bible — learning that sticks because it's tied to an activity, not just reading.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Bible Word Guessing Games</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Wordle-style gameplay has become one of the most popular casual puzzle formats around — and the Bible version puts a faith-based twist on it. You have six attempts to guess a five-letter Bible word, with each guess giving you color-coded feedback: green for the right letter in the right spot, yellow for the right letter in the wrong spot.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The words come from scripture — names, places, and terms that Bible readers will recognize. It's a quick daily challenge that sharpens both vocabulary and word-pattern thinking. Give it a try in our <a href="/bible-wordle/" className="text-primary hover:underline font-medium">Bible Wordle game</a>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center section-title-bar">Frequently Asked Questions</h2>
          <div className="mt-6">
            <FAQAccordion items={homeFAQs} />
          </div>
        </div>
      </div>
    </div>
  );
}
