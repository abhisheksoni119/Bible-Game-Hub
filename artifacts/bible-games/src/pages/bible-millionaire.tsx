import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen, Phone, Users, Scissors } from "lucide-react";
import confetti from "canvas-confetti";
import { triviaQuestions, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

const PRIZES = [
  "$100","$200","$300","$500","$1,000",
  "$2,000","$4,000","$8,000","$16,000","$32,000",
  "$64,000","$125,000","$250,000","$500,000","$1,000,000",
];
const SAFE_HAVENS = [4, 9]; // indices (1-indexed levels 5 and 10)

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title:"Bible Trivia",    description:"Fast-paced quiz with 9 categories and 3 difficulty levels.", href:"/bible-trivia/",    emoji:"🧠", cta:"Play Trivia" },
  { title:"Bible Jeopardy",  description:"Pick clues from 6 scripture categories for points.",        href:"/bible-jeopardy/",  emoji:"📺", cta:"Play Jeopardy" },
  { title:"Bible Wordle",    description:"Guess a 5-letter Bible word in just 6 tries.",              href:"/bible-wordle/",    emoji:"📖", cta:"Play Wordle" },
];

function buildQuestions() {
  const easy   = triviaQuestions.filter(q => q.difficulty === "easy");
  const medium = triviaQuestions.filter(q => q.difficulty === "medium");
  const hard   = triviaQuestions.filter(q => q.difficulty === "hard");
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
  return [
    ...shuffle(easy).slice(0, 5),
    ...shuffle(medium).slice(0, 5),
    ...shuffle(hard).slice(0, 5),
  ];
}

