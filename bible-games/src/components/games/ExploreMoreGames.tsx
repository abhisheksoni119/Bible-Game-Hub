import { Link } from "wouter";
import { ReactNode } from "react";

export interface ExploreCard {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  cta?: string;
}

interface ExploreMoreGamesProps {
  cards: ExploreCard[];
  heading?: string;
}

export function ExploreMoreGames({ cards, heading = "Explore More Games" }: ExploreMoreGamesProps) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-xl font-bold mb-5">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base leading-tight">{card.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{card.description}</p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                {card.cta || "Play Now"} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
