import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, CheckCircle2 } from "lucide-react";

const WORDS = ["JESUS", "BIBLE", "FAITH", "GRACE", "PRAYER", "MOSES", "DAVID", "ANGEL"];
const SIZE = 12;

type Cell = { letter: string; found: boolean; selected: boolean };

function buildGrid(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({ letter: "", found: false, selected: false }))
  );

  const directions = [[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]];

  for (const word of WORDS) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      attempts++;
      const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      const endR = r + dr * (word.length - 1);
      const endC = c + dc * (word.length - 1);
      if (endR < 0 || endR >= SIZE || endC < 0 || endC >= SIZE) continue;
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[r + dr * i][c + dc * i];
        if (cell.letter && cell.letter !== word[i]) { ok = false; break; }
      }
      if (ok) {
        for (let i = 0; i < word.length; i++) {
          grid[r + dr * i][c + dc * i].letter = word[i];
        }
        placed = true;
      }
    }
  }

  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!grid[r][c].letter) grid[r][c].letter = alpha[Math.floor(Math.random() * 26)];
    }
  }

  return grid;
}

export default function WordSearch() {
  const [grid, setGrid] = useState<Cell[][]>(buildGrid);
  const [found, setFound] = useState<string[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [startCell, setStartCell] = useState<[number, number] | null>(null);
  const [hovered, setHovered] = useState<[number, number] | null>(null);

  const getSelectedCells = useCallback((from: [number, number] | null, to: [number, number] | null): [number,number][] => {
    if (!from || !to) return [];
    const [r1, c1] = from;
    const [r2, c2] = to;
    const dr = Math.sign(r2 - r1);
    const dc = Math.sign(c2 - c1);
    if (dr === 0 && dc === 0) return [[r1, c1]];
    const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
    const cells: [number,number][] = [];
    for (let i = 0; i <= len; i++) cells.push([r1 + dr * i, c1 + dc * i]);
    return cells;
  }, []);

  function handleMouseDown(r: number, c: number) {
    setSelecting(true);
    setStartCell([r, c]);
    setHovered([r, c]);
  }

  function handleMouseEnter(r: number, c: number) {
    if (selecting) setHovered([r, c]);
  }

  function handleMouseUp(r: number, c: number) {
    if (!startCell) return;
    const cells = getSelectedCells(startCell, [r, c]);
    const word = cells.map(([row, col]) => grid[row][col].letter).join("");
    const revWord = word.split("").reverse().join("");
    const matchWord = WORDS.find(w => w === word || w === revWord);
    if (matchWord && !found.includes(matchWord)) {
      setFound(prev => [...prev, matchWord]);
      setGrid(prev => {
        const next = prev.map(row => row.map(cell => ({ ...cell })));
        for (const [row, col] of cells) next[row][col].found = true;
        return next;
      });
    }
    setSelecting(false);
    setStartCell(null);
    setHovered(null);
  }

  const selectedCells = getSelectedCells(startCell, hovered);
  const selectedSet = new Set(selectedCells.map(([r, c]) => `${r},${c}`));

  function reset() {
    setGrid(buildGrid());
    setFound([]);
    setSelecting(false);
    setStartCell(null);
    setHovered(null);
  }

  return (
    <>
      <Helmet>
        <title>Bible Word Search – Find Hidden Bible Words | Bible Games Online</title>
        <meta name="description" content="Play Bible word search puzzles online. Find hidden Bible words and names in our fun and challenging word search games." />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Bible Word Search</h1>
        <p className="text-center text-muted-foreground mb-8">Find all the Bible words hidden in the grid</p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {WORDS.map(w => (
            <Badge key={w} variant={found.includes(w) ? "default" : "outline"} className="text-sm">
              {found.includes(w) && <CheckCircle2 className="mr-1 w-3 h-3" />}
              {w}
            </Badge>
          ))}
        </div>

        {found.length === WORDS.length && (
          <Card className="max-w-sm mx-auto mb-6 text-center shadow-gold">
            <CardContent className="py-6">
              <p className="text-xl font-bold text-primary mb-4">🎉 You found all the words!</p>
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />Play Again</Button>
            </CardContent>
          </Card>
        )}

        <div
          className="inline-block select-none mx-auto block"
          onMouseLeave={() => { if (selecting) { setSelecting(false); setStartCell(null); setHovered(null); } }}
        >
          <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isSel = selectedSet.has(`${r},${c}`);
                return (
                  <button
                    key={`${r},${c}`}
                    className={`w-7 h-7 text-xs font-bold rounded transition-colors no-select
                      ${cell.found ? "bg-primary text-primary-foreground" : isSel ? "bg-primary/40 text-foreground" : "bg-muted hover:bg-muted-foreground/20 text-foreground ws-cell"}`}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    onMouseUp={() => handleMouseUp(r, c)}
                  >
                    {cell.letter}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />New Grid</Button>
        </div>
      </div>
    </>
  );
}
