import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "The Bible has 66 books.", a: true },
  { q: "Jesus was born in Nazareth.", a: false, note: "He was born in Bethlehem." },
  { q: "Moses wrote the first five books of the Bible.", a: true },
  { q: "David killed Goliath with a sword.", a: false, note: "He used a sling and stone." },
  { q: "Paul wrote the book of Revelation.", a: false, note: "John wrote Revelation." },
  { q: "Jonah was in the belly of the fish for 3 days.", a: true },
  { q: "The New Testament has 27 books.", a: true },
  { q: "Samson's strength came from his height.", a: false, note: "His strength came from his hair." },
  { q: "Jesus had 12 disciples.", a: true },
  { q: "Solomon asked God for wealth.", a: false, note: "He asked for wisdom." },
  { q: "Peter denied Jesus 3 times.", a: true },
  { q: "The Last Supper happened on the Sabbath.", a: false, note: "It was during Passover." },
  { q: "Ruth was the mother-in-law of Naomi.", a: false, note: "Ruth was Naomi's daughter-in-law." },
  { q: "Adam and Eve had three sons mentioned in the Bible.", a: true, note: "Cain, Abel, and Seth." },
  { q: "Jesus performed his first miracle at a wedding.", a: true },
];

export default function BibleTrueFalse() {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<{ correct: boolean }[]>([]);

  const q = questions[current];

  function answer(val: boolean) {
    if (answered !== null) return;
    setAnswered(val);
    const correct = val === q.a;
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { correct }]);
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else { setCurrent(c => c + 1); setAnswered(null); }
    }, 1200);
  }

  function reset() {
    setCurrent(0); setAnswered(null); setScore(0); setDone(false); setHistory([]);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <Trophy className="w-20 h-20 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-muted-foreground mb-4">{score} correct out of {questions.length} ({pct}%)</p>
        <Progress value={pct} className="h-4 mb-8" />
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {history.map((h, i) => (
            <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${h.correct ? "bg-green-500" : "bg-destructive"}`}>
              {h.correct ? "✓" : "✗"}
            </div>
          ))}
        </div>
        <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />Play Again</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bible True or False – Scripture Facts Quiz | Bible Games Online</title>
        <meta name="description" content="Test your Bible knowledge with true or false questions. A quick and fun Bible facts quiz for all ages." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-2">Bible True or False</h1>
        <p className="text-center text-muted-foreground mb-8">Is the statement true or false?</p>

        <div className="flex justify-between mb-4">
          <Badge variant="secondary">Question {current + 1}/{questions.length}</Badge>
          <Badge className="bg-primary text-primary-foreground">Score: {score}</Badge>
        </div>
        <Progress value={(current / questions.length) * 100} className="h-2 mb-8" />

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-card-lg mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-center leading-relaxed">{q.q}</CardTitle>
              </CardHeader>
              <CardContent>
                {answered !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg p-4 text-center mb-4 font-semibold ${answered === q.a ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {answered === q.a ? (
                      <><CheckCircle2 className="inline mr-2 w-5 h-5" />Correct!</>
                    ) : (
                      <><XCircle className="inline mr-2 w-5 h-5" />Incorrect — {q.note || `The answer is ${q.a ? "True" : "False"}`}</>
                    )}
                  </motion.div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    variant={answered !== null ? (true === q.a ? "default" : "outline") : "outline"}
                    className="h-16 text-lg font-bold"
                    onClick={() => answer(true)}
                  >
                    ✓ True
                  </Button>
                  <Button
                    size="lg"
                    variant={answered !== null ? (false === q.a ? "default" : "outline") : "outline"}
                    className="h-16 text-lg font-bold"
                    onClick={() => answer(false)}
                  >
                    ✗ False
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
