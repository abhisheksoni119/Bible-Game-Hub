import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";
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

// Directions: [dx, dy]
const DIRECTIONS = [
  [0, 1],   // Right
  [1, 0],   // Down
  [1, 1],   // Diagonal Down-Right
  [-1, 1],  // Diagonal Up-Right
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
  const [startCell, setStartCell] = useState<{row: number, col: number} | null>(null);
  const [hoverCell, setHoverCell] = useState<{row: number, col: number} | null>(null);
  const [isWon, setIsWon] = useState(false);

  // Compute the live preview path from startCell → hoverCell (straight lines only)
  const previewPath = useMemo<{row: number, col: number}[]>(() => {
    if (!startCell) return [];
    const end = hoverCell ?? startCell;
    const dr = end.row - startCell.row;
    const dc = end.col - startCell.col;
    if (dr === 0 && dc === 0) return [startCell];
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [startCell];
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;
    const path: {row: number, col: number}[] = [];
    for (let i = 0; i <= steps; i++) {
      path.push({ row: startCell.row + stepR * i, col: startCell.col + stepC * i });
    }
    return path;
  }, [startCell, hoverCell]);

  const generateGrid = useCallback(() => {
    // 1. Initialize empty grid
    let newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    let placedWords: string[] = [];
    
    // Pick random 8 words from our list to keep it manageable
    const selectedWords = [...wordSearchWords].sort(() => 0.5 - Math.random()).slice(0, 8);

    // 2. Place words
    for (const word of selectedWords) {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        
        // Check bounds
        if (
          row + dir[0] * (word.length - 1) >= 0 &&
          row + dir[0] * (word.length - 1) < GRID_SIZE &&
          col + dir[1] * (word.length - 1) >= 0 &&
          col + dir[1] * (word.length - 1) < GRID_SIZE
        ) {
          // Check collision
          let collision = false;
          for (let i = 0; i < word.length; i++) {
            const r = row + dir[0] * i;
            const c = col + dir[1] * i;
            if (newGrid[r][c] !== '' && newGrid[r][c] !== word[i]) {
              collision = true;
              break;
            }
          }
          
          if (!collision) {
            // Place it
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

    // 3. Fill empty spots with random letters
    const finalGrid: Cell[][] = newGrid.map((row, rIdx) => 
      row.map((cell, cIdx) => ({
        row: rIdx,
        col: cIdx,
        letter: cell === '' ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : cell
      }))
    );

    setGrid(finalGrid);
    setWordsToFind(placedWords);
    setFoundWords([]);
    setFoundCells(new Set());
    setIsWon(false);
    setStartCell(null);
    setHoverCell(null);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const buildPath = (from: {row: number, col: number}, to: {row: number, col: number}) => {
    const dr = to.row - from.row;
    const dc = to.col - from.col;
    // Must be horizontal, vertical, or a perfect diagonal
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const stepR = steps === 0 ? 0 : dr / steps;
    const stepC = steps === 0 ? 0 : dc / steps;
    const path: {row: number, col: number}[] = [];
    for (let i = 0; i <= steps; i++) {
      path.push({ row: from.row + stepR * i, col: from.col + stepC * i });
    }
    return path;
  };

  const tryCommit = useCallback((path: {row: number, col: number}[]) => {
    if (path.length < 2) return;
    const wordStr = path.map(p => grid[p.row][p.col].letter).join("");
    const reverseStr = wordStr.split("").reverse().join("");
    const match = wordsToFind.find(w => !foundWords.includes(w) && (w === wordStr || w === reverseStr));
    if (match) {
      const newFound = [...foundWords, match];
      setFoundWords(newFound);
      setFoundCells(prev => {
        const next = new Set(prev);
        path.forEach(p => next.add(`${p.row},${p.col}`));
        return next;
      });
      if (newFound.length === wordsToFind.length) {
        setIsWon(true);
        confetti({ particleCount: 150, spread: 80 });
      }
    }
    setStartCell(null);
    setHoverCell(null);
  }, [grid, wordsToFind, foundWords]);

  // ── Event handlers ──────────────────────────────────────────────────────────

  const handleCellClick = (r: number, c: number) => {
    if (isWon) return;

    if (!startCell) {
      // First click — begin selection
      setStartCell({ row: r, col: c });
      setHoverCell({ row: r, col: c });
    } else if (startCell.row === r && startCell.col === c) {
      // Clicked the same start cell — cancel
      setStartCell(null);
      setHoverCell(null);
    } else {
      // Second click — commit whatever the preview path is
      const path = buildPath(startCell, { row: r, col: c });
      if (path) tryCommit(path);
      else { setStartCell(null); setHoverCell(null); }
    }
  };

  // Mouse hover — live preview while a start is selected
  const handleCellEnter = (r: number, c: number) => {
    if (startCell) setHoverCell({ row: r, col: c });
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-16 text-center px-4">
        <Search className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Bible Word Search</h1>
        <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
          Find the hidden biblical words. Click the first letter, then click the last letter of a word to select it.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Game Board */}
          <div className="flex-grow bg-card border border-border p-6 rounded-3xl shadow-xl shadow-black/5 flex flex-col items-center">
            {isWon && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-6 py-3 px-6 bg-green-100 text-green-800 rounded-xl font-bold text-xl border border-green-300"
              >
                You found all the words!
              </motion.div>
            )}
            
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
                    <button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      onMouseEnter={() => handleCellEnter(rIdx, cIdx)}
                      className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl font-bold rounded-md transition-all duration-75",
                        isFound
                          ? "bg-primary text-primary-foreground"
                          : isStart
                          ? "bg-primary text-primary-foreground ring-2 ring-offset-1 ring-primary scale-110"
                          : isHover && inPreview
                          ? "bg-primary text-primary-foreground scale-110"
                          : inPreview
                          ? "bg-primary/50 text-foreground"
                          : "bg-secondary/20 hover:bg-secondary/40 text-foreground"
                      )}
                    >
                      {cell.letter}
                    </button>
                  );
                })
              )}
            </div>

            <button
              onClick={generateGrid}
              className="px-6 py-3 rounded-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> New Game
            </button>
          </div>

          {/* Word List Panel */}
          <div className="w-full lg:w-80 bg-card border border-border p-6 rounded-3xl shadow-lg shadow-black/5 flex-shrink-0">
            <h3 className="text-xl font-bold mb-4 pb-4 border-b border-border">Words to Find</h3>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
              {wordsToFind.map(word => {
                const isFound = foundWords.includes(word);
                return (
                  <div 
                    key={word}
                    className={cn(
                      "px-3 py-2 rounded-lg font-medium text-lg transition-all",
                      isFound 
                        ? "bg-green-100/50 text-green-700 line-through decoration-2 dark:bg-green-900/20 dark:text-green-500" 
                        : "bg-secondary/20 text-foreground"
                    )}
                  >
                    {word}
                  </div>
                )
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
