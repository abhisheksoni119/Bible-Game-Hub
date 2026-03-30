import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Copy, CheckCheck, BookOpen, Sparkles } from "lucide-react";
import { bibleVerses, verseCategories, verseFAQs, type VerseCategory } from "@/lib/data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { RelatedGames } from "@/components/ui/related-games";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

const RELATED: import("@/components/ui/related-games").RelatedGame[] = [
  { title:"Bible Trivia",       description:"Test your scripture knowledge across three categories and difficulty levels.", href:"/bible-trivia/",       emoji:"🧠", cta:"Play Trivia" },
  { title:"Bible Jeopardy",     description:"Six scripture categories, 30 clues, and a running score to beat.",           href:"/bible-jeopardy/",     emoji:"📺", cta:"Play Jeopardy" },
  { title:"Bible Memory Games", description:"Match 12 Bible characters with their defining stories.",                     href:"/bible-memory-games/", emoji:"🧩", cta:"Play Memory" },
];

const CATEGORY_COLORS: Record<VerseCategory, string> = {
  All:          "bg-primary/10    text-primary      border-primary/30",
  Faith:        "bg-blue-100      text-blue-700     border-blue-300    dark:bg-blue-900/20    dark:text-blue-300",
  Love:         "bg-red-100       text-red-700      border-red-300     dark:bg-red-900/20     dark:text-red-300",
  Hope:         "bg-green-100     text-green-700    border-green-300   dark:bg-green-900/20   dark:text-green-300",
  Strength:     "bg-orange-100    text-orange-700   border-orange-300  dark:bg-orange-900/20  dark:text-orange-300",
  Wisdom:       "bg-purple-100    text-purple-700   border-purple-300  dark:bg-purple-900/20  dark:text-purple-300",
  Encouragement:"bg-yellow-100    text-yellow-700   border-yellow-300  dark:bg-yellow-900/20  dark:text-yellow-300",
  Peace:        "bg-teal-100      text-teal-700     border-teal-300    dark:bg-teal-900/20    dark:text-teal-300",
  Joy:          "bg-pink-100      text-pink-700     border-pink-300    dark:bg-pink-900/20    dark:text-pink-300",
  Forgiveness:  "bg-indigo-100    text-indigo-700   border-indigo-300  dark:bg-indigo-900/20  dark:text-indigo-300",
  Patience:     "bg-lime-100      text-lime-700     border-lime-300    dark:bg-lime-900/20    dark:text-lime-300",
  Guidance:     "bg-amber-100     text-amber-700    border-amber-300   dark:bg-amber-900/20   dark:text-amber-300",
  Gratitude:    "bg-emerald-100   text-emerald-700  border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300",
};

