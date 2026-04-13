import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const WORDS = ["GRACE", "FAITH", "ANGEL", "CROSS", "PSALM", "DAVID", "MOSES", "GLORY", "PEACE", "TRUTH", "LIGHT", "FLESH", "BLOOD", "WATER", "BREAD", "SHEEP", "WHEAT", "GRAIN"];
const MAX_GUESSES = 6;

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

type LetterState = "correct" | "present" | "absent" | "empty";

function checkGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array(5).fill("absent");
  const tArr = target.split("");
  const gArr = guess.split("");
  const used = Array(5).fill(false);
  for (let i = 0; i < 5; i++) {
    if (gArr[i] === tArr[i]) { result[i] = "correct"; used[i] = true; }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const j = tArr.findIndex((l, idx) => l === gArr[i] && !used[idx]);
    if (j !== -1) { result[i] = "present"; used[j] = true; }
  }
  return result;
}

const colorMap: Record<LetterState, string> = {
  correct: "bg-green-500 text-white border-green-500",
  present: "bg-yellow-400 text-white border-yellow-400",
  absent: "bg-muted-foreground/30 text-foreground border-muted-foreground/30",
  empty: "bg-background text-foreground border-border",
};

export default function BibleWordle() {
  const [target] = useState(pickWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<LetterState[][]>([]);
  const [current, setCurrent] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const submit = useCallback(() => {
    if (current.length !== 5 || won || lost) return;
    const g = current.toUpperCase();
    if (!WORDS.includes(g) && !g.match(/^[A-Z]{5}$/)) return;
    const res = checkGuess(g, target);
    setGuesses(prev => [...prev, g]);
    setResults(prev => [...prev, res]);
    if (g === target) setWon(true);
    else if (guesses.length + 1 >= MAX_GUESSES) setLost(true);
    setCurrent("");
  }, [current, target, won, lost, guesses.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (won || lost) return;
      if (e.key === "Enter") { submit(); return; }
      if (e.key === "Backspace") { setCurrent(p => p.slice(0, -1)); return; }
      if (e.key.match(/^[a-zA-Z]$/) && current.length < 5) setCurrent(p => p + e.key.toUpperCase());
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [submit, current, won, lost]);

  function reset() {
    window.location.reload();
  }

  return (
    <>
      <Helmet>
        <title>Bible Wordle – Guess the Bible Word | Bible Games Online</title>
        <meta name="description" content="Play Bible Wordle online! Guess the 5-letter Bible word in 6 tries. A fun Bible word game for all ages." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2">Bible Wordle</h1>
        <p className="text-muted-foreground mb-8">Guess the 5-letter Bible word in {MAX_GUESSES} tries</p>

        <div className="grid gap-2 mb-8">
          {Array.from({ length: MAX_GUESSES }).map((_, row) => {
            const guess = guesses[row] ?? "";
            const res = results[row];
            const isCurrent = row === guesses.length && !won && !lost;
            const displayWord = isCurrent ? current.padEnd(5) : guess.padEnd(5);
            return (
              <div key={row} className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, col) => {
                  const letter = displayWord[col] ?? "";
                  const state: LetterState = res ? res[col] : "empty";
                  return (
                    <motion.div
                      key={col}
                      className={`w-full aspect-square border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors ${colorMap[state]}`}
                      initial={res && state !== "empty" ? { rotateX: 0 } : false}
                      animate={res ? { rotateX: [0, 90, 0] } : {}}
                      transition={{ delay: col * 0.1, duration: 0.4 }}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {(won || lost) && (
          <Card className="mb-6 shadow-gold">
            <CardContent className="py-6">
              {won ? (
                <>
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold mb-1">Excellent!</p>
                  <p className="text-muted-foreground mb-4">You got it in {guesses.length} {guesses.length === 1 ? "try" : "tries"}!</p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold mb-1">Nice Try!</p>
                  <p className="text-muted-foreground mb-4">The word was <span className="font-bold text-primary">{target}</span></p>
                </>
              )}
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />New Word</Button>
            </CardContent>
          </Card>
        )}

        {!won && !lost && (
          <div className="flex gap-2">
            <Input
              value={current}
              onChange={e => setCurrent(e.target.value.toUpperCase().slice(0, 5))}
              placeholder="Type a word..."
              className="text-center text-lg font-bold uppercase"
              maxLength={5}
            />
            <Button onClick={submit} disabled={current.length !== 5}>Guess</Button>
          </div>
        )}

        <div className="mt-6 flex gap-2 flex-wrap justify-center">
          {["correct = right spot", "present = wrong spot", "absent = not in word"].map((hint, i) => (
            <Badge key={i} variant="outline" className={`text-xs ${i === 0 ? "border-green-500 text-green-600" : i === 1 ? "border-yellow-500 text-yellow-600" : ""}`}>
              {hint}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
