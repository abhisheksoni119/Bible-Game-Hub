import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { jeopardyCategories, jeopardyClues, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";

const VALUES = [200, 400, 600, 800, 1000];

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title:"Bible Trivia",       description:"Classic quiz questions across every Bible category.", href:"/bible-trivia/",         emoji:"🧠", cta:"Play Trivia" },
  { title:"Bible Millionaire",  description:"Climb the prize ladder with 15 Bible questions.",    href:"/bible-millionaire/",     emoji:"💰", cta:"Play Millionaire" },
  { title:"Bible Memory Games", description:"Match Bible characters with their iconic stories.",  href:"/bible-memory-games/",   emoji:"🧩", cta:"Play Memory" },
];

type ActiveClue = { category: string; value: number; clue: string; answer: string; options: string[] };

export default function BibleJeopardy() {
  const [score, setScore]             = useState(0);
  const [answered, setAnswered]       = useState<Set<string>>(new Set());
  const [active, setActive]           = useState<ActiveClue|null>(null);
  const [chosen, setChosen]           = useState<string|null>(null);
  const [gameOver, setGameOver]       = useState(false);

  const clueKey = (cat: string, val: number) => `${cat}-${val}`;
  const totalClues = jeopardyCategories.length * VALUES.length;

  const openClue = (cat: string, val: number) => {
    const key = clueKey(cat, val);
    if (answered.has(key)) return;
    const clue = jeopardyClues.find(c => c.category === cat && c.value === val);
    if (!clue) return;
    setActive({ ...clue }); setChosen(null);
  };

  const selectAnswer = (option: string) => {
    if (!active || chosen) return;
    setChosen(option);
    const key = clueKey(active.category, active.value);
    const newAnswered = new Set(answered); newAnswered.add(key);
    setAnswered(newAnswered);
    if (option === active.answer) {
      const newScore = score + active.value;
      setScore(newScore);
      if (newAnswered.size === totalClues) {
        confetti({ particleCount:150, spread:90, origin:{y:0.6} });
        setTimeout(() => setGameOver(true), 800);
      }
    } else {
      setScore(s => Math.max(0, s - active.value));
    }
  };

  const closeClue = () => { setActive(null); setChosen(null); };

  const reset = () => {
    setScore(0); setAnswered(new Set()); setActive(null);
    setChosen(null); setGameOver(false);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Jeopardy – Play Online Bible Quiz Game"
        description="Play Bible Jeopardy online with 6 categories and 30 clues. Old Testament, New Testament, Bible Heroes, and more. A fun scripture challenge for all ages."
        canonicalPath="/bible-jeopardy/"
      />
      <BreadcrumbSchema crumbs={[{ name:"Home", path:"/" }, { name:"Bible Jeopardy", path:"/bible-jeopardy/" }]} />
      <FAQSchema />
      <GameSchema
        name="Bible Jeopardy"
        url="https://biblegamesonline.net/bible-jeopardy/"
        description="Choose from 30 scripture clues across six Bible categories. Right answers earn points and wrong answers subtract in this Jeopardy-style quiz game."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:300,damping:20}}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">📺</span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Jeopardy</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Six categories · 30 clues · One score. Pick a category and value to reveal the clue.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-xl px-5 py-2.5">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-xl text-primary">${score.toLocaleString()}</span>
          <span className="text-secondary-foreground/60 text-sm">· {answered.size}/{totalClues} answered</span>
        </div>
      </div>

      {/* Board */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              className="text-center bg-primary/10 border border-primary/25 rounded-xl p-6 mb-6"
            >
              <p className="font-display font-bold text-2xl text-primary mb-1">Board Complete! 🎉</p>
              <p className="text-muted-foreground">Final score: <strong>${score.toLocaleString()}</strong></p>
              <button onClick={reset} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr>
                {jeopardyCategories.map(cat => (
                  <th key={cat} className="bg-primary text-primary-foreground font-display font-bold text-xs sm:text-sm p-2 sm:p-3 text-center border border-primary/50 rounded-t-lg">
                    {cat}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VALUES.map(val => (
                <tr key={val}>
                  {jeopardyCategories.map(cat => {
                    const key = clueKey(cat, val);
                    const done = answered.has(key);
                    return (
                      <td key={cat} className="p-1 sm:p-1.5 border border-border/40">
                        <button
                          onClick={() => openClue(cat, val)}
                          disabled={done}
                          className={`w-full h-12 sm:h-14 rounded-lg font-display font-bold text-base sm:text-lg transition-all duration-200 ${
                            done
                              ? "bg-muted/30 text-muted-foreground/30 cursor-default"
                              : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/25 hover:shadow-gold active:scale-95"
                          }`}
                        >
                          {done ? "—" : `$${val}`}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button onClick={reset} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset Board
          </button>
        </div>
      </section>

      {/* Clue modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={chosen ? closeClue : undefined}
          >
            <motion.div
              initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-card-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{active.category}</span>
                <span className="font-display font-bold text-xl text-primary">${active.value}</span>
              </div>
              <p className="text-lg sm:text-xl font-medium text-foreground mb-6 leading-relaxed">{active.clue}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.options.map(opt => {
                  const isCorrect = opt === active.answer;
                  const isChosen  = opt === chosen;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectAnswer(opt)}
                      disabled={!!chosen}
                      className={`px-4 py-3 rounded-xl font-semibold text-left transition-all duration-200 border-2 ${
                        !chosen            ? "border-border hover:border-primary hover:bg-primary/5 active:scale-95" :
                        isCorrect          ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                        isChosen           ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                                             "border-border bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {chosen && (
                <motion.div
                  initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                  className="mt-5 text-center"
                >
                  <p className={`font-bold text-base mb-1 ${chosen===active.answer ? "text-green-600" : "text-red-600"}`}>
                    {chosen===active.answer ? `+$${active.value} Correct! ✓` : `-$${active.value} Incorrect ✗`}
                  </p>
                  <button
                    onClick={closeClue}
                    className="mt-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Back to Board
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">How Bible Jeopardy Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            The board holds thirty clues spread across six categories: Old Testament, New Testament, Bible Heroes, Books of the Bible, Bible Places, and Bible Numbers. Lower dollar amounts warm you up with accessible facts; the $800 and $1,000 clues dig into lesser-known details that challenge even seasoned scripture readers. Pick a value, read the clue, and choose your answer from four options. Right answers add to your score — wrong answers subtract — so strategy matters as much as knowledge.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Great for Groups and Solo Play</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bible Jeopardy works beautifully as a Sunday school activity, youth group icebreaker, or family devotional game. Take turns picking clues, keep a shared score, and debate the answers together. Playing solo? Use it as a self-assessment tool to identify which parts of scripture you know well and which areas deserve deeper study. For more quiz-style challenges, explore our <a href="/bible-trivia/" className="text-primary hover:underline font-medium">Bible Trivia</a> or try your luck climbing the prize ladder in <a href="/bible-millionaire/" className="text-primary hover:underline font-medium">Bible Millionaire</a>.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-10">
        <RelatedGames games={RELATED} />
      </div>

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
