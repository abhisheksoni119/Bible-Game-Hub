import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout, RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const categories = [
  {
    name: "Old Testament",
    questions: [
      { pts: 200, q: "He parted the Red Sea", a: "Moses" },
      { pts: 400, q: "He was swallowed by a great fish", a: "Jonah" },
      { pts: 600, q: "He killed Goliath with a sling", a: "David" },
      { pts: 800, q: "His coat was made of many colors", a: "Joseph" },
      { pts: 1000, q: "He built the ark for the great flood", a: "Noah" },
    ],
  },
  {
    name: "New Testament",
    questions: [
      { pts: 200, q: "He was born in a manger in Bethlehem", a: "Jesus" },
      { pts: 400, q: "He walked on water briefly with Jesus", a: "Peter" },
      { pts: 600, q: "He betrayed Jesus for thirty silver coins", a: "Judas" },
      { pts: 800, q: "She was the first to see the risen Jesus", a: "Mary Magdalene" },
      { pts: 1000, q: "He wrote most of the New Testament letters", a: "Paul" },
    ],
  },
  {
    name: "Bible Heroes",
    questions: [
      { pts: 200, q: "He defeated a thousand men with a jawbone", a: "Samson" },
      { pts: 400, q: "She hid Israelite spies in Jericho", a: "Rahab" },
      { pts: 600, q: "She became queen and saved her people", a: "Esther" },
      { pts: 800, q: "He led the walls of Jericho to fall", a: "Joshua" },
      { pts: 1000, q: "He had a vision of a wheel within a wheel", a: "Ezekiel" },
    ],
  },
  {
    name: "Books of Bible",
    questions: [
      { pts: 200, q: "The first book of the Bible", a: "Genesis" },
      { pts: 400, q: "The book of songs and praises", a: "Psalms" },
      { pts: 600, q: "The last book of the Bible", a: "Revelation" },
      { pts: 800, q: "The book of wisdom by Solomon", a: "Proverbs" },
      { pts: 1000, q: "The shortest book in the New Testament", a: "3 John" },
    ],
  },
  {
    name: "Bible Places",
    questions: [
      { pts: 200, q: "Where Jesus was born", a: "Bethlehem" },
      { pts: 400, q: "The garden where Jesus prayed before arrest", a: "Gethsemane" },
      { pts: 600, q: "The mountain where Moses received the commandments", a: "Sinai" },
      { pts: 800, q: "The walls fell here when Joshua marched", a: "Jericho" },
      { pts: 1000, q: "Paul's hometown", a: "Tarsus" },
    ],
  },
  {
    name: "Bible Numbers",
    questions: [
      { pts: 200, q: "Days of creation", a: "6" },
      { pts: 400, q: "Disciples of Jesus", a: "12" },
      { pts: 600, q: "Plagues on Egypt", a: "10" },
      { pts: 800, q: "Years Israel wandered the wilderness", a: "40" },
      { pts: 1000, q: "Books in the Old Testament", a: "39" },
    ],
  },
];

type ActiveQ = { ci: number; qi: number };

