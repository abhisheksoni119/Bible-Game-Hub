import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { wordSearchWords, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { cn } from "@/lib/utils";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  {
    title: "Scripture Trivia Quiz",
    description: "Think you know the Bible? Pick a category and difficulty, then answer 10 questions.",
    href: "/bible-trivia",
    emoji: "🧠",
    cta: "Take the quiz",
  },
  {
    title: "Children's Bible Activities",
    description: "Safe, ad-free flip-card matching with Noah's Ark animals — great for kids of all ages.",
    href: "/kids-bible-games",
    emoji: "🎮",
    cta: "Open kids games",
  },
];

const GRID_SIZE = 12;

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

interface Cell {
  row: number;
  col: number;
  letter: string;
}

export default function WordSearch() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null);
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);
  const [isWon, setIsWon] = useState(false);
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
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        if (
          row + dir[0] * (word.length - 1) >= 0 &&
          row + dir[0] * (word.length - 1) < GRID_SIZE &&
          col + dir[1] * (word.length - 1) >= 0 &&
          col + dir[1] * (word.length - 1) < GRID_SIZE
        ) {
          let collision = false;
          for (let i = 0; i < word.length; i++) {
            const r = row + dir[0] * i;
            const c = col + dir[1] * i;
            if (newGrid[r][c] !== "" && newGrid[r][c] !== word[i]) {
              collision = true;
              break;
            }
          }
          if (!collision) {
            for (let i = 0; i < word.length; i++) {
              newGrid[row + dir[0] * i][col + dir[1] * i] = word[i];
            }
            placed = true;
            placedWords.push(word);
          }
        }
        attempts++;
      }
    }

    const finalGrid: Cell[][] = newGrid.map((row, rIdx) =>
      row.map((cell, cIdx) => ({
        row: rIdx,
        col: cIdx,
        letter: cell === "" ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : cell,
      }))
    );

    setGrid(finalGrid);
    setWordsToFind(placedWords);
    setFoundWords([]);
    setFoundCells(new Set());
    setIsWon(false);
    setStartCell(null);
    setHoverCell(null);
    setLastFoundWord(null);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  const buildPath = (from: { row: number; col: number }, to: { row: number; col: number }) => {
    const dr = to.row - from.row;
    const dc = to.col - from.col;
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
        setFoundWords(newFound);
        setLastFoundWord(match);
        setFoundCells(prev => {
          const next = new Set(prev);
          path.forEach(p => next.add(`${p.row},${p.col}`));
          return next;
        });
        setTimeout(() => setLastFoundWord(null), 2000);
        if (newFound.length === wordsToFind.length) {
          setIsWon(true);
          confetti({ particleCount: 160, spread: 90 });
        }
      }
      setStartCell(null);
      setHoverCell(null);
    },
    [grid, wordsToFind, foundWords]
  );

  const handleCellClick = (r: number, c: number) => {
    if (isWon) return;
    if (!startCell) {
      setStartCell({ row: r, col: c });
      setHoverCell({ row: r, col: c });
    } else if (startCell.row === r && startCell.col === c) {
      setStartCell(null);
      setHoverCell(null);
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
      <div className="bg-secondary text-secondary-foreground py-16 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Search className="w-14 h-14 mx-auto mb-4 text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Bible Word Search</h1>
        <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
          Find the hidden biblical words. Click the first letter, then click the last letter of a word to select it.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Game Board */}
          <div className="flex-grow bg-card border border-border p-6 rounded-3xl shadow-xl shadow-black/5 flex flex-col items-center">

            {/* Progress bar */}
            <div className="w-full mb-6">
              <div className="flex justify-between text-sm font-semibold text-muted-foreground mb-2">
                <span>Progress</span>
                <span className="text-primary">{foundWords.length} / {wordsToFind.length} words</span>
              </div>
              <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
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
                  className="mb-6 w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-bold text-xl text-center shadow-lg shadow-primary/30"
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
              className="grid gap-1 mb-8 select-none"
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
                      whileHover={!startCell && !isFound ? { scale: 1.1 } : {}}
                      whileTap={{ scale: 0.92 }}
                      animate={isFound ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center text-base sm:text-lg font-bold rounded-lg transition-colors duration-75",
                        isFound
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                          : isStart
                          ? "bg-primary text-primary-foreground ring-2 ring-offset-1 ring-primary shadow-md scale-110"
                          : isHover && inPreview
                          ? "bg-primary text-primary-foreground scale-105"
                          : inPreview
                          ? "bg-primary/45 text-foreground"
                          : "bg-secondary/20 hover:bg-secondary/50 text-foreground"
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

          {/* Word List Panel */}
          <div className="w-full lg:w-72 bg-card border border-border p-6 rounded-3xl shadow-lg shadow-black/5 flex-shrink-0">
            <h3 className="text-lg font-bold mb-5 pb-4 border-b border-border flex items-center justify-between">
              Words to Find
              <span className="text-sm font-normal text-muted-foreground">{foundWords.length}/{wordsToFind.length}</span>
            </h3>
            <div className="flex flex-col gap-2">
              {wordsToFind.map(word => {
                const isWordFound = foundWords.includes(word);
                return (
                  <motion.div
                    key={word}
                    animate={isWordFound ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "px-3 py-2.5 rounded-xl font-semibold text-base transition-all flex items-center justify-between gap-2",
                      isWordFound
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400"
                        : "bg-secondary/20 text-foreground"
                    )}
                  >
                    <span className={isWordFound ? "line-through decoration-2" : ""}>{word}</span>
                    {isWordFound && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <RelatedGames games={RELATED} />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">The Benefits of Bible Word Search Puzzles</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Word search is a calm, focused way to engage with scripture. As you scan the grid, you naturally reinforce your familiarity with biblical names, places, and key terms.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every new game generates a completely fresh puzzle. No two grids are ever the same.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Words hidden horizontally, vertically, and diagonally</li>
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Click the first letter, then the last to mark a word</li>
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Found words stay highlighted in gold so you can track progress</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <FAQAccordion items={homeFAQs} />
        </div>
      </div>
    </div>
  );
}
