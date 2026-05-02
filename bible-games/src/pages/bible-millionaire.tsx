import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Trophy, RotateCcw, Phone, Users, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const questions = [
  { q: "Who was the first person to sin?", opts: ["Adam", "Eve", "Satan", "Cain"], a: "Eve" },
  { q: "What river was Jesus baptized in?", opts: ["Nile River", "Euphrates River", "Jordan River", "Sea of Galilee"], a: "Jordan River" },
  { q: "How many men besides Noah survived the flood on the ark?", opts: ["3", "5", "7", "9"], a: "7" },
  { q: "What is the longest book in the Bible?", opts: ["Isaiah", "Jeremiah", "Psalms", "Genesis"], a: "Psalms" },
  { q: "Who replaced Judas Iscariot as an apostle?", opts: ["Paul", "Matthias", "Barnabas", "Stephen"], a: "Matthias" },
  { q: "In what book does the story of Job appear?", opts: ["Psalms", "Proverbs", "Job", "Ecclesiastes"], a: "Job" },
  { q: "Who anointed David as king?", opts: ["Samuel", "Elijah", "Nathan", "Moses"], a: "Samuel" },
  { q: "What is the last book of the Old Testament?", opts: ["Zechariah", "Malachi", "Ezra", "Nehemiah"], a: "Malachi" },
  { q: "How many days did Lazarus spend in the tomb?", opts: ["2", "3", "4", "5"], a: "4" },
  { q: "Who wrote the letter to the Romans?", opts: ["Peter", "James", "Paul", "John"], a: "Paul" },
  { q: "What was the name of Abraham's father?", opts: ["Nahor", "Haran", "Terah", "Lot"], a: "Terah" },
  { q: "In which city did Pentecost occur?", opts: ["Bethlehem", "Nazareth", "Jerusalem", "Antioch"], a: "Jerusalem" },
  { q: "What was Paul's profession before missions?", opts: ["Fisherman", "Tax Collector", "Tentmaker", "Carpenter"], a: "Tentmaker" },
  { q: "Who was the high priest when Jesus was arrested?", opts: ["Annas", "Caiaphas", "Herod", "Pilate"], a: "Caiaphas" },
  { q: "How many years did the Israelites wander in the wilderness?", opts: ["20", "30", "40", "50"], a: "40" },
];

const ladder = [
  "$1,000,000", "$500,000", "$250,000", "$125,000", "$64,000",
  "$32,000", "$16,000", "$8,000", "$4,000", "$2,000",
  "$1,000", "$500", "$300", "$200", "$100",
];

