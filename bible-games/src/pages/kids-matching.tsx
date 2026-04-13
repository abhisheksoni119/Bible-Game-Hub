import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { id: "noah", label: "Noah's Ark", emoji: "⛵" },
  { id: "cross", label: "Cross", emoji: "✝️" },
  { id: "star", label: "Star of Bethlehem", emoji: "⭐" },
  { id: "dove", label: "Dove", emoji: "🕊️" },
  { id: "fish", label: "Fish", emoji: "🐟" },
  { id: "lamb", label: "Lamb", emoji: "🐑" },
  { id: "crown", label: "Crown", emoji: "👑" },
  { id: "book", label: "Bible", emoji: "📖" },
];

type CardState = {
  id: string;
  label: string;
  emoji: string;
  pairId: string;
  flipped: boolean;
  matched: boolean;
};

function buildCards(): CardState[] {
  const cards = items.flatMap((item, i) => [
    { ...item, pairId: `a${i}`, flipped: false, matched: false },
    { ...item, pairId: `b${i}`, flipped: false, matched: false },
  ]);
  return cards.sort(() => Math.random() - 0.5);
}

export default function KidsMatching() {
  const [cards, setCards] = useState<CardState[]>(buildCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a].id === cards[b].id) {
        setCards(prev => prev.map((c, i) => i === a || i === b ? { ...c, matched: true } : c));
        setFlipped([]);
      } else {
        const timer = setTimeout(() => {
          setCards(prev => prev.map((c, i) => i === a || i === b ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) setWon(true);
  }, [cards]);

  function flip(i: number) {
    if (flipped.length >= 2) return;
    if (cards[i].flipped || cards[i].matched) return;
    setCards(prev => prev.map((c, j) => j === i ? { ...c, flipped: true } : c));
    setFlipped(prev => [...prev, i]);
    setMoves(m => m + 1);
  }

  function reset() {
    setCards(buildCards());
    setFlipped([]);
    setMoves(0);
    setWon(false);
  }

  return (
    <>
      <Helmet>
        <title>Kids Bible Matching Game – Fun Bible Games for Children | Bible Games Online</title>
        <meta name="description" content="Play fun kids Bible matching games online. Match Bible symbols and characters in this free memory game for children." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Kids Bible Matching</h1>
        <p className="text-center text-muted-foreground mb-6">Flip cards to find matching Bible symbols!</p>

        <div className="flex justify-between items-center mb-6">
          <Badge variant="secondary">Moves: {moves}</Badge>
          <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>

        {won && (
          <Card className="text-center mb-6 shadow-gold p-6">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
            <h2 className="text-2xl font-bold mb-1">Amazing!</h2>
            <p className="text-muted-foreground mb-4">You matched all cards in {moves} moves!</p>
            <Button onClick={reset}>Play Again</Button>
          </Card>
        )}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <motion.div key={card.pairId} className="perspective-1000 cursor-pointer aspect-square" onClick={() => flip(i)} whileTap={{ scale: 0.95 }}>
              <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${card.flipped || card.matched ? "rotate-y-180" : ""}`}>
                <div className="absolute inset-0 backface-hidden bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-3xl">?</span>
                </div>
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex flex-col items-center justify-center gap-1 ${card.matched ? "bg-primary/20 border-2 border-primary" : "bg-card border border-border"}`}>
                  <span className="text-3xl">{card.emoji}</span>
                  <span className="text-xs font-medium text-center px-1 leading-tight">{card.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
