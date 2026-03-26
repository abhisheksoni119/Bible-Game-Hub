import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden mb-4 bg-card shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        onClick={onClick}
      >
        <span className="font-semibold text-foreground pr-8">{question}</span>
        <div className={cn(
          "p-1 rounded-full transition-transform duration-300",
          isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-secondary text-secondary-foreground"
        )}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="px-6 pb-4 text-muted-foreground leading-relaxed border-t border-border mt-2 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({ items }: { items: { q: string, a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
