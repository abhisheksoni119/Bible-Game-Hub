import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { wordSearchWords, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { cn } from "@/lib/utils";

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
  // Set of "row,col" strings for cells belonging to found words (persistent highlight)
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [startCell, setStartCell] = useState<{row: number, col: number} | null>(null);
  const [currentPath, setCurrentPath] = useState<{row: number, col: number}[]>([]);
  const [isWon, setIsWon] = useState(false);

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
    setCurrentPath([]);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  const handleCellClick = (r: number, c: number) => {
    if (isWon) return;

    if (!startCell) {
      // First click
      setStartCell({row: r, col: c});
      setCurrentPath([{row: r, col: c}]);
    } else {
      // Second click - calculate path if valid straight line
      const dr = r - startCell.row;
      const dc = c - startCell.col;
      
      // Check if it's a straight line (horizontal, vertical, or perfect diagonal)
      if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
        const steps = Math.max(Math.abs(dr), Math.abs(dc));
        const stepR = dr === 0 ? 0 : dr / steps;
        const stepC = dc === 0 ? 0 : dc / steps;
        
        const path: {row: number, col: number}[] = [];
        let wordStr = "";
        
        for (let i = 0; i <= steps; i++) {
          const currR = startCell.row + stepR * i;
          const currC = startCell.col + stepC * i;
          path.push({row: currR, col: currC});
          wordStr += grid[currR][currC].letter;
        }
        
        // Check if wordStr or its reverse matches any unfound word
        const reverseStr = wordStr.split('').reverse().join('');
        const matchedWord = wordsToFind.find(w => 
          !foundWords.includes(w) && (w === wordStr || w === reverseStr)
        );

        if (matchedWord) {
          const newFound = [...foundWords, matchedWord];
          setFoundWords(newFound);
          // Add all cells in the matched path to the persistent foundCells set
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
      }
      
      // Reset selection after second click regardless of match
      setStartCell(null);
      setCurrentPath([]);
    }
  };

  // Helper to check if a cell is in the currently selected path
  const isCellInCurrentPath = (r: number, c: number) => {
    return currentPath.some(p => p.row === r && p.col === c);
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
              className="grid gap-1 mb-8" 
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {grid.map((row, rIdx) => 
                row.map((cell, cIdx) => {
                  const isFound = foundCells.has(`${rIdx},${cIdx}`);
                  const inCurrent = isCellInCurrentPath(rIdx, cIdx);
                  const isStart = startCell?.row === rIdx && startCell?.col === cIdx;

                  return (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl font-bold rounded-md transition-colors",
                        isFound ? "bg-primary text-primary-foreground ring-1 ring-primary/40" :
                        isStart ? "bg-primary/80 text-primary-foreground" :
                        inCurrent ? "bg-primary/40 text-foreground" :
                        "bg-secondary/20 hover:bg-secondary/40 text-foreground"
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
