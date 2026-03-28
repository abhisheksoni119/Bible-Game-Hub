import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/",                label: "Home" },
    { href: "/bible-trivia",    label: "Bible Trivia" },
    { href: "/bible-word-games",label: "Word Games" },
    { href: "/kids-bible-games",label: "Kids Games" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary text-secondary-foreground shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight">
              Bible Games<span className="text-primary">Online</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
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

          {/* Mobile Menu Button — 44×44 px tap target */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-secondary-foreground/80 hover:text-primary hover:bg-secondary-foreground/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav — animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-secondary border-t border-secondary-foreground/10 shadow-xl"
          >
            <div className="px-4 pt-2 pb-5 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors min-h-[44px]",
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-secondary-foreground/80 hover:bg-secondary-foreground/5 hover:text-secondary-foreground"
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
