import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Baby, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const animals = ["🦁", "🐑", "🕊️", "🐟", "🐍", "🐪"];

type Card = { id: string; emoji: string; pairId: number; flipped: boolean; matched: boolean };

function buildCards(): Card[] {
  const arr: Card[] = [];
  animals.forEach((a, i) => {
    arr.push({ id: `a${i}`, emoji: a, pairId: i, flipped: false, matched: false });
    arr.push({ id: `b${i}`, emoji: a, pairId: i, flipped: false, matched: false });
  });
  return arr.sort(() => Math.random() - 0.5);
}

export default function KidsMatching() {
  const [cards, setCards] = useState<Card[]>(buildCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a].pairId === cards[b].pairId) {
        setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setMatches((m) => m + 1);
        setFlipped([]);
      } else {
        const t = setTimeout(() => {
          setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
          setFlipped([]);
        }, 900);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matches === animals.length && matches > 0) setWon(true);
  }, [matches]);

  function flip(i: number) {
    if (flipped.length >= 2 || cards[i].flipped || cards[i].matched) return;
    setCards((prev) => prev.map((c, j) => (j === i ? { ...c, flipped: true } : c)));
    setFlipped((prev) => [...prev, i]);
    setMoves((m) => m + 1);
  }

  function reset() { setCards(buildCards()); setFlipped([]); setMoves(0); setMatches(0); setWon(false); }

  return (
    <>
      <Helmet>
        <title>Fun Kids Bible Matching Game – Free Online Game for Kids | Bible Games Online</title>
        <meta name="description" content="A bright, gentle matching game for kids — find pairs of Bible animals to discover them all. Free online game perfect for Sunday school." />
      </Helmet>

      <GameHero
        icon={<Baby className="w-6 h-6" />}
        title="Fun Kids Matching Game"
        subtitle="Find the matching Bible animals! Flip two cards at a time to discover pairs."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-5 md:p-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm">Moves: {moves}</Badge>
                <Badge className="bg-primary text-primary-foreground text-sm">Pairs: {matches}/{animals.length}</Badge>
              </div>
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" /> Restart
              </Button>
            </div>

            {won && (
              <div className="mb-5 rounded-2xl bg-primary/10 border border-primary/30 p-5 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="font-bold text-lg">You found them all!</p>
                <p className="text-sm text-muted-foreground">Completed in {moves} moves.</p>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {cards.map((card, i) => (
                <motion.button
                  key={card.id}
                  whileTap={{ scale: 0.95 }}
                  className="perspective-1000 cursor-pointer"
                  style={{ aspectRatio: "1" }}
                  onClick={() => flip(i)}
                >
                  <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${card.flipped || card.matched ? "rotate-y-180" : ""}`}>
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center text-3xl shadow-card border border-amber-300">
                      ?
                    </div>
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex items-center justify-center text-4xl
                      ${card.matched ? "bg-primary/15 border border-primary/40" : "bg-card border border-border"} shadow-card`}>
                      {card.emoji}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ExploreMoreGames cards={exploreOthers("kids", 4)} />

      <GameContent>
        <ContentBlock title="Engaging Children with Christian Games">
          <p>
            Kids learn best when they're having fun. Our matching game uses colorful animal cards and simple flip mechanics to introduce children to the story of Noah's ark. Once the cards are put away, it can be a lovely moment to read a short scripture together — you can pull one up instantly from our <a href="/bible-verse-generator/" className="text-primary font-medium underline-offset-4 hover:underline">Bible verse generator</a>, which has categories like Love, Hope, and Encouragement that age gently enough for young hearts.
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>Builds memory and concentration skills</li>
            <li>No ads, no external links — 100% safe for children</li>
            <li>Works great on phones and tablets</li>
          </ul>
        </ContentBlock>

        <ContentBlock title="Memory Verse Games for Kids">
          <p>
            One of the best ways for children to internalize scripture is through repetition disguised as play. Memory-style games — like our flip card matching challenge — use the same mental muscles needed to recall a Bible verse: attention, pattern recognition, and short-term retention.
          </p>
          <p>
            After a round of matching, parents and teachers can bridge the gap to memory verse by connecting the animals on the cards to the Noah's ark story. A short verse like Genesis 9:13 ("Noah did everything just as God commanded him") becomes far more memorable when a child has just spent five minutes thinking about the ark.
          </p>
        </ContentBlock>

        <ContentBlock title="Bible Games for Sunday School and VBS">
          <p>
            Sunday school teachers and VBS leaders are always looking for activities that keep kids engaged while staying on theme. Our Kids Bible Games work as a five-minute warm-up, a transition activity between sessions, or a quiet individual challenge for early finishers.
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>No setup or printed materials needed — just open the page on a tablet or screen</li>
            <li>Safe, ad-free, and completely appropriate for group settings</li>
            <li>Works on phones, tablets, and shared classroom screens</li>
          </ul>
          <p>
            For older kids and teens, pairing the matching game with a short discussion about Noah's obedience turns a simple activity into a meaningful group moment.
          </p>
        </ContentBlock>
      </GameContent>

      <FaqSection />
    </>
  );
}
