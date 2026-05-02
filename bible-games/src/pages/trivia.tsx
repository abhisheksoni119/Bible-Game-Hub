import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, RotateCcw, CheckCircle2, XCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection, type FaqItem } from "@/components/games/FaqSection";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

type Difficulty = "easy" | "medium" | "hard";
type Category = "genesis" | "old-testament" | "new-testament";

const triviaBank: Record<Category, Record<Difficulty, { q: string; opts: string[]; a: string }[]>> = {
  genesis: {
    easy: [
      { q: "Who built the ark?", opts: ["Moses", "Noah", "Abraham", "David"], a: "Noah" },
      { q: "Adam and Eve lived in the Garden of...", opts: ["Eden", "Gethsemane", "Olives", "Sinai"], a: "Eden" },
      { q: "Who was Adam's first son?", opts: ["Seth", "Abel", "Cain", "Enoch"], a: "Cain" },
      { q: "How many days did God take to create the world?", opts: ["5", "6", "7", "10"], a: "6" },
      { q: "What did Eve eat from the forbidden tree?", opts: ["Apple", "Fig", "Fruit", "Grape"], a: "Fruit" },
    ],
    medium: [
      { q: "Who was Abraham's wife?", opts: ["Hagar", "Sarah", "Rebekah", "Leah"], a: "Sarah" },
      { q: "Joseph was sold by his brothers for how many pieces of silver?", opts: ["10", "20", "30", "40"], a: "20" },
      { q: "How old was Noah when the flood came?", opts: ["500", "600", "700", "800"], a: "600" },
      { q: "Who was Isaac's wife?", opts: ["Sarah", "Rebekah", "Rachel", "Leah"], a: "Rebekah" },
    ],
    hard: [
      { q: "How many sons did Jacob have?", opts: ["10", "11", "12", "13"], a: "12" },
      { q: "Who was Methuselah's father?", opts: ["Enoch", "Lamech", "Seth", "Kenan"], a: "Enoch" },
      { q: "What was the sign of God's covenant with Noah?", opts: ["Star", "Cloud", "Rainbow", "Dove"], a: "Rainbow" },
    ],
  },
  "old-testament": {
    easy: [
      { q: "Who led the Israelites out of Egypt?", opts: ["Moses", "Joshua", "Aaron", "David"], a: "Moses" },
      { q: "Who killed the giant Goliath?", opts: ["Saul", "David", "Samson", "Jonathan"], a: "David" },
      { q: "What was Moses' brother's name?", opts: ["Aaron", "Caleb", "Joshua", "Nathan"], a: "Aaron" },
      { q: "What body of water did Moses part?", opts: ["Jordan", "Nile", "Red Sea", "Galilee"], a: "Red Sea" },
    ],
    medium: [
      { q: "Who was the strongest man in the Bible?", opts: ["Samson", "David", "Goliath", "Saul"], a: "Samson" },
      { q: "Which book comes after Psalms?", opts: ["Job", "Proverbs", "Isaiah", "Ezra"], a: "Proverbs" },
      { q: "Who was thrown into the lions' den?", opts: ["Daniel", "Joseph", "Jonah", "David"], a: "Daniel" },
      { q: "How many plagues did God send upon Egypt?", opts: ["7", "10", "12", "40"], a: "10" },
    ],
    hard: [
      { q: "Who was the prophet that called fire from heaven on Mount Carmel?", opts: ["Elisha", "Elijah", "Isaiah", "Jeremiah"], a: "Elijah" },
      { q: "Which king built the first temple in Jerusalem?", opts: ["David", "Solomon", "Saul", "Hezekiah"], a: "Solomon" },
      { q: "Who succeeded Moses as leader of Israel?", opts: ["Aaron", "Joshua", "Caleb", "Samuel"], a: "Joshua" },
    ],
  },
  "new-testament": {
    easy: [
      { q: "Where was Jesus born?", opts: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"], a: "Bethlehem" },
      { q: "How many disciples did Jesus have?", opts: ["7", "10", "12", "14"], a: "12" },
      { q: "Who baptized Jesus?", opts: ["Peter", "John the Baptist", "Paul", "James"], a: "John the Baptist" },
      { q: "What is the first Gospel?", opts: ["Mark", "Matthew", "Luke", "John"], a: "Matthew" },
    ],
    medium: [
      { q: "Who denied Jesus three times?", opts: ["Judas", "Peter", "Thomas", "John"], a: "Peter" },
      { q: "What did Jesus turn water into at the wedding?", opts: ["Bread", "Oil", "Wine", "Honey"], a: "Wine" },
      { q: "Who wrote the most New Testament letters?", opts: ["Peter", "John", "Paul", "James"], a: "Paul" },
      { q: "On what mountain did Jesus give the famous sermon?", opts: ["Olives", "Sinai", "The Mount", "Carmel"], a: "The Mount" },
    ],
    hard: [
      { q: "Who replaced Judas as the twelfth apostle?", opts: ["Paul", "Barnabas", "Matthias", "Stephen"], a: "Matthias" },
      { q: "How many books are in the New Testament?", opts: ["24", "25", "27", "39"], a: "27" },
      { q: "Where did Paul preach his sermon to the Athenians?", opts: ["Acropolis", "Areopagus", "Forum", "Synagogue"], a: "Areopagus" },
    ],
  },
};

const triviaFaqs: FaqItem[] = [
  {
    q: "Are these Bible games completely free?",
    a: "Yes! All games on Bible Games Online are 100% free to play. There are no hidden fees or subscriptions required.",
  },
  {
    q: "How is Bible Trivia organized?",
    a: "You can pick a category (Genesis, Old Testament, or New Testament) and a difficulty level (Easy, Medium, or Hard). Each game serves up multiple-choice questions drawn from that selection.",
  },
  {
    q: "Are the questions suitable for kids?",
    a: "Easy questions are perfect for younger players and Sunday school. Medium and Hard tiers are better suited for teens and adults who want a deeper challenge.",
  },
  {
    q: "Can I play Bible Trivia on my phone?",
    a: "Yes — the trivia game is fully responsive. It works just as well on a phone screen as it does on a tablet or laptop.",
  },
  {
    q: "Do you add new questions over time?",
    a: "Our trivia bank is regularly expanded with fresh questions across categories so repeat players keep discovering new content.",
  },
];

export default function Trivia() {
  const [category, setCategory] = useState<Category>("old-testament");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [stage, setStage] = useState<"setup" | "playing" | "done">("setup");
  const [questions, setQuestions] = useState<typeof triviaBank.genesis.easy>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    const q = [...triviaBank[category][difficulty]].sort(() => Math.random() - 0.5);
    setQuestions(q);
    setIdx(0);
    setScore(0);
    setPicked(null);
    setStage("playing");
  }

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === questions[idx].a) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setStage("done");
      else { setIdx((i) => i + 1); setPicked(null); }
    }, 1100);
  }

  return (
    <>
      <Helmet>
        <title>Bible Trivia – Free Online Bible Quiz Game | Bible Games Online</title>
        <meta name="description" content="Play free Bible Trivia online! Choose your category and difficulty to begin the challenge. Old Testament, New Testament, and Genesis questions included." />
      </Helmet>

      <GameHero
        icon={<BookOpen className="w-7 h-7" />}
        title="Play Free Bible Trivia"
        subtitle="Test your Bible knowledge. Choose your category and difficulty to begin the challenge."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {stage === "setup" && (
            <div className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Game Setup</h2>
              </div>

              <p className="text-sm font-semibold text-muted-foreground mb-2">SELECT A CATEGORY</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                {([
                  { v: "genesis", label: "Genesis" },
                  { v: "old-testament", label: "Old Testament" },
                  { v: "new-testament", label: "New Testament" },
                ] as { v: Category; label: string }[]).map((c) => (
                  <button
                    key={c.v}
                    onClick={() => setCategory(c.v)}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all
                      ${category === c.v ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/40"}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <p className="text-sm font-semibold text-muted-foreground mb-2">SELECT DIFFICULTY</p>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold capitalize transition-all
                      ${difficulty === d ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/40"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <Button onClick={start} size="lg" className="w-full font-bold">
                <Play className="mr-2 w-4 h-4" /> Start Trivia Game
              </Button>
            </div>
          )}

          {stage === "playing" && questions[idx] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex justify-between mb-3">
                  <Badge variant="secondary">Question {idx + 1} / {questions.length}</Badge>
                  <Badge className="bg-primary text-primary-foreground">Score: {score}</Badge>
                </div>
                <Progress value={((idx) / questions.length) * 100} className="h-2 mb-6" />
                <div className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-6">{questions[idx].q}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questions[idx].opts.map((opt) => {
                      const isCorrect = picked && opt === questions[idx].a;
                      const isWrongPick = picked === opt && opt !== questions[idx].a;
                      return (
                        <button
                          key={opt}
                          onClick={() => pick(opt)}
                          disabled={!!picked}
                          className={`text-left rounded-xl border-2 px-4 py-3 font-medium transition-all
                            ${isCorrect ? "border-green-500 bg-green-50 text-green-700" :
                              isWrongPick ? "border-destructive bg-red-50 text-destructive" :
                              picked ? "border-border bg-card opacity-60" :
                              "border-border bg-card hover:border-primary hover:bg-primary/5"}`}
                        >
                          <span className="flex items-center gap-2">
                            {isCorrect && <CheckCircle2 className="w-4 h-4" />}
                            {isWrongPick && <XCircle className="w-4 h-4" />}
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {stage === "done" && (
            <div className="rounded-3xl border border-border bg-card shadow-gold p-8 text-center">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">Great job!</h2>
              <p className="text-muted-foreground mb-1">You scored</p>
              <p className="text-4xl font-bold text-primary mb-6">{score} / {questions.length}</p>
              <div className="flex justify-center gap-3">
                <Button onClick={() => setStage("setup")} variant="outline">
                  <RotateCcw className="mr-2 w-4 h-4" /> Change Settings
                </Button>
                <Button onClick={start}>
                  <Play className="mr-2 w-4 h-4" /> Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <ExploreMoreGames cards={exploreOthers("trivia", 4)} />

      <GameContent>
        <ContentBlock title="About Our Bible Trivia Game">
          <p>
            Bible Trivia is one of the best ways to reinforce what you know about scripture — and discover what you don't. Our quiz covers everything from Genesis to Revelation across three categories and three difficulty tiers, so the game grows with you as your knowledge deepens.
          </p>
          <p>
            Whether you're brushing up on Sunday school answers or training for a Bible bowl, you'll find rounds that feel just right. Pick a category, pick a difficulty, and dive in. Every round is short — usually under five minutes — making it perfect for a coffee break or a family devotion warm-up.
          </p>
        </ContentBlock>

        <ContentBlock title="Hard Bible Trivia Questions">
          <p>
            The Hard difficulty pulls from the deeper corners of scripture — minor prophets, lesser-known kings, the order of Paul's letters. National scripture buffs love this tier because it forces real recall, not just association.
          </p>
          <p>
            Working through hard questions is one of the most effective ways to grow in scripture. When you get a question wrong, look it up in your Bible — that single act of looking up turns a quiz into study, and a study into knowledge that sticks.
          </p>
        </ContentBlock>

        <ContentBlock title="Tricky Bible Questions and Answers">
          <p>
            Some Bible questions look simple but hide a clever twist. For example, "How many animals went into the ark?" Most people answer "two of every kind" — but Genesis 7 also describes seven pairs of every clean animal. These are the kinds of details our Medium and Hard tiers love to surface.
          </p>
          <p>
            Other classic tricky questions: which of the Ten Commandments did Moses break first (literally — he smashed the tablets)? Which book of the Bible never mentions God by name (Esther)? Trivia is a wonderful way to encounter these surprises in a low-stakes setting.
          </p>
        </ContentBlock>

        <ContentBlock title="Bible Jeopardy Style Quiz">
          <p>
            If you enjoy this trivia format, you'll love the Jeopardy-style approach where you choose the category and the stakes. Visit our <a href="/bible-jeopardy/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jeopardy</a> page to play a board with six categories and 30 clues, or try <a href="/bible-millionaire/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Millionaire</a> for a high-stakes quiz with a virtual prize ladder.
          </p>
        </ContentBlock>
      </GameContent>

      <FaqSection items={triviaFaqs} />
    </>
  );
}
