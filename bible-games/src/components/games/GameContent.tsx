import { ReactNode } from "react";

interface GameContentProps {
  children: ReactNode;
}

export function GameContent({ children }: GameContentProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl space-y-10 prose-game">
        {children}
      </div>
    </section>
  );
}

interface ContentBlockProps {
  title: string;
  children: ReactNode;
}

export function ContentBlock({ title, children }: ContentBlockProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-[15px]">
        {children}
      </div>
    </div>
  );
}
