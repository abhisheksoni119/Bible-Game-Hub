import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const questions = [
  { q: "The Bible has 66 books in total.", a: true },
  { q: "Jesus was born in Nazareth.", a: false, note: "He was born in Bethlehem." },
  { q: "Moses wrote the first five books of the Bible.", a: true },
  { q: "David killed Goliath with a sword.", a: false, note: "He used a sling and a single stone." },
  { q: "Paul wrote the book of Revelation.", a: false, note: "John wrote Revelation." },
  { q: "Jonah was in the belly of the great fish for three days.", a: true },
  { q: "The New Testament has 27 books.", a: true },
  { q: "Samson's strength came from his height.", a: false, note: "His strength was tied to his uncut hair." },
  { q: "Jesus had 12 disciples.", a: true },
  { q: "Solomon asked God for wealth.", a: false, note: "He asked for wisdom." },
  { q: "Peter denied Jesus three times.", a: true },
  { q: "Ruth was the mother-in-law of Naomi.", a: false, note: "Ruth was Naomi's daughter-in-law." },
  { q: "Adam and Eve had three sons mentioned by name in Genesis.", a: true, note: "Cain, Abel, and Seth." },
  { q: "Jesus performed his first miracle at a wedding.", a: true },
  { q: "There are exactly 100 psalms in the Book of Psalms.", a: false, note: "There are 150 psalms." },
];

export default function BibleTrueFalse() {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  function answer(val: boolean) {
    if (answered !== null) return;
    setAnswered(val);
    if (val === q.a) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else { setCurrent((c) => c + 1); setAnswered(null); }
    }, 1300);
  }

  function reset() { setCurrent(0); setAnswered(null); setScore(0); setDone(false); }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-muted-foreground mb-4">{score} of {questions.length} correct ({pct}%)</p>
        <Progress value={pct} className="h-3 mb-6" />
        <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" /> Play Again</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bible True or False – Scripture Facts Quiz | Bible Games Online</title>
        <meta name="description" content="Test your Bible knowledge with quick true or false questions. A fun and fast scripture facts quiz for all ages." />
      </Helmet>

      <GameHero
        icon={<CheckCircle2 className="w-6 h-6" />}
        title="Bible True or False"
        subtitle="Quick-fire scripture facts. Is each statement true or false?"
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="flex justify-between mb-3">
            <Badge variant="secondary">Question {current + 1}/{questions.length}</Badge>
            <Badge className="bg-primary text-primary-foreground">Score: {score}</Badge>
          </div>
          <Progress value={(current / questions.length) * 100} className="h-2 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-8"
            >
              <p className="text-xl md:text-2xl font-bold text-center mb-6 leading-snug">{q.q}</p>

              {answered !== null && (
                <div className={`rounded-xl p-3 text-center mb-5 font-semibold text-sm
                  ${answered === q.a ? "bg-green-50 text-green-700" : "bg-red-50 text-destructive"}`}>
                  {answered === q.a ? (
                    <><CheckCircle2 className="inline mr-1 w-4 h-4" /> Correct!</>
                  ) : (
                    <><XCircle className="inline mr-1 w-4 h-4" /> Incorrect — {q.note || `Answer: ${q.a ? "True" : "False"}`}</>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  variant={answered !== null && q.a === true ? "default" : "outline"}
                  className="h-14 text-lg font-bold"
                  onClick={() => answer(true)}
                  disabled={answered !== null}
                >
                  ✓ True
                </Button>
                <Button
                  size="lg"
                  variant={answered !== null && q.a === false ? "default" : "outline"}
                  className="h-14 text-lg font-bold"
                  onClick={() => answer(false)}
                  disabled={answered !== null}
                >
                  ✗ False
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="Quick Bible Facts You Should Know">
          <p>
            True or False is the fastest way to spot-check what you remember from scripture. Each question can be answered in seconds, but the format quietly reveals which Bible facts you've internalized — and which ones you might have mixed up. The "Did you know?" notes after each answer turn every miss into a teaching moment.
          </p>
        </ContentBlock>
        <ContentBlock title="Great for Quick Study Sessions">
          <p>
            Run through 15 questions on a coffee break, before family devotion, or as a Sunday school warm-up. Pair this with our <a href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</a> for deeper multi-choice questions, or test your speed-recall with <a href="/bible-millionaire/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Millionaire</a>.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("true-false", 4)} />
      <FaqSection />
    </>
  );
}
