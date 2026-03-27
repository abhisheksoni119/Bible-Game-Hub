import { Link } from "wouter";
import { Play } from "lucide-react";

export interface RelatedGame {
  title: string;
  description: string;
  href: string;
  emoji: string;
  cta: string;
}

interface Props {
  games: RelatedGame[];
}

export function RelatedGames({ games }: Props) {
  return (
    <section className="bg-muted/30 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-foreground mb-5">Explore More Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map(game => (
          <Link
            key={game.href}
            href={game.href}
            className="group flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl flex-shrink-0 mt-0.5">{game.emoji}</span>
            <div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1 text-base">
                {game.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{game.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {game.cta} <Play className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
