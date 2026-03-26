import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { kidsGameItems, homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { cn } from "@/lib/utils";

interface Card {
  id: string; // unique per card instance
  itemId: string; // matching pairs share this
  icon: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function KidsMatching() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    // Duplicate items to make pairs
    const duplicated = [...kidsGameItems, ...kidsGameItems];
    
    // Create distinct card objects and shuffle
    const newCards: Card[] = duplicated
      .map((item, index) => ({
        id: `${item.id}-${index}`,
        itemId: item.id,
        icon: item.icon,
        name: item.name,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => 0.5 - Math.random());

    setCards(newCards);
    setFlippedIndices([]);
    setIsLocked(false);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    
    // Optimistically flip the card
    setCards(prev => {
      const copy = [...prev];
      copy[index].isFlipped = true;
      return copy;
    });

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);
      
      const [firstIdx, secondIdx] = newFlipped;
      
      if (cards[firstIdx].itemId === cards[secondIdx].itemId) {
        // Match!
        setTimeout(() => {
          setCards(prev => {
            const copy = [...prev];
            copy[firstIdx].isMatched = true;
            copy[secondIdx].isMatched = true;
            return copy;
          });
          setFlippedIndices([]);
          setIsLocked(false);
          
          // Check win
          if (cards.every((c, i) => c.isMatched || i === firstIdx || i === secondIdx)) {
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
          }
        }, 500);
      } else {
        // No match, unflip after delay
        setTimeout(() => {
          setCards(prev => {
            const copy = [...prev];
            copy[firstIdx].isFlipped = false;
            copy[secondIdx].isFlipped = false;
            return copy;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-16 text-center px-4 relative overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 transform -rotate-12">🕊️</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 transform rotate-12">🦁</div>
        
        <Smile className="w-12 h-12 mx-auto mb-4 text-primary relative z-10" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 relative z-10">Fun Kids Matching Game</h1>
        <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto relative z-10">
          Find the matching Bible animals! Flip two cards at a time to discover pairs.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold text-muted-foreground">Moves: <span className="text-primary">{moves}</span></div>
          <button
            onClick={initGame}
            className="px-6 py-2 rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
        </div>

        {isWon && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 py-6 px-6 bg-primary/20 text-foreground rounded-2xl font-bold text-3xl border-2 border-primary text-center flex flex-col items-center justify-center gap-4 shadow-xl shadow-primary/10"
          >
            🎉 You Won in {moves} moves! 🎉
            <button
              onClick={initGame}
              className="px-8 py-3 text-lg rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md mt-2"
            >
              Play Again
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 perspective-1000">
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className="relative aspect-square cursor-pointer group"
              onClick={() => handleCardClick(index)}
            >
              <div 
                className={cn(
                  "w-full h-full transition-transform duration-500 transform-style-3d relative",
                  card.isFlipped ? "rotate-y-180" : ""
                )}
              >
                {/* Front of card (Face down state) */}
                <div className="absolute w-full h-full backface-hidden bg-primary/10 border-2 border-primary/30 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary/20 group-hover:-translate-y-1 transition-all">
                  <div className="w-1/2 h-1/2 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">?</span>
                  </div>
                </div>

                {/* Back of card (Face up state) */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-card border-2 border-border rounded-2xl flex flex-col items-center justify-center shadow-md">
                  <span className="text-4xl sm:text-5xl md:text-6xl mb-2">{card.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground hidden sm:block">{card.name}</span>
                </div>
              </div>
              
              {/* Matched overlay indicator */}
              {card.isMatched && (
                <div className="absolute inset-0 bg-green-500/20 rounded-2xl z-10 pointer-events-none border-2 border-green-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-16">
          <h2>Engaging Children with Christian Games</h2>
          <p>
            It is essential to introduce children to biblical themes in a way that is engaging, colorful, and fun. Our matching games are tailored specifically for younger audiences. The intuitive drag-and-drop or flip mechanics help develop hand-eye coordination and short-term memory, while the subject matter introduces them to classic Bible stories like Noah's Ark.
          </p>
          <p>
            Because our website contains no ads or external pop-ups, parents can feel completely confident letting their children explore and play on Bible Games Online.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={homeFAQs} />
      </div>
    </div>
  );
}
