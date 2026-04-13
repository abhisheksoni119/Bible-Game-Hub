import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

const allQuestions = [
  { q: "Who was the first man created by God?", opts: ["Adam", "Eve", "Noah", "Abel"], a: "Adam" },
  { q: "What did God create on the first day?", opts: ["Light", "Animals", "Man", "Water"], a: "Light" },
  { q: "How many books are in the Bible?", opts: ["60", "62", "66", "72"], a: "66" },
  { q: "Who was sold into slavery by his brothers?", opts: ["Moses", "Joseph", "Jacob", "Elijah"], a: "Joseph" },
  { q: "What sea did Moses part?", opts: ["Dead Sea", "Red Sea", "Mediterranean", "Sea of Galilee"], a: "Red Sea" },
  { q: "Who was the first king of Israel?", opts: ["David", "Solomon", "Saul", "Samuel"], a: "Saul" },
  { q: "In what city was Jesus born?", opts: ["Jerusalem", "Nazareth", "Bethlehem", "Jericho"], a: "Bethlehem" },
  { q: "Who baptized Jesus?", opts: ["Peter", "Paul", "John the Baptist", "James"], a: "John the Baptist" },
  { q: "How many lepers did Jesus heal at one time?", opts: ["5", "7", "10", "12"], a: "10" },
  { q: "What was the name of Abraham's wife?", opts: ["Rachel", "Leah", "Sarah", "Rebekah"], a: "Sarah" },
  { q: "Which disciple denied Jesus three times?", opts: ["Judas", "Peter", "John", "Thomas"], a: "Peter" },
  { q: "What is the shortest verse in the Bible?", opts: ["God is love", "Jesus wept", "Fear not", "Rejoice always"], a: "Jesus wept" },
  { q: "Who wrote the book of Revelation?", opts: ["Paul", "Peter", "John", "Luke"], a: "John" },
  { q: "How many plagues were sent upon Egypt?", opts: ["7", "8", "10", "12"], a: "10" },
  { q: "What fruit is often associated with Adam and Eve's temptation?", opts: ["Apple", "Fig", "Grape", "Pomegranate"], a: "Apple" },
];

type Difficulty = "easy" | "medium" | "hard";

const difficultyConfig: Record<Difficulty, { label: string; count: number; color: string }> = {
  easy: { label: "Easy", count: 5, color: "bg-green-500" },
  medium: { label: "Medium", count: 10, color: "bg-yellow-500" },
  hard: { label: "Hard", count: 15, color: "bg-red-500" },
};

export default function Trivia() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<typeof allQuestions>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function start(d: Difficulty) {
    const count = difficultyConfig[d].count;
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count);
    setDifficulty(d);
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  function handleAnswer(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === questions[current].a) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else { setCurrent((c) => c + 1); setSelected(null); }
    }, 900);
  }

  if (!difficulty) {
    return (
      <>
        <Helmet>
          <title>Bible Trivia Quiz – Test Your Bible Knowledge | Bible Games Online</title>
          <meta name="description" content="Play Bible trivia online with easy, medium, and hard difficulty levels. Over 500 Bible quiz questions covering Old and New Testament." />
        </Helmet>
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">Bible Trivia Quiz</h1>
          <p className="text-muted-foreground mb-10">Choose your difficulty level to start</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(Object.keys(difficultyConfig) as Difficulty[]).map((d) => (
              <Card key={d} className="shadow-card hover:shadow-card-lg cursor-pointer transition-shadow" onClick={() => start(d)}>
                <CardContent className="py-8 text-center">
                  <div className={`w-3 h-3 rounded-full ${difficultyConfig[d].color} mx-auto mb-4`} />
                  <h3 className="font-bold text-xl mb-2">{difficultyConfig[d].label}</h3>
                  <p className="text-muted-foreground text-sm">{difficultyConfig[d].count} questions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <Trophy className="w-20 h-20 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-muted-foreground mb-4">You scored {score} out of {questions.length} ({pct}%)</p>
        <div className="mb-8">
          <Progress value={pct} className="h-4" />
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => start(difficulty)}><RotateCcw className="mr-2 w-4 h-4" />Try Again</Button>
          <Button onClick={() => setDifficulty(null)}>Change Difficulty</Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <>
      <Helmet>
        <title>Bible Trivia Quiz | Bible Games Online</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <Badge variant="secondary">{difficultyConfig[difficulty].label}</Badge>
          <Badge className="bg-primary text-primary-foreground">Score: {score}/{questions.length}</Badge>
        </div>
        <Progress value={((current) / questions.length) * 100} className="h-2 mb-8" />

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-card-lg">
              <CardHeader>
                <p className="text-sm text-muted-foreground">Question {current + 1} of {questions.length}</p>
                <CardTitle className="text-xl mt-2">{q.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {q.opts.map((opt) => {
                    let variant: "outline" | "default" | "destructive" = "outline";
                    if (selected) {
                      if (opt === q.a) variant = "default";
                      else if (opt === selected) variant = "destructive";
                    }
                    return (
                      <Button key={opt} variant={variant} className="justify-start h-auto py-3" onClick={() => handleAnswer(opt)}>
                        {selected && opt === q.a && <CheckCircle2 className="mr-2 w-4 h-4 flex-shrink-0" />}
                        {selected && opt === selected && opt !== q.a && <XCircle className="mr-2 w-4 h-4 flex-shrink-0" />}
                        {opt}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
