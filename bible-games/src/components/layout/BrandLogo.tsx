import { Link } from "wouter";
import { BookOpen } from "lucide-react";

interface BrandLogoProps {
  size?: "sm" | "md";
  asLink?: boolean;
}

export function BrandLogo({ size = "md", asLink = true }: BrandLogoProps) {
  const text = (
    <span className={`font-bold tracking-tight whitespace-nowrap leading-none ${size === "sm" ? "text-base" : "text-lg"}`}>
      <span className="text-secondary-foreground">Bible Games</span>
      <span className="text-primary font-display italic ml-1.5">Online</span>
    </span>
  );

  const inner = (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span
        className={`inline-flex flex-shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground ${
          size === "sm" ? "w-6 h-6" : "w-7 h-7"
        }`}
      >
        <BookOpen className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </span>
      {text}
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
        {inner}
      </Link>
    );
  }
  return inner;
}
