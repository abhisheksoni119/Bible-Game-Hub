import { Helmet } from "react-helmet-async";

const BASE_URL = "https://biblegamesonline.net";

const faqItems = [
  { q: "Are these Bible games completely free?",      a: "Yes! All games on Bible Games Online are 100% free to play. There are no hidden fees or subscriptions required." },
  { q: "Do I need to create an account to play?",    a: "No account is needed. You can jump right in and start playing immediately without any registration." },
  { q: "Are these games suitable for children?",     a: "Absolutely. We have a dedicated Kids Games section with simple, engaging activities, and all our content is family-friendly." },
  { q: "Can I play on my mobile phone?",             a: "Yes, our website is fully responsive and designed to work seamlessly on desktops, tablets, and smartphones." },
  { q: "Do you add new questions to the trivia games?", a: "We regularly update our database with new questions across all difficulty levels to keep the challenges fresh." },
];

function JsonLD({ schema }: { schema: object }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function WebSiteSchema() {
  return (
    <JsonLD schema={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bible Games Online",
      "url": `${BASE_URL}/`,
      "description": "Play free Bible games online including trivia, word search, and fun kids Bible games.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    }} />
  );
}

export function FAQSchema() {
  return (
    <JsonLD schema={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      })),
    }} />
  );
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbSchema({ crumbs }: { crumbs: BreadcrumbItem[] }) {
  return (
    <JsonLD schema={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": crumbs.map(({ name, path }, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": name,
        "item": `${BASE_URL}${path}`,
      })),
    }} />
  );
}

export interface GameSchemaProps {
  name: string;
  url: string;
  description: string;
  applicationCategory?: string;
}

export function GameSchema({ name, url, description, applicationCategory = "Game" }: GameSchemaProps) {
  return (
    <JsonLD schema={{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": name,
      "applicationCategory": applicationCategory,
      "operatingSystem": "Web",
      "url": url,
      "description": description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
    }} />
  );
}
