import { Helmet } from "react-helmet-async";
import { Grid3x3, Search, Type, User } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const PREVIEW_SIZE = 11;

function previewGrid() {
  const filled = new Set<string>();
  const words = [
    { word: "MOSES", r: 1, c: 2, dir: "h" },
    { word: "DAVID", r: 3, c: 4, dir: "v" },
    { word: "FAITH", r: 5, c: 1, dir: "h" },
    { word: "JOHN", r: 7, c: 6, dir: "h" },
    { word: "ARK", r: 2, c: 8, dir: "v" },
    { word: "PSALM", r: 9, c: 3, dir: "h" },
  ];
  for (const w of words) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === "h" ? w.r : w.r + i;
      const c = w.dir === "h" ? w.c + i : w.c;
      filled.add(`${r}-${c}`);
    }
  }
  return filled;
}

const filled = previewGrid();

export default function BibleCrossword() {
  return (
    <>
      <Helmet>
        <title>Bible Crossword Puzzle – Coming Soon | Bible Games Online</title>
        <meta name="description" content="A scripture-themed crossword grid with Bible names, places, and key terms from both testaments. Coming soon to Bible Games Online." />
      </Helmet>

      <GameHero
        icon={<Grid3x3 className="w-6 h-6" />}
        title="Bible Crossword Puzzle"
        subtitle="Fill in a scripture-themed crossword grid with Bible names, places, and key terms from both testaments."
        meta={<Badge className="bg-primary text-primary-foreground">⏳ COMING SOON</Badge>}
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-8 text-center">
            <p className="text-xs font-bold text-muted-foreground tracking-wider mb-3">PREVIEW OF THE CROSSWORD GRID</p>
            <div
              className="mx-auto mb-5 grid"
              style={{
                gridTemplateColumns: `repeat(${PREVIEW_SIZE}, minmax(0, 1fr))`,
                gap: "2px",
                maxWidth: "320px",
              }}
            >
              {Array.from({ length: PREVIEW_SIZE * PREVIEW_SIZE }, (_, i) => {
                const r = Math.floor(i / PREVIEW_SIZE);
                const c = i % PREVIEW_SIZE;
                const isFilled = filled.has(`${r}-${c}`);
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${isFilled ? "bg-primary/30 border border-primary/40" : "bg-muted/50 border border-border"}`}
                  />
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              We're building a full interactive Bible crossword with across clues, down clues, and hint buttons. Check back soon!
            </p>
            <p className="text-sm font-semibold mb-3">In the meantime, try our other word-based games:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild>
                <Link href="/bible-word-games/"><Search className="w-4 h-4 mr-1" /> Word Search</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/bible-wordle/"><Type className="w-4 h-4 mr-1" /> Bible Wordle</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/bible-who-am-i/"><User className="w-4 h-4 mr-1" /> Who Am I?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="Bible Crossword Puzzles Online">
          <p>
            A scripture crossword combines the satisfying logic of a crossword puzzle with the rich vocabulary of the Bible — names, places, and key terms woven together in a grid where every answer connects. Whether you're working through an across clue about a New Testament apostle or a down clue pointing to a place in the Old Testament, each answer reinforces something meaningful from God's Word.
          </p>
        </ContentBlock>
        <ContentBlock title="How Bible Crosswords Work">
          <p>
            Every crossword is built around a grid of intersecting words. Across clues run left to right, down clues run top to bottom. Each answer in a scripture-related word — a biblical name (NOAH, ESTHER, PAUL), a place (SINAI, BETHLEHEM, NAZARETH), or a key concept (GRACE, COVENANT, FAITH).
          </p>
          <p>
            The interlocking structure means that solving one answer can unlock letters for adjacent clues. Working out MOSES in the across direction might give you the M to start to crack a down clue about MARY. It rewards systematic thinking and broad scripture knowledge.
          </p>
        </ContentBlock>
        <ContentBlock title="Crosswords as a Study Tool">
          <p>
            Unlike passive study, a crossword engages active recall — the single most effective learning strategy. When a clue reads "Hebrew leader who parted the Red Sea (5 letters)," your brain searches its entire store of scripture knowledge before landing on MOSES. That retrieval process strengthens the memory far more than simply reading the name in a list.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Reinforces spelling of biblical names and places</li>
            <li>Broadens vocabulary of key scripture terms</li>
            <li>Ideal for group settings — teams can solve clues together</li>
          </ul>
          <p>
            Love puzzles? While the crossword is on its way, try our other tile-based challenges: arrange and slide pieces in <Link href="/bible-tiles/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Tiles</Link>, or assemble a complete biblical scene in our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jigsaw Puzzle</Link>.
          </p>
        </ContentBlock>
        <ContentBlock title="More Visual Bible Puzzles">
          <p>
            If you enjoy the patient, piece-by-piece feel of a crossword, try our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-semibold hover:underline">Bible Jigsaw Puzzle</Link> — over fifty illustrated scriptural scenes broken into draggable pieces, each finished image revealing a verse. For a quieter board game, <Link href="/bible-tiles/" className="text-primary font-semibold hover:underline">Bible Tiles</Link> offers a Mahjong-style matching challenge with biblical icons stacked across multiple layers.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("crossword", 4)} />
      <FaqSection />
    </>
  );
}
