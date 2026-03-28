import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, BookOpen, Layers, Flame, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { triviaQuestions, homeFAQs, Category, Difficulty } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { cn } from "@/lib/utils";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  {
    title: "Bible Word Search",
    description: "Scan a 12×12 grid to find hidden scripture words. A fresh puzzle every time.",
    href: "/bible-word-games",
    emoji: "🔍",
    cta: "Try the word puzzle",
  },
  {
    title: "Kids Bible Games",
    description: "A colorful flip-card matching game with Noah's Ark animals — perfect for young learners.",
    href: "/kids-bible-games",
    emoji: "🎮",
    cta: "Play the matching game",
  },
];

type GameState = "setup" | "playing" | "results";
const SEEN_KEY = "bgo_seen_ids";

function getSeenIds(): Set<number> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? new Set<number>(JSON.parse(raw)) : new Set<number>();
  } catch { return new Set<number>(); }
}
function recordSeenIds(ids: number[]): void {
  try {
    const seen = getSeenIds();
    ids.forEach(id => seen.add(id));
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-500)));
  } catch {}
}
function shuffleArr<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const CATEGORY_META: Record<Category, { label: string; icon: React.ReactNode; desc: string }> = {
  "general":       { label: "General",       icon: <BookOpen className="w-5 h-5" />,  desc: "Across both testaments" },
  "old-testament": { label: "Old Testament", icon: <Layers className="w-5 h-5" />,    desc: "Genesis to Malachi" },
  "new-testament": { label: "New Testament", icon: <Sparkles className="w-5 h-5" />,  desc: "Matthew to Revelation" },
};
const DIFFICULTY_META: Record<Difficulty, { label: string; color: string; desc: string }> = {
  easy:   { label: "Easy",   color: "text-emerald-500", desc: "Great for beginners" },
  medium: { label: "Medium", color: "text-amber-500",   desc: "Some knowledge needed" },
  hard:   { label: "Hard",   color: "text-red-500",     desc: "For scripture scholars" },
};

function getResultMessage(pct: number) {
  if (pct === 100) return { title: "Perfect Score!",  sub: "You're a Bible champion!" };
  if (pct >= 80)  return { title: "Excellent!",       sub: "You really know your scripture." };
  if (pct >= 60)  return { title: "Well Done!",       sub: "Solid biblical knowledge." };
  if (pct >= 40)  return { title: "Good Effort!",     sub: "Keep studying the Word." };
  return           { title: "Keep Learning!",          sub: "Every game makes you stronger." };
}

