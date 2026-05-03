import { Link } from "wouter";
import {
  BookOpen, Search, Baby, Type, Trophy, RotateCw, Layout,
  Brain, Sparkles, Grid3x3, User, Layers, Puzzle,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const games = [
  { href: "/bible-trivia/", label: "Bible Trivia", icon: BookOpen },
  { href: "/bible-word-games/", label: "Word Search", icon: Search },
  { href: "/kids-bible-games/", label: "Kids Matching", icon: Baby },
  { href: "/bible-wordle/", label: "Bible Wordle", icon: Type },
  { href: "/bible-millionaire/", label: "Bible Millionaire", icon: Trophy },
  { href: "/bible-wheel-of-fortune/", label: "Wheel of Fortune", icon: RotateCw },
  { href: "/bible-jeopardy/", label: "Bible Jeopardy", icon: Layout },
  { href: "/bible-memory-games/", label: "Memory Games", icon: Brain },
  { href: "/bible-verse-generator/", label: "Verse Generator", icon: Sparkles },
  { href: "/bible-crossword/", label: "Bible Crossword", icon: Grid3x3 },
  { href: "/bible-who-am-i/", label: "Who Am I?", icon: User },
  { href: "/bible-tiles/", label: "Bible Tiles", icon: Layers },
  { href: "/bible-jigsaw-puzzle/", label: "Bible Jigsaw", icon: Puzzle },
];

const info = [
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/terms-of-service/", label: "Terms of Service" },
  { href: "/contact/", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <BrandLogo asLink={false} />
            </div>
            <p className="text-sm text-secondary-foreground/65 leading-relaxed max-w-xs">
              Free, wholesome Bible games for all ages. No ads, no sign-up — just scripture, learning, and fun.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary-foreground">GAMES</h4>
            <ul className="space-y-2.5 text-sm">
              {games.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary/70" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary-foreground">INFO</h4>
            <ul className="space-y-2.5 text-sm">
              {info.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-secondary-foreground/50">
          &copy; {new Date().getFullYear()} Bible Games Online. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
