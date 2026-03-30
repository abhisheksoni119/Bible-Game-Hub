import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";
import { memoryPairs, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

type Card = { uid: string; pairId: number; side: "a"|"b"; label: string; emoji: string };

function buildDeck(): Card[] {
  const cards: Card[] = [];
  memoryPairs.forEach(p => {
    cards.push({ uid:`${p.id}-a`, pairId:p.id, side:"a", label:p.a.label, emoji:p.a.emoji });
    cards.push({ uid:`${p.id}-b`, pairId:p.id, side:"b", label:p.b.label, emoji:p.b.emoji });
  });
  return cards.sort(() => Math.random() - 0.5);
}

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title:"Kids Bible Games", description:"Fun matching games built for young scripture explorers.", href:"/kids-bible-games/", emoji:"🎮", cta:"Play Now" },
  { title:"Bible Trivia",     description:"Test your knowledge with quiz questions from every book.", href:"/bible-trivia/",     emoji:"🧠", cta:"Play Trivia" },
  { title:"Bible Jeopardy",   description:"Six categories, five clue values — pick your challenge.", href:"/bible-jeopardy/",   emoji:"📺", cta:"Play Jeopardy" },
];

export default function BibleMemoryGames() {
  const [deck, setDeck]         = useState<Card[]>(buildDeck);
  const [flipped, setFlipped]   = useState<string[]>([]);
  const [matched, setMatched]   = useState<number[]>([]);
  const [moves, setMoves]       = useState(0);
  const [locked, setLocked]     = useState(false);
  const [gameWon, setGameWon]   = useState(false);
  const [startTime, setStartTime] = useState<number|null>(null);
  const [elapsed, setElapsed]   = useState(0);

  useEffect(() => {
    if (!startTime || gameWon) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(id);
  }, [startTime, gameWon]);

  const flip = useCallback((card: Card) => {
    if (locked || flipped.includes(card.uid) || matched.includes(card.pairId)) return;
    if (!startTime) setStartTime(Date.now());
    const next = [...flipped, card.uid];
    setFlipped(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = next.map(uid => deck.find(c => c.uid === uid)!);
      if (a.pairId === b.pairId) {
        const newMatched = [...matched, a.pairId];
        setMatched(newMatched);
        setFlipped([]);
        setLocked(false);
        if (newMatched.length === memoryPairs.length) {
          setGameWon(true);
          confetti({ particleCount:120, spread:80, origin:{y:0.6} });
        }
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false); }, 900);
      }
    }
  }, [locked, flipped, matched, deck, startTime]);

  const reset = () => {
    setDeck(buildDeck()); setFlipped([]); setMatched([]);
    setMoves(0); setLocked(false); setGameWon(false);
    setStartTime(null); setElapsed(0);
  };

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Memory Games – Match Bible Characters & Stories Online"
        description="Play Bible memory matching games online. Match famous Bible characters with their stories in this faith-based card flip challenge for all ages."
        canonicalPath="/bible-memory-games/"
      />
      <BreadcrumbSchema crumbs={[{ name:"Home", path:"/" }, { name:"Bible Memory Games", path:"/bible-memory-games/" }]} />
      <FAQSchema />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:300,damping:20}}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">🧩</span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Memory Games</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Flip cards to match each Bible character with their famous story. Find all 12 pairs!
        </p>
        <div className="flex gap-6 justify-center mt-4 text-sm font-medium text-secondary-foreground/80">
          <span>⏱ {fmt(elapsed)}</span>
          <span>👆 {moves} moves</span>
          <span>✅ {matched.length}/{memoryPairs.length} matched</span>
        </div>
      </div>

      {/* Game Grid */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              className="text-center bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-xl p-4 mb-6"
            >
              <p className="font-bold text-lg mb-1">🎉 All pairs matched!</p>
              <p className="text-sm">{moves} moves · {fmt(elapsed)}</p>
              <button onClick={reset} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {deck.map(card => {
            const isFlipped  = flipped.includes(card.uid);
            const isMatched  = matched.includes(card.pairId);
            const faceUp     = isFlipped || isMatched;
            return (
              <motion.button
                key={card.uid}
                onClick={() => flip(card)}
                disabled={faceUp || locked}
                className={`relative h-20 sm:h-24 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                  isMatched ? "border-green-500 bg-green-50 dark:bg-green-900/20" :
                  faceUp    ? "border-primary bg-card" :
                              "border-border bg-secondary hover:border-primary/50 cursor-pointer"
                }`}
                whileTap={!faceUp ? { scale:0.92 } : {}}
                animate={faceUp ? { rotateY: 0 } : { rotateY: 0 }}
              >
                <AnimatePresence mode="wait">
                  {faceUp ? (
                    <motion.div
                      key="face"
                      initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                      className="absolute inset-0 flex flex-col items-center justify-center p-1 gap-1"
                    >
                      <span className="text-xl">{card.emoji}</span>
                      <span className="text-xs font-semibold text-foreground text-center leading-tight">{card.label}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="text-2xl">✝️</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button onClick={reset} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-4 h-4" /> Shuffle & Restart
          </button>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Match Bible Characters to Their Stories</h2>
          <p className="text-muted-foreground leading-relaxed">
            Twelve iconic figures from scripture — Moses, David, Esther, Jonah, Ruth, Daniel, and more — each paired with the defining moment that made their story unforgettable. Flip cards face-down on a shuffled board, reveal two at a time, and use your memory to connect characters with their celebrated acts of faith. Every match reinforces a story from God's Word in a way that sticks.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">A Faith-Focused Brain Challenge</h2>
          <p className="text-muted-foreground leading-relaxed">
            Memory games build concentration, pattern recognition, and recall — and when the content is scripture-based, the educational benefit doubles. Challenge yourself to beat your previous move count, or invite a friend and take turns. Younger players can tackle it with a parent and turn each revealed pair into a short conversation about that Bible character's life. Looking for more interactive learning? Try our <a href="/kids-bible-games/" className="text-primary hover:underline font-medium">Kids Bible Games</a> or the quick-fire rounds in <a href="/bible-jeopardy/" className="text-primary hover:underline font-medium">Bible Jeopardy</a>.
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
