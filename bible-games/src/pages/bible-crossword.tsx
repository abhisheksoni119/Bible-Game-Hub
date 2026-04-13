import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy, CheckCircle2 } from "lucide-react";

const clues = [
  { number: 1, direction: "Across", clue: "The first man (4)", answer: "ADAM" },
  { number: 2, direction: "Down", clue: "He led Israel through the desert (5)", answer: "MOSES" },
  { number: 3, direction: "Across", clue: "Prayer said by Jesus (3,5)", answer: "OUR FATHER" },
  { number: 4, direction: "Down", clue: "Mother of Jesus (4)", answer: "MARY" },
  { number: 5, direction: "Across", clue: "The 23rd Psalm writer (5)", answer: "DAVID" },
  { number: 6, direction: "Down", clue: "He was raised from the dead by Jesus (7)", answer: "LAZARUS" },
  { number: 7, direction: "Across", clue: "The first book of the Bible (7)", answer: "GENESIS" },
  { number: 8, direction: "Down", clue: "He denied Jesus three times (5)", answer: "PETER" },
];

export default function BibleCrossword() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  function handleChange(num: number, val: string) {
    setAnswers(prev => ({ ...prev, [num]: val.toUpperCase() }));
    setChecked(false);
  }

  function checkAnswers() {
    let correct = 0;
    for (const clue of clues) {
      if (answers[clue.number]?.trim() === clue.answer) correct++;
    }
    setScore(correct);
    setChecked(true);
  }

  function reset() {
    setAnswers({});
    setChecked(false);
    setScore(0);
  }

  const allCorrect = checked && score === clues.length;

  return (
    <>
      <Helmet>
        <title>Bible Crossword Puzzle – Scripture Word Puzzles | Bible Games Online</title>
        <meta name="description" content="Play Bible crossword puzzles online. Solve scripture-based crossword clues and test your Bible knowledge." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Bible Crossword</h1>
        <p className="text-center text-muted-foreground mb-8">Solve the Bible clues below</p>

        {allCorrect && (
          <Card className="text-center mb-6 shadow-gold">
            <CardContent className="py-6">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
              <h2 className="text-2xl font-bold mb-2">Perfect Score!</h2>
              <p className="text-muted-foreground mb-4">You solved all the clues!</p>
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />New Puzzle</Button>
            </CardContent>
          </Card>
        )}

        {checked && !allCorrect && (
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="text-base px-4 py-2">Score: {score} / {clues.length} correct</Badge>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {clues.map(clue => {
            const userAnswer = answers[clue.number] ?? "";
            const isCorrect = checked && userAnswer.trim() === clue.answer;
            const isWrong = checked && userAnswer.trim() !== clue.answer && userAnswer.trim() !== "";
            return (
              <Card key={clue.number} className={`shadow-card ${isCorrect ? "border-green-400" : isWrong ? "border-destructive" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {clue.number}. {clue.direction}
                  </CardTitle>
                  <p className="font-semibold text-sm">{clue.clue}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={e => handleChange(clue.number, e.target.value)}
                      className="field-input flex-1"
                      placeholder="Your answer..."
                      disabled={checked && isCorrect}
                    />
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  </div>
                  {isWrong && <p className="text-xs text-destructive mt-1">Answer: {clue.answer}</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={checkAnswers}>Check Answers</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />Reset</Button>
        </div>
      </div>
    </>
  );
}
