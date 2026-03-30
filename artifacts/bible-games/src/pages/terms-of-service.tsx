import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Link } from "wouter";
import { PageSEO } from "@/components/seo/PageSEO";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

const LAST_UPDATED = "March 28, 2026";

export default function TermsOfService() {
  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Terms of Service | Bible Games Online"
        description="Read the Terms of Service for Bible Games Online — free, wholesome Bible games for all ages with no ads or sign-up required."
        canonicalPath="/terms-of-service/"
      />
      <BreadcrumbSchema crumbs={[{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms-of-service/" }]} />

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
            <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative">Terms of Service</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-2xl mx-auto relative">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-card rounded-3xl shadow-card-lg border border-border/60 p-6 sm:p-10 md:p-14 space-y-10">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using Bible Games Online (the "Site"), you agree to be bound by these Terms
              of Service ("Terms"). If you do not agree with any part of these Terms, please do not use
              the Site.
            </p>
            <p>
              These Terms apply to all visitors and users of the Site. We may update these Terms at any
              time, and your continued use of the Site after changes are posted constitutes acceptance of
              the revised Terms.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Bible Games Online provides free, browser-based games with a biblical theme, including Bible
              trivia quizzes, word search puzzles, and children's matching games. The Site is provided
              free of charge with no registration required.
            </p>
          </Section>

          <Section title="3. Permitted Use">
            <p>You may use the Site for personal, non-commercial, educational, and entertainment purposes. You agree that you will not:</p>
            <ul>
              <li>Attempt to reverse-engineer, scrape, or copy the Site's content or source code for commercial purposes.</li>
              <li>Use automated tools (bots, scrapers, crawlers) to access the Site in a way that imposes an unreasonable load on our servers.</li>
              <li>Use the Site for any unlawful purpose or in violation of any local, national, or international laws or regulations.</li>
              <li>Attempt to interfere with or disrupt the Site's operation or servers.</li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content on the Site — including but not limited to text, graphics, logos, game design,
              and code — is the property of Bible Games Online or its content suppliers and is protected
              by applicable copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to access and use the
              Site for personal purposes only. This license does not include the right to copy, reproduce,
              distribute, or create derivative works of any content without our prior written permission.
            </p>
          </Section>

          <Section title="5. Scripture and Religious Content">
            <p>
              Bible Games Online uses scripture references, biblical names, places, and events as
              educational content. All scriptural content is drawn from the public domain or used in
              accordance with fair use principles. We make every reasonable effort to ensure accuracy,
              but we do not warrant the completeness or infallibility of any biblical content presented.
            </p>
          </Section>

          <Section title="6. Disclaimer of Warranties">
            <p>
              The Site is provided "as is" and "as available" without warranties of any kind, either
              express or implied. We do not warrant that:
            </p>
            <ul>
              <li>The Site will be uninterrupted or error-free.</li>
              <li>Any information on the Site is complete, accurate, or current.</li>
              <li>The Site or its servers are free of viruses or other harmful components.</li>
            </ul>
            <p>
              Your use of the Site is at your sole risk. To the fullest extent permitted by law, we
              disclaim all warranties, express or implied.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Bible Games Online and its operators
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of, or inability to use, the Site or its content.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              The Site may contain links to third-party websites. We are not responsible for the content,
              privacy practices, or accuracy of any third-party site, and the inclusion of a link does
              not imply endorsement.
            </p>
          </Section>

          <Section title="9. Children's Use">
            <p>
              We actively welcome children to use the Kids Games section of the Site. Parents and
              guardians are encouraged to supervise their children's internet use. As described in our{" "}
              <Link href="/privacy-policy/" className="text-primary hover:underline font-medium">Privacy Policy</Link>,
              we do not collect any personal data from any user, including children.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United
              States, without regard to its conflict of law provisions. Any disputes arising under these
              Terms shall be resolved through good-faith negotiation or, if necessary, binding arbitration.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions about these Terms? Please contact us through our{" "}
              <Link href="/contact/" className="text-primary hover:underline font-medium">Contact page</Link>.
            </p>
          </Section>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/privacy-policy/" className="text-primary hover:underline font-medium">Privacy Policy</Link>
          {" · "}
          <Link href="/contact/" className="text-primary hover:underline font-medium">Contact Us</Link>
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
