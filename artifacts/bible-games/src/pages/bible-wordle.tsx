import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen } from "lucide-react";
import { wordleWords, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

type TileState = "correct" | "present" | "absent" | "empty" | "filled";

function getTileStates(guess: string, target: string): TileState[] {
  const result: TileState[] = Array(WORD_LENGTH).fill("absent");
  const targetArr = target.split("");
  const used = Array(WORD_LENGTH).fill(false);
  // First pass: correct
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === targetArr[i]) { result[i] = "correct"; used[i] = true; }
  }
  // Second pass: present
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guess[i] === targetArr[j]) {
        result[i] = "present"; used[j] = true; break;
      }
    }
  }
  return result;
}

function pickWord(): string {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return wordleWords[seed % wordleWords.length];
}

const TILE_COLORS: Record<TileState, string> = {
  correct: "bg-green-600 border-green-600 text-white",
  present: "bg-yellow-500 border-yellow-500 text-white",
  absent:  "bg-gray-600  border-gray-600  text-white",
  empty:   "bg-transparent border-border text-foreground",
  filled:  "bg-transparent border-primary/60 text-foreground",
};

const KEY_COLORS: Record<string, string> = {
  correct: "bg-green-600 text-white",
  present: "bg-yellow-500 text-white",
  absent:  "bg-gray-600 text-white",
  default: "bg-muted text-foreground hover:bg-muted/70",
};

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title: "Bible Word Search", description: "Find hidden scripture words in a grid puzzle.", href: "/bible-word-games/", emoji: "🔍", cta: "Search Words" },
  { title: "Bible Trivia",      description: "Test your scripture knowledge across all categories.", href: "/bible-trivia/", emoji: "🧠", cta: "Play Trivia" },
  { title: "Bible Wheel of Fortune", description: "Guess the hidden Bible phrase letter by letter.", href: "/bible-wheel-of-fortune/", emoji: "🎡", cta: "Spin the Wheel" },
];

