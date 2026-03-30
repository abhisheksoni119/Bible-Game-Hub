import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Bell } from "lucide-react";
import { homeFAQs } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema, GameSchema } from "@/components/seo/SchemaMarkup";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title: "Bible Word Search",   description: "Find hidden scripture words in a freshly generated 12×12 grid.",        href: "/bible-word-games/",  emoji: "🔍", cta: "Play Word Search" },
  { title: "Bible Wordle",        description: "Guess the five-letter Bible word in six tries with color-coded clues.", href: "/bible-wordle/",      emoji: "📖", cta: "Play Wordle" },
  { title: "Bible Who Am I?",     description: "Read progressive clues and identify famous Bible characters.",          href: "/bible-who-am-i/",    emoji: "🔍", cta: "Play Now" },
];

const GRID_LETTERS = [
  ["B","I","B","L","E","·","·","·","·","·"],
  ["·","·","·","O","·","·","·","·","·","·"],
  ["·","·","·","V","·","F","A","I","T","H"],
  ["·","·","·","E","·","·","·","·","·","·"],
  ["J","E","S","U","S","·","·","·","·","·"],
  ["·","·","·","·","·","·","·","·","·","·"],
  ["·","G","R","A","C","E","·","·","·","·"],
  ["·","·","·","·","·","·","·","·","·","·"],
  ["·","·","·","·","P","R","A","Y","E","R"],
];

export default function BibleCrossword() {
  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Crossword Puzzle – Free Online Scripture Word Game"
        description="Play the Bible crossword puzzle online. Fill in scripture-themed answers from Old and New Testament clues in this free faith-based word game."
        canonicalPath="/bible-crossword/"
      />
      <BreadcrumbSchema crumbs={[{ name: "Home", path: "/" }, { name: "Bible Crossword", path: "/bible-crossword/" }]} />
      <FAQSchema />
      <GameSchema
        name="Bible Crossword Puzzle"
        url="https://biblegamesonline.net/bible-crossword/"
        description="A scripture-themed crossword puzzle with clues drawn from the Old and New Testament. Fill in the grid with Bible names, places, and key terms."
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <span className="text-2xl">✏️</span>
          </div>
        </motion.div>
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
          <Bell className="w-3.5 h-3.5" /> Coming Soon
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Crossword Puzzle</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Fill in a scripture-themed crossword grid with Bible names, places, and key terms from both testaments.
        </p>
      </div>

      {/* Preview Grid */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium">Preview of the crossword grid</p>
          <div className="overflow-x-auto">
            <div className="inline-grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(10, minmax(0, 1fr))` }}>
              {GRID_LETTERS.flat().map((letter, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.005 }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded text-xs sm:text-sm font-bold font-mono
                    ${letter === "·"
                      ? "bg-secondary/40 text-transparent"
                      : "bg-primary/10 border border-primary/25 text-primary"
                    }`}
                >
                  {letter !== "·" ? letter : ""}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              We're building a full interactive Bible crossword with across/down clues, timer, and hint system. Check back soon!
            </p>
            <p className="text-sm text-muted-foreground mb-6">In the meantime, try our other word-based Bible games:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/bible-word-games/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-5 py-3 text-sm hover:bg-primary/90 transition-colors shadow-gold"
              >
                🔍 Bible Word Search
              </Link>
              <Link
                href="/bible-wordle/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                📖 Bible Wordle
              </Link>
              <Link
                href="/bible-who-am-i/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                🔍 Who Am I?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Bible Crossword Puzzles Online</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A scripture crossword combines the satisfying logic of a crossword puzzle with the rich vocabulary of the Bible — names, places, and key terms woven together in a grid where every answer connects. Whether you're working through an across clue about a New Testament apostle or a down clue pointing to a place in the Old Testament, each answer reinforces something meaningful from God's Word.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bible crossword puzzles are particularly well-suited to adult learners, Sunday school teachers, and anyone who enjoys a thoughtful, quiet challenge. Unlike faster-paced games, a crossword asks you to slow down, think through the clue, and draw on a wide range of scripture knowledge.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">How Bible Crosswords Work</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Every crossword is built around a grid of intersecting words. Across clues run left to right; down clues run top to bottom. Each answer is a scripture-related word — a biblical name (NOAH, ESTHER, PAUL), a place (SINAI, BETHLEHEM, NAZARETH), or a key concept (GRACE, COVENANT, FAITH).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The interlocking structure means that solving one answer can unlock letters for adjacent clues. Working out MOSES in the across direction might give you the M you need to crack a down clue about MARY. It rewards systematic thinking and broad scripture knowledge in equal measure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 section-title-bar-left">Crosswords as a Study Tool</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Unlike passive study, a crossword engages active recall — the single most effective learning strategy. When a clue reads "Hebrew leader who parted the Red Sea (5 letters)," your brain searches its entire store of scripture knowledge before landing on MOSES. That retrieval process strengthens the memory far more than simply reading the name in a text.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Reinforces spelling of biblical names and places</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Broadens vocabulary of key scripture terms</li>
            <li className="flex gap-3"><span className="text-primary font-bold mt-0.5 shrink-0">✓</span> Ideal for group settings — teams can solve clues together</li>
          </ul>
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
