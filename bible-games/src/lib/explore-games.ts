import {
  BookOpen, Search, Baby, Type, Trophy, RotateCw, Layout,
  Brain, Sparkles, Grid3x3, User, CheckCircle2,
} from "lucide-react";
import { createElement } from "react";
import type { ExploreCard } from "@/components/games/ExploreMoreGames";

export const allGames: (ExploreCard & { key: string })[] = [
  {
    key: "trivia",
    href: "/bible-trivia/",
    title: "Bible Trivia",
    description: "Fast-paced quiz with 6 categories and 3 difficulty levels.",
    icon: createElement(BookOpen, { className: "w-5 h-5" }),
    cta: "Play Trivia",
  },
  {
    key: "word-search",
    href: "/bible-word-games/",
    title: "Bible Word Search",
    description: "Hunt for hidden scripture words in a generated grid.",
    icon: createElement(Search, { className: "w-5 h-5" }),
    cta: "Search Words",
  },
  {
    key: "kids",
    href: "/kids-bible-games/",
    title: "Kids Bible Matching",
    description: "Colorful card-flip game perfect for younger players.",
    icon: createElement(Baby, { className: "w-5 h-5" }),
    cta: "Play Now",
  },
  {
    key: "wordle",
    href: "/bible-wordle/",
    title: "Bible Wordle",
    description: "Guess the 5-letter Bible word in 6 tries — colored hints help.",
    icon: createElement(Type, { className: "w-5 h-5" }),
    cta: "Play Wordle",
  },
  {
    key: "millionaire",
    href: "/bible-millionaire/",
    title: "Bible Millionaire",
    description: "Climb the prize ladder with 15 scripture questions.",
    icon: createElement(Trophy, { className: "w-5 h-5" }),
    cta: "Play Millionaire",
  },
  {
    key: "wheel",
    href: "/bible-wheel-of-fortune/",
    title: "Bible Wheel of Fortune",
    description: "Reveal the hidden Bible phrase one letter at a time.",
    icon: createElement(RotateCw, { className: "w-5 h-5" }),
    cta: "Spin the Wheel",
  },
  {
    key: "jeopardy",
    href: "/bible-jeopardy/",
    title: "Bible Jeopardy",
    description: "Pick clues from 6 scripture categories for points.",
    icon: createElement(Layout, { className: "w-5 h-5" }),
    cta: "Play Jeopardy",
  },
  {
    key: "memory",
    href: "/bible-memory-games/",
    title: "Bible Memory Games",
    description: "Match Bible characters with their defining stories.",
    icon: createElement(Brain, { className: "w-5 h-5" }),
    cta: "Play Memory",
  },
  {
    key: "verse",
    href: "/bible-verse-generator/",
    title: "Bible Verse Generator",
    description: "Discover an inspiring scripture passage for any moment.",
    icon: createElement(Sparkles, { className: "w-5 h-5" }),
    cta: "Get a Verse",
  },
  {
    key: "crossword",
    href: "/bible-crossword/",
    title: "Bible Crossword",
    description: "Solve scripture-themed crossword clues across and down.",
    icon: createElement(Grid3x3, { className: "w-5 h-5" }),
    cta: "Solve Puzzle",
  },
  {
    key: "who-am-i",
    href: "/bible-who-am-i/",
    title: "Who Am I?",
    description: "Read clues and identify the famous Bible character.",
    icon: createElement(User, { className: "w-5 h-5" }),
    cta: "Play Now",
  },
  {
    key: "true-false",
    href: "/bible-true-false/",
    title: "True or False",
    description: "Quick-fire scripture facts — true or false?",
    icon: createElement(CheckCircle2, { className: "w-5 h-5" }),
    cta: "Play Now",
  },
];

export function exploreOthers(currentKey: string, count = 3): ExploreCard[] {
  return allGames.filter((g) => g.key !== currentKey).slice(0, count);
}
