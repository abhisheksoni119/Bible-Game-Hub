import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Old Testament",
    color: "bg-blue-600",
    questions: [
      { pts: 100, q: "He parted the Red Sea", a: "Moses" },
      { pts: 200, q: "He was swallowed by a whale", a: "Jonah" },
      { pts: 300, q: "He killed Goliath", a: "David" },
      { pts: 400, q: "His coat had many colors", a: "Joseph" },
      { pts: 500, q: "He built the ark", a: "Noah" },
    ],
  },
  {
    name: "New Testament",
    color: "bg-purple-600",
    questions: [
      { pts: 100, q: "He was born in a manger", a: "Jesus" },
      { pts: 200, q: "He walked on water", a: "Peter" },
      { pts: 300, q: "He betrayed Jesus for silver", a: "Judas" },
      { pts: 400, q: "She was the first to see the risen Jesus", a: "Mary Magdalene" },
      { pts: 500, q: "He wrote most of the New Testament letters", a: "Paul" },
    ],
  },
  {
    name: "Bible Books",
    color: "bg-green-600",
    questions: [
      { pts: 100, q: "The first book of the Bible", a: "Genesis" },
      { pts: 200, q: "The book of songs and poetry", a: "Psalms" },
      { pts: 300, q: "The last book of the Bible", a: "Revelation" },
      { pts: 400, q: "The book of wisdom by Solomon", a: "Proverbs" },
      { pts: 500, q: "The book about a suffering man", a: "Job" },
    ],
  },
  {
    name: "Miracles",
    color: "bg-yellow-600",
    questions: [
      { pts: 100, q: "Jesus turned water into this", a: "Wine" },
      { pts: 200, q: "Jesus fed 5000 with these", a: "Loaves and fish" },
      { pts: 300, q: "Jesus raised this man from the dead", a: "Lazarus" },
      { pts: 400, q: "This fell from the sky to feed Israelites", a: "Manna" },
      { pts: 500, q: "The sun stood still for this man", a: "Joshua" },
    ],
  },
];

type QuestionKey = `${number}-${number}`;

export default function BibleJeopardy() {
  const [answered, setAnswered] = useState<Set<QuestionKey>>(new Set());
  const [active, setActive] = useState<{ cat: number; q: number } | null>(null);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const totalPossible = categories.reduce((s, c) => s + c.questions.reduce((a, q) => a + q.pts, 0), 0);
  const allDone = answered.size === categories.reduce((s, c) => s + c.questions.length, 0);

  function openQ(cat: number, q: number) {
    setActive({ cat, q });
    setGuess("");
    setResult(null);
  }

  function submit() {
    if (!active) return;
    const qData = categories[active.cat].questions[active.q];
    const correct = guess.trim().toLowerCase().includes(qData.a.toLowerCase()) ||
      qData.a.toLowerCase().includes(guess.trim().toLowerCase());
    if (correct) { setScore(s => s + qData.pts); setResult("correct"); }
    else setResult("wrong");
    const key: QuestionKey = `${active.cat}-${active.q}`;
    setTimeout(() => {
      setAnswered(prev => new Set([...prev, key]));
      setActive(null);
    }, 1500);
  }

  function reset() {
    setAnswered(new Set()); setActive(null); setScore(0); setGuess(""); setResult(null);
  }

  return (
    <>
      <Helmet>
        <title>Bible Jeopardy – Bible Quiz Game | Bible Games Online</title>
        <meta name="description" content="Play Bible Jeopardy online! Choose categories and point values to answer Bible questions in this classic quiz game format." />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Bible Jeopardy</h1>
        <p className="text-center text-muted-foreground mb-2">Select a category and point value to answer</p>
        <div className="flex justify-center gap-4 mb-8">
          <Badge className="bg-primary text-primary-foreground text-base px-4 py-1">Score: {score}</Badge>
        </div>

        {allDone ? (
          <Card className="max-w-md mx-auto text-center shadow-gold">
            <CardContent className="py-10">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
              <p className="text-xl mb-6">Final Score: <span className="text-primary font-bold">{score}</span> / {totalPossible}</p>
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />Play Again</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid min-w-max" style={{ gridTemplateColumns: `repeat(${categories.length}, 200px)`, gap: "8px" }}>
              {categories.map((cat, ci) => (
                <div key={ci} className={`${cat.color} text-white text-center font-bold py-4 px-2 rounded-t-lg`}>
                  {cat.name}
                </div>
              ))}
              {[0, 1, 2, 3, 4].map(qi =>
                categories.map((cat, ci) => {
                  const key: QuestionKey = `${ci}-${qi}`;
                  const done = answered.has(key);
                  return (
                    <button
                      key={key}
                      className={`h-16 rounded-lg font-bold text-xl transition-all
                        ${done ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-secondary text-primary hover:bg-secondary/80 shadow-card cursor-pointer"}`}
                      onClick={() => !done && openQ(ci, qi)}
                      disabled={done}
                    >
                      {done ? "" : `$${cat.questions[qi].pts}`}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {active !== null && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => !result && setActive(null)}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-background rounded-2xl shadow-card-lg p-8 max-w-lg w-full"
                onClick={e => e.stopPropagation()}
              >
                <Badge className="mb-4">{categories[active.cat].name} - ${categories[active.cat].questions[active.q].pts}</Badge>
                <p className="text-xl font-semibold mb-6">{categories[active.cat].questions[active.q].q}</p>
                {result ? (
                  <div className={`text-center py-4 rounded-lg font-bold text-xl ${result === "correct" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {result === "correct" ? `✓ Correct! +$${categories[active.cat].questions[active.q].pts}` : `✗ Answer: ${categories[active.cat].questions[active.q].a}`}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input value={guess} onChange={e => setGuess(e.target.value)} placeholder="Your answer..." onKeyDown={e => e.key === "Enter" && submit()} autoFocus />
                    <Button onClick={submit}>Submit</Button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
