import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpen, Search, Type, Trophy, RotateCw, Layout, Brain,
  Sparkles, Grid3x3, User, Baby, ArrowRight, CheckCircle2, XCircle,
  Heart, Star, Layers, Puzzle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/games/FaqSection";

const heroGames = [
  {
    href: "/bible-trivia/",
    title: "Bible Trivia",
    description: "Quiz across Old & New Testament, with three difficulty tiers.",
    icon: BookOpen,
    canvas: "bg-amber-100",
    iconColor: "text-amber-900",
  },
  {
    href: "/bible-word-games/",
    title: "Bible Word Search",
    description: "Hunt for hidden scripture words on a generated grid.",
    icon: Search,
    canvas: "bg-emerald-100",
    iconColor: "text-emerald-900",
  },
  {
    href: "/kids-bible-games/",
    title: "Kids Matching",
    description: "Bright, gentle card-flip game built for young readers.",
    icon: Baby,
    canvas: "bg-rose-100",
    iconColor: "text-rose-900",
  },
];

const smallGames = [
  { href: "/bible-wordle/", title: "Wordle", icon: Type },
  { href: "/bible-millionaire/", title: "Millionaire", icon: Trophy },
  { href: "/bible-jeopardy/", title: "Jeopardy", icon: Layout },
  { href: "/bible-wheel-of-fortune/", title: "Wheel of Fortune", icon: RotateCw },
  { href: "/bible-memory-games/", title: "Memory", icon: Brain },
  { href: "/bible-verse-generator/", title: "Verse Gen", icon: Sparkles },
  { href: "/bible-crossword/", title: "Crossword", icon: Grid3x3 },
  { href: "/bible-who-am-i/", title: "Who Am I?", icon: User },
  { href: "/bible-tiles/", title: "Bible Tiles", icon: Layers },
  { href: "/bible-jigsaw-puzzle/", title: "Jigsaw", icon: Puzzle },
];