function randomVerse(pool: typeof bibleVerses) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function BibleVerseGenerator() {
  const [category, setCategory] = useState<VerseCategory>("All");
  const [key, setKey]           = useState(0);
  const [copied, setCopied]     = useState(false);

  const pool = useMemo(
    () => category === "All" ? bibleVerses : bibleVerses.filter(v => v.category === category),
    [category]
  );

  const [verse, setVerse] = useState(() => randomVerse(bibleVerses));

  const generate = useCallback(() => {
    setVerse(randomVerse(pool));
    setKey(k => k + 1);
    setCopied(false);
  }, [pool]);

  const handleCategory = (cat: VerseCategory) => {
    setCategory(cat);
    const newPool = cat === "All" ? bibleVerses : bibleVerses.filter(v => v.category === cat);
    setVerse(randomVerse(newPool));
    setKey(k => k + 1);
    setCopied(false);
  };

  const copyVerse = () => {
    navigator.clipboard.writeText(`"${verse.text}" — ${verse.reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Bible Verse Generator – Random Daily Scripture Verses Online"
        description="Generate random inspirational Bible verses across 12 categories — Faith, Love, Hope, Strength, Wisdom, Encouragement, Peace, Joy, Forgiveness, Patience, Guidance, and Gratitude. 600+ verses. Free daily scripture generator for Christians."
        canonicalPath="/bible-verse-generator/"
      />
      <BreadcrumbSchema crumbs={[{ name:"Home", path:"/" }, { name:"Bible Verse Generator", path:"/bible-verse-generator/" }]} />
      <FAQSchema />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:300,damping:22}}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">Bible Verse Generator</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-xl mx-auto">
          Discover a random scripture verse each time. Choose from 12 themes and let God's Word speak to you today.
        </p>
      </div>

      {/* Controls + Verse Card */}
      <section className="max-w-2xl mx-auto px-4 py-10 space-y-6">

        {/* Category filter */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Filter by Theme</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {verseCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? CATEGORY_COLORS[cat] + " shadow-sm scale-105"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Verse Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{opacity:0, y:16, scale:0.97}}
            animate={{opacity:1, y:0,  scale:1}}
            exit   ={{opacity:0, y:-12, scale:0.97}}
            transition={{duration:0.35, ease:"easeOut"}}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card relative overflow-hidden"
          >
            {/* Decorative quote mark */}
            <div className="absolute top-4 left-5 text-6xl font-display text-primary/10 leading-none select-none">"</div>

            <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold mb-5 ${CATEGORY_COLORS[verse.category]}`}>
              {verse.category}
            </span>

            <blockquote className="text-lg sm:text-xl font-medium text-foreground leading-relaxed mb-5 relative z-10">
              "{verse.text}"
            </blockquote>

            <p className="text-primary font-display font-bold text-base">— {verse.reference}</p>

            <button
              onClick={copyVerse}
              className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-200 ${
                copied
                  ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {copied ? <><CheckCheck className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Verse</>}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Generate button */}
        <div className="flex justify-center">
          <motion.button
            onClick={generate}
            whileTap={{scale:0.95}}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-gold hover:bg-primary/90 active:scale-95 transition-all duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Another Verse
          </motion.button>
        </div>

      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">A Daily Bible Verse for Every Moment</h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're starting your morning devotion, looking for encouragement midday, or winding down with a moment of reflection, a scripture verse can shift your perspective instantly. This random Bible verse generator gives you instant access to over 600 carefully chosen passages across 12 distinct categories — each one selected for its spiritual depth and everyday relevance.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Choose a theme that matches where you are right now. Feeling weary? Try <strong className="text-foreground">Strength</strong>. Facing uncertainty? Browse <strong className="text-foreground">Hope</strong>. Looking for direction? <strong className="text-foreground">Guidance</strong> verses will help. Searching for inner calm? <strong className="text-foreground">Peace</strong> draws from Psalms, Isaiah, and the New Testament. Struggling to forgive? The <strong className="text-foreground">Forgiveness</strong> category speaks directly to mercy and reconciliation. With over 600 verses across 12 categories, there is always a scripture waiting for exactly where you are. Every category draws from both the Old and New Testament so the full breadth of scripture is always represented.
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-bold section-title-bar-left">Use Inspirational Bible Verses Every Day</h2>
          <p className="text-muted-foreground leading-relaxed">
            Copy any verse with one click and share it in a message, add it to your journal, post it to social media, or simply keep it as a quiet reminder on your screen. The <strong className="text-foreground">Joy</strong> category is perfect for celebrations and gratitude practices; <strong className="text-foreground">Patience</strong> and <strong className="text-foreground">Gratitude</strong> both offer deep scripture pools for seasons of waiting or thankfulness. These verses are drawn primarily from the NIV translation — readable, accurate, and widely recognized. Use the generator daily as a simple devotional ritual, or open it whenever you need a fresh word from scripture. Pair it with our <a href="/bible-trivia/" className="text-primary hover:underline font-medium">Bible Trivia</a> or <a href="/bible-jeopardy/" className="text-primary hover:underline font-medium">Bible Jeopardy</a> to turn reflection into an active learning session.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-10">
        <RelatedGames games={RELATED} />
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-display font-bold">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion items={verseFAQs} />
      </section>
    </div>
  );
}
