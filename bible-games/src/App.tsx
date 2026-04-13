import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Home from "@/pages/home";
import Trivia from "@/pages/trivia";
import WordSearch from "@/pages/word-search";
import KidsMatching from "@/pages/kids-matching";
import BibleWordle from "@/pages/bible-wordle";
import BibleMillionaire from "@/pages/bible-millionaire";
import BibleWheelOfFortune from "@/pages/bible-wheel-of-fortune";
import BibleJeopardy from "@/pages/bible-jeopardy";
import BibleMemoryGames from "@/pages/bible-memory-games";
import BibleVerseGenerator from "@/pages/bible-verse-generator";
import BibleCrossword from "@/pages/bible-crossword";
import BibleWhoAmI from "@/pages/bible-who-am-i";
import BibleTrueFalse from "@/pages/bible-true-false";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/bible-trivia/" component={Trivia} />
          <Route path="/bible-word-games/" component={WordSearch} />
          <Route path="/kids-bible-games/" component={KidsMatching} />
          <Route path="/bible-wordle/" component={BibleWordle} />
          <Route path="/bible-millionaire/" component={BibleMillionaire} />
          <Route path="/bible-wheel-of-fortune/" component={BibleWheelOfFortune} />
          <Route path="/bible-jeopardy/" component={BibleJeopardy} />
          <Route path="/bible-memory-games/" component={BibleMemoryGames} />
          <Route path="/bible-verse-generator/" component={BibleVerseGenerator} />
          <Route path="/bible-crossword/" component={BibleCrossword} />
          <Route path="/bible-who-am-i/" component={BibleWhoAmI} />
          <Route path="/bible-true-false/" component={BibleTrueFalse} />
          <Route path="/privacy-policy/" component={PrivacyPolicy} />
          <Route path="/terms-of-service/" component={TermsOfService} />
          <Route path="/contact/" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
