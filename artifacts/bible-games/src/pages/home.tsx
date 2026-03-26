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
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-slate dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
          <h2 className="text-3xl font-bold text-foreground mb-6">Discover Interactive Ways to Learn and Enjoy the Bible</h2>
          <p>Welcome to Bible Games Online, your premier destination for completely free, engaging, and faith-inspired Christian games. Whether you are looking for a fun Sunday school activity, a way to test your own biblical knowledge, or simply seeking wholesome online entertainment, our platform offers something meaningful for every visitor. Playing online Bible activities is an excellent method for committing scripture to memory and deepening your understanding of the rich history, stories, and teachings within the text.</p>
          <p>We designed this platform with one goal in mind: making the Bible accessible, enjoyable, and memorable for people of all ages. Unlike passive reading, interactive games challenge you to actively recall and apply what you know. This kind of active engagement is proven to strengthen memory retention. Whether you are a lifelong believer wanting to sharpen your knowledge or a newcomer curious about the Christian faith, our collection of online Bible activities provides the perfect starting point. Best of all, every game is completely browser-based — no downloads, no registrations, no fees.</p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Challenge Yourself with Engaging Bible Quiz Games</h2>
          <p>Our Bible quiz section is meticulously designed to cater to all levels of biblical literacy. From easy questions ideal for beginners and young learners to hard-level challenges that will test even the most dedicated Bible scholars, our Bible trivia experience covers the full spectrum. You can choose to focus exclusively on Old Testament stories, New Testament teachings, or pick a general category that mixes questions from across the entire scripture.</p>
          <p>A good Bible quiz is more than just trivia — it is a tool for spiritual reflection. When you answer a question about Moses parting the Red Sea or recall which disciple denied Jesus three times, you are reinforcing the stories that shape the Christian faith. Our quiz format lets you play solo at your own pace or challenge friends and family to beat your score. It is an ideal activity for church youth groups, homeschool sessions, and family game nights alike. With our categorized question bank and multiple difficulty levels, every session feels fresh and rewarding.</p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Explore Word Search and Puzzle-Based Bible Challenges</h2>
          <p>If you prefer a more relaxing pace, our Bible word search puzzles are the perfect fit. Hidden within grids of letters are profound biblical words — the names of prophets, the fruits of the Spirit, sacred locations, and the heroes of faith. Word games not only improve vocabulary and boost cognitive function, but they also keep your mind focused on uplifting and scriptural themes. It is a wonderfully peaceful retreat in the middle of a busy day.</p>
          <p>Our dynamically generated word search grid ensures you will never play the same puzzle twice. Each time you start a new game, a fresh set of Bible words is placed into the grid in multiple directions. The challenge of scanning each row, column, and diagonal keeps your mind sharp while the theme keeps your heart anchored in faith. These puzzle-based Bible challenges are suitable for everyone — from seniors looking for a calm daily mental exercise to teenagers wanting to explore the scriptures in a modern, interactive way.</p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Fun and Educational Bible Games Designed for Kids</h2>
          <p>We firmly believe that nurturing faith should start early and that the process should be joyful. Our dedicated kids' games section features bright, colorful, and animated activities designed to capture a child's imagination while planting seeds of biblical knowledge. Our popular memory matching game, featuring beloved animals from Noah's Ark, teaches children to associate familiar creatures with the great flood narrative while developing cognitive memory skills.</p>
          <p>All of our games for kids are designed to be completely safe, ad-free, and free from external links. Parents can feel confident letting their children play independently, knowing the content is wholesome and age-appropriate. These educational Bible games for kids make excellent additions to children's ministry programs, vacation Bible school, or even a quiet afternoon at home. When children engage with faith through play, the lessons they learn become a natural and lasting part of how they see the world.</p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why Playing Bible Games Online Can Be Both Fun and Meaningful</h2>
          <p>In today's digital age, finding quality online entertainment that truly aligns with Christian values can be a real challenge. Bible Games Online bridges that gap by offering high-quality, beautifully designed web games that require no downloads, no subscriptions, and absolutely no fees. Learning the Word of God does not have to feel like a chore — it can be an exciting journey of discovery, laughter, and growth for the whole family.</p>
          <p>Playing Bible games online also creates community. Share your trivia score with your small group, race through the word search with your kids, or use the mini quiz to spark a Bible study conversation. Our platform is built to be a tool that enriches your faith journey, not just a pastime. Whether you visit daily for a quick Bible quiz or spend a longer session exploring every game category, we hope you leave with a deeper love for scripture and a smile on your face. Come back often — we are always adding new content to keep your experience fresh and engaging.</p>
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
