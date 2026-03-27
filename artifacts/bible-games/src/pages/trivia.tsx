import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { triviaQuestions, homeFAQs, Category, Difficulty } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { cn } from "@/lib/utils";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  {
    title: "Bible Word Search",
    description: "Scan a 12×12 grid to find hidden scripture words. A fresh puzzle is generated every time.",
    href: "/bible-word-games",
    emoji: "🔍",
    cta: "Try the word puzzle",
  },
  {
    title: "Kids Bible Games",
    description: "A colorful flip-card matching game featuring animals from Noah's Ark — perfect for young learners.",
    href: "/kids-bible-games",
    emoji: "🎮",
    cta: "Play the matching game",
  },
];

type GameState = "setup" | "playing" | "results";

// ─── localStorage helpers for session freshness ──────────────────────────────
const SEEN_KEY = "bgo_seen_ids";

function getSeenIds(): Set<number> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? new Set<number>(JSON.parse(raw)) : new Set<number>();
  } catch {
    return new Set<number>();
  }
}

function recordSeenIds(ids: number[]): void {
  try {
    const seen = getSeenIds();
    ids.forEach(id => seen.add(id));
    // Keep the set from growing without bound: cap at last 500 seen IDs
    const arr = [...seen];
    const capped = arr.slice(-500);
    localStorage.setItem(SEEN_KEY, JSON.stringify(capped));
  } catch {
    // localStorage unavailable — degrade silently
  }
}

function shuffleArr<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Trivia() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [category, setCategory] = useState<Category>("general");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  
  const [activeQuestions, setActiveQuestions] = useState(triviaQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [newQuestionCount, setNewQuestionCount] = useState(0);

  const startGame = () => {
    const seen = getSeenIds();

    // Build candidate pool: exact match first, then same-category, then all
    const exact   = triviaQuestions.filter(q => q.category === category && q.difficulty === difficulty);
    const sameCat = triviaQuestions.filter(q => q.category === category && !exact.includes(q));
    const rest    = triviaQuestions.filter(q => !exact.includes(q) && !sameCat.includes(q));

    const pool: typeof triviaQuestions = [];
    pool.push(...shuffleArr(exact));
    if (pool.length < 10) pool.push(...shuffleArr(sameCat));
    if (pool.length < 10) pool.push(...shuffleArr(rest));

    // Prioritise unseen questions — split pool and put unseen first
    const unseen = pool.filter(q => !seen.has(q.id));
    const seenQ  = pool.filter(q => seen.has(q.id));
    const ordered = [...unseen, ...seenQ];

    const session = ordered.slice(0, 10);
    const freshCount = session.filter(q => !seen.has(q.id)).length;

    setActiveQuestions(session);
    setNewQuestionCount(freshCount);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOpt(null);
    setGameState("playing");
  };

  const handleAnswer = (index: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(index);
    
    const isCorrect = index === activeQuestions[currentIndex].correctIndex;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedOpt(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        if (finalScore > activeQuestions.length * 0.7) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        // Save played question IDs so next session prioritises new ones
        recordSeenIds(activeQuestions.map(q => q.id));
        setGameState("results");
      }
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-secondary text-secondary-foreground py-16 text-center px-4">
        <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Play Free Bible Trivia</h1>
        <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
          Test your biblical knowledge. Choose your category and difficulty to begin the challenge.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {gameState === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Game Setup</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Select Category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["general", "old-testament", "new-testament"] as Category[]).map(c => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={cn(
                          "px-4 py-3 rounded-xl font-medium border-2 transition-all",
                          category === c ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50 text-foreground"
                        )}
                      >
                        {c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Select Difficulty</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["easy", "medium", "hard"] as Difficulty[]).map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={cn(
                          "px-4 py-3 rounded-xl font-medium border-2 transition-all",
                          difficulty === d ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50 text-foreground"
                        )}
                      >
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={startGame}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
                  >
                    Start Trivia Game
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === "playing" && activeQuestions.length > 0 && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-12 shadow-xl shadow-black/5"
            >
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Question {currentIndex + 1} of {activeQuestions.length}</span>
                  <span className="font-semibold text-primary">Score: {score}</span>
                </div>
                <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentIndex) / activeQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 min-h-[5rem] flex items-center">
                {activeQuestions[currentIndex].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeQuestions[currentIndex].options.map((opt, i) => {
                  const isSelected = selectedOpt === i;
                  const isCorrect = i === activeQuestions[currentIndex].correctIndex;
                  const showCorrect = selectedOpt !== null && isCorrect;
                  const showWrong = selectedOpt !== null && isSelected && !isCorrect;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={selectedOpt !== null}
                      className={cn(
                        "p-5 rounded-xl text-left font-medium transition-all duration-300 border-2 flex items-center justify-between text-lg",
                        selectedOpt === null && "bg-background hover:border-primary hover:shadow-md",
                        showCorrect && "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                        showWrong && "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                        selectedOpt !== null && !showCorrect && !showWrong && "opacity-50 border-transparent bg-background",
                        selectedOpt === null && "border-border"
                      )}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>

              {selectedOpt !== null && activeQuestions[currentIndex].explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mt-6 p-4 rounded-xl bg-muted/60 border border-border"
                >
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Did you know?</p>
                  <p className="text-sm text-foreground leading-relaxed">{activeQuestions[currentIndex].explanation}</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5 text-center"
            >
              <Trophy className="w-20 h-20 mx-auto text-primary mb-6" />
              <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-xl text-muted-foreground mb-4">You scored {score} out of {activeQuestions.length}</p>

              {newQuestionCount > 0 && (
                <p className="text-sm text-primary font-semibold mb-6">
                  ✦ {newQuestionCount} new question{newQuestionCount !== 1 ? "s" : ""} this round
                </p>
              )}
              
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary/20 mb-8 relative">
                <span className="text-3xl font-bold text-primary">{Math.round((score / activeQuestions.length) * 100)}%</span>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setGameState("setup")}
                  className="px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                  <RotateCcw className="w-5 h-5" /> Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content & FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">

        <RelatedGames games={RELATED} />

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">About Our Bible Trivia Game</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bible trivia is one of the best ways to reinforce what you know about scripture — and discover what you don't. Our quiz covers everything from Genesis to Revelation.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You pick the category and difficulty, we do the rest. Each round gives you 10 questions with clear feedback after every answer.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> 3 categories: General, Old Testament, New Testament</li>
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> 3 difficulty levels: Easy, Medium, Hard</li>
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Great for solo play, youth groups, or family nights</li>
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
