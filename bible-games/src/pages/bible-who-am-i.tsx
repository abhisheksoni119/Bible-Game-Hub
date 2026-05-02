import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { User, RotateCcw, Trophy, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const characters = [
  {
    name: "Moses",
    decoys: ["Joseph", "Jonah", "David", "Paul"],
    clues: [
      "I was hidden in a basket as a baby on the Nile",
      "I was raised in Pharaoh's palace as an Egyptian prince",
      "God spoke to me through a burning bush",
      "I led my people out of Egypt across the Red Sea",
      "I received the Ten Commandments on Mount Sinai",
    ],
  },
  {
    name: "David",
    decoys: ["Saul", "Solomon", "Samuel", "Jonathan"],
    clues: [
      "I was the youngest of eight brothers",
      "I was a shepherd boy in the hills of Bethlehem",
      "I defeated a giant warrior with a sling and stone",
      "I wrote many of the Psalms",
      "I became the second king of Israel",
    ],
  },
  {
    name: "Mary",
    decoys: ["Martha", "Ruth", "Esther", "Sarah"],
    clues: [
      "I was a young woman from Nazareth",
      "An angel named Gabriel appeared to me with surprising news",
      "I was engaged to a humble carpenter named Joseph",
      "I gave birth to my son in a stable in Bethlehem",
      "I am the mother of Jesus",
    ],
  },
  {
    name: "Noah",
    decoys: ["Abraham", "Methuselah", "Enoch", "Shem"],
    clues: [
      "I was considered righteous in my generation",
      "God gave me very specific building instructions",
      "I built a very large wooden vessel on dry land",
      "I gathered two of every kind of animal",
      "A rainbow was God's promise to me",
    ],
  },
  {
    name: "Paul",
    decoys: ["Peter", "Barnabas", "Stephen", "Timothy"],
    clues: [
      "I was born in Tarsus and was a Roman citizen",
      "I once persecuted early Christians intensely",
      "I was struck blind by a bright light on the road to Damascus",
      "I went on three major missionary journeys",
      "I wrote many letters that became books of the New Testament",
    ],
  },
];

const TOTAL_ROUNDS = 5;
const POINTS_PER_CLUE = [40, 32, 24, 16, 8];

export default function BibleWhoAmI() {
  const [round, setRound] = useState(0);
  const [pool] = useState(() => [...characters].sort(() => Math.random() - 0.5).slice(0, TOTAL_ROUNDS));
  const character = pool[round];
  const [clueIdx, setClueIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const options = pool[round]
    ? [...character.decoys.slice(0, 3), character.name].sort(() => Math.random() - 0.5)
    : [];

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === character.name) {
      setScore((s) => s + POINTS_PER_CLUE[clueIdx]);
    }
    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) setDone(true);
      else { setRound((r) => r + 1); setClueIdx(0); setPicked(null); }
    }, 1500);
  }

  function nextClue() {
    if (clueIdx < character.clues.length - 1) setClueIdx((i) => i + 1);
  }

  function reset() { setRound(0); setClueIdx(0); setScore(0); setPicked(null); setDone(false); }

  if (done) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Round Complete!</h2>
        <p className="text-muted-foreground mb-1">Your final score</p>
        <p className="text-4xl font-bold text-primary mb-6">{score} / 200</p>
        <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" /> Play Again</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bible Who Am I? – Guess the Bible Character | Bible Games Online</title>
        <meta name="description" content="Read clues one by one and guess the Bible character. Fewer clues used = more points! A fun scripture identification game." />
      </Helmet>

      <GameHero
        icon={<User className="w-6 h-6" />}
        title="Bible Who Am I?"
        subtitle="Read the clues one by one and guess the Bible character. Fewer clues = more points!"
        meta={
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-transparent border-primary/40 text-primary">Round {round + 1}/{TOTAL_ROUNDS}</Badge>
            <Badge className="bg-primary text-primary-foreground">⭐ Score: {score}/200</Badge>
          </div>
        }
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-7 mb-5">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary">WHO AM I?</Badge>
              <span className="text-xs text-muted-foreground">Up to {character.clues.length} pts remaining</span>
            </div>

            <div className="space-y-2 mb-4">
              <AnimatePresence>
                {character.clues.slice(0, clueIdx + 1).map((clue, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-2 items-start text-sm"
                  >
                    <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span>
                    <p className="leading-relaxed">{clue}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {clueIdx < character.clues.length - 1 && !picked && (
              <button
                onClick={nextClue}
                className="w-full text-sm text-primary font-semibold hover:underline flex items-center justify-center gap-1"
              >
                <Eye className="w-4 h-4" /> Reveal next clue (-{POINTS_PER_CLUE[clueIdx] - POINTS_PER_CLUE[clueIdx + 1]} pts)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((opt) => {
              const isCorrect = picked && opt === character.name;
              const isWrong = picked === opt && opt !== character.name;
              return (
                <button
                  key={opt}
                  disabled={!!picked}
                  onClick={() => pick(opt)}
                  className={`rounded-xl border-2 px-4 py-3 font-semibold transition-all
                    ${isCorrect ? "border-green-500 bg-green-50 text-green-700" :
                      isWrong ? "border-destructive bg-red-50 text-destructive" :
                      picked ? "border-border bg-card opacity-60" :
                      "border-border bg-card hover:border-primary hover:bg-primary/5"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="Guess the Bible Character from Clues">
          <p>
            Each round presents you with up to five progressive clues about a famous Bible figure — Moses, David, Esther, Paul, and nine others. The first clue is vague; the fifth is nearly unmistakable. Guess on the first clue for maximum points, or take your time and reveal more hints for a safer answer. It's a balance of confidence and caution.
          </p>
        </ContentBlock>
        <ContentBlock title="Learn Scripture Through Identification">
          <p>
            Each clue is drawn directly from scripture, so even getting an answer wrong teaches you something real. You'll leave every session knowing more about the lives of Bible heroes — their trials, their faith, and the moments that defined them. Perfect for personal study, Sunday school warm-ups, or family devotion time. For more character-based challenges, explore our <a href="/bible-memory-games/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Memory Games</a> or the broader knowledge test in <a href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</a>.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("who-am-i", 4)} />
      <FaqSection />
    </>
  );
}