export default function Trivia() {
  const [gameState, setGameState]   = useState<GameState>("setup");
  const [category, setCategory]     = useState<Category>("general");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [activeQuestions, setActiveQuestions] = useState(triviaQuestions);
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [score, setScore]                     = useState(0);
  const [selectedOpt, setSelectedOpt]         = useState<number | null>(null);
  const [newQuestionCount, setNewQuestionCount] = useState(0);

  const startGame = () => {
    const seen    = getSeenIds();
    const exact   = triviaQuestions.filter(q => q.category === category && q.difficulty === difficulty);
    const sameCat = triviaQuestions.filter(q => q.category === category && !exact.includes(q));
    const rest    = triviaQuestions.filter(q => !exact.includes(q) && !sameCat.includes(q));
    const pool: typeof triviaQuestions = [];
    pool.push(...shuffleArr(exact));
    if (pool.length < 10) pool.push(...shuffleArr(sameCat));
    if (pool.length < 10) pool.push(...shuffleArr(rest));
    const unseen  = pool.filter(q => !seen.has(q.id));
    const seenQ   = pool.filter(q => seen.has(q.id));
    const session = [...unseen, ...seenQ].slice(0, 10);
    setActiveQuestions(session);
    setNewQuestionCount(session.filter(q => !seen.has(q.id)).length);
    setCurrentIndex(0); setScore(0); setSelectedOpt(null);
    setGameState("playing");
  };

  const handleAnswer = (index: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(index);
    const isCorrect = index === activeQuestions[currentIndex].correctIndex;
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(i => i + 1); setSelectedOpt(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        if (finalScore > activeQuestions.length * 0.7) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
        recordSeenIds(activeQuestions.map(q => q.id));
        setGameState("results");
      }
    }, 1600);
  };

  const pct = Math.round((score / activeQuestions.length) * 100);
  const resultMsg = getResultMessage(pct);

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Trivia Games Online – Play Quiz & Test Your Knowledge"
        description="Play Bible trivia games online with multiple categories and difficulty levels. Test your knowledge with fun and engaging quiz questions."
        canonicalPath="/bible-trivia/"
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative">Play Free Bible Trivia</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-2xl mx-auto relative">
          Test your biblical knowledge. Choose your category and difficulty to begin the challenge.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">

          {/* ── SETUP ── */}
          {gameState === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-card rounded-3xl p-5 sm:p-8 md:p-12 shadow-card-lg border border-border/60"
            >
              <h2 className="text-2xl font-display font-bold mb-1 text-center">Game Setup</h2>
              <p className="text-muted-foreground text-center mb-7 sm:mb-10 text-sm">Pick your challenge below</p>

              <div className="space-y-8">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">Select Category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(Object.keys(CATEGORY_META) as Category[]).map(c => {
                      const meta = CATEGORY_META[c];
                      const active = category === c;
                      return (
                        <motion.button
                          key={c}
                          onClick={() => setCategory(c)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "px-4 py-4 rounded-2xl font-medium border-2 transition-all text-left flex flex-col gap-1 shadow-sm",
                            active
                              ? "border-primary bg-primary/8 text-primary shadow-gold"
                              : "border-border bg-background hover:border-primary/40 hover:bg-muted/50 text-foreground"
                          )}
                        >
                          <span className={cn("mb-1", active ? "text-primary" : "text-muted-foreground")}>{meta.icon}</span>
                          <span className="font-bold text-sm sm:text-base">{meta.label}</span>
                          <span className="text-xs text-muted-foreground font-normal">{meta.desc}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">Select Difficulty</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["easy", "medium", "hard"] as Difficulty[]).map(d => {
                      const meta = DIFFICULTY_META[d];
                      const active = difficulty === d;
                      return (
                        <motion.button
                          key={d}
                          onClick={() => setDifficulty(d)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "px-4 py-4 rounded-2xl font-medium border-2 transition-all text-left shadow-sm",
                            active
                              ? "border-primary bg-primary/8 text-primary shadow-gold"
                              : "border-border bg-background hover:border-primary/40 hover:bg-muted/50 text-foreground"
                          )}
                        >
                          <span className={cn("block text-lg font-display font-bold mb-0.5", active ? "text-primary" : meta.color)}>
                            {meta.label}
                          </span>
                          <span className="text-xs text-muted-foreground font-normal">{meta.desc}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    onClick={startGame}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-gold hover:shadow-lg hover:bg-primary/90 flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Flame className="w-5 h-5" />
                    Start Trivia Game
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PLAYING ── */}
          {gameState === "playing" && activeQuestions.length > 0 && (
            <motion.div
              key={`playing-${currentIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-card rounded-3xl p-4 sm:p-7 md:p-10 shadow-card-lg border border-border/60"
            >
              {/* Progress header */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                      {currentIndex + 1}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">of {activeQuestions.length}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                    <Trophy className="w-4 h-4" />
                    {score} pts
                  </div>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-primary h-full rounded-full"
                    initial={{ width: `${(currentIndex / activeQuestions.length) * 100}%` }}
                    animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.h3
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-5 sm:mb-7 leading-snug"
              >
                {activeQuestions[currentIndex].question}
              </motion.h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeQuestions[currentIndex].options.map((opt, i) => {
                  const isSelected  = selectedOpt === i;
                  const isCorrect   = i === activeQuestions[currentIndex].correctIndex;
                  const showCorrect = selectedOpt !== null && isCorrect;
                  const showWrong   = selectedOpt !== null && isSelected && !isCorrect;
                  const dimmed      = selectedOpt !== null && !showCorrect && !showWrong;

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={selectedOpt !== null}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: dimmed ? 0.35 : 1, y: 0, scale: showCorrect ? 1.02 : showWrong ? 0.98 : 1 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      whileHover={selectedOpt === null ? { scale: 1.02, y: -2 } : {}}
                      whileTap={selectedOpt === null ? { scale: 0.98 } : {}}
                      className={cn(
                        "p-4 rounded-2xl text-left font-medium transition-colors border-2 flex items-center justify-between gap-3 text-sm sm:text-base leading-snug shadow-sm",
                        selectedOpt === null && "bg-background border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-md cursor-pointer",
                        showCorrect && "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-md",
                        showWrong   && "bg-red-50 border-red-400 text-red-800",
                        dimmed      && "bg-background border-border cursor-default"
                      )}
                    >
                      <span>{opt}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />}
                      {showWrong   && <XCircle      className="w-5 h-5 shrink-0 text-red-500" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {selectedOpt !== null && activeQuestions[currentIndex].explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">Did you know?</p>
                      <p className="text-sm text-foreground leading-relaxed">{activeQuestions[currentIndex].explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              className="bg-card rounded-3xl p-5 sm:p-8 md:p-12 shadow-card-lg border border-border/60 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 250 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-5 shadow-gold"
              >
                <Trophy className="w-10 h-10 text-primary" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-1">{resultMsg.title}</h2>
                <p className="text-muted-foreground mb-6 text-sm">{resultMsg.sub}</p>
              </motion.div>

              {/* Score ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-32 h-32 rounded-full border-[6px] border-primary/20 bg-primary/5 mb-5 shadow-gold"
              >
                <div>
                  <span className="block text-4xl font-display font-bold text-primary">{pct}%</span>
                  <span className="block text-xs text-muted-foreground">{score}/{activeQuestions.length}</span>
                </div>
              </motion.div>

              {newQuestionCount > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="text-sm text-primary font-semibold mb-5"
                >
                  ✦ {newQuestionCount} new question{newQuestionCount !== 1 ? "s" : ""} this round
                </motion.p>
              )}

              {/* Score breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-8"
              >
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                  <span className="block text-2xl font-bold text-emerald-600">{score}</span>
                  <span className="text-xs text-emerald-700 font-medium">Correct</span>
                </div>
                <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                  <span className="block text-2xl font-bold text-red-500">{activeQuestions.length - score}</span>
                  <span className="text-xs text-red-600 font-medium">Missed</span>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <motion.button
                  onClick={startGame}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Play Again
                </motion.button>
                <motion.button
                  onClick={() => setGameState("setup")}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl font-bold border-2 border-border hover:border-primary/50 text-foreground hover:bg-muted/50 transition-all inline-flex items-center justify-center gap-2"
                >
                  Change Settings
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
        <RelatedGames games={RELATED} />
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">About Our Bible Trivia Game</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bible trivia is one of the best ways to reinforce what you know about scripture — and discover what you don't. Our quiz covers everything from Genesis to Revelation.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> 3 categories: General, Old Testament, New Testament</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> 3 difficulty levels: Easy, Medium, Hard</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Great for solo play, youth groups, or family nights</li>
          </ul>
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
