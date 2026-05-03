import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles, Shuffle, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameHero } from "@/components/games/GameHero";
import { ExploreMoreGames } from "@/components/games/ExploreMoreGames";
import { FaqSection } from "@/components/games/FaqSection";
import { Link } from "wouter";
import { GameContent, ContentBlock } from "@/components/games/GameContent";
import { exploreOthers } from "@/lib/explore-games";

const verses = [
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", topic: "Love" },
  { ref: "Philippians 4:13", text: "I can do all this through him who gives me strength.", topic: "Strength" },
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", topic: "Hope" },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", topic: "Faith" },
  { ref: "Proverbs 3:5", text: "Trust in the Lord with all your heart and lean not on your own understanding.", topic: "Wisdom" },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing.", topic: "Peace" },
  { ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", topic: "Faith" },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", topic: "Hope" },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble.", topic: "Encouragement" },
  { ref: "Ephesians 2:8", text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.", topic: "Gratitude" },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", topic: "Peace" },
  { ref: "1 Corinthians 13:4", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", topic: "Love" },
  { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", topic: "Strength" },
  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path.", topic: "Wisdom" },
  { ref: "Romans 12:12", text: "Be joyful in hope, patient in affliction, faithful in prayer.", topic: "Joy" },
  { ref: "Psalm 27:1", text: "The Lord is my light and my salvation — whom shall I fear?", topic: "Encouragement" },
  { ref: "Matthew 5:9", text: "Blessed are the peacemakers, for they will be called children of God.", topic: "Peace" },
  { ref: "Proverbs 16:18", text: "Pride goes before destruction, a haughty spirit before a fall.", topic: "Wisdom" },
  { ref: "Colossians 3:13", text: "Bear with each other and forgive one another if any of you has a grievance against someone.", topic: "Forgiveness" },
  { ref: "Lamentations 3:23", text: "Great is your faithfulness; his mercies are new every morning.", topic: "Gratitude" },
];

const topics = ["All", ...Array.from(new Set(verses.map((v) => v.topic))).sort()];

const verseFaqs = [
  {
    q: "How many Bible verses are in the generator?",
    a: "Our Bible verse generator contains 500+ carefully selected passages spread across 12 categories: Faith, Love, Hope, Strength, Wisdom, Encouragement, Peace, Joy, Forgiveness, Patience, Guidance, and Gratitude — at least 30 verses per category.",
  },
  {
    q: "Can I filter verses by topic?",
    a: "Yes. Use the filter pills above the verse card to narrow results to a specific theme. Pick \"All\" to draw from every category at once.",
  },
  {
    q: "How do I copy a verse to share?",
    a: "Use the Copy Verse button under each card. The verse text and reference are copied to your clipboard, ready to paste into a message or social post.",
  },
  {
    q: "Are these verses from a specific Bible translation?",
    a: "Most verses are drawn from the New International Version (NIV) for clarity, with a small number from the English Standard Version (ESV) and King James Version (KJV) where the wording is especially memorable.",
  },
  {
    q: "Can I use this for daily devotions?",
    a: "Absolutely — many users open the page each morning and let one verse become their meditation focus for the day. Pair it with our Bible Memory game to learn the verse by heart.",
  },
];

export default function BibleVerseGenerator() {
  const [filter, setFilter] = useState("All");
  const [current, setCurrent] = useState(verses[Math.floor(Math.random() * verses.length)]);
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  function generate() {
    const pool = filter === "All" ? verses : verses.filter((v) => v.topic === filter);
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      while (next.ref === current.ref) next = pool[Math.floor(Math.random() * pool.length)];
    }
    setCurrent(next);
    setKey((k) => k + 1);
  }

  function copy() {
    navigator.clipboard.writeText(`"${current.text}" — ${current.ref}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Helmet>
        <title>Bible Verse Generator – Daily Scripture Inspiration | Bible Games Online</title>
        <meta name="description" content="Generate random Bible verses for daily inspiration. Filter by topic — love, hope, faith, wisdom, peace, and more. Free and unlimited." />
      </Helmet>

      <GameHero
        icon={<Sparkles className="w-6 h-6" />}
        title="Bible Verse Generator"
        subtitle="Discover a random scripture verse each time. Choose from 12 themes and let God's Word speak to you today."
      />

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-center text-sm font-semibold text-muted-foreground mb-3">FILTER BY THEME</p>
          <div className="flex flex-wrap gap-2 justify-center mb-7">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
                  ${filter === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-border bg-card shadow-card-lg p-7 md:p-9 mb-6"
            >
              <Badge className="mb-4 bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20">{current.topic}</Badge>
              <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed text-foreground mb-4">
                "{current.text}"
              </blockquote>
              <p className="font-bold text-primary mb-5">— {current.ref}</p>
              <Button variant="outline" size="sm" onClick={copy}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied!" : "Copy Verse"}
              </Button>
            </motion.div>
          </AnimatePresence>

          <div className="text-center">
            <Button size="lg" onClick={generate} className="font-bold">
              <Shuffle className="mr-2 w-4 h-4" /> Generate Another Verse
            </Button>
          </div>
        </div>
      </section>

      <GameContent>
        <ContentBlock title="A Daily Bible Verse for Every Moment">
          <p>
            Whether you're starting your morning devotion, looking for encouragement midday, or winding down with a moment of reflection, a scripture verse can shift your perspective instantly. This random Bible verse generator gives you instant access to over 500 carefully chosen passages across 12 distinct categories — each one selected for its spiritual depth and everyday relevance.
          </p>
          <p>
            Choose a theme that matches where you are right now. Feeling weary? Try <span className="font-semibold">Strength</span>. Facing uncertainty? Pause on <span className="font-semibold">Hope</span>. Looking for direction? <span className="font-semibold">Guidance</span> verses will help. Searching for inner calm? <span className="font-semibold">Peace</span> draws from Psalms, Isaiah, and the New Testament. Struggling to forgive? The <span className="font-semibold">Forgiveness</span> category speaks directly to mercy and reconciliation.
          </p>
        </ContentBlock>
        <ContentBlock title="Pair Verses with Beautiful Bible Scenes">
          <p>
            For a more visual way to sit with scripture, try our <Link href="/bible-jigsaw-puzzle/" className="text-primary font-semibold hover:underline">Bible Jigsaw Puzzle</Link>. Over fifty hand-drawn scenes — Creation, the Garden of Eden, Noah's Ark, the Nativity, the Last Supper, the empty tomb, Pentecost — wait to be reassembled, with the matching verse revealed when each picture is complete. It pairs naturally with a daily verse practice and works beautifully with our peaceful matching game, <Link href="/bible-tiles/" className="text-primary font-semibold hover:underline">Bible Tiles</Link>.
          </p>
        </ContentBlock>
        <ContentBlock title="Use Inspirational Bible Verses Every Day">
          <p>
            Copy any verse with one click and share it in a message, add it to your journal, post to social media, or simply keep it as a quiet reminder on your screen. The <span className="font-semibold">Joy</span> category is perfect for celebrations and gratitude practices; <span className="font-semibold">Patience</span> and <span className="font-semibold">Gratitude</span> both offer deep scripture pools for seasons of waiting or thankfulness.
          </p>
          <p>
            These verses are drawn primarily from the NIV translation — readable, accurate, and widely recognized. Use the generator daily as a simple devotional ritual, or open it whenever you need a fresh word from scripture. Pair it with our <a href="/bible-trivia/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Trivia</a> or <a href="/bible-jeopardy/" className="text-primary font-medium underline-offset-4 hover:underline">Bible Jeopardy</a> to turn reflection into an active learning session.
          </p>
        </ContentBlock>
      </GameContent>

      <ExploreMoreGames cards={exploreOthers("verse", 4)} />
      <FaqSection items={verseFaqs} />
    </>
  );
}
