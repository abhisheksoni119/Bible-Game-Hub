import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RotateCcw, Trophy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const characters = [
  {
    name: "Moses",
    clues: [
      "I was hidden in a basket as a baby",
      "I was raised in a royal palace",
      "God spoke to me through a burning bush",
      "I led my people out of Egypt",
      "I received the Ten Commandments",
    ],
  },
  {
    name: "David",
    clues: [
      "I was the youngest of eight brothers",
      "I was a shepherd boy",
      "I defeated a giant named Goliath",
      "I wrote many psalms",
      "I became the greatest king of Israel",
    ],
  },
  {
    name: "Mary",
    clues: [
      "I was a young woman from Nazareth",
      "An angel appeared to me with news",
      "I was engaged to a carpenter",
      "I gave birth in a manger",
      "I am the mother of Jesus",
    ],
  },
  {
    name: "Noah",
    clues: [
      "I was considered righteous in my generation",
      "God gave me special instructions",
      "I built a very large wooden vessel",
      "I gathered two of every animal",
      "A rainbow was a promise to me",
    ],
  },
  {
    name: "Paul",
    clues: [
      "I was born in Tarsus",
      "I was a Roman citizen",
      "I persecuted early Christians",
      "I was blinded on the road to Damascus",
      "I wrote many letters in the New Testament",
    ],
  },
];

export default function BibleWhoAmI() {
  const [idx] = useState(() => Math.floor(Math.random() * characters.length));
  const character = characters[idx];
  const [clueIdx, setClueIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [won, setWon] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempts, setAttempts] = useState<string[]>([]);

  function submit() {
    if (!guess.trim()) return;
    const correct = guess.trim().toLowerCase() === character.name.toLowerCase();
    setAttempts(prev => [...prev, guess.trim()]);
    if (correct) {
      setWon(true);
    } else if (clueIdx < character.clues.length - 1) {
      setClueIdx(i => i + 1);
    } else {
      setFailed(true);
    }
    setGuess("");
  }

  function reset() { window.location.reload(); }

  return (
    <>
      <Helmet>
        <title>Bible Who Am I – Guess the Bible Character | Bible Games Online</title>
        <meta name="description" content="Play Bible Who Am I and guess Bible characters from clues. A fun scripture guessing game for all ages." />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-2">Who Am I?</h1>
        <p className="text-center text-muted-foreground mb-8">Guess the Bible character from the clues</p>

        <div className="flex justify-between mb-4">
          <Badge variant="secondary">Clue {clueIdx + 1} of {character.clues.length}</Badge>
          <Badge variant="outline">Guesses: {attempts.length}</Badge>
        </div>

        <div className="space-y-3 mb-6">
          {character.clues.slice(0, clueIdx + 1).map((clue, i) => (
            <AnimatePresence key={i}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card className={`shadow-card ${i === clueIdx ? "border-primary" : ""}`}>
                  <CardContent className="py-3 px-4 flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">#{i + 1}</span>
                    <p>{clue}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        {(won || failed) ? (
          <Card className="text-center shadow-gold">
            <CardContent className="py-8">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
              {won ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">Correct!</h2>
                  <p className="text-muted-foreground mb-4">I am <span className="font-bold text-primary">{character.name}</span>! You got it in {attempts.length} {attempts.length === 1 ? "guess" : "guesses"}.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">Nice Try!</h2>
                  <p className="text-muted-foreground mb-4">The character was <span className="font-bold text-primary">{character.name}</span></p>
                </>
              )}
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" />Next Character</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {attempts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {attempts.map((a, i) => (
                  <Badge key={i} variant="destructive" className="text-xs">{a} ✗</Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={guess}
                onChange={e => setGuess(e.target.value)}
                placeholder="Who am I?"
                onKeyDown={e => e.key === "Enter" && submit()}
                autoFocus
              />
              <Button onClick={submit}><ChevronRight className="w-4 h-4" /></Button>
            </div>
            {clueIdx < character.clues.length - 1 && (
              <Button variant="ghost" className="mt-3 w-full" onClick={() => { setClueIdx(i => i + 1); }}>
                Show next clue (costs 1 guess)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
}
