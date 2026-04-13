import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const pairs = [
  { front: "Genesis", back: "Creation" },
  { front: "Exodus", back: "Moses" },
  { front: "Matthew", back: "Jesus's Birth" },
  { front: "Acts", back: "Early Church" },
  { front: "Psalms", back: "Songs of Praise" },
  { front: "Revelation", back: "End Times" },
  { front: "John", back: "God is Love" },
  { front: "Romans", back: "Salvation" },
];

type MemCard = { id: string; text: string; pairId: number; flipped: boolean; matched: boolean };

function buildCards(): MemCard[] {
  const cards: MemCard[] = [];
  pairs.forEach((p, i) => {
    cards.push({ id: `f${i}`, text: p.front, pairId: i, flipped: false, matched: false });
    cards.push({ id: `b${i}`, text: p.back, pairId: i, flipped: false, matched: false });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export default function BibleMemoryGames() {
  const [cards, setCards] = useState<MemCard[]>(buildCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a].pairId === cards[b].pairId) {
        setCards(prev => prev.map((c, i) => i === a || i === b ? { ...c, matched: true } : c));
        setFlipped([]);
      } else {
        const t = setTimeout(() => {
          setCards(prev => prev.map((c, i) => i === a || i === b ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 1200);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) setWon(true);
  }, [cards]);

  function flip(i: number) {
    if (flipped.length >= 2 || cards[i].flipped || cards[i].matched) return;
    setCards(prev => prev.map((c, j) => j === i ? { ...c, flipped: true } : c));
    setFlipped(prev => [...prev, i]);
    setMoves(m => m + 1);
  }

  function reset() { setCards(buildCards()); setFlipped([]); setMoves(0); setWon(false); }

  return (
    <>
      <Helmet>
        <title>Bible Memory Games – Match Bible Books and Topics | Bible Games Online</title>
        <meta name="description" content="Play Bible memory games online. Match Bible books with their topics and themes in this fun memory card game." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Bible Memory Game</h1>
        <p className="text-center text-muted-foreground mb-6">Match each Bible book with its theme</p>

        <div className="flex justify-between items-center mb-6">
          <Badge variant="secondary">Moves: {moves}</Badge>
          <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>

        {won && (
          <Card className="text-center mb-6 shadow-gold">
            <CardContent className="py-6">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
              <h2 className="text-2xl font-bold mb-2">Excellent Memory!</h2>
              <p className="text-muted-foreground mb-4">Completed in {moves} moves</p>
              <Button onClick={reset}>Play Again</Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className="perspective-1000 cursor-pointer"
              style={{ aspectRatio: "1" }}
              onClick={() => flip(i)}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${card.flipped || card.matched ? "rotate-y-180" : ""}`}>
                <div className="absolute inset-0 backface-hidden bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center p-2 text-center text-xs font-bold leading-tight
                  ${card.matched ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
                  {card.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
