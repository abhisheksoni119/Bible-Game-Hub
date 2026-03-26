import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground/60 py-12 mt-auto border-t border-secondary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-lg text-secondary-foreground">Bible Games<span className="text-primary">Online</span></span>
            </Link>
            <p className="text-sm max-w-xs">
              Providing fun, engaging, and free Bible-based games for all ages. Test your knowledge and grow in faith.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-secondary-foreground mb-4">Games</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bible-trivia" className="hover:text-primary transition-colors">Bible Trivia</Link></li>
              <li><Link href="/bible-word-games" className="hover:text-primary transition-colors">Word Search</Link></li>
              <li><Link href="/kids-bible-games" className="hover:text-primary transition-colors">Kids Matching</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-secondary-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Bible Games Online. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
