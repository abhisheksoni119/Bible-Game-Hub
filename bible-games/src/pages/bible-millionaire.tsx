import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "Who was the first person to sin?", opts: ["Adam", "Eve", "Satan", "Cain"], a: "Eve", prize: "$100" },
  { q: "What river was Jesus baptized in?", opts: ["Nile", "Jordan", "Euphrates", "Tigris"], a: "Jordan", prize: "$200" },
  { q: "How many men survived in Noah's ark besides Noah?", opts: ["3", "5", "7", "9"], a: "7", prize: "$300" },
  { q: "What is the longest book in the Bible?", opts: ["Isaiah", "Jeremiah", "Psalms", "Genesis"], a: "Psalms", prize: "$500" },
  { q: "Who replaced Judas Iscariot as an apostle?", opts: ["Paul", "Matthias", "Barnabas", "Stephen"], a: "Matthias", prize: "$1,000" },
  { q: "In what book does the story of Job appear?", opts: ["Psalms", "Proverbs", "Job", "Ecclesiastes"], a: "Job", prize: "$2,000" },
  { q: "Who anointed David as king?", opts: ["Samuel", "Elijah", "Nathan", "Moses"], a: "Samuel", prize: "$4,000" },
  { q: "What is the last book of the Old Testament?", opts: ["Zechariah", "Malachi", "Ezra", "Nehemiah"], a: "Malachi", prize: "$8,000" },
  { q: "How many days did Lazarus spend in the tomb?", opts: ["2", "3", "4", "5"], a: "4", prize: "$16,000" },
  { q: "Who wrote the letter to the Romans?", opts: ["Peter", "James", "Paul", "John"], a: "Paul", prize: "$32,000" },
  { q: "What was the name of Abraham's father?", opts: ["Nahor", "Haran", "Terah", "Lot"], a: "Terah", prize: "$64,000" },
  { q: "In which city did Pentecost occur?", opts: ["Bethlehem", "Nazareth", "Jerusalem", "Antioch"], a: "Jerusalem", prize: "$125,000" },
  { q: "What stone was used to seal Jesus's tomb?", opts: ["Sandstone", "Limestone", "Granite", "Marble"], a: "Limestone", prize: "$250,000" },
  { q: "Who was the high priest when Jesus was arrested?", opts: ["Annas", "Caiaphas", "Herod", "Pilate"], a: "Caiaphas", prize: "$500,000" },
  { q: "How many years did the Israelites wander in the wilderness?", opts: ["20", "30", "40", "50"], a: "40", prize: "$1,000,000" },
];

export default function BibleMillionaire() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [prize, setPrize] = useState("$0");

  function answer(opt: string) {
    if (selected) return;
    setSelected(opt);
    const q = questions[current];
    if (opt === q.a) {
      setPrize(q.prize);
      setTimeout(() => {
        if (current + 1 >= questions.length) setWon(true);
        else { setCurrent(c => c + 1); setSelected(null); }
      }, 1200);
    } else {
      setTimeout(() => setLost(true), 1200);
    }
  }

  function reset() {
    setCurrent(0); setSelected(null); setWon(false); setLost(false); setPrize("$0");
  }

  const q = questions[current];

  return (
    <>
      <Helmet>
        <title>Bible Millionaire – Bible Quiz Game | Bible Games Online</title>
        <meta name="description" content="Play Bible Millionaire! Answer Bible questions to win virtual prizes. Test your scripture knowledge with this exciting quiz game." />
      </Helmet>
      <div className="min-h-screen bg-secondary py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold text-center text-primary mb-2">Bible Millionaire</h1>
          <p className="text-center text-secondary-foreground/70 mb-8">Answer all 15 questions to win $1,000,000!</p>

          {(won || lost) ? (
            <Card className="text-center shadow-gold">
              <CardContent className="py-10">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                {won ? (
                  <>
                    <h2 className="text-3xl font-bold mb-2 text-primary">YOU WON!</h2>
                    <p className="text-2xl mb-6">$1,000,000!</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold mb-2">Game Over</h2>
                    <p className="text-xl mb-2">You walked away with <span className="text-primary font-bold">{prize}</span></p>
                    <p className="text-muted-foreground mb-6">The answer was: <span className="font-bold">{q.a}</span></p>
                  </>
                )}
                <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />Play Again</Button>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-between mb-4">
                  <Badge variant="secondary">Question {current + 1} / {questions.length}</Badge>
                  <Badge className="bg-primary text-primary-foreground"><DollarSign className="w-3 h-3 mr-1" />{q.prize}</Badge>
                </div>
                <Card className="shadow-card-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-center">{q.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {q.opts.map((opt, i) => {
                        let variant: "outline" | "default" | "destructive" = "outline";
                        if (selected) {
                          if (opt === q.a) variant = "default";
                          else if (opt === selected) variant = "destructive";
                        }
                        return (
                          <Button key={opt} variant={variant} className="h-auto py-3 text-left justify-start" onClick={() => answer(opt)}>
                            <span className="text-primary font-bold mr-2">{["A","B","C","D"][i]}:</span> {opt}
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 grid grid-cols-5 gap-1">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-colors ${i < current ? "bg-primary" : i === current ? "bg-primary/60" : "bg-muted"}`} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
