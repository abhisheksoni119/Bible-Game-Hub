import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, RotateCcw, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { kidsGameItems, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { cn } from "@/lib/utils";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  {
    title: "Bible Trivia Challenge",
    description: "Test your knowledge of scripture across three categories and three difficulty levels.",
    href: "/bible-trivia",
    emoji: "🧠",
    cta: "Try the trivia",
  },
  {
    title: "Bible Word Hunt",
    description: "Find hidden biblical names and places in a freshly generated 12×12 letter grid.",
    href: "/bible-word-games",
    emoji: "🔍",
    cta: "Start a word puzzle",
  },
];

interface Card {
  id: string;
  itemId: string;
  icon: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function getStars(moves: number, pairs: number): number {
  const ratio = moves / pairs;
  if (ratio <= 1.4) return 3;
  if (ratio <= 2.0) return 2;
  return 1;
}

export default function KidsMatching() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [justMatched, setJustMatched] = useState<string | null>(null);

  const initGame = () => {
    const duplicated = [...kidsGameItems, ...kidsGameItems];
    const newCards: Card[] = duplicated
      .map((item, index) => ({
        id: `${item.id}-${index}`,
        itemId: item.id,
        icon: item.icon,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => 0.5 - Math.random());
    setCards(newCards);
    setFlippedIndices([]);
    setIsLocked(false);
    setMoves(0);
    setMatchedPairs(0);
    setJustMatched(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    setCards(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], isFlipped: true };
      return copy;
    });

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].itemId === cards[secondIdx].itemId) {
        setTimeout(() => {
          setCards(prev => {
            const copy = [...prev];
            copy[firstIdx] = { ...copy[firstIdx], isMatched: true };
            copy[secondIdx] = { ...copy[secondIdx], isMatched: true };
            return copy;
          });
          setMatchedPairs(p => p + 1);
          setJustMatched(cards[firstIdx].name);
          setTimeout(() => setJustMatched(null), 1800);
          setFlippedIndices([]);
          setIsLocked(false);

          if (cards.every((c, i) => c.isMatched || i === firstIdx || i === secondIdx)) {
            confetti({ particleCount: 220, spread: 110, origin: { y: 0.5 } });
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => {
            const copy = [...prev];
            copy[firstIdx] = { ...copy[firstIdx], isFlipped: false };
            copy[secondIdx] = { ...copy[secondIdx], isFlipped: false };
            return copy;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);
  const totalPairs = kidsGameItems.length;
  const stars = getStars(moves, totalPairs);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute top-8 left-10 text-5xl opacity-15 transform -rotate-12 select-none hidden sm:block">🕊️</div>
        <div className="absolute top-6 right-12 text-4xl opacity-15 transform rotate-6 select-none hidden sm:block">🌈</div>
        <div className="absolute bottom-8 right-10 text-5xl opacity-15 transform rotate-12 select-none hidden sm:block">🦁</div>
        <div className="absolute bottom-6 left-12 text-4xl opacity-15 transform -rotate-6 select-none hidden sm:block">🐘</div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Smile className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 text-primary relative z-10" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative z-10">Fun Kids Matching Game</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/80 max-w-2xl mx-auto relative z-10">
          Find the matching Bible animals! Flip two cards at a time to discover pairs.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="bg-card border border-border rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 text-center shadow-sm min-w-[60px]">
              <span className="block text-xl sm:text-2xl font-bold text-primary">{moves}</span>
              <span className="block text-xs text-muted-foreground font-medium uppercase tracking-wide">Moves</span>
            </div>
            <div className="bg-card border border-border rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 text-center shadow-sm min-w-[60px]">
              <span className="block text-xl sm:text-2xl font-bold text-emerald-500">{matchedPairs}</span>
              <span className="block text-xs text-muted-foreground font-medium uppercase tracking-wide">Pairs</span>
            </div>
          </div>
          <motion.button
            onClick={initGame}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors inline-flex items-center gap-2 shadow-sm min-h-[44px] text-sm sm:text-base"
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
              className="mb-8 sm:mb-10 py-6 sm:py-8 px-5 sm:px-8 bg-card rounded-3xl border-2 border-primary shadow-2xl shadow-primary/15 text-center"
            >
              <p className="text-5xl mb-4">🎉</p>
              <h2 className="text-3xl font-bold mb-2">You Won!</h2>
              <p className="text-muted-foreground mb-4">Finished in <span className="text-primary font-bold">{moves}</span> moves</p>

              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3].map(s => (
                  <motion.div
                    key={s}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: s * 0.12, type: "spring", stiffness: 300 }}
                  >
                    <Star
                      className={cn("w-10 h-10", s <= stars ? "text-primary fill-primary" : "text-muted-foreground/30")}
                    />
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
                className="px-8 py-4 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4" style={{ perspective: "1000px" }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.025, type: "spring", stiffness: 300, damping: 20 }}
              className={cn("relative aspect-square", !card.isMatched && "cursor-pointer")}
              onClick={() => handleCardClick(index)}
            >
              {/* 3-D flip wrapper */}
              <motion.div
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                {/* Back face (face down = question) */}
                <motion.div
                  style={{ backfaceVisibility: "hidden" }}
                  whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05, y: -3 } : {}}
                  whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                  className={cn(
                    "absolute inset-0 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-colors",
                    card.isMatched
                      ? "border-primary/30 bg-primary/5"
                      : "border-primary/25 bg-primary/8 hover:border-primary/50 hover:bg-primary/15"
                  )}
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg sm:text-2xl">?</span>
                  </div>
                </motion.div>

                {/* Front face (face up = animal) */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className={cn(
                    "absolute inset-0 rounded-2xl flex flex-col items-center justify-center border-2 shadow-md transition-all",
                    card.isMatched
                      ? "bg-emerald-50 border-emerald-300 dark:bg-emerald-900/25 dark:border-emerald-700"
                      : "bg-card border-border"
                  )}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl mb-1.5">{card.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground hidden sm:block text-center px-2 leading-tight">
                    {card.name}
                  </span>
                  {card.isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
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

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <RelatedGames games={RELATED} />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Engaging Children with Christian Games</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kids learn best when they're having fun. Our matching game uses colorful animal cards and simple flip mechanics to introduce children to the story of Noah's Ark.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            It's designed to be intuitive enough for young children to pick up instantly — no instructions needed.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Builds memory and concentration skills</li>
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> No ads, no external links — 100% safe for children</li>
            <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Works great on phones and tablets</li>
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
