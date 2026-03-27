import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Brain, Search, Smile, Play, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { homeFAQs, triviaQuestions } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";

export default function Home() {
  const [, setLocation] = useLocation();
  const miniTriviaQuestions = triviaQuestions.slice(0, 4);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

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

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary font-medium text-sm mb-6 border border-primary/30">
              Free to Play • No Sign Up Required
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white max-w-4xl mx-auto">
              Play Free Bible Games Online and <span className="text-primary">Test Your Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover interactive and fun ways to learn about the Bible. Choose from trivia, word searches, and kids games designed to build faith and knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setLocation('/bible-trivia')} className="px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2">
                <Brain className="w-5 h-5" /> Play Trivia
              </button>
              <button onClick={() => setLocation('/bible-word-games')} className="px-8 py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm">
                <Search className="w-5 h-5" /> Word Games
              </button>
              <button onClick={() => setLocation('/kids-bible-games')} className="px-8 py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm">
                <Smile className="w-5 h-5" /> Kids Games
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MINI TRIVIA SECTION */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Quick Bible Quiz</h2>
              <p className="text-muted-foreground">Test yourself right now with these 4 quick questions!</p>
            </div>

            {!showResult ? (
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4">
                  <span>Question {currentQ + 1} of 4</span>
                  <span>Score: {score}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                  {miniTriviaQuestions[currentQ].question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {miniTriviaQuestions[currentQ].options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isCorrect = i === miniTriviaQuestions[currentQ].correctIndex;
                    const showCorrect = selectedOpt !== null && isCorrect;
                    const showWrong = selectedOpt !== null && isSelected && !isCorrect;

                    return (
                      <button
                        key={i}
                        onClick={() => handleMiniTriviaAnswer(i)}
                        disabled={selectedOpt !== null}
                        className={`p-4 rounded-xl text-left font-medium transition-all duration-300 border-2 flex items-center justify-between
                          ${selectedOpt === null ? 'bg-background hover:border-primary hover:shadow-md' : ''}
                          ${showCorrect ? 'bg-green-100 border-green-500 text-green-800' : ''}
                          ${showWrong ? 'bg-red-100 border-red-500 text-red-800' : ''}
                          ${selectedOpt !== null && !showCorrect && !showWrong ? 'opacity-50 border-transparent bg-background' : ''}
                          ${selectedOpt === null ? 'border-border' : ''}
                        `}
                      >
                        {opt}
                        {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-6">
                  <span className="text-4xl font-bold">{score}/4</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Great job!</h3>
                <p className="text-muted-foreground mb-8">Ready for a real challenge?</p>
                <button 
                  onClick={() => setLocation('/bible-trivia')}
                  className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Play Full Game <Play className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GAME CATEGORIES */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Game</h2>
            <p className="text-muted-foreground text-lg">We have curated different types of games to suit your mood and challenge your biblical knowledge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-card rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-border/50">
              <div className="h-48 overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}images/trivia-card.png`} alt="Bible Trivia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">Bible Trivia</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6 line-clamp-2">Test your knowledge of scriptures, characters, and events from both the Old and New Testaments.</p>
                <Link href="/bible-trivia" className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors">
                  Play Now <Play className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-card rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-border/50">
              <div className="h-48 overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}images/word-game-card.png`} alt="Word Games" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">Word Search</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6 line-clamp-2">Find hidden biblical words in a grid of letters. A relaxing way to focus your mind on faith.</p>
                <Link href="/bible-word-games" className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors">
                  Play Now <Play className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-card rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-border/50">
              <div className="h-48 overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}images/kids-game-card.png`} alt="Kids Games" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">Kids Games</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6 line-clamp-2">Fun, vibrant matching games featuring animals from the ark and popular Bible figures.</p>
                <Link href="/kids-bible-games" className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors">
                  Play Now <Play className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Discover Interactive Ways to Learn and Enjoy the Bible</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bible Games Online is your free destination for faith-based games you can play anywhere — no downloads, no sign-up, no cost.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unlike reading a passage and moving on, interactive play asks you to actively recall, recognize, and reason. These mental exercises deepen your connection to scripture in a way that sticks long after the game ends. Whether you spend five minutes on a lunch break or a full evening with the family, our online Bible activities are always ready, always free, and always worth your time.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span><Link href="/bible-trivia" className="text-primary hover:underline font-medium">Scripture trivia quizzes</Link> covering Old Testament, New Testament, and general knowledge</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span><Link href="/bible-word-games" className="text-primary hover:underline font-medium">Bible word search puzzles</Link> that generate a fresh grid every time you play</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span><Link href="/kids-bible-games" className="text-primary hover:underline font-medium">Kid-friendly matching games</Link> built around Noah's Ark animals</span>
              </li>
            </ul>
          </div>

          {/* CTA BUTTONS STRIP */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/bible-trivia"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-5 py-3.5 text-sm hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-sm"
            >
              <Brain className="w-4 h-4 shrink-0" />
              Play Bible Trivia
            </Link>
            <Link
              href="/bible-word-games"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3.5 text-sm hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-150"
            >
              <Search className="w-4 h-4 shrink-0" />
              Try Word Games
            </Link>
            <Link
              href="/kids-bible-games"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3.5 text-sm hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-150"
            >
              <Smile className="w-4 h-4 shrink-0" />
              Explore Kids Games
            </Link>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Challenge Yourself with Engaging Bible Quiz Games</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our quiz covers every level — from easy warm-ups to hard questions that stump even lifelong churchgoers. Pick a category, set your difficulty, and see how much you really know.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Great for Sunday school, youth groups, family game nights, or a quiet personal study break. Each round gives you 10 questions with instant right-or-wrong feedback so you learn as you go.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              What makes a Bible quiz memorable is that moment when a question makes you pause and truly think. Our question bank spans familiar passages and lesser-known verses alike, so every session grows your scripture knowledge in a fresh direction. Whether you ace the easy level or get humbled by hard questions, you always leave a little sharper.
            </p>
            <Link href="/bible-trivia" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Start the trivia challenge <Play className="w-3 h-3" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Explore Word Search and Puzzle-Based Bible Challenges</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Prefer something calmer? Our scripture word hunt hides names, places, and key terms from the Bible inside a dynamically generated 12×12 letter grid.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every new game produces a completely unique puzzle — no two grids are ever the same. As you scan each row and diagonal, you naturally build your biblical vocabulary, growing more familiar with scripture's rich geography of names, places, and spiritual themes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              There is a quiet, meditative quality to word search that sets it apart from faster-paced games. Slowing down to focus your eyes and mind on scripture terms is its own small act of reflection — and finding a word you had to work for is genuinely satisfying.
            </p>
            <Link href="/bible-word-games" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Try today's word puzzle <Play className="w-3 h-3" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Fun and Educational Bible Games Designed for Kids</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The <Link href="/kids-bible-games" className="text-primary hover:underline font-medium">children's Bible games</Link> section uses bright colors, large flip cards, and playful animations to keep young learners engaged and smiling.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Well-designed Christian games for kids do more than entertain — they plant early seeds of faith. Each card flip builds short-term memory and pattern recognition, while the biblical theme opens natural conversations about the stories children encounter in Sunday school. These activities are self-directed, so kids can play happily on their own without needing adult guidance.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Flip-card matching with animals from Noah's Ark</li>
              <li className="flex gap-2"><span className="text-primary font-bold">✓</span> No ads, no external links — completely safe for kids</li>
              <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Works great on tablets and phones</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Why Playing Bible Games Online Can Be Both Fun and Meaningful</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quality Christian games that genuinely align with faith values are surprisingly rare online. Bible Games Online fills that gap with wholesome, well-crafted activities the whole family can enjoy — without ever encountering ads, paywalls, or inappropriate content.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Share your <Link href="/bible-trivia" className="text-primary hover:underline font-medium">quiz score</Link> with your small group, race through a <Link href="/bible-word-games" className="text-primary hover:underline font-medium">word puzzle</Link> together, or let the kids enjoy the <Link href="/kids-bible-games" className="text-primary hover:underline font-medium">Noah's Ark matching game</Link> on their own. Learning scripture does not have to feel like a chore — it can be genuinely fun.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We built this platform to be a quiet corner of the internet where faith and play belong together. Come back whenever you need a moment of reflection, a light challenge, or simply a wholesome way to spend time with people you love. There is always a game ready and waiting for you here.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our games.</p>
          </div>
          <FAQAccordion items={homeFAQs} />
        </div>
      </section>
    </div>
  );
}