export default function BibleWordle() {
  const [target]       = useState(pickWord);
  const [guesses, setGuesses]   = useState<string[]>([]);
  const [current, setCurrent]   = useState("");
  const [gameState, setGameState] = useState<"playing"|"won"|"lost">("playing");
  const [shake, setShake]       = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);

  const letterStates = useCallback((): Record<string, TileState> => {
    const map: Record<string, TileState> = {};
    guesses.forEach(g => {
      getTileStates(g, target).forEach((state, i) => {
        const letter = g[i];
        const priority: TileState[] = ["correct","present","absent"];
        if (!map[letter] || priority.indexOf(state) < priority.indexOf(map[letter])) {
          map[letter] = state;
        }
      });
    });
    return map;
  }, [guesses, target]);

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LENGTH) { setShake(true); setTimeout(() => setShake(false), 600); return; }
    const newGuesses = [...guesses, current];
    setGuesses(newGuesses);
    setRevealed(prev => [...prev, newGuesses.length - 1]);
    setCurrent("");
    if (current === target) { setTimeout(() => setGameState("won"), 400); }
    else if (newGuesses.length >= MAX_GUESSES) { setTimeout(() => setGameState("lost"), 400); }
  }, [current, guesses, target]);

  const handleKey = useCallback((key: string) => {
    if (gameState !== "playing") return;
    if (key === "ENTER")        { submitGuess(); return; }
    if (key === "⌫" || key === "BACKSPACE") { setCurrent(p => p.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) setCurrent(p => p + key);
  }, [gameState, submitGuess, current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKey(e.key.toUpperCase());
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const reset = () => {
    setGuesses([]); setCurrent(""); setGameState("playing"); setRevealed([]);
  };

  const lStates = letterStates();

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Wordle – Guess the 5-Letter Bible Word"
        description="Play Bible Wordle online — guess a 5-letter Bible word in 6 tries. A fun daily scripture word puzzle for Christians of all ages."
        canonicalPath="/bible-wordle/"
      />
      <BreadcrumbSchema crumbs={[{ name:"Home", path:"/" }, { name:"Bible Wordle", path:"/bible-wordle/" }]} />
      <FAQSchema />
      <GameSchema
        name="Bible Wordle"
        url="https://biblegamesonline.net/bible-wordle/"
        description="Guess the hidden five-letter Bible word in six tries. Color-coded feedback reveals whether each letter is correct, misplaced, or not in the word."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:300, damping:20 }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">📖</span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Wordle</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Guess the 5-letter Bible word in 6 attempts. Green = correct spot, Yellow = wrong spot.
        </p>
      </div>

      {/* Game */}
      <section className="max-w-lg mx-auto px-4 py-8">
        {/* Grid */}
        <div className="grid gap-2 mb-6">
          {Array.from({ length: MAX_GUESSES }, (_, row) => {
            const guess = guesses[row] ?? "";
            const isActive = row === guesses.length && gameState === "playing";
            const displayWord = isActive ? current.padEnd(WORD_LENGTH) : guess.padEnd(WORD_LENGTH);
            const states = guesses[row] ? getTileStates(guesses[row], target) : null;
            const isRevealed = revealed.includes(row);
            return (
              <motion.div
                key={row}
                className="grid grid-cols-5 gap-2"
                animate={isActive && shake ? { x: [-6,6,-4,4,-2,2,0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {Array.from({ length: WORD_LENGTH }, (_, col) => {
                  const letter = displayWord[col] ?? "";
                  const tileState: TileState = states
                    ? (isRevealed ? states[col] : "filled")
                    : (isActive && letter.trim() ? "filled" : "empty");
                  return (
                    <motion.div
                      key={col}
                      className={`h-14 w-full flex items-center justify-center rounded-lg border-2 font-display font-bold text-xl uppercase select-none transition-colors ${TILE_COLORS[tileState]}`}
                      animate={states && isRevealed ? { rotateX: [0, -90, 0], transition: { delay: col * 0.1, duration: 0.5 } } : {}}
                    >
                      {letter.trim()}
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>

        {/* Win/Lose Banner */}
        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div
              initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              className={`text-center rounded-xl p-4 mb-4 ${gameState==="won" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}
            >
              <p className="font-bold text-lg mb-1">
                {gameState === "won" ? "🎉 Well done!" : `The word was ${target}`}
              </p>
              {gameState === "won" && <p className="text-sm">You guessed it in {guesses.length} {guesses.length===1?"try":"tries"}!</p>}
              <button onClick={reset} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                <RotateCcw className="w-4 h-4" /> New Word
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard */}
        <div className="space-y-2">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1.5">
              {row.map(key => {
                const st = lStates[key];
                const color = st ? KEY_COLORS[st] : KEY_COLORS.default;
                const wide = key === "ENTER" || key === "⌫";
                return (
                  <button
                    key={key}
                    onClick={() => handleKey(key)}
                    className={`${wide ? "px-3 text-xs min-w-[52px]" : "w-9"} h-12 rounded-lg font-bold text-sm transition-colors ${color}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button onClick={reset} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-4 h-4" /> New Game
          </button>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">How to Play Bible Wordle</h2>
          <p className="text-muted-foreground leading-relaxed">
            Each day brings a fresh five-letter word drawn straight from scripture — a character, a place, a concept, or a virtue found in the Bible. Type any guess using the on-screen keyboard or your physical keys, then hit Enter. Tiles flip to reveal how close you are: <span className="font-semibold text-green-600">green</span> means the letter is exactly right, <span className="font-semibold text-yellow-500">yellow</span> means it appears elsewhere in the word, and gray means it isn't present at all.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">A Word Puzzle With Purpose</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bible Wordle blends the satisfaction of a word puzzle with the richness of Christian vocabulary. Words like GRACE, PEACE, FAITH, PSALM, and MANNA challenge your letter-elimination skills while keeping your mind anchored in scripture. Whether you solve it in two tries or need all six, every round is a small celebration of biblical language. Share your result with friends or your small group — no spoilers needed, just colored squares.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Enjoy more faith-based word challenges in our <a href="/bible-word-games/" className="text-primary hover:underline font-medium">Bible Word Search</a> or try your knowledge in <a href="/bible-trivia/" className="text-primary hover:underline font-medium">Bible Trivia</a>.
          </p>
        </div>
      </section>

      {/* Related */}
      <div className="max-w-3xl mx-auto px-4 pb-10">
        <RelatedGames games={RELATED} />
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-display font-bold">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion items={homeFAQs} />
      </section>
    </div>
  );
}
