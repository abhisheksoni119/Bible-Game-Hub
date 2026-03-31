import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";
import { homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";

interface TrueFalseQuestion {
  id: number;
  statement: string;
  answer: boolean;
  explanation: string;
}

const trueFalseQuestions: TrueFalseQuestion[] = [
  { id: 1,  statement: "Noah built the ark.",                                               answer: true,  explanation: "God commanded Noah to build the ark to save his family and two of every creature from the great flood (Genesis 6–7)." },
  { id: 2,  statement: "Jesus was born in Jerusalem.",                                       answer: false, explanation: "Jesus was born in Bethlehem of Judea, fulfilling the prophecy in Micah 5:2 (Luke 2:4–7). He grew up in Nazareth." },
  { id: 3,  statement: "Moses parted the Red Sea.",                                          answer: true,  explanation: "God parted the Red Sea through Moses so that Israel could escape from Pharaoh's army (Exodus 14:21–22)." },
  { id: 4,  statement: "David killed Goliath with a sword.",                                 answer: false, explanation: "David struck Goliath with a stone from a sling, then used Goliath's own sword to finish him (1 Samuel 17:49–51)." },
  { id: 5,  statement: "Jonah was swallowed by a great fish.",                               answer: true,  explanation: "The LORD provided a great fish to swallow Jonah, and he was inside the fish for three days and three nights (Jonah 1:17)." },
  { id: 6,  statement: "The Last Supper took place during Passover.",                        answer: true,  explanation: "Jesus celebrated the Passover meal with His disciples the night before His crucifixion (Matthew 26:17–19)." },
  { id: 7,  statement: "Peter denied Jesus three times.",                                    answer: true,  explanation: "Jesus predicted that Peter would deny Him three times before the rooster crowed, and it happened exactly as He said (Matthew 26:34, 75)." },
  { id: 8,  statement: "Paul's original name was Saul.",                                     answer: true,  explanation: "The apostle Paul was known as Saul before his encounter with Jesus on the road to Damascus (Acts 9:1–19, Acts 13:9)." },
  { id: 9,  statement: "The Bible specifically says Eve ate an apple.",                      answer: false, explanation: "The Bible refers only to 'fruit' from the tree of the knowledge of good and evil (Genesis 3:6). The apple tradition came later in Western culture." },
  { id: 10, statement: "Abraham had twelve sons.",                                            answer: false, explanation: "Abraham's son through Sarah was Isaac. It was Jacob (Abraham's grandson) who had twelve sons, who became the twelve tribes of Israel." },
  { id: 11, statement: "Jesus fasted for forty days in the wilderness.",                     answer: true,  explanation: "After His baptism, Jesus was led by the Spirit into the wilderness where He fasted for forty days and forty nights (Matthew 4:1–2)." },
  { id: 12, statement: "The Sermon on the Mount is recorded in the book of John.",           answer: false, explanation: "The Sermon on the Mount is found in Matthew chapters 5–7, not in John." },
  { id: 13, statement: "Goliath was a Philistine warrior.",                                  answer: true,  explanation: "Goliath was a champion fighter from Gath, one of the five Philistine city-states, standing over nine feet tall (1 Samuel 17:4)." },
  { id: 14, statement: "Methuselah is recorded as living 969 years.",                        answer: true,  explanation: "Methuselah, the grandfather of Noah, is recorded as the longest-lived person in the Bible at 969 years (Genesis 5:27)." },
  { id: 15, statement: "Elijah was taken to heaven in a chariot of fire.",                   answer: true,  explanation: "Elijah was taken up to heaven in a whirlwind, accompanied by a chariot of fire and horses of fire (2 Kings 2:11)." },
  { id: 16, statement: "The Ten Commandments were written on wooden tablets.",               answer: false, explanation: "The Ten Commandments were written by God on two tablets of stone (Exodus 31:18, 34:1)." },
  { id: 17, statement: "Joseph had eleven brothers.",                                         answer: true,  explanation: "Jacob had twelve sons total. Joseph had eleven brothers — ten older (who sold him) and one younger, Benjamin (Genesis 35:22–26)." },
  { id: 18, statement: "Jesus performed His first miracle at a wedding in Cana.",            answer: true,  explanation: "Jesus turned water into wine at a wedding in Cana of Galilee — this was the first of His signs (John 2:1–11)." },
  { id: 19, statement: "Samson's strength came from his long hair.",                         answer: true,  explanation: "God's gift of strength to Samson was tied to his Nazirite vow, symbolized by his uncut hair (Judges 16:17)." },
  { id: 20, statement: "Zacchaeus climbed a sycamore tree to see Jesus.",                   answer: true,  explanation: "Zacchaeus, a short tax collector, climbed a sycamore-fig tree to see Jesus as He passed through Jericho (Luke 19:4)." },
  { id: 21, statement: "Solomon wrote the entire book of Psalms.",                           answer: false, explanation: "The book of Psalms has multiple authors. David wrote the majority, but also Solomon, Moses, Asaph, and the sons of Korah contributed." },
  { id: 22, statement: "Solomon built the First Temple in Jerusalem.",                       answer: true,  explanation: "King Solomon built the First Temple in Jerusalem as a permanent home for the Ark of the Covenant (1 Kings 6)." },
  { id: 23, statement: "The angel Gabriel announced Jesus' birth to the shepherds.",         answer: false, explanation: "An angel of the Lord (unnamed) announced Jesus' birth to the shepherds (Luke 2:9–12). Gabriel announced the birth to Mary (Luke 1:26–38)." },
  { id: 24, statement: "Rahab helped the Israelite spies in Jericho.",                       answer: true,  explanation: "Rahab hid the two spies sent by Joshua and helped them escape, receiving protection for herself and her family (Joshua 2:1–21)." },
  { id: 25, statement: "The Holy Spirit descended on Jesus like a dove at His baptism.",     answer: true,  explanation: "After Jesus was baptized, the Holy Spirit descended on Him in bodily form like a dove, and a voice from heaven said 'You are My Son' (Luke 3:21–22)." },
];

const QUESTIONS_PER_GAME = 10;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title: "Bible Trivia",     description: "Test your knowledge with 250+ quiz questions across three difficulty levels.", href: "/bible-trivia/",     emoji: "🧠", cta: "Play Trivia" },
  { title: "Bible Who Am I?", description: "Read progressive clues and guess the Bible character. Fewer clues = more points.", href: "/bible-who-am-i/", emoji: "🔍", cta: "Play Now" },
  { title: "Bible Jeopardy",  description: "Six scripture categories, 30 clues, and a running score to beat.",              href: "/bible-jeopardy/",  emoji: "📺", cta: "Play Jeopardy" },
];

