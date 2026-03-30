import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, Smile, Play, CheckCircle2, XCircle, ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { homeFAQs, triviaQuestions, bibleVerses } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { PageSEO } from "@/components/seo/PageSEO";
import { WebSiteSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

export default function Home() {
  const [, setLocation] = useLocation();
  const miniTriviaQuestions = triviaQuestions.slice(0, 4);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [verseKey, setVerseKey]   = useState(0);
  const [verseIdx, setVerseIdx]   = useState(() => Math.floor(Math.random() * bibleVerses.length));
  const dailyVerse = useMemo(() => bibleVerses[verseIdx], [verseIdx]);
  const refreshVerse = () => {
    setVerseIdx(i => { let n = Math.floor(Math.random() * bibleVerses.length); while (n === i) n = Math.floor(Math.random() * bibleVerses.length); return n; });
    setVerseKey(k => k + 1);
  };

  const handleMiniTriviaAnswer = (index: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(index);
    if (index === miniTriviaQuestions[currentQ].correctIndex) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentQ < miniTriviaQuestions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const games = [
    {
      href: "/bible-trivia",
      img: `${import.meta.env.BASE_URL}images/trivia-card.png`,
      label: "Bible Trivia",
      desc: "Test your knowledge of scriptures, characters, and events from both the Old and New Testaments.",
      badge: "243 questions",
    },
    {
      href: "/bible-word-games",
      img: `${import.meta.env.BASE_URL}images/word-game-card.png`,
      label: "Word Search",
      desc: "Find hidden biblical words in a freshly generated 12×12 letter grid. A new puzzle every time.",
      badge: "Infinite grids",
    },
    {
      href: "/kids-bible-games",
      img: `${import.meta.env.BASE_URL}images/kids-game-card.png`,
      label: "Kids Games",
      desc: "Fun, vibrant matching games featuring animals from the ark — perfect for young learners.",
      badge: "Kid friendly",
    },
  ];

  return (
    <div className="w-full">
      <PageSEO
        title="Play Free Bible Games Online | Bible Trivia, Kids & Puzzle Games"
        description="Play free Bible games online including trivia, word search, and fun kids Bible games. Test your knowledge and enjoy interactive Christian games."
        canonicalPath="/"
      />
      <WebSiteSchema />
      <FAQSchema />

      {/* ── HERO ── */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-15">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-transparent to-secondary/60" />
        {/* Gold glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-36 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/15 text-primary font-medium text-sm mb-6 border border-primary/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Free to Play · No Sign Up Required
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-5 text-white">
              Play Free Bible Games Online{" "}
              <span className="text-primary italic">and Test Your Knowledge</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/75 max-w-2xl mx-auto mb-9 leading-relaxed">
              Discover interactive and fun ways to learn about the Bible. Trivia, word searches, and kids games — all free, all here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => setLocation('/bible-trivia/')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-gold hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 min-h-[52px]"
              >
                <Brain className="w-5 h-5" /> Play Trivia
              </button>
              <button
                onClick={() => setLocation('/bible-word-games/')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold bg-white/8 text-white hover:bg-white/15 border border-white/15 hover:border-white/25 shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm min-h-[52px]"
              >
                <Search className="w-5 h-5" /> Word Games
              </button>
              <button
                onClick={() => setLocation('/kids-bible-games/')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold bg-white/8 text-white hover:bg-white/15 border border-white/15 hover:border-white/25 shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm min-h-[52px]"
              >
                <Smile className="w-5 h-5" /> Kids Games
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── MINI TRIVIA ── */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-card rounded-3xl p-5 sm:p-8 md:p-12 shadow-card-lg overflow-hidden">
            {/* Gold accent bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary via-primary/70 to-transparent rounded-l-3xl" />

            <div className="text-center mb-7">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Try it now</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Quick Bible Quiz</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Test yourself with 4 quick questions!</p>
            </div>

            {!showResult ? (
              <div>
                <div className="flex justify-between text-sm font-semibold text-muted-foreground mb-5">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">{currentQ + 1}</span>
                    <span>of 4</span>
                  </span>
                  <span className="text-primary font-bold">Score: {score}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-5 leading-snug">
                  {miniTriviaQuestions[currentQ].question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {miniTriviaQuestions[currentQ].options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isCorrect = i === miniTriviaQuestions[currentQ].correctIndex;
                    const showCorrect = selectedOpt !== null && isCorrect;
                    const showWrong = selectedOpt !== null && isSelected && !isCorrect;
                    const dimmed = selectedOpt !== null && !showCorrect && !showWrong;

                    return (
                      <button
                        key={i}
                        onClick={() => handleMiniTriviaAnswer(i)}
                        disabled={selectedOpt !== null}
                        className={`p-4 rounded-2xl text-left font-medium transition-all duration-200 border-2 flex items-center justify-between gap-3 leading-snug
                          ${selectedOpt === null ? 'bg-background hover:bg-primary/5 border-border hover:border-primary/50 hover:shadow-md cursor-pointer' : ''}
                          ${showCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : ''}
                          ${showWrong ? 'bg-red-50 border-red-400 text-red-800' : ''}
                          ${dimmed ? 'opacity-40 border-border bg-background cursor-default' : ''}
                        `}
                      >
                        <span>{opt}</span>
                        {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                        {showWrong && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 text-primary mb-5 shadow-gold">
                  <span className="text-3xl font-bold font-display">{score}/4</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Great job!</h3>
                <p className="text-muted-foreground mb-7">Ready for a real challenge?</p>
                <button
                  onClick={() => setLocation('/bible-trivia/')}
                  className="px-8 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                >
                  Play Full Game <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── GAME CATEGORIES ── */}
      <section className="py-12 sm:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Our Games</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 section-title-bar">Choose Your Game</h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-5">Different games for every mood — all rooted in scripture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {games.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-lg hover:-translate-y-2 transition-all duration-300 border border-border/60"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={game.img}
                    alt={game.label}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-4 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                    {game.badge}
                  </span>
                  <h3 className="absolute bottom-4 left-5 text-2xl font-display font-bold text-white">
                    {game.label}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-5 text-sm leading-relaxed line-clamp-2">{game.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
                    Play Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* New Games Row */}
          <div className="mt-8">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-primary mb-5">New Games</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { href:"/bible-wordle/",          emoji:"📖", label:"Bible Wordle",        badge:"Daily word" },
                { href:"/bible-millionaire/",     emoji:"💰", label:"Millionaire",          badge:"15 questions" },
                { href:"/bible-wheel-of-fortune/",emoji:"🎡", label:"Wheel of Fortune",    badge:"Guess phrases" },
                { href:"/bible-jeopardy/",        emoji:"📺", label:"Bible Jeopardy",       badge:"30 clues" },
                { href:"/bible-memory-games/",    emoji:"🧩", label:"Memory Games",         badge:"12 pairs" },
              ].map(g => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group flex flex-col items-center gap-2 bg-card border border-border rounded-2xl p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200 text-center"
                >
                  <span className="text-3xl">{g.emoji}</span>
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">{g.label}</span>
                  <span className="text-xs text-muted-foreground">{g.badge}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ── */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Discover Interactive Ways to Learn and Enjoy the Bible</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bible Games Online is your free destination for faith-based games you can play anywhere — no downloads, no sign-up, no cost.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unlike reading a passage and moving on, interactive play asks you to actively recall, recognize, and reason. These mental exercises deepen your connection to scripture in a way that sticks long after the game ends.
            </p>
            <ul className="space-y-2.5 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                <span><Link href="/bible-trivia/" className="text-primary hover:underline font-medium">Scripture trivia quizzes</Link> covering Old Testament, New Testament, and general knowledge</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                <span><Link href="/bible-word-games/" className="text-primary hover:underline font-medium">Bible word search puzzles</Link> that generate a fresh grid every time you play</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                <span><Link href="/kids-bible-games/" className="text-primary hover:underline font-medium">Kid-friendly matching games</Link> built around Noah's Ark animals</span>
              </li>
            </ul>
          </div>

          {/* CTA strip */}
          <div className="flex flex-col sm:flex-row gap-3 p-5 sm:p-6 rounded-2xl bg-muted/60 border border-border">
            <Link href="/bible-trivia/" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-5 py-3.5 text-sm hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-sm">
              <Brain className="w-4 h-4 shrink-0" /> Play Bible Trivia
            </Link>
            <Link href="/bible-word-games/" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3.5 text-sm hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-150">
              <Search className="w-4 h-4 shrink-0" /> Try Word Games
            </Link>
            <Link href="/kids-bible-games/" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3.5 text-sm hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-150">
              <Smile className="w-4 h-4 shrink-0" /> Explore Kids Games
            </Link>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Challenge Yourself with Engaging Bible Quiz Games</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our quiz covers every level — from easy warm-ups to hard questions that stump even lifelong churchgoers. Pick a category, set your difficulty, and see how much you really know.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Great for Sunday school, youth groups, family game nights, or a quiet personal study break. Each round gives you 10 questions with instant right-or-wrong feedback so you learn as you go.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              What makes a Bible quiz memorable is that moment when a question makes you pause and truly think. Our question bank spans familiar passages and lesser-known verses alike, so every session grows your scripture knowledge.
            </p>
            <Link href="/bible-trivia/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Start the trivia challenge <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Explore Word Search and Puzzle-Based Bible Challenges</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Prefer something calmer? Our scripture word hunt hides names, places, and key terms from the Bible inside a dynamically generated 12×12 letter grid.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every new game produces a completely unique puzzle — no two grids are ever the same. As you scan each row and diagonal, you naturally build your biblical vocabulary.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              There is a quiet, meditative quality to word search that sets it apart from faster-paced games. Slowing down to focus your eyes and mind on scripture terms is its own small act of reflection.
            </p>
            <Link href="/bible-word-games/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Try today's word puzzle <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Fun and Educational Bible Games Designed for Kids</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The <Link href="/kids-bible-games/" className="text-primary hover:underline font-medium">children's Bible games</Link> section uses bright colors, large flip cards, and playful animations to keep young learners engaged and smiling.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Well-designed Christian games for kids do more than entertain — they plant early seeds of faith. Each card flip builds short-term memory and pattern recognition, while the biblical theme opens natural conversations.
            </p>
            <ul className="space-y-2.5 text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Flip-card matching with animals from Noah's Ark</li>
              <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> No ads, no external links — completely safe for kids</li>
              <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Works great on tablets and phones</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Why Playing Bible Games Online Can Be Both Fun and Meaningful</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quality Christian games that genuinely align with faith values are surprisingly rare online. Bible Games Online fills that gap with wholesome, well-crafted activities the whole family can enjoy — without ads, paywalls, or inappropriate content.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Share your <Link href="/bible-trivia/" className="text-primary hover:underline font-medium">quiz score</Link> with your small group, race through a <Link href="/bible-word-games/" className="text-primary hover:underline font-medium">word puzzle</Link>, or let the kids enjoy the <Link href="/kids-bible-games/" className="text-primary hover:underline font-medium">Noah's Ark matching game</Link> on their own.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We built this platform as a quiet corner of the internet where faith and play belong together. There is always a game ready and waiting for you here — and when you want to step back from the games for a moment of reflection, our <Link href="/bible-verse-generator/" className="text-primary hover:underline font-medium">Bible Verse Generator</Link> is just one click away, with 600+ passages across 12 themes to speak to wherever you are.
            </p>
          </div>

        </div>
      </section>

      {/* ── Daily Bible Verse ── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Daily Scripture</span>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold section-title-bar">Daily Bible Verse</h2>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={verseKey}
              initial={{opacity:0, y:14, scale:0.97}}
              animate={{opacity:1, y:0,  scale:1}}
              exit   ={{opacity:0, y:-10, scale:0.97}}
              transition={{duration:0.3, ease:"easeOut"}}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card mb-5 relative overflow-hidden"
            >
              <div className="absolute top-3 left-5 text-5xl font-display text-primary/10 leading-none select-none">"</div>
              <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-4">
                {dailyVerse.category}
              </span>
              <blockquote className="text-base sm:text-lg font-medium text-foreground leading-relaxed mb-4">
                "{dailyVerse.text}"
              </blockquote>
              <p className="text-primary font-display font-bold">— {dailyVerse.reference}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={refreshVerse}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-card border border-border text-sm font-semibold hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" /> New Verse
            </button>
            <Link href="/bible-verse-generator/" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-gold hover:bg-primary/90 transition-all duration-200">
              <Sparkles className="w-4 h-4" /> Open Verse Generator
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Help</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 section-title-bar">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-5">Everything you need to know about our games.</p>
          </div>
          <FAQAccordion items={homeFAQs} />
        </div>
      </section>
    </div>
  );
}
