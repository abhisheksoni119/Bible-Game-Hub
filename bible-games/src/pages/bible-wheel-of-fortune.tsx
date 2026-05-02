import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { RotateCw, Trophy, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const phrases = [
  { phrase: "LOVE YOUR NEIGHBOR", ref: "Mark 12:31" },
  { phrase: "THE LORD IS MY SHEPHERD", ref: "Psalm 23:1" },
  { phrase: "IN THE BEGINNING GOD CREATED", ref: "Genesis 1:1" },
  { phrase: "BLESSED ARE THE PEACEMAKERS", ref: "Matthew 5:9" },
  { phrase: "WALK BY FAITH NOT BY SIGHT", ref: "2 Corinthians 5:7" },
  { phrase: "THE TRUTH SHALL SET YOU FREE", ref: "John 8:32" },
  { phrase: "BE STILL AND KNOW", ref: "Psalm 46:10" },
  { phrase: "FOR GOD SO LOVED THE WORLD", ref: "John 3:16" },
];

const VOWELS = "AEIOU";
const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
const MAX_WRONG = 6;

export default function BibleWheelOfFortune() {
  const [puzzle, setPuzzle] = useState(() => phrases[Math.floor(Math.random() * phrases.length)]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const uniqueLetters = new Set(puzzle.phrase.replace(/[^A-Z]/g, "").split(""));
  const allRevealed = [...uniqueLetters].every((l) => guessed.has(l));
  const lost = wrong >= MAX_WRONG;
  const done = allRevealed || lost;

  const guessLetter = useCallback((letter: string) => {
    if (guessed.has(letter) || done) return;
    setGuessed((prev) => new Set([...prev, letter]));
    if (!puzzle.phrase.includes(letter)) setWrong((w) => w + 1);
  }, [guessed, puzzle.phrase, done]);

  function spin() {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 800);
  }

  function reset() {
    setPuzzle(phrases[Math.floor(Math.random() * phrases.length)]);
    setGuessed(new Set());
    setWrong(0);
  }

  return (
    <>
      <Helmet>
        <title>Bible Wheel of Fortune – Guess the Bible Phrase | Bible Games Online</title>
        <meta name="description" content="Play Bible Wheel of Fortune! Guess the hidden Bible phrase one letter at a time before you run out of chances." />
      </Helmet>

      <GameHero
        icon={<RotateCw className={`w-6 h-6 ${spinning ? "animate-spin" : ""}`} />}
        title="Bible Wheel of Fortune"
        subtitle="Guess the hidden Bible phrase one letter at a time before you run out of chances."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-8">
            <div className="flex justify-center mb-4">
              <Badge variant={wrong >= MAX_WRONG - 2 ? "destructive" : "outline"}>
                Wrong guesses: {wrong} / {MAX_WRONG}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-3">
              {puzzle.phrase.split(" ").map((word, wi) => (
                <div key={wi} className="flex gap-1">
                  {word.split("").map((char, ci) => {
                    const revealed = guessed.has(char) || done;
                    return (
                      <div key={ci} className="flex flex-col items-center w-7">
                        <div className="h-8 flex items-center justify-center font-bold text-xl text-primary">
                          {revealed ? char : ""}
                        </div>
                        <div className="w-6 h-0.5 bg-foreground/30" />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mb-6">— {puzzle.ref}</p>

            <div className="flex justify-center mb-5">
              <Button onClick={spin} variant="outline" disabled={done}>
                <RotateCw className={`w-4 h-4 mr-2 ${spinning ? "animate-spin" : ""}`} />
                Spin Wheel
              </Button>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5">
              {(VOWELS + CONSONANTS).split("").sort().map((l) => {
                const tried = guessed.has(l);
                const inWord = puzzle.phrase.includes(l);
                return (
                  <button
                    key={l}
                    onClick={() => guessLetter(l)}
                    disabled={tried || done}
                    className={`aspect-square rounded-md font-bold text-sm transition-all
                      ${tried && inWord ? "bg-primary text-primary-foreground" :
                        tried ? "bg-muted/40 text-muted-foreground line-through" :
                        "bg-muted hover:bg-primary/15 hover:text-primary"}`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>

            {done && (
              <div className="mt-6 text-center rounded-2xl bg-primary/10 border border-primary/30 p-5">
                {allRevealed ? (
                  <>
                    <Trophy className="w-10 h-10 text-primary mx-auto mb-1" />
                    <p className="font-bold text-lg">Excellent!</p>
                    <p className="text-sm text-muted-foreground mb-3">You revealed the verse.</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-lg">Out of chances</p>
                    <p className="text-sm text-muted-foreground mb-3">The phrase was: <span className="font-bold text-primary">{puzzle.phrase}</span></p>
                  </>
                )}
                <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" /> New Phrase</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="Reveal the Hidden Bible Verse">
          <p>
            Twelve beloved passages from scripture — from Psalm 23 to John 3:16 — hide behind rows of blank tiles. Click any letter to guess; consonants reveal for free while yellow-highlighted vowels add a touch of strategy. Make too many wrong guesses and the gallows fills in — but the phrase and its Bible reference are always shown at the end, turning every loss into a learning moment.
          </p>
        </ContentBlock>
        <ContentBlock title="Scripture That Sticks">
          <p>
            Repetition is one of the most effective ways to memorize scripture, and this word puzzle makes that process enjoyable. Each time you uncover a phrase like "Walk by Faith Not by Sight" or "For God So Loved the World," the words land with fresh impact. It's a natural fit for personal devotion, Sunday school warm-ups, or a friendly family challenge. Pair it with our <Link href="/bible-wordle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Wordle</Link> for a complete word-game devotional session.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("wheel", 4)} />
      <FaqSection />
    </>
  );
}