export default function BibleJeopardy() {
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<ActiveQ | null>(null);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const total = categories.length * categories[0].questions.length;
  const allDone = answered.size === total;

  function open(ci: number, qi: number) {
    setActive({ ci, qi });
    setGuess("");
    setResult(null);
  }

  function submit() {
    if (!active) return;
    const data = categories[active.ci].questions[active.qi];
    const g = guess.trim().toLowerCase();
    const a = data.a.toLowerCase();
    const correct = g.length > 0 && (g.includes(a) || a.includes(g));
    if (correct) { setScore((s) => s + data.pts); setResult("correct"); }
    else setResult("wrong");
    setTimeout(() => {
      setAnswered((prev) => new Set([...prev, `${active.ci}-${active.qi}`]));
      setActive(null);
    }, 1600);
  }

  function reset() { setAnswered(new Set()); setActive(null); setScore(0); setGuess(""); setResult(null); }

  return (
    <>
      <Helmet>
        <title>Bible Jeopardy – Free Bible Quiz Board Game | Bible Games Online</title>
        <meta name="description" content="Play Bible Jeopardy online with six categories and thirty clues. Pick a category and value to reveal the clue and earn points." />
      </Helmet>

      <GameHero
        icon={<Layout className="w-6 h-6" />}
        title="Bible Jeopardy"
        subtitle="Six categories · 30 clues · One score. Pick a category and value to reveal the clue."
        meta={
          <Badge className="bg-primary/15 text-primary border border-primary/30 text-base px-4 py-1">
            <Trophy className="w-4 h-4 mr-1.5" /> ${score} · {answered.size}/{total} answered
          </Badge>
        }
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          {allDone ? (
            <div className="rounded-3xl border border-primary/30 bg-card shadow-gold p-8 text-center max-w-md mx-auto">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-1">Game Complete!</h2>
              <p className="text-xl mb-6">Final Score: <span className="text-primary font-bold">${score}</span></p>
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" /> Play Again</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div
                className="mx-auto"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${categories.length}, minmax(120px, 1fr))`,
                  gap: "8px",
                  maxWidth: "1100px",
                }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="bg-primary text-primary-foreground text-center font-bold py-3 px-2 rounded-xl text-sm md:text-base"
                  >
                    {cat.name}
                  </div>
                ))}
                {[0, 1, 2, 3, 4].map((qi) =>
                  categories.map((cat, ci) => {
                    const key = `${ci}-${qi}`;
                    const isAnswered = answered.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => !isAnswered && open(ci, qi)}
                        disabled={isAnswered}
                        className={`h-16 md:h-20 rounded-xl font-bold text-lg md:text-2xl transition-all
                          ${isAnswered
                            ? "bg-muted/40 text-muted-foreground cursor-default"
                            : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] cursor-pointer"
                          }`}
                      >
                        {isAnswered ? "" : `$${cat.questions[qi].pts}`}
                      </button>
                    );
                  })
                )}
              </div>
              <div className="mt-6 text-center">
                <Button variant="ghost" size="sm" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset Board
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => !result && setActive(null)}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-card rounded-3xl shadow-card-lg p-7 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge>{categories[active.ci].name}</Badge>
                <Badge className="bg-primary text-primary-foreground">${categories[active.ci].questions[active.qi].pts}</Badge>
              </div>
              <p className="text-xl font-bold mb-6">{categories[active.ci].questions[active.qi].q}</p>
              {result ? (
                <div className={`rounded-xl py-4 text-center font-bold text-lg
                  ${result === "correct" ? "bg-green-50 text-green-700" : "bg-red-50 text-destructive"}`}>
                  {result === "correct"
                    ? `✓ Correct! +$${categories[active.ci].questions[active.qi].pts}`
                    : `✗ Answer: ${categories[active.ci].questions[active.qi].a}`}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Your answer…" autoFocus onKeyDown={(e) => e.key === "Enter" && submit()} />
                  <Button onClick={submit}>Submit</Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GameContent>
        <ContentBlock title="How Bible Jeopardy Works">
          <p>
            The board holds thirty clues spread across six categories: Old Testament, New Testament, Bible Heroes, Books of the Bible, Bible Places, and Bible Numbers. Lower dollar amounts deal with widely-accessible facts; the $800 and $1,000 clues dig into lesser-known details that challenge even seasoned scripture readers. Pick a value, read the clue, and choose your answer from four options. Right answers add to your score — wrong answers subtract — so strategy matters as much as knowledge.
          </p>
        </ContentBlock>
        <ContentBlock title="Great for Groups and Solo Play">
          <p>
            Bible Jeopardy works beautifully as a Sunday school activity, youth group icebreaker, or family devotional game. Take turns picking clues, keep a shared score, and debate the answers together. Playing solo? Use it as a self-assessment tool to identify which parts of scripture you know well and which areas deserve deeper study. For more quiz-style challenges, explore our <a href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</a> or try your luck climbing the prize ladder in <a href="/bible-millionaire/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Millionaire</a>.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("jeopardy", 4)} />
      <FaqSection />
    </>
  );
}
