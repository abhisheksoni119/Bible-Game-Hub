import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground/60 border-t border-white/5 mt-auto">
      {/* Gold top line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="bg-primary/15 text-primary p-1.5 rounded-xl border border-primary/20 group-hover:bg-primary/25 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg text-secondary-foreground">
                Bible Games<span className="text-primary">Online</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Free, wholesome Bible games for all ages. No ads, no sign-up — just scripture, learning, and fun.
            </p>
          </div>

          {/* Games */}
          <div>
            <h3 className="font-bold text-secondary-foreground text-sm uppercase tracking-wider mb-4">Games</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/bible-trivia/" className="hover:text-primary transition-colors flex items-center gap-1.5">🧠 Bible Trivia</Link></li>
              <li><Link href="/bible-word-games/" className="hover:text-primary transition-colors flex items-center gap-1.5">🔍 Word Search</Link></li>
              <li><Link href="/kids-bible-games/" className="hover:text-primary transition-colors flex items-center gap-1.5">🎮 Kids Matching</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-secondary-foreground text-sm uppercase tracking-wider mb-4">Info</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy-policy/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact/" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Bible Games Online. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
