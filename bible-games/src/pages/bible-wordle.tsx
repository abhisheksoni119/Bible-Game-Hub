import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Type, RotateCcw, Trophy, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const WORDS = ["FAITH", "GRACE", "PEACE", "BIBLE", "JESUS", "MANNA", "PSALM", "ANGEL", "CROSS", "GLORY"];
const MAX_GUESSES = 6;
const WORD_LEN = 5;

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

type LetterStatus = "correct" | "present" | "absent";

function gradeGuess(guess: string, target: string): LetterStatus[] {
  const result: LetterStatus[] = Array(WORD_LEN).fill("absent");
  const targetArr = target.split("");
  const used = Array(WORD_LEN).fill(false);
  for (let i = 0; i < WORD_LEN; i++) {
    if (guess[i] === target[i]) { result[i] = "correct"; used[i] = true; }
  }
  for (let i = 0; i < WORD_LEN; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LEN; j++) {
      if (!used[j] && guess[i] === targetArr[j]) { result[i] = "present"; used[j] = true; break; }
    }
  }
  return result;
}

const KEYBOARD_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function BibleWordle() {
  const [target, setTarget] = useState(pickWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [keyStatus, setKeyStatus] = useState<Record<string, LetterStatus>>({});

  const won = guesses.some((g) => g === target);
  const lost = guesses.length >= MAX_GUESSES && !won;
  const done = won || lost;

  const submit = useCallback(() => {
    if (current.length !== WORD_LEN || done) return;
    const upper = current.toUpperCase();
    const grade = gradeGuess(upper, target);
    setGuesses((g) => [...g, upper]);
    setKeyStatus((prev) => {
      const next = { ...prev };
      const priority = { correct: 3, present: 2, absent: 1 } as const;
      for (let i = 0; i < WORD_LEN; i++) {
        const k = upper[i];
        if (!next[k] || priority[grade[i]] > priority[next[k]]) next[k] = grade[i];
      }
      return next;
    });
    setCurrent("");
  }, [current, done, target]);

  const press = useCallback((k: string) => {
    if (done) return;
    if (k === "ENTER") submit();
    else if (k === "BACK") setCurrent((c) => c.slice(0, -1));
    else if (current.length < WORD_LEN && /^[A-Z]$/.test(k)) setCurrent((c) => c + k);
  }, [submit, current, done]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toUpperCase();
      if (k === "ENTER") press("ENTER");
      else if (k === "BACKSPACE") press("BACK");
      else if (/^[A-Z]$/.test(k)) press(k);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  function reset() {
    setTarget(pickWord());
    setGuesses([]);
    setCurrent("");
    setKeyStatus({});
  }

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => guesses[i] ?? (i === guesses.length ? current : ""));

  return (
    <>
      <Helmet>
        <title>Bible Wordle – Free Daily Bible Word Puzzle | Bible Games Online</title>
        <meta name="description" content="Play Bible Wordle online. Guess the 5-letter Bible word in 6 attempts. Green = correct spot, Yellow = wrong spot." />
      </Helmet>

      <GameHero
        icon={<Type className="w-6 h-6" />}
        title="Bible Wordle"
        subtitle="Guess the 5-letter Bible word in 6 attempts. Green = correct spot, Yellow = wrong spot."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-md">
          <div className="grid gap-1.5 mb-6">
            {rows.map((row, ri) => {
              const submitted = ri < guesses.length;
              const grade = submitted ? gradeGuess(row, target) : null;
              return (
                <div key={ri} className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: WORD_LEN }, (_, ci) => {
                    const letter = row[ci] ?? "";
                    const status = grade?.[ci];
                    return (
                      <div
                        key={ci}
                        className={`aspect-square flex items-center justify-center font-bold text-2xl rounded-lg border-2 transition-all
                          ${status === "correct" ? "bg-green-500 text-white border-green-500" :
                            status === "present" ? "bg-amber-400 text-white border-amber-400" :
                            status === "absent" ? "bg-muted text-muted-foreground border-muted" :
                            letter ? "border-foreground/30 bg-card" : "border-border bg-card"}`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {done && (
            <div className="rounded-2xl border border-primary/30 bg-card shadow-gold p-5 text-center mb-5">
              {won ? (
                <>
                  <Trophy className="w-10 h-10 text-primary mx-auto mb-1" />
                  <p className="font-bold text-lg">You got it!</p>
                  <p className="text-sm text-muted-foreground mb-3">in {guesses.length} {guesses.length === 1 ? "guess" : "guesses"}</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-lg">So close!</p>
                  <p className="text-sm text-muted-foreground mb-3">The word was <span className="font-bold text-primary">{target}</span></p>
                </>
              )}
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" /> New Game</Button>
            </div>
          )}

          <div className="space-y-1.5">
            {KEYBOARD_ROWS.map((row, ri) => (
              <div key={ri} className="flex justify-center gap-1">
                {ri === 2 && (
                  <button
                    onClick={() => press("ENTER")}
                    className="px-3 h-12 rounded-md bg-muted hover:bg-muted/70 text-xs font-bold uppercase"
                  >
                    Enter
                  </button>
                )}
                {row.split("").map((k) => {
                  const s = keyStatus[k];
                  return (
                    <button
                      key={k}
                      onClick={() => press(k)}
                      className={`w-8 sm:w-9 h-12 rounded-md font-bold text-sm
                        ${s === "correct" ? "bg-green-500 text-white" :
                          s === "present" ? "bg-amber-400 text-white" :
                          s === "absent" ? "bg-muted/40 text-muted-foreground" :
                          "bg-muted hover:bg-muted/70"}`}
                    >
                      {k}
                    </button>
                  );
                })}
                {ri === 2 && (
                  <button
                    onClick={() => press("BACK")}
                    className="px-3 h-12 rounded-md bg-muted hover:bg-muted/70 text-xs font-bold"
                  >
                    ⌫
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-1" /> New Game
            </Button>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="How to Play Bible Wordle">
          <p>
            Each day brings a fresh five-letter word drawn straight from scripture — a character, a place, a concept, or a virtue found in the Bible. Type any guess using the on-screen keyboard or your physical keys, then hit Enter. Tiles flip to reveal how close you got: <span className="font-semibold text-green-600">green</span> means the letter is in the word and in the right spot, <span className="font-semibold text-amber-600">yellow</span> means it appears elsewhere in the word, and gray means it isn't present at all.
          </p>
        </ContentBlock>

        <ContentBlock title="A Word Puzzle With Purpose">
          <p>
            Bible Wordle blends the satisfaction of a word puzzle with the richness of Christian vocabulary. Words like GRACE, PEACE, FAITH, PSALM, and MANNA challenge your letter-elimination skills while keeping your mind anchored in scripture. Whether you solve it in two tries or need all six, every round is a small celebration of biblical language. Share your result with friends or your small group — no spoilers needed, just colored squares.
          </p>
          <p>
            Enjoy more faith-based word challenges in our <Link href="/bible-word-games/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Word Search</Link> or try your knowledge in <Link href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</Link>. Prefer something more visual? Slide the pieces in <Link href="/bible-tiles/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Tiles</Link> or piece together our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jigsaw Puzzle</Link>.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("wordle", 4)} />
      <FaqSection />
    </>
  );
}
