import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bible-trivia/", label: "Bible Trivia" },
  { href: "/bible-word-games/", label: "Word Games" },
  { href: "/kids-bible-games/", label: "Kids Games" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground border-b border-white/5">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                location === link.href
                  ? "text-primary"
                  : "text-secondary-foreground/85 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-secondary-foreground hover:bg-white/5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-secondary px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block py-2.5 text-sm font-medium transition-colors",
                location === link.href ? "text-primary" : "text-secondary-foreground/85 hover:text-primary"
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
