import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy } from "lucide-react";

const puzzles = [
  { phrase: "LOVE YOUR NEIGHBOR", hint: "Jesus's teaching" },
  { phrase: "THE LORD IS MY SHEPHERD", hint: "Famous Psalm" },
  { phrase: "IN THE BEGINNING GOD CREATED", hint: "First verse of the Bible" },
  { phrase: "BLESSED ARE THE PEACEMAKERS", hint: "Beatitude" },
  { phrase: "THOU SHALT NOT STEAL", hint: "One of the Ten Commandments" },
  { phrase: "FEAR NOT FOR I AM WITH YOU", hint: "God's promise" },
  { phrase: "WALK BY FAITH NOT BY SIGHT", hint: "2 Corinthians" },
  { phrase: "THE TRUTH SHALL SET YOU FREE", hint: "John 8:32" },
];

function pickPuzzle() {
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function BibleWheelOfFortune() {
  const [puzzle] = useState(pickPuzzle);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [inputLetter, setInputLetter] = useState("");
  const [wrong, setWrong] = useState(0);
  const maxWrong = 6;

  const letters = puzzle.phrase.toUpperCase().replace(/[^A-Z]/g, "");
  const uniqueLetters = [...new Set(letters)];
  const allRevealed = uniqueLetters.every(l => guessed.has(l));
  const lost = wrong >= maxWrong;

  const guessLetter = useCallback((letter: string) => {
    const l = letter.toUpperCase();
    if (!l.match(/^[A-Z]$/) || guessed.has(l)) return;
    setGuessed(prev => new Set([...prev, l]));
    if (!puzzle.phrase.toUpperCase().includes(l)) setWrong(w => w + 1);
    setInputLetter("");
  }, [guessed, puzzle.phrase]);

  function reset() { window.location.reload(); }

  return (
    <>
      <Helmet>
        <title>Bible Wheel of Fortune – Guess the Phrase | Bible Games Online</title>
        <meta name="description" content="Play Bible Wheel of Fortune online! Guess Bible phrases and scripture in this exciting word game." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Bible Wheel of Fortune</h1>
        <p className="text-center text-muted-foreground mb-8">Guess the Bible phrase letter by letter</p>

        <div className="flex justify-between mb-4">
          <Badge variant="secondary">Hint: {puzzle.hint}</Badge>
          <Badge variant={wrong >= maxWrong - 1 ? "destructive" : "outline"}>Wrong: {wrong}/{maxWrong}</Badge>
        </div>

        {/* Hangman-style progress */}
        <div className="flex gap-1 justify-center mb-2">
          {Array.from({ length: maxWrong }).map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${i < wrong ? "bg-destructive border-destructive text-destructive-foreground" : "border-muted"}`}>
              {i < wrong ? "✗" : ""}
            </div>
          ))}
        </div>

        <Card className="shadow-card-lg mb-6">
          <CardHeader>
            <CardTitle className="text-center text-sm text-muted-foreground">GUESS THE PHRASE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {puzzle.phrase.split(" ").map((word, wi) => (
                <div key={wi} className="flex gap-1">
                  {word.split("").map((char, ci) => {
                    const revealed = guessed.has(char.toUpperCase()) || (allRevealed || lost);
                    return (
                      <div key={ci} className="flex flex-col items-center">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                          {revealed ? char : ""}
                        </div>
                        <div className="w-8 h-0.5 bg-foreground/30" />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {(allRevealed || lost) ? (
          <Card className="text-center shadow-gold mb-6">
            <CardContent className="py-6">
              {allRevealed ? (
                <>
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold mb-1">Excellent!</p>
                  <p className="text-muted-foreground mb-4">You solved the puzzle!</p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold mb-1">Game Over!</p>
                  <p className="text-muted-foreground mb-4">The phrase was: <span className="font-bold text-primary">{puzzle.phrase}</span></p>
                </>
              )}
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />New Puzzle</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex gap-2 mb-4">
              <Input
                value={inputLetter}
                onChange={e => setInputLetter(e.target.value.toUpperCase().slice(0, 1))}
                placeholder="Type a letter"
                className="text-center text-xl font-bold uppercase"
                maxLength={1}
                onKeyDown={e => e.key === "Enter" && guessLetter(inputLetter)}
              />
              <Button onClick={() => guessLetter(inputLetter)} disabled={!inputLetter}>Guess</Button>
            </div>

            <div className="flex flex-wrap gap-1 justify-center">
              {ALL_LETTERS.split("").map(l => (
                <Button
                  key={l}
                  variant={guessed.has(l) ? (puzzle.phrase.toUpperCase().includes(l) ? "default" : "destructive") : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0 text-sm"
                  onClick={() => guessLetter(l)}
                  disabled={guessed.has(l)}
                >
                  {l}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
