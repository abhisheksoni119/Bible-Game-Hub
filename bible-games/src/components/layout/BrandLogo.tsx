import { Link } from "wouter";
import { BookOpen } from "lucide-react";

interface BrandLogoProps {
  size?: "sm" | "md";
  asLink?: boolean;
}

export function BrandLogo({ size = "md", asLink = true }: BrandLogoProps) {
  const text = (
    <span className={`font-bold tracking-tight ${size === "sm" ? "text-base" : "text-xl"}`}>
      <span className="text-secondary-foreground">Bible Games</span>
      <span className="text-primary font-display italic ml-1">Online</span>
    </span>
  );

  const inner = (
    <span className="flex items-center gap-2">
      <span
        className={`inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground ${
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
