import { ReactNode } from "react";

interface GameHeroProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  meta?: ReactNode;
}

export function GameHero({ icon, title, subtitle, meta }: GameHeroProps) {
  return (
    <section className="bg-secondary text-secondary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container mx-auto px-4 py-12 md:py-16 text-center relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 ring-1 ring-primary/30 mb-5 text-primary">
          {icon}
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">{title}</h1>
        <p className="text-secondary-foreground/70 max-w-2xl mx-auto">{subtitle}</p>
        {meta && <div className="mt-5 flex flex-wrap justify-center gap-3">{meta}</div>}
      </div>
    </section>
  );
}