export default function BibleMillionaire() {
  const [questions]   = useState(buildQuestions);
  const [level, setLevel]         = useState(0);
  const [chosen, setChosen]       = useState<number|null>(null);
  const [gameState, setGameState] = useState<"playing"|"won"|"lost">("playing");
  const [walked, setWalked]       = useState(false);

  // Lifelines
  const [used5050, setUsed5050]   = useState(false);
  const [usedPhone, setUsedPhone] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [eliminated, setEliminated]     = useState<number[]>([]);
  const [phoneHint, setPhoneHint]       = useState<string|null>(null);
  const [audienceData, setAudienceData] = useState<number[]|null>(null);

  const q = questions[level];

  const bankAmount = useMemo(() => {
    if (level === 0) return "$0";
    const safeIdx = SAFE_HAVENS.filter(i => i < level).pop();
    return safeIdx !== undefined ? PRIZES[safeIdx] : "$0";
  }, [level]);

  const selectAnswer = (idx: number) => {
    if (chosen !== null || gameState !== "playing") return;
    setChosen(idx);
    setEliminated([]); setPhoneHint(null); setAudienceData(null);
    if (idx === q.correctIndex) {
      if (level + 1 >= PRIZES.length) {
        setTimeout(() => { setGameState("won"); confetti({ particleCount:200, spread:100, origin:{y:0.5} }); }, 500);
      } else {
        setTimeout(() => { setLevel(l => l + 1); setChosen(null); }, 1200);
      }
    } else {
      setTimeout(() => setGameState("lost"), 500);
    }
  };

  const walkAway = () => {
    setWalked(true);
    setGameState("won");
  };

  const use5050 = () => {
    if (used5050 || gameState !== "playing" || chosen !== null) return;
    setUsed5050(true);
    const wrong = q.options.map((_, i) => i).filter(i => i !== q.correctIndex);
    const toElim = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminated(toElim);
  };

  const usePhone = () => {
    if (usedPhone || gameState !== "playing" || chosen !== null) return;
    setUsedPhone(true);
    const hint = Math.random() < 0.8 ? q.options[q.correctIndex] : q.options[(q.correctIndex + 1) % 4];
    setPhoneHint(`"I'm pretty sure it's... ${hint}"`);
  };

  const useAudience = () => {
    if (usedAudience || gameState !== "playing" || chosen !== null) return;
    setUsedAudience(true);
    const percentages = q.options.map((_, i) => i === q.correctIndex ? 0 : 0);
    const correct = 45 + Math.floor(Math.random() * 30);
    const rest = 100 - correct;
    const others = [Math.floor(rest * 0.45), Math.floor(rest * 0.35)];
    others.push(rest - others[0] - others[1]);
    const result = Array(4).fill(0);
    result[q.correctIndex] = correct;
    let j = 0;
    q.options.forEach((_, i) => { if (i !== q.correctIndex) { result[i] = others[j++]; } });
    setAudienceData(result);
  };

  const reset = () => {
    setLevel(0); setChosen(null); setGameState("playing"); setWalked(false);
    setUsed5050(false); setUsedPhone(false); setUsedAudience(false);
    setEliminated([]); setPhoneHint(null); setAudienceData(null);
  };

  const getOptionClass = (idx: number) => {
    if (eliminated.includes(idx)) return "opacity-20 cursor-default border-border text-muted-foreground";
    if (chosen === null) return "border-border hover:border-primary hover:bg-primary/5 active:scale-95 cursor-pointer";
    if (idx === q.correctIndex) return "border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (idx === chosen)         return "border-red-500 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    return "border-border bg-muted/20 text-muted-foreground";
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Millionaire – Win $1,000,000 in Bible Trivia"
        description="Play Bible Millionaire online — answer 15 scripture questions and climb the prize ladder. Use lifelines to win the ultimate Bible quiz challenge."
        canonicalPath="/bible-millionaire/"
      />
      <BreadcrumbSchema crumbs={[{ name:"Home", path:"/" }, { name:"Bible Millionaire", path:"/bible-millionaire/" }]} />
      <FAQSchema />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:300,damping:20}}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">💰</span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Millionaire</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Answer 15 Bible questions correctly and win $1,000,000. Use your lifelines wisely!
        </p>
      </div>

      {/* Game Area */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main game */}
          <div className="flex-1 space-y-6">
            {/* Lifelines */}
            <div className="flex gap-3 justify-center flex-wrap">
              {[
                { icon:<Scissors className="w-4 h-4"/>, label:"50:50",    used:used5050,    action:use5050 },
                { icon:<Phone    className="w-4 h-4"/>, label:"Phone",    used:usedPhone,   action:usePhone },
                { icon:<Users    className="w-4 h-4"/>, label:"Audience", used:usedAudience,action:useAudience },
              ].map(ll => (
                <button
                  key={ll.label}
                  onClick={ll.action}
                  disabled={ll.used || gameState !== "playing" || chosen !== null}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                    ll.used ? "border-border text-muted-foreground/40 cursor-default" :
                    gameState !== "playing" ? "border-border text-muted-foreground/40 cursor-default" :
                    "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {ll.icon} {ll.label}
                </button>
              ))}
            </div>

            {/* Hints */}
            <AnimatePresence>
              {phoneHint && (
                <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300 text-center">
                  📞 Your friend says: <em>{phoneHint}</em>
                </motion.div>
              )}
              {audienceData && (
                <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                  <p className="text-xs font-bold text-purple-600 dark:text-purple-300 mb-3 text-center uppercase tracking-wider">👥 Audience Vote</p>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => (
                      <div key={i} className={`flex items-center gap-3 ${eliminated.includes(i) ? "opacity-25" : ""}`}>
                        <span className="text-xs font-bold text-muted-foreground w-16 truncate">{opt}</span>
                        <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                          <div
                            className="h-full bg-purple-400 dark:bg-purple-600 rounded-full transition-all duration-700"
                            style={{width:`${audienceData[i]}%`}}
                          />
                        </div>
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-300 w-9 text-right">{audienceData[i]}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question or End screen */}
            <AnimatePresence mode="wait">
              {gameState === "playing" ? (
                <motion.div key={level} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}>
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Question {level+1} of 15</span>
                      <span className="font-display font-bold text-primary text-lg">{PRIZES[level]}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed mb-6">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => !eliminated.includes(i) && selectAnswer(i)}
                          disabled={chosen !== null || eliminated.includes(i)}
                          className={`px-4 py-3 rounded-xl font-semibold text-left transition-all duration-200 border-2 ${getOptionClass(i)}`}
                        >
                          <span className="text-primary font-bold mr-2">{["A","B","C","D"][i]}:</span>{opt}
                        </button>
                      ))}
                    </div>
                    {level > 0 && chosen === null && (
                      <div className="mt-4 text-center">
                        <button onClick={walkAway} className="text-sm text-muted-foreground hover:text-primary transition-colors underline">
                          Walk away with {PRIZES[level-1]}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="end" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                  className="bg-card border border-border rounded-2xl p-8 text-center shadow-card"
                >
                  {gameState === "won" ? (
                    <>
                      <p className="text-4xl mb-3">{walked ? "👏" : "🏆"}</p>
                      <h2 className="font-display font-bold text-2xl text-primary mb-2">
                        {walked ? "You walked away!" : "You're a Bible Millionaire!"}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        You won <strong className="text-foreground">{walked ? PRIZES[Math.max(0,level-1)] : "$1,000,000"}</strong>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-4xl mb-3">😔</p>
                      <h2 className="font-display font-bold text-2xl mb-2">Incorrect</h2>
                      <p className="text-muted-foreground mb-2">Correct answer: <strong className="text-foreground">{q.options[q.correctIndex]}</strong></p>
                      <p className="text-muted-foreground mb-6">You bank: <strong className="text-foreground">{bankAmount}</strong></p>
                    </>
                  )}
                  <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
                    <RotateCcw className="w-4 h-4" /> Play Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prize Ladder */}
          <div className="lg:w-44 hidden lg:block">
            <div className="bg-card border border-border rounded-2xl p-4 sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center">Prize Ladder</p>
              <div className="space-y-1">
                {[...PRIZES].reverse().map((prize, ri) => {
                  const idx = PRIZES.length - 1 - ri;
                  const isCurrent = idx === level && gameState === "playing";
                  const isPast    = idx < level;
                  const isSafe    = SAFE_HAVENS.includes(idx);
                  return (
                    <div
                      key={prize}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isCurrent ? "bg-primary text-primary-foreground shadow-gold" :
                        isPast    ? "text-green-600 dark:text-green-400" :
                        isSafe    ? "text-yellow-600 dark:text-yellow-400 border border-yellow-300/40" :
                        "text-muted-foreground"
                      }`}
                    >
                      <span>{idx+1}</span>
                      <span>{prize}</span>
                      {isSafe && <span className="text-[10px]">🔒</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">How Bible Millionaire Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            Fifteen questions stand between you and a million dollars in Bible knowledge. The first five are drawn from easy scripture facts, the middle five test your familiarity with characters and events, and the top five challenge even seasoned Bible students. Each question comes with four multiple-choice options. Two safe havens protect your winnings at Question 5 ($1,000) and Question 10 ($32,000) — answer incorrectly before a safe haven and you walk away empty-handed.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Use Your Lifelines Wisely</h2>
          <p className="text-muted-foreground leading-relaxed">
            Three lifelines help when scripture gets tricky. <strong>50:50</strong> eliminates two wrong answers, <strong>Phone a Friend</strong> offers a helpful hint, and <strong>Ask the Audience</strong> shows what percentage of players chose each option. Save them for the high-value questions — or use them early if a question stumps you before a safe haven. For more Bible quiz action, try our <a href="/bible-trivia/" className="text-primary hover:underline font-medium">Bible Trivia</a> or challenge yourself with the board game format of <a href="/bible-jeopardy/" className="text-primary hover:underline font-medium">Bible Jeopardy</a>.
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
