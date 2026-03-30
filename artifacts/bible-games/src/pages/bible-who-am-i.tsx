import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { whoAmICharacters } from "@/lib/data";
import { homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";

const ROUNDS_PER_GAME = 8;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title: "Bible Trivia",       description: "Test your knowledge with 250+ quiz questions across three categories.", href: "/bible-trivia/",       emoji: "🧠", cta: "Play Trivia" },
  { title: "Bible Memory Games", description: "Match Bible heroes to their defining stories in this card-flip challenge.", href: "/bible-memory-games/", emoji: "🧩", cta: "Play Now" },
  { title: "Bible Jeopardy",     description: "Six scripture categories, 30 clues, and a running score to beat.",       href: "/bible-jeopardy/",     emoji: "📺", cta: "Play Jeopardy" },
];

export default function BibleWhoAmI() {
  const [chars, setChars] = useState(() => shuffle(whoAmICharacters).slice(0, ROUNDS_PER_GAME));
  const [round, setRound] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const current = chars[round];

  const options = useMemo(() => {
    if (!current) return [];
    const decoys = whoAmICharacters
      .filter(c => c.id !== current.id)
      .map(c => c.name);
    return shuffle([current.name, ...shuffle(decoys).slice(0, 3)]);
  }, [round, chars]);

  const pointsForClue = ROUNDS_PER_GAME - clueIndex;

  const handleGuess = (name: string) => {
    if (answered) return;
    setSelected(name);
    setAnswered(true);
    if (name === current.name) {
      const pts = pointsForClue;
      setScore(s => s + pts);
      if (round + 1 >= ROUNDS_PER_GAME) {
        setTimeout(() => {
          setGameOver(true);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }, 800);
      }
    }
  };

  const nextRound = () => {
    if (round + 1 >= ROUNDS_PER_GAME) {
      setGameOver(true);
      return;
    }
    setRound(r => r + 1);
    setClueIndex(0);
    setSelected(null);
    setAnswered(false);
  };

  const revealNextClue = () => {
    if (clueIndex < current.clues.length - 1) {
      setClueIndex(i => i + 1);
    }
  };

  const restart = () => {
    setChars(shuffle(whoAmICharacters).slice(0, ROUNDS_PER_GAME));
    setRound(0);
    setClueIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setGameOver(false);
  };

  const maxScore = ROUNDS_PER_GAME * 5;

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Who Am I? – Guess the Bible Character from Clues"
        description="Can you guess the Bible character from clues alone? Read up to 5 progressive hints and identify Moses, David, Esther, Paul, and more in this fun scripture quiz."
        canonicalPath="/bible-who-am-i/"
      />
      <BreadcrumbSchema crumbs={[{ name: "Home", path: "/" }, { name: "Bible Who Am I", path: "/bible-who-am-i/" }]} />
      <FAQSchema />
      <GameSchema
        name="Bible Who Am I"
        url="https://biblegamesonline.net/bible-who-am-i/"
        description="Read progressive clues and guess the Bible character — Moses, David, Esther, Paul, and more — using as few hints as possible to maximize your score."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">🔍</span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Who Am I?</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Read the clues one by one and guess the Bible character. Fewer clues = more points!
        </p>
        <div className="flex gap-6 justify-center mt-4 text-sm font-medium text-secondary-foreground/80">
          <span>📖 Round {Math.min(round + 1, ROUNDS_PER_GAME)}/{ROUNDS_PER_GAME}</span>
          <span>⭐ Score: {score}/{maxScore}</span>
        </div>
      </div>

      {/* Game Area */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {gameOver ? (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-primary/10 border-4 border-primary/20 text-primary mb-6 shadow-gold">
                <span className="text-3xl font-bold font-display">{score}/{maxScore}</span>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">
                {score >= maxScore * 0.8 ? "Bible Scholar! 🏆" : score >= maxScore * 0.5 ? "Well Done! 🌟" : "Keep Practicing! 📖"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {score >= maxScore * 0.8
                  ? "Outstanding — you identified most characters on the first clue!"
                  : score >= maxScore * 0.5
                  ? "Solid scripture knowledge. A few more rounds and you'll be unstoppable."
                  : "Every game teaches you something new. Try again and beat your score!"}
              </p>
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              {/* Character card */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card mb-6">
                {/* Header */}
                <div className="bg-muted/60 border-b border-border px-5 py-3.5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Who Am I?</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {answered ? `+${selected === current.name ? pointsForClue : 0} pts` : `Up to ${pointsForClue} pts remaining`}
                  </span>
                </div>

                {/* Clues */}
                <div className="p-5 sm:p-6 space-y-3">
                  {current.clues.slice(0, clueIndex + 1).map((clue, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                      className="flex gap-3"
                    >
                      <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-foreground leading-relaxed italic">"{clue}"</p>
                    </motion.div>
                  ))}
                </div>

                {/* Reveal clue button */}
                {!answered && clueIndex < current.clues.length - 1 && (
                  <div className="px-5 pb-4">
                    <button
                      onClick={revealNextClue}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" /> Reveal next clue (−1 pt)
                    </button>
                  </div>
                )}
              </div>

              {/* Answer options */}
              {!answered ? (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleGuess(opt)}
                      className="p-4 rounded-xl border-2 border-border bg-card text-left font-semibold text-sm hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all duration-150 active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    {/* Result banner */}
                    <div className={`rounded-xl p-4 mb-4 text-center font-bold ${selected === current.name ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800"}`}>
                      {selected === current.name
                        ? `✓ Correct! +${pointsForClue} points`
                        : `✗ The answer was ${current.name} ${current.emoji}`}
                    </div>
                    {/* Show all remaining clues */}
                    {clueIndex < current.clues.length - 1 && (
                      <div className="bg-card border border-border rounded-xl p-4 space-y-2 mb-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Remaining Clues</p>
                        {current.clues.slice(clueIndex + 1).map((clue, i) => (
                          <p key={i} className="text-sm text-muted-foreground italic">"{clue}"</p>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={nextRound}
                      className="w-full py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-gold"
                    >
                      {round + 1 >= ROUNDS_PER_GAME ? "See Final Score" : "Next Character →"}
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Guess the Bible Character from Clues</h2>
          <p className="text-muted-foreground leading-relaxed">
            Each round presents you with up to five progressive clues about a famous Bible figure — Moses, David, Esther, Paul, and nine others. The first clue is vague; the fifth is nearly unmistakable. Guess on the first clue for maximum points, or take your time and reveal more hints for a safer answer. It's a balance of confidence and caution.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Learn Scripture Through Identification</h2>
          <p className="text-muted-foreground leading-relaxed">
            Each clue is drawn directly from scripture, so even getting an answer wrong teaches you something real. You'll leave every session knowing more about the lives of Bible heroes — their trials, their faith, and the moments that defined them. Perfect for personal study, Sunday school warm-ups, or family devotion time. For more character-based challenges, explore our <a href="/bible-memory-games/" className="text-primary hover:underline font-medium">Bible Memory Games</a> or the broad knowledge test in <a href="/bible-trivia/" className="text-primary hover:underline font-medium">Bible Trivia</a>.
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
