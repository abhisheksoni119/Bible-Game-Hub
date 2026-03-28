import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/",                 label: "Home" },
    { href: "/bible-trivia/",     label: "Bible Trivia" },
    { href: "/bible-word-games/", label: "Word Games" },
    { href: "/kids-bible-games/", label: "Kids Games" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="relative bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-gold">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
              Bible Games<span className="text-primary">Online</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "text-primary"
                      : "text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-white/5"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button — 44×44 tap target */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-secondary-foreground/70 hover:text-white hover:bg-white/8 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-secondary/98 border-t border-white/5"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all min-h-[44px]",
                    location === link.href
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-secondary-foreground/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