export default function BibleTrueFalse() {
  const [questions, setQuestions] = useState<TrueFalseQuestion[]>(() =>
    shuffle(trueFalseQuestions).slice(0, QUESTIONS_PER_GAME)
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const current = questions[index];
  const isCorrect = selected !== null && selected === current.answer;

  const handleAnswer = (choice: boolean) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === current.answer) {
      setScore(s => s + 1);
    }
    if (index + 1 >= QUESTIONS_PER_GAME) {
      setTimeout(() => {
        setGameOver(true);
        if (choice === current.answer && score + 1 >= QUESTIONS_PER_GAME * 0.8) {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
      }, 1100);
    }
  };

  const nextQuestion = () => {
    if (index + 1 >= QUESTIONS_PER_GAME) {
      setGameOver(true);
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setQuestions(shuffle(trueFalseQuestions).slice(0, QUESTIONS_PER_GAME));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setGameOver(false);
  };

  const percentage = Math.round((score / QUESTIONS_PER_GAME) * 100);

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible True or False – Scripture Quiz Game"
        description="Think you know your Bible facts? Play Bible True or False — answer 10 scripture statements and see how many you get right. Great for all ages and knowledge levels."
        canonicalPath="/bible-true-false/"
      />
      <BreadcrumbSchema crumbs={[{ name: "Home", path: "/" }, { name: "Bible True or False", path: "/bible-true-false/" }]} />
      <FAQSchema />
      <GameSchema
        name="Bible True or False"
        url="https://biblegamesonline.net/bible-true-false/"
        description="Read a Bible statement and decide if it is True or False. 25 questions covering Old and New Testament facts — great for all ages and knowledge levels."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">✅</span>
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible True or False</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Read each scripture statement and decide — True or False?
        </p>
        {!gameOver && (
          <div className="flex gap-6 justify-center mt-4 text-sm font-medium text-secondary-foreground/80">
            <span>📖 Question {Math.min(index + 1, QUESTIONS_PER_GAME)}/{QUESTIONS_PER_GAME}</span>
            <span>✅ Score: {score}/{QUESTIONS_PER_GAME}</span>
          </div>
        )}
      </div>

      {/* Game Area */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {gameOver ? (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-primary/10 border-4 border-primary/20 text-primary mb-6 shadow-gold">
                <span className="text-2xl font-bold font-display">{score}/{QUESTIONS_PER_GAME}</span>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">
                {percentage >= 90 ? "Bible Expert! 🏆" : percentage >= 70 ? "Well Done! 🌟" : percentage >= 50 ? "Good Effort! 📖" : "Keep Studying! 🙏"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {percentage >= 90
                  ? "Outstanding — you got almost every Bible fact correct!"
                  : percentage >= 70
                  ? "Solid scripture knowledge. A little more study and you'll ace it."
                  : percentage >= 50
                  ? "You're on the right track. Keep reading and try again!"
                  : "Every round teaches you something new. Give it another go!"}
              </p>
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </motion.div>
          ) : (
            <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              {/* Statement card */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card mb-6">
                <div className="bg-muted/60 border-b border-border px-5 py-3.5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">True or False?</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Question {index + 1} of {QUESTIONS_PER_GAME}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed text-center">
                    "{current.statement}"
                  </p>
                </div>
              </div>

              {/* Answer buttons */}
              {selected === null ? (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="py-5 rounded-2xl border-2 border-emerald-400/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 font-bold text-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 active:scale-95"
                  >
                    ✓ True
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="py-5 rounded-2xl border-2 border-red-400/50 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 font-bold text-xl hover:bg-red-100 dark:hover:bg-red-900/40 hover:border-red-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 active:scale-95"
                  >
                    ✗ False
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 space-y-4">
                    {/* Result banner */}
                    <div className={`rounded-xl p-4 text-center font-bold text-lg ${isCorrect ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800"}`}>
                      {isCorrect ? "✓ Correct!" : `✗ The answer is ${current.answer ? "True" : "False"}`}
                    </div>
                    {/* Explanation */}
                    <div className="bg-muted/50 border border-border rounded-xl p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Scripture Note</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{current.explanation}</p>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="w-full py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-gold"
                    >
                      {index + 1 >= QUESTIONS_PER_GAME ? "See Final Score" : "Next Question →"}
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Test Your Bible Knowledge — True or False</h2>
          <p className="text-muted-foreground leading-relaxed">
            Each round draws ten statements from a pool of twenty-five scripture-based questions covering both the Old and New Testament. Some statements are straightforward facts — others are common misconceptions that even long-time churchgoers get wrong. After every answer you see a brief explanation grounded in the relevant Bible verse, so each round leaves you knowing your scripture a little better.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Perfect for All Ages and Settings</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bible True or False works beautifully as a warm-up for Sunday school, a family devotion activity, or a solo study break. The simple True/False format makes it accessible for children and beginners while still including enough tricky statements to challenge experienced Bible readers. Want more variety? Try our detailed <a href="/bible-trivia/" className="text-primary hover:underline font-medium">Bible Trivia</a> with 250+ questions, or the character-guessing challenge of <a href="/bible-who-am-i/" className="text-primary hover:underline font-medium">Bible Who Am I?</a>.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-10">
        <RelatedGames games={RELATED} />
      </div>

      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-display font-bold">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion items={homeFAQs} />
      </section>
    </div>
  );
}
