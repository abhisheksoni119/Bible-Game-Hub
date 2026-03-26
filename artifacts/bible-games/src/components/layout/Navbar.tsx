import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/bible-trivia", label: "Bible Trivia" },
    { href: "/bible-word-games", label: "Word Games" },
    { href: "/kids-bible-games", label: "Kids Games" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary text-secondary-foreground shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Bible Games<span className="text-primary">Online</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2",
                  location === link.href ? "text-primary" : "text-secondary-foreground/80"
                )}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-secondary-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-secondary-foreground/10 px-4 pt-2 pb-6 space-y-2 shadow-xl absolute w-full">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                location === link.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-secondary-foreground/80 hover:bg-secondary-foreground/5 hover:text-secondary-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
