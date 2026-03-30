import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";
import { wheelPhrases, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";

const MAX_WRONG = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const VOWELS   = new Set("AEIOU");

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title:"Bible Wordle",     description:"Guess the 5-letter Bible word in 6 tries.", href:"/bible-wordle/",      emoji:"📖", cta:"Play Wordle" },
  { title:"Bible Word Search", description:"Hunt for hidden scripture words in a grid.", href:"/bible-word-games/",  emoji:"🔍", cta:"Search Words" },
  { title:"Bible Jeopardy",   description:"Six categories of Bible clues await you.", href:"/bible-jeopardy/",    emoji:"📺", cta:"Play Jeopardy" },
];

function pickPhrase() {
  return wheelPhrases[Math.floor(Math.random() * wheelPhrases.length)];
}

export default function BibleWheelOfFortune() {
  const [phrase, setPhrase] = useState(pickPhrase);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [spinning, setSpinning] = useState(false);

  const letters = phrase.phrase.replace(/[^A-Z ]/g, "").split("");
  const uniqueLetters = new Set(letters.filter(l => l !== " "));
  const wrongGuesses  = [...guessed].filter(l => !uniqueLetters.has(l));
  const correctGuesses = [...guessed].filter(l => uniqueLetters.has(l));
  const won  = [...uniqueLetters].every(l => guessed.has(l));
  const lost = wrongGuesses.length >= MAX_WRONG;
  const playing = !won && !lost;

  const guess = useCallback((letter: string) => {
    if (!playing || guessed.has(letter)) return;
    const next = new Set(guessed); next.add(letter);
    setGuessed(next);
    if ([...uniqueLetters].every(l => next.has(l))) {
      confetti({ particleCount:100, spread:70, origin:{y:0.6} });
    }
  }, [playing, guessed, uniqueLetters]);

  const spin = () => {
    setSpinning(true);
    setTimeout(() => { setSpinning(false); }, 700);
  };

  const reset = () => {
    setPhrase(pickPhrase()); setGuessed(new Set()); setSpinning(false);
  };

  const hangmanParts = [
    <line key="h1" x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>,
    <line key="h2" x1="50" y1="80" x2="50" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>,
    <line key="h3" x1="50" y1="10" x2="70" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>,
    <line key="h4" x1="70" y1="10" x2="70" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>,
    <circle key="h5" cx="70" cy="26" r="6" stroke="currentColor" strokeWidth="3" fill="none"/>,
    <line key="h6" x1="70" y1="32" x2="70" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>,
    <line key="h7" x1="70" y1="40" x2="60" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>,
    <line key="h8" x1="70" y1="40" x2="80" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>,
    <line key="h9" x1="70" y1="55" x2="62" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>,
    <line key="h10" x1="70" y1="55" x2="78" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>,
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Wheel of Fortune – Guess the Bible Phrase Letter by Letter"
        description="Play Bible Wheel of Fortune online. Guess hidden Bible verses and phrases letter by letter in this fun Christian word game for all ages."
        canonicalPath="/bible-wheel-of-fortune/"
      />
      <BreadcrumbSchema crumbs={[{ name:"Home", path:"/" }, { name:"Bible Wheel of Fortune", path:"/bible-wheel-of-fortune/" }]} />
      <FAQSchema />
      <GameSchema
        name="Bible Wheel of Fortune"
        url="https://biblegamesonline.net/bible-wheel-of-fortune/"
        description="Reveal a hidden Bible phrase letter by letter before your six wrong guesses run out in this scripture word-reveal challenge."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:300,damping:20}}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <motion.span
              className="text-2xl inline-block"
              animate={spinning ? { rotate:360 } : { rotate:0 }}
              transition={{ duration:0.7, ease:"easeOut" }}
            >🎡</motion.span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Wheel of Fortune</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Guess the hidden Bible phrase one letter at a time before you run out of chances.
        </p>
      </div>

      {/* Game */}
      <section className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Gallows */}
        <div className="flex items-center gap-6 justify-center">
          <svg viewBox="0 0 100 90" className="w-24 h-24 text-foreground/40">
            {hangmanParts.slice(0, wrongGuesses.length)}
          </svg>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-1">Wrong guesses</p>
            <div className="flex flex-wrap gap-1.5 max-w-[200px]">
              {wrongGuesses.map(l => (
                <span key={l} className="w-8 h-8 flex items-center justify-center rounded-md bg-red-100 text-red-700 font-bold text-sm dark:bg-red-900/30 dark:text-red-300">{l}</span>
              ))}
              {Array.from({length: MAX_WRONG - wrongGuesses.length}, (_, i) => (
                <span key={i} className="w-8 h-8 rounded-md border border-dashed border-border" />
              ))}
            </div>
          </div>
        </div>

        {/* Phrase display */}
        <div className="flex flex-wrap gap-2 justify-center">
          {letters.map((letter, i) => {
            if (letter === " ") return <div key={i} className="w-4" />;
            const revealed = guessed.has(letter) || won;
            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className={`text-lg font-bold font-display w-8 text-center transition-all ${revealed ? "text-foreground" : "text-transparent"}`}>
                  {letter}
                </span>
                <div className="w-8 h-0.5 bg-foreground/30 rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Reference */}
        <p className="text-center text-sm text-muted-foreground italic">— {phrase.reference}</p>

        {/* Result */}
        <AnimatePresence>
          {(won || lost) && (
            <motion.div
              initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              className={`text-center rounded-xl p-4 ${won ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}
            >
              <p className="font-bold text-lg">{won ? "🎉 Excellent!" : "The phrase was:"}</p>
              {lost && <p className="font-semibold mt-1">{phrase.phrase}</p>}
              <button onClick={reset} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                <RotateCcw className="w-4 h-4" /> New Phrase
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin button */}
        {playing && (
          <div className="flex justify-center">
            <button onClick={spin} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors">
              <motion.span animate={spinning?{rotate:360}:{}} transition={{duration:0.7}}>🎡</motion.span> Spin Wheel
            </button>
          </div>
        )}

        {/* Alphabet keyboard */}
        <div className="flex flex-wrap gap-2 justify-center">
          {ALPHABET.map(letter => {
            const isGuessed = guessed.has(letter);
            const isCorrect = isGuessed && uniqueLetters.has(letter);
            const isWrong   = isGuessed && !uniqueLetters.has(letter);
            return (
              <button
                key={letter}
                onClick={() => guess(letter)}
                disabled={isGuessed || !playing}
                className={`w-9 h-9 rounded-lg font-bold text-sm transition-colors ${
                  isCorrect ? "bg-green-500 text-white cursor-default" :
                  isWrong   ? "bg-gray-300 text-gray-400 cursor-default dark:bg-gray-700 dark:text-gray-500" :
                  VOWELS.has(letter) ? "bg-yellow-100 border border-yellow-300 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300" :
                  "bg-muted text-foreground hover:bg-muted/60"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button onClick={reset} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-4 h-4" /> New Phrase
          </button>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Reveal the Hidden Bible Verse</h2>
          <p className="text-muted-foreground leading-relaxed">
            Twelve beloved passages from scripture — from Psalm 23 to John 3:16 — hide behind rows of blank tiles. Click any letter to guess; consonants reveal for free while yellow-highlighted vowels add a touch of strategy. Make too many wrong guesses and the gallows fills in — but the phrase and its Bible reference are always shown at the end, turning every loss into a learning moment.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Scripture That Sticks</h2>
          <p className="text-muted-foreground leading-relaxed">
            Repetition is one of the most effective ways to memorize scripture, and this word puzzle makes that process enjoyable. Each time you uncover a phrase like "Walk by Faith Not by Sight" or "For God So Loved the World," the words land with fresh impact. It's a natural fit for personal devotion, Sunday school warm-ups, or a friendly family challenge. Pair it with our <a href="/bible-wordle/" className="text-primary hover:underline font-medium">Bible Wordle</a> for a complete word-game devotional session.
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
