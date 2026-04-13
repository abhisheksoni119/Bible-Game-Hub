import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Gamepad2, Users, Trophy, ChevronRight, CheckCircle2, XCircle } from "lucide-react";

const triviaQuestions = [
  {
    question: "Who built the ark?",
    options: ["Moses", "Noah", "Abraham", "David"],
    answer: "Noah",
  },
  {
    question: "How many days did God take to create the world?",
    options: ["5", "6", "7", "10"],
    answer: "6",
  },
  {
    question: "What is the first book of the Bible?",
    options: ["Exodus", "Psalms", "Genesis", "Matthew"],
    answer: "Genesis",
  },
  {
    question: "Who was swallowed by a great fish?",
    options: ["Elijah", "Jonah", "Daniel", "Paul"],
    answer: "Jonah",
  },
  {
    question: "How many disciples did Jesus have?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
];

const gameCategories = [
  { title: "Bible Trivia", href: "/bible-trivia/", icon: "📖", desc: "Test your Bible knowledge with hundreds of questions" },
  { title: "Word Games", href: "/bible-word-games/", icon: "🔤", desc: "Find hidden Bible words in our word search puzzles" },
  { title: "Kids Games", href: "/kids-bible-games/", icon: "🎠", desc: "Fun and educational Bible games for children" },
  { title: "Bible Wordle", href: "/bible-wordle/", icon: "🟩", desc: "Guess the Bible word in 6 tries" },
  { title: "Bible Jeopardy", href: "/bible-jeopardy/", icon: "💡", desc: "Answer Bible questions in Jeopardy style" },
  { title: "Bible Millionaire", href: "/bible-millionaire/", icon: "💰", desc: "Who wants to be a Bible millionaire?" },
  { title: "Memory Games", href: "/bible-memory-games/", icon: "🧠", desc: "Match Bible cards and train your memory" },
  { title: "Verse Generator", href: "/bible-verse-generator/", icon: "✨", desc: "Discover inspiring Bible verses" },
];

export default function Home() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = triviaQuestions[currentQ];

  function handleAnswer(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentQ + 1 >= triviaQuestions.length) {
        setFinished(true);
      } else {
        setCurrentQ((c) => c + 1);
        setSelected(null);
      }
    }, 900);
  }

  function resetGame() {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <>
      <Helmet>
        <title>Bible Games Online – Play Free Bible Trivia, Wordle & More</title>
        <meta name="description" content="Play free Bible games online including trivia, word search, Wordle, Jeopardy, and kids games. Test your Bible knowledge and have fun!" />
      </Helmet>

      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-4">
            <BookOpen className="w-14 h-14 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Play Free Bible Games Online and<br className="hidden md:block" />{" "}
            Test Your Knowledge in a Fun Way
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-8">
            Explore hundreds of Bible trivia questions, word games, memory challenges, and more.
            Learn scripture while having fun — for all ages!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/bible-trivia/">Play Trivia</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/bible-word-games/">Word Games</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base border-white/30 text-secondary-foreground hover:bg-white/10">
              <Link href="/kids-bible-games/">Kids Games</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Mini Trivia Game */}
      <section className="py-16 px-4 bg-muted/40">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-2 section-title-bar">Quick Bible Quiz</h2>
          <p className="text-center text-muted-foreground mb-8">5 quick questions to warm up your Bible knowledge</p>

          {!finished ? (
            <Card className="shadow-card-lg">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary">Question {currentQ + 1} / {triviaQuestions.length}</Badge>
                  <Badge className="bg-primary text-primary-foreground">Score: {score}</Badge>
                </div>
                <CardTitle className="text-xl">{q.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt) => {
                    let variant: "outline" | "default" | "destructive" = "outline";
                    if (selected) {
                      if (opt === q.answer) variant = "default";
                      else if (opt === selected) variant = "destructive";
                    }
                    return (
                      <Button
                        key={opt}
                        variant={variant}
                        className="justify-start text-left h-auto py-3"
                        onClick={() => handleAnswer(opt)}
                      >
                        {selected && opt === q.answer && <CheckCircle2 className="mr-2 w-4 h-4" />}
                        {selected && opt === selected && opt !== q.answer && <XCircle className="mr-2 w-4 h-4" />}
                        {opt}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card-lg text-center">
              <CardContent className="py-10">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-lg mb-6">You scored <span className="text-primary font-bold">{score}</span> out of {triviaQuestions.length}</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button onClick={resetGame} variant="outline">Play Again</Button>
                  <Button asChild>
                    <Link href="/bible-trivia/">Play Full Game <ChevronRight className="ml-1 w-4 h-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 section-title-bar">Game Categories</h2>
          <p className="text-center text-muted-foreground mb-10">Choose from a wide variety of Bible games</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameCategories.map((cat) => (
              <motion.div key={cat.href} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href={cat.href}>
                  <Card className="h-full shadow-card hover:shadow-card-lg transition-shadow cursor-pointer group">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-3">{cat.icon}</div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="text-sm text-muted-foreground">{cat.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-primary" />, value: "12+", label: "Bible Games" },
              { icon: <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />, value: "500+", label: "Trivia Questions" },
              { icon: <Users className="w-8 h-8 mx-auto mb-2 text-primary" />, value: "All Ages", label: "Suitable For" },
              { icon: <Star className="w-8 h-8 mx-auto mb-2 text-primary" />, value: "100%", label: "Free to Play" },
            ].map((stat, i) => (
              <div key={i}>
                {stat.icon}
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-secondary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold mb-6">Welcome to Bible Games Online</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bible Games Online is your ultimate destination for free online Bible activities that make learning scripture
            entertaining and engaging. Whether you're a seasoned Bible scholar or just beginning your journey of faith,
            our collection of Christian games offers something for everyone.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our Bible quiz games challenge your knowledge of the Old and New Testament, covering everything from
            Genesis to Revelation. With hundreds of questions across multiple difficulty levels, you'll never run out
            of ways to test and expand your biblical understanding.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Parents and teachers love our games for kids — interactive, faith-based activities designed to help
            younger learners connect with the Bible in a fun and memorable way. Our kids Bible games include memory
            matching, character recognition, and simple trivia perfect for Sunday school and home learning.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            From our unique Bible Wordle game where you guess scripture-based words, to the exciting Bible Jeopardy
            format that brings the classic quiz show to your faith journey, we're constantly expanding our catalog
            of online Bible activities to keep you engaged and growing.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            All games are completely free, mobile-friendly, and require no downloads. Simply visit, play, and
            deepen your relationship with God's Word through the power of play.
          </p>
        </div>
      </section>
    </>
  );
}
