import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items?: FaqItem[];
  heading?: string;
}

export const defaultFaqs: FaqItem[] = [
  {
    q: "Are these Bible games completely free?",
    a: "Yes! All games on Bible Games Online are 100% free to play. There are no hidden fees or subscriptions required.",
  },
  {
    q: "Do I need to create an account to play?",
    a: "No account is needed. Choose a game and start playing right away in your browser — your progress stays on your device.",
  },
  {
    q: "Are these games suitable for children?",
    a: "Absolutely. Our games are designed to be wholesome and family-friendly, with content appropriate for all ages from young readers to adults.",
  },
  {
    q: "Can I play on my mobile phone?",
    a: "Yes. Every game is fully responsive and works smoothly on phones, tablets, laptops, and desktops — no app download required.",
  },
  {
    q: "Do you add new questions to the trivia games?",
    a: "Our trivia and quiz banks are regularly expanded so you'll always find fresh challenges across the Old and New Testaments.",
  },
];

export function FaqSection({ items = defaultFaqs, heading = "Frequently Asked Questions" }: FaqSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          {heading}
        </h2>
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