const quickQuestions = [
  { q: "Who built the ark?", opts: ["Moses", "Noah", "Abraham", "David"], a: "Noah" },
  { q: "Where was Jesus born?", opts: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"], a: "Bethlehem" },
  { q: "How many disciples did Jesus have?", opts: ["7", "10", "12", "14"], a: "12" },
  { q: "Who was thrown into the lions' den?", opts: ["Daniel", "David", "Joseph", "Jonah"], a: "Daniel" },
  { q: "What is the first book of the Bible?", opts: ["Exodus", "Genesis", "Psalms", "Matthew"], a: "Genesis" },
];

const homeFaqs = [
  {
    q: "Are these Bible games completely free?",
    a: "Yes. Every single game on Bible Games Online is free to play, with no signup, ads, or paywalls. Our mission is to make scripture engagement joyful and accessible to everyone.",
  },
  {
    q: "Do I need to create an account or download anything?",
    a: "No. Open the site, pick a game, and play instantly in your browser. There's nothing to install on phones, tablets, or computers.",
  },
  {
    q: "Are these games appropriate for children?",
    a: "Yes — all games are family-friendly and built around scripture. Younger kids will especially enjoy the matching game and word search, while older students can tackle trivia, Millionaire, and Jeopardy.",
  },
  {
    q: "Can I play on a phone or tablet?",
    a: "Absolutely. The site is fully responsive — every game adjusts to your screen size and works smoothly on iOS and Android devices.",
  },
  {
    q: "How often are new questions and games added?",
    a: "We're continually expanding our trivia banks and adding new game formats. Bookmark the site and check back often for fresh challenges.",
  },
];

export default function Home() {
  const [qIdx] = useState(() => Math.floor(Math.random() * quickQuestions.length));
  const question = quickQuestions[qIdx];
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Bible Games Online — Play Free Bible Trivia, Word Search, Wordle & More</title>
        <meta
          name="description"
          content="Play free Bible games online — trivia, word search, Wordle, Millionaire, Jeopardy, crossword and more. Fun scripture games for kids, families, Sunday school, and adults."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent)" }}
        />
        <div className="container mx-auto px-4 pt-16 pb-20 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 ring-1 ring-primary/30 mb-6 text-primary">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.1] mb-6 max-w-4xl mx-auto">
            Play Free Bible Games Online{" "}
            <span className="italic text-primary">and Test Your Knowledge</span>
          </h1>
          <p className="text-lg text-secondary-foreground/75 max-w-2xl mx-auto mb-8">
            Discover interactive and fun ways to learn about the Bible. Play trivia, word games, and games for kids — all free to play.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-bold">
              <Link href="/bible-trivia/">Play Trivia</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
              <Link href="/bible-word-games/">Word Search</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/20 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground font-bold">
              <Link href="/bible-wordle/">Wordle</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK BIBLE QUIZ */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-3xl border border-border bg-card shadow-card-lg p-6 md:p-8">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
              <Sparkles className="w-4 h-4" /> Quick Bible Quiz
            </div>
            <h2 className="text-2xl font-bold mb-1">{question.q}</h2>
            <p className="text-sm text-muted-foreground mb-5">Pick your answer to warm up.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.opts.map((opt) => {
                const isCorrect = picked && opt === question.a;
                const isWrongPick = picked === opt && opt !== question.a;
                return (
                  <button
                    key={opt}
                    onClick={() => !picked && setPicked(opt)}
                    className={`text-left rounded-xl border-2 px-4 py-3 font-medium transition-all
                      ${isCorrect ? "border-green-500 bg-green-50 text-green-700" :
                        isWrongPick ? "border-destructive bg-red-50 text-destructive" :
                        picked ? "border-border bg-card opacity-60" :
                        "border-border bg-card hover:border-primary hover:bg-primary/5"}`}
                    disabled={!!picked}
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
            {picked && (
              <div className="mt-5 text-center">
                <Button asChild>
                  <Link href="/bible-trivia/">Play Full Trivia <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR GAME */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold section-title-bar inline-block">Choose Your Game</h2>
            <p className="text-muted-foreground mt-4">Different games for every mood — pick your favorite.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-8">
            {heroGames.map((g, i) => (
              <motion.div
                key={g.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={g.href}
                  className="group block rounded-3xl bg-card shadow-card hover:shadow-card-lg transition-all hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`relative h-44 ${g.canvas} flex items-center justify-center overflow-hidden`}>
                    <div
                      className="absolute inset-0 opacity-30 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                        color: "rgba(0,0,0,0.4)",
                      }}
                    />
                    <g.icon
                      strokeWidth={1.5}
                      className={`w-24 h-24 ${g.iconColor} group-hover:scale-110 transition-transform duration-300 relative`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{g.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-5xl mx-auto">
            {smallGames.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <g.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover Interactive Ways to Learn and Enjoy the Bible</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Bible Games Online is your home for free, browser-based scripture games designed to make learning the Word feel like play. Whether you're a Sunday school teacher, a parent looking for wholesome screen time, or an adult who simply enjoys a good Bible challenge, there's a game here for you.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "12+ scripture-themed games for every age group",
                "Old and New Testament content covered in depth",
                "Difficulty levels from easy to expert",
                "Great for solo play, family time, or group study",
              ].map((p) => (
                <li key={p} className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/bible-trivia/">Get Started Free <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Challenge Yourself with Engaging Bible Quiz Games</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our quiz games challenge what you know — and gently fill in what you don't. From <Link href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</Link> to <Link href="/bible-millionaire/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Millionaire</Link>, each round combines familiar passages with lesser-known facts so you keep discovering scripture in a new light. Great for personal devotion warm-ups, classroom review, or family game night.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Explore Word Search and Puzzle-Based Bible Challenges</h2>
            <p className="text-muted-foreground leading-relaxed">
              Word lovers can sharpen vocabulary with our scripture-themed <Link href="/bible-word-games/" className="text-primary font-medium underline-offset-4 hover:underline">Word Search</Link>, <Link href="/bible-crossword/" className="text-primary font-medium underline-offset-4 hover:underline">Crossword</Link>, and <Link href="/bible-wordle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Wordle</Link>. Puzzle fans can also slide their way through <Link href="/bible-tiles/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Tiles</Link> or piece together a beautiful biblical scene in our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jigsaw Puzzle</Link>. These slower-paced puzzles are perfect for quiet mornings, study breaks, or a focused moment of meditation on a passage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Fun and Educational Bible Games Designed for Kids</h2>
            <p className="text-muted-foreground leading-relaxed">
              Younger players love our <Link href="/kids-bible-games/" className="text-primary font-medium underline-offset-4 hover:underline">Kids Matching</Link> game, where colorful animal cards introduce children to creation. Pair it with the <Link href="/bible-verse-generator/" className="text-primary font-medium underline-offset-4 hover:underline">Verse Generator</Link> for a gentle moment of reflection, or use the <Link href="/bible-who-am-i/" className="text-primary font-medium underline-offset-4 hover:underline">Who Am I?</Link> clue game to spark curiosity about Bible heroes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Playing Bible Games Online Can Be Both Fun and Meaningful</h2>
            <p className="text-muted-foreground leading-relaxed">
              Quality matters. Each game is built so the playful surface — colors, animations, scoring — sits on top of accurate scripture content. The result is a study habit that doesn't feel like studying. Play a few rounds before bed, share Trivia with friends, or use Memory Games to memorize a passage without trying. The Word stays with you.
            </p>
          </div>
        </div>
      </section>

      {/* DAILY BIBLE VERSE */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-3xl border border-primary/30 bg-card shadow-gold p-8 text-center">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
              <Star className="w-4 h-4 fill-primary" /> Daily Bible Verse
            </div>
            <blockquote className="font-display text-xl md:text-2xl italic text-foreground leading-relaxed mb-3">
              "For the Lord is good and his love endures forever; his faithfulness continues through all generations."
            </blockquote>
            <p className="text-primary font-bold mb-5">— Psalm 100:5</p>
            <Button asChild variant="outline">
              <Link href="/bible-verse-generator/"><Heart className="mr-2 w-4 h-4" />Get Another Verse</Link>
            </Button>
          </div>
        </div>
      </section>

      <FaqSection items={homeFaqs} />
    </>
  );
}
