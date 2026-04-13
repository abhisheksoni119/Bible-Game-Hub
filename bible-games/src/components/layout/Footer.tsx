import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary mb-3">
              <BookOpen className="w-5 h-5" />
              Bible Games Online
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Play free Bible games online and grow your faith through fun and interactive learning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-primary">Games</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link href="/bible-trivia/" className="hover:text-primary transition-colors">Bible Trivia</Link></li>
              <li><Link href="/bible-word-games/" className="hover:text-primary transition-colors">Word Games</Link></li>
              <li><Link href="/kids-bible-games/" className="hover:text-primary transition-colors">Kids Games</Link></li>
              <li><Link href="/bible-wordle/" className="hover:text-primary transition-colors">Bible Wordle</Link></li>
              <li><Link href="/bible-jeopardy/" className="hover:text-primary transition-colors">Bible Jeopardy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-primary">Info</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link href="/privacy-policy/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact/" className="hover:text-primary transition-colors">Contact Us</Link></li>
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
