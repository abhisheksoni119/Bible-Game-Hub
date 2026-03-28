import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Link } from "wouter";
import { PageSEO } from "@/components/seo/PageSEO";

const LAST_UPDATED = "March 28, 2026";

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Privacy Policy | Bible Games Online"
        description="Read the Privacy Policy for Bible Games Online. We do not collect personal data — all games are free, safe, and require no sign-up."
        canonicalPath="/privacy-policy"
      />

      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-10 sm:py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/50" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/15 border border-primary/25 mb-4 shadow-gold">
            <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative">Privacy Policy</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-2xl mx-auto relative">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-card rounded-3xl shadow-card-lg border border-border/60 p-6 sm:p-10 md:p-14 space-y-10">

          <Section title="1. Introduction">
            <p>
              Welcome to Bible Games Online ("we," "us," or "our"). We are committed to protecting your
              privacy. This Privacy Policy explains how we handle information when you visit and use our
              website at <strong>biblegamesonline.com</strong> (the "Site").
            </p>
            <p>
              By using the Site you agree to the practices described in this policy. If you do not agree,
              please discontinue use of the Site.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              Bible Games Online is a fully client-side website. We do <strong>not</strong> operate servers
              that collect, store, or process personal information. Specifically:
            </p>
            <ul>
              <li>We do not require you to create an account or log in.</li>
              <li>We do not ask for your name, email address, phone number, or payment details.</li>
              <li>We do not track your location.</li>
            </ul>
            <p>
              The only data stored during your visit is saved locally in your browser's
              <strong> localStorage</strong>. This is used solely to remember which trivia questions you have
              already seen, so you are served fresh questions each session. This data never leaves your
              device and is not accessible to us.
            </p>
          </Section>

          <Section title="3. Cookies and Similar Technologies">
            <p>
              We do not use tracking cookies, advertising cookies, or analytics cookies. Your browser may
              store a small amount of game-state data (via localStorage) as described above, but this is
              not a cookie and is not shared with any third party.
            </p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>We use the following third-party services to operate the Site:</p>
            <ul>
              <li>
                <strong>Google Fonts</strong> — We load the Poppins and Playfair Display typefaces from
                Google's font delivery network. Google may log the request, subject to their own privacy
                policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a>.
              </li>
            </ul>
            <p>
              We do not use advertising networks, social media trackers, or third-party analytics on this
              Site.
            </p>
          </Section>

          <Section title="5. Children's Privacy">
            <p>
              Bible Games Online includes content designed for children (our Kids Games section). We
              intentionally do not collect any personal information from any user, including children under
              the age of 13. The Site is compliant with the Children's Online Privacy Protection Act
              (COPPA) because we collect no personal data whatsoever.
            </p>
          </Section>

          <Section title="6. External Links">
            <p>
              The Site may occasionally contain links to external websites (for example, Google Fonts or
              Bible reference resources). We are not responsible for the content or privacy practices of
              those sites and encourage you to review their policies separately.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the "Last
              updated" date at the top of this page. Continued use of the Site after any changes
              constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              If you have any questions about this Privacy Policy, please reach out to us via our{" "}
              <Link href="/contact" className="text-primary hover:underline font-medium">Contact page</Link>.
            </p>
          </Section>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/terms-of-service" className="text-primary hover:underline font-medium">Terms of Service</Link>
          {" · "}
          <Link href="/contact" className="text-primary hover:underline font-medium">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4 pb-3 border-b border-border">
        {title}
      </h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed text-sm sm:text-base [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:text-foreground [&_strong]:font-semibold">
        {children}
      </div>
    </div>
  );
}
