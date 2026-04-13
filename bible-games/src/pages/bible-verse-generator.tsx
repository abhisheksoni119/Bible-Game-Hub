import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shuffle, BookOpen, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const verses = [
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", topic: "Love" },
  { ref: "Philippians 4:13", text: "I can do all this through him who gives me strength.", topic: "Strength" },
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", topic: "Hope" },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", topic: "Faith" },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", topic: "Guidance" },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing.", topic: "Peace" },
  { ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", topic: "Faith" },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", topic: "Hope" },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble.", topic: "Comfort" },
  { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", topic: "Renewal" },
  { ref: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.", topic: "Grace" },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", topic: "Rest" },
  { ref: "1 Corinthians 13:4", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", topic: "Love" },
  { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", topic: "Courage" },
  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path.", topic: "Guidance" },
  { ref: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", topic: "Renewal" },
  { ref: "Psalm 27:1", text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?", topic: "Courage" },
  { ref: "Matthew 5:9", text: "Blessed are the peacemakers, for they will be called children of God.", topic: "Peace" },
];

const topics = [...new Set(verses.map(v => v.topic))];

export default function BibleVerseGenerator() {
  const [current, setCurrent] = useState(verses[0]);
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  function generate() {
    const pool = filter === "All" ? verses : verses.filter(v => v.topic === filter);
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(next);
    setKey(k => k + 1);
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
        <meta name="description" content="Generate random Bible verses for daily inspiration and scripture study. Filter by topic and discover God's Word." />
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Bible Verse Generator</h1>
        <p className="text-muted-foreground mb-8">Discover inspiring Bible verses for daily encouragement</p>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["All", ...topics].map(t => (
            <Button
              key={t}
              variant={filter === t ? "default" : "outline"}
              size="sm"
              onClick={() => { setFilter(t); }}
            >
              {t}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-card-lg mb-6">
              <CardContent className="py-10 px-8">
                <Badge className="mb-4">{current.topic}</Badge>
                <blockquote className="text-xl leading-relaxed font-serif italic text-foreground mb-6">
                  "{current.text}"
                </blockquote>
                <p className="font-bold text-primary text-lg">— {current.ref}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={generate}>
            <Shuffle className="mr-2 w-4 h-4" />
            New Verse
          </Button>
          <Button variant="outline" size="lg" onClick={copy}>
            {copied ? <Check className="mr-2 w-4 h-4" /> : <Copy className="mr-2 w-4 h-4" />}
            {copied ? "Copied!" : "Copy Verse"}
          </Button>
        </div>
      </div>
    </>
  );
}
