import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Brain, RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const pairs = [
  { front: "Genesis", back: "Creation" },
  { front: "Exodus", back: "Moses' Journey" },
  { front: "Matthew", back: "Jesus's Birth" },
  { front: "Acts", back: "Early Church" },
  { front: "Psalms", back: "Songs of Praise" },
  { front: "Revelation", back: "End Times" },
  { front: "John", back: "God is Love" },
  { front: "Romans", back: "Salvation by Faith" },
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
        setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setFlipped([]);
      } else {
        const t = setTimeout(() => {
          setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
          setFlipped([]);
        }, 1100);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) setWon(true);
  }, [cards]);

  function flip(i: number) {
    if (flipped.length >= 2 || cards[i].flipped || cards[i].matched) return;
    setCards((prev) => prev.map((c, j) => (j === i ? { ...c, flipped: true } : c)));
    setFlipped((prev) => [...prev, i]);
    setMoves((m) => m + 1);
  }

  function reset() { setCards(buildCards()); setFlipped([]); setMoves(0); setWon(false); }

  return (
    <>
      <Helmet>
        <title>Bible Memory Games – Match Bible Books | Bible Games Online</title>
        <meta name="description" content="Match Bible books to their themes in this fun memory card-flip game. A great way to learn scripture by association." />
      </Helmet>

      <GameHero
        icon={<Brain className="w-6 h-6" />}
        title="Bible Memory Game"
        subtitle="Match each Bible book with its key theme — flip two cards at a time."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-5 md:p-7">
            <div className="flex items-center justify-between mb-5">
              <Badge variant="secondary">Moves: {moves}</Badge>
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" /> Restart
              </Button>
            </div>

            {won && (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 text-center mb-5">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold mb-1">Excellent Memory!</p>
                <p className="text-sm text-muted-foreground">Completed in {moves} moves.</p>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
              {cards.map((card, i) => (
                <motion.button
                  key={card.id}
                  whileTap={{ scale: 0.95 }}
                  className="perspective-1000 cursor-pointer"
                  style={{ aspectRatio: "1" }}
                  onClick={() => flip(i)}
                >
                  <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${card.flipped || card.matched ? "rotate-y-180" : ""}`}>
                    <div className="absolute inset-0 backface-hidden bg-secondary text-primary rounded-xl flex items-center justify-center text-2xl shadow-card">
                      📖
                    </div>
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center p-2 text-center text-xs font-bold leading-tight shadow-card
                      ${card.matched ? "bg-primary/15 border border-primary/40 text-primary" : "bg-card border border-border text-foreground"}`}>
                      {card.text}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="A Memory Game Built on Scripture">
          <p>
            Memory matching is a deceptively simple format that builds real recall. Our Bible Memory game pairs the names of biblical books with the themes most associated with them — Genesis with Creation, Acts with the Early Church, Romans with Salvation by Faith. Flip cards two at a time and try to find every pair using the fewest moves possible.
          </p>
        </ContentBlock>
        <ContentBlock title="Why This Works for Bible Learning">
          <p>
            Pairing book names with themes accelerates the kind of mental indexing that helps you locate passages quickly later. After a few rounds, you'll naturally start associating "Acts" with the spread of the early church or "John" with the famous love declaration in 3:16. It's a simple game with a deep payoff for personal study, Sunday school, or family devotional time. For more visual recall practice, try sliding the pieces in <Link href="/bible-tiles/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Tiles</Link> or assembling a scene in our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jigsaw Puzzle</Link>.
          </p>
        </ContentBlock>
        <ContentBlock title="More Matching-Style Bible Games">
          <p>
            If you enjoy the rhythm of finding pairs, try our <Link href="/bible-tiles/" className="text-primary font-semibold hover:underline">Bible Tiles</Link> game — a peaceful Mahjong-style board where you remove pairs of free tiles decorated with biblical icons until the layout is cleared. For a more visual puzzle, our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-semibold hover:underline">Bible Jigsaw Puzzle</Link> lets you reassemble more than fifty illustrated scenes from scripture, from Noah's Ark to the empty tomb, with a verse waiting at the end of every completed picture.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("memory", 4)} />
      <FaqSection />
    </>
  );
}
