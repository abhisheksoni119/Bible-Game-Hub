import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Sorry, the page you are looking for does not exist. Let's get you back to the games!
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
