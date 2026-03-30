import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, RotateCcw, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { kidsGameItems, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { cn } from "@/lib/utils";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  {
    title: "Bible Memory Games",
    description: "Match 12 famous Bible characters with their defining stories in this card-flip challenge.",
    href: "/bible-memory-games/",
    emoji: "🧩",
    cta: "Play Memory",
  },
  {
    title: "Bible Trivia Challenge",
    description: "Test your knowledge of scripture across three categories and three difficulty levels.",
    href: "/bible-trivia/",
    emoji: "🧠",
    cta: "Try the trivia",
  },
  {
    title: "Bible Word Hunt",
    description: "Find hidden biblical names and places in a freshly generated 12×12 letter grid.",
    href: "/bible-word-games/",
    emoji: "🔍",
    cta: "Start a word puzzle",
  },
];

interface Card {
  id: string; itemId: string; icon: string; name: string;
  isFlipped: boolean; isMatched: boolean;
}

function getStars(moves: number, pairs: number): number {
  const ratio = moves / pairs;
  if (ratio <= 1.4) return 3;
  if (ratio <= 2.0) return 2;
  return 1;
}

export default function KidsMatching() {
  const [cards, setCards]               = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked]         = useState(false);
  const [moves, setMoves]               = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [justMatched, setJustMatched]   = useState<string | null>(null);

  const initGame = () => {
    const duplicated = [...kidsGameItems, ...kidsGameItems];
    const newCards: Card[] = duplicated
      .map((item, index) => ({
        id: `${item.id}-${index}`, itemId: item.id,
        icon: item.icon, name: item.name,
        isFlipped: false, isMatched: false,
      }))
      .sort(() => 0.5 - Math.random());
    setCards(newCards); setFlippedIndices([]); setIsLocked(false);
    setMoves(0); setMatchedPairs(0); setJustMatched(null);
  };

  useEffect(() => { initGame(); }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    setCards(prev => { const c = [...prev]; c[index] = { ...c[index], isFlipped: true }; return c; });

    if (newFlipped.length === 2) {
      setIsLocked(true); setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].itemId === cards[secondIdx].itemId) {
        setTimeout(() => {
          setCards(prev => {
            const c = [...prev];
            c[firstIdx] = { ...c[firstIdx], isMatched: true };
            c[secondIdx] = { ...c[secondIdx], isMatched: true };
            return c;
          });
          setMatchedPairs(p => p + 1);
          setJustMatched(cards[firstIdx].name);
          setTimeout(() => setJustMatched(null), 1800);
          setFlippedIndices([]); setIsLocked(false);
          if (cards.every((c, i) => c.isMatched || i === firstIdx || i === secondIdx)) {
            confetti({ particleCount: 220, spread: 110, origin: { y: 0.5 } });
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => {
            const c = [...prev];
            c[firstIdx] = { ...c[firstIdx], isFlipped: false };
            c[secondIdx] = { ...c[secondIdx], isFlipped: false };
            return c;
          });
          setFlippedIndices([]); setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);
  const totalPairs = kidsGameItems.length;
  const stars = getStars(moves, totalPairs);

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Games for Kids – Fun & Educational Christian Games"
        description="Explore fun Bible games for kids including puzzles, matching games, and learning activities designed for children."
        canonicalPath="/kids-bible-games/"
      />
      <BreadcrumbSchema crumbs={[
        { name: "Home", path: "/" },
        { name: "Kids Games", path: "/kids-bible-games/" },
      ]} />
      <FAQSchema />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/50" />
        <div className="absolute top-8 left-10 text-5xl opacity-10 transform -rotate-12 select-none hidden sm:block">🕊️</div>
        <div className="absolute top-6 right-12 text-4xl opacity-10 transform rotate-6 select-none hidden sm:block">🌈</div>
        <div className="absolute bottom-8 right-10 text-5xl opacity-10 transform rotate-12 select-none hidden sm:block">🦁</div>
        <div className="absolute bottom-6 left-12 text-4xl opacity-10 transform -rotate-6 select-none hidden sm:block">🐘</div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <Smile className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative z-10">Fun Kids Matching Game</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-2xl mx-auto relative z-10">
          Find the matching Bible animals! Flip two cards at a time to discover pairs.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-card border border-border/60 rounded-2xl px-4 sm:px-5 py-2.5 text-center shadow-card min-w-[64px]">
              <span className="block text-xl sm:text-2xl font-display font-bold text-primary">{moves}</span>
              <span className="block text-xs text-muted-foreground font-medium uppercase tracking-wide">Moves</span>
            </div>
            <div className="bg-card border border-border/60 rounded-2xl px-4 sm:px-5 py-2.5 text-center shadow-card min-w-[64px]">
              <span className="block text-xl sm:text-2xl font-display font-bold text-emerald-500">{matchedPairs}</span>
              <span className="block text-xs text-muted-foreground font-medium uppercase tracking-wide">Pairs</span>
            </div>
          </div>
          <motion.button
            onClick={initGame}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 sm:px-6 py-2.5 rounded-2xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors inline-flex items-center gap-2 shadow-sm min-h-[44px] text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4" /> Restart
          </motion.button>
        </div>

        {/* Match toast */}
        <AnimatePresence>
          {justMatched && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 flex justify-center"
            >
              <span className="px-5 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm shadow-md">
                ✓ Match! {justMatched}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Win screen */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mb-10 py-6 sm:py-8 px-5 sm:px-8 bg-card rounded-3xl border-2 border-primary shadow-gold text-center"
            >
              <p className="text-5xl mb-4">🎉</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">You Won!</h2>
              <p className="text-muted-foreground mb-4 text-sm">
                Finished in <span className="text-primary font-bold">{moves}</span> moves
              </p>
              <div className="flex justify-center gap-1 mb-5">
                {[1, 2, 3].map(s => (
                  <motion.div key={s} initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: s * 0.12, type: "spring", stiffness: 300 }}
                  >
                    <Star className={cn("w-10 h-10", s <= stars ? "text-primary fill-primary" : "text-muted-foreground/30")} />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {stars === 3 ? "Amazing memory! 🏆" : stars === 2 ? "Great job! Keep practicing." : "Well done! Try to beat your score."}
              </p>
              <motion.button
                onClick={initGame}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold hover:shadow-lg transition-all"
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4 no-select" style={{ perspective: "1000px" }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.025, type: "spring", stiffness: 300, damping: 20 }}
              className={cn("relative aspect-square", !card.isMatched && "cursor-pointer")}
              onClick={() => handleCardClick(index)}
            >
              <motion.div
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                {/* Back face — question */}
                <motion.div
                  style={{ backfaceVisibility: "hidden" }}
                  whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.06, y: -4 } : {}}
                  whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.94 } : {}}
                  className={cn(
                    "absolute inset-0 rounded-2xl flex items-center justify-center border-2 shadow-card transition-colors",
                    card.isMatched
                      ? "border-primary/20 bg-primary/5"
                      : "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 hover:border-primary/50 hover:from-primary/15 hover:to-primary/8"
                  )}
                >
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-sm">
                    <span className="text-primary font-display font-bold text-base sm:text-xl">?</span>
                  </div>
                </motion.div>

                {/* Front face — animal */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className={cn(
                    "absolute inset-0 rounded-2xl flex flex-col items-center justify-center border-2 shadow-card transition-all",
                    card.isMatched
                      ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-300"
                      : "bg-card border-border"
                  )}
                >
                  <span className="text-3xl sm:text-5xl mb-1">{card.icon}</span>
                  <span className="text-xs font-semibold text-muted-foreground hidden sm:block text-center px-2 leading-tight">
                    {card.name}
                  </span>
                  {card.isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm"
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
        <RelatedGames games={RELATED} />
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">Engaging Children with Christian Games</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kids learn best when they're having fun. Our matching game uses colorful animal cards and simple flip mechanics to introduce children to the story of Noah's Ark. Once the cards are put away, it can be a lovely moment to read a short scripture together — you can pull one up instantly from our <a href="/bible-verse-generator/" className="text-primary hover:underline font-medium">Bible Verse Generator</a>, which has categories like Love, Hope, and Encouragement that are gentle enough for young hearts.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Builds memory and concentration skills</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> No ads, no external links — 100% safe for children</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Works great on phones and tablets</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Memory Verse Games for Kids</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            One of the best ways for children to internalize scripture is through repetition disguised as play. Memory-style games — like our flip-card matching challenge — build the same mental muscles needed to recall a Bible verse: attention, pattern recognition, and short-term retention.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            After a round of matching, parents and teachers can bridge the gap to a memory verse by connecting the animals on the cards to the Noah's Ark story. A short verse like Genesis 6:22 ("Noah did everything just as God commanded him") becomes far more memorable when a child has just spent five minutes thinking about the ark.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Bible Games for Sunday School and VBS</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sunday school teachers and VBS leaders are always looking for activities that keep kids engaged while staying on theme. Our kids' Bible games work well as a five-minute warm-up, a transition activity between sessions, or a quiet individual challenge for early finishers.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> No setup or printed materials needed — just open the page on a tablet or screen</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Safe, ad-free, and completely appropriate for group settings</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Works on phones, tablets, and shared classroom screens</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            For older kids and teens, pairing the matching game with a short discussion about Noah's obedience turns a simple activity into a meaningful group moment.
          </p>
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