export default function BibleMillionaire() {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<"won" | "lost" | null>(null);
  const [usedFifty, setUsedFifty] = useState(false);
  const [usedPhone, setUsedPhone] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);
  const [phoneTip, setPhoneTip] = useState<string | null>(null);
  const [audienceTip, setAudienceTip] = useState<Record<string, number> | null>(null);

  const q = questions[current];
  const reverseStep = ladder.length - 1 - current;
  const currentPrize = ladder[reverseStep];

  function answer(opt: string) {
    if (picked) return;
    setPicked(opt);
    setTimeout(() => {
      if (opt === q.a) {
        if (current + 1 >= questions.length) setDone("won");
        else { setCurrent((c) => c + 1); setPicked(null); setHidden([]); setPhoneTip(null); setAudienceTip(null); }
      } else {
        setDone("lost");
      }
    }, 1300);
  }

  function fifty() {
    if (usedFifty || picked) return;
    const wrong = q.opts.filter((o) => o !== q.a);
    const drop = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setHidden(drop);
    setUsedFifty(true);
  }

  function phone() {
    if (usedPhone || picked) return;
    setPhoneTip(q.a);
    setUsedPhone(true);
  }

  function audience() {
    if (usedAudience || picked) return;
    const dist: Record<string, number> = {};
    let remaining = 100;
    const correctPct = 50 + Math.floor(Math.random() * 30);
    dist[q.a] = correctPct;
    remaining -= correctPct;
    const others = q.opts.filter((o) => o !== q.a);
    others.forEach((o, i) => {
      const v = i === others.length - 1 ? remaining : Math.floor(Math.random() * remaining);
      dist[o] = v;
      remaining -= v;
    });
    setAudienceTip(dist);
    setUsedAudience(true);
  }

  function reset() {
    setCurrent(0); setPicked(null); setDone(null);
    setUsedFifty(false); setUsedPhone(false); setUsedAudience(false);
    setHidden([]); setPhoneTip(null); setAudienceTip(null);
  }

  return (
    <>
      <Helmet>
        <title>Bible Millionaire – Free Bible Quiz Game | Bible Games Online</title>
        <meta name="description" content="Play Bible Millionaire! Answer 15 Bible questions correctly to win the virtual $1,000,000 prize. Use lifelines wisely!" />
      </Helmet>

      <GameHero
        icon={<Trophy className="w-6 h-6" />}
        title="Bible Millionaire"
        subtitle="Answer 15 Bible questions correctly and win $1,000,000. Use your lifelines wisely!"
        meta={
          done === null && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fifty} disabled={usedFifty || !!picked} className="bg-transparent border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
                <Scissors className="w-4 h-4 mr-1" /> 50:50
              </Button>
              <Button variant="outline" size="sm" onClick={phone} disabled={usedPhone || !!picked} className="bg-transparent border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
                <Phone className="w-4 h-4 mr-1" /> Phone
              </Button>
              <Button variant="outline" size="sm" onClick={audience} disabled={usedAudience || !!picked} className="bg-transparent border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
                <Users className="w-4 h-4 mr-1" /> Audience
              </Button>
            </div>
          )
        }
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {done ? (
            <div className="rounded-3xl border border-primary/30 bg-card shadow-gold p-8 text-center max-w-xl mx-auto">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-3" />
              {done === "won" ? (
                <>
                  <h2 className="text-3xl font-bold mb-1 text-primary">YOU WON!</h2>
                  <p className="text-2xl mb-6">$1,000,000</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">Game Over</h2>
                  <p className="mb-1">Correct answer was <span className="font-bold text-primary">{q.a}</span></p>
                  <p className="text-muted-foreground mb-6">You reached <span className="font-bold">{current === 0 ? "$0" : ladder[ladder.length - current]}</span></p>
                </>
              )}
              <Button onClick={reset}><RotateCcw className="mr-2 w-4 h-4" /> Play Again</Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_220px] gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-7"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">QUESTION {current + 1} OF {questions.length}</Badge>
                    <Badge className="bg-primary text-primary-foreground">{currentPrize}</Badge>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-5">{q.q}</h2>

                  {phoneTip && !picked && (
                    <div className="rounded-xl bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 mb-4 text-sm">
                      📞 A friend says: "I'm pretty sure it's <span className="font-bold">{phoneTip}</span>."
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.opts.map((opt, i) => {
                      const isHidden = hidden.includes(opt);
                      const isCorrect = picked && opt === q.a;
                      const isWrongPick = picked === opt && opt !== q.a;
                      const aud = audienceTip?.[opt];
                      return (
                        <button
                          key={opt}
                          disabled={!!picked || isHidden}
                          onClick={() => answer(opt)}
                          className={`text-left rounded-xl border-2 px-4 py-3 font-medium transition-all relative overflow-hidden
                            ${isHidden ? "opacity-30 line-through" :
                              isCorrect ? "border-green-500 bg-green-50 text-green-700" :
                              isWrongPick ? "border-destructive bg-red-50 text-destructive" :
                              picked ? "border-border bg-card opacity-60" :
                              "border-border bg-card hover:border-primary hover:bg-primary/5"}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-primary font-bold">{["A", "B", "C", "D"][i]}:</span>
                            {opt}
                          </span>
                          {aud !== undefined && (
                            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${aud}%` }} />
                              <span className="text-[10px] font-bold text-muted-foreground">{aud}%</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="rounded-3xl border border-border bg-card shadow-card p-3 h-fit">
                <p className="text-center text-xs font-bold text-muted-foreground mb-2 tracking-wider">PRIZE LADDER</p>
                <ul className="space-y-0.5 text-sm">
                  {ladder.map((p, i) => {
                    const isCurrent = i === reverseStep;
                    const isPast = i < reverseStep;
                    return (
                      <li
                        key={p}
                        className={`flex justify-between items-center px-3 py-1 rounded-md text-xs font-semibold
                          ${isCurrent ? "bg-primary text-primary-foreground" :
                            isPast ? "text-muted-foreground/50" : "text-foreground"}`}
                      >
                        <span>{ladder.length - i}</span>
                        <span>{p}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <GameContent>
        <ContentBlock title="How Bible Millionaire Works">
          <p>
            Fifteen questions stand between you and a million dollars in Bible knowledge. The first five are drawn from easy scripture facts, the middle five test your familiarity with characters and events, and the top five challenge even seasoned Bible students. Each question comes with four multiple-choice options. Two safe havens protect your winnings at Question 5 ($1,000) and Question 10 ($32,000) — answer incorrectly before a safe haven and you walk away empty-handed.
          </p>
        </ContentBlock>
        <ContentBlock title="Use Your Lifelines Wisely">
          <p>
            Three lifelines help when scripture gets tricky. <span className="font-semibold">50:50</span> eliminates two wrong answers, <span className="font-semibold">Phone a Friend</span> offers a helpful hint, and <span className="font-semibold">Ask the Audience</span> shows what percentage of players chose each option. Save them for the high-value questions — or use them early if a question stumps you before a safe haven. For more Bible quiz action, try our <a href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</a> or challenge yourself with the board game format of <a href="/bible-jeopardy/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jeopardy</a>.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("millionaire", 4)} />
      <FaqSection />
    </>
  );
}
