import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, CheckCircle2, Send } from "lucide-react";
import { Link } from "wouter";
import { PageSEO } from "@/components/seo/PageSEO";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormState("submitting");

    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoSubject = encodeURIComponent(subject || "Message from Bible Games Online");
    window.location.href = `mailto:hello@biblegamesonline.net?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setFormState("success");
      setName(""); setEmail(""); setSubject(""); setMessage("");
    }, 800);
  };

  const faqs = [
    {
      q: "Are all the games really free?",
      a: "Yes — every game on Bible Games Online is completely free. No subscriptions, no hidden fees, no sign-up required.",
    },
    {
      q: "How do I report an incorrect trivia answer?",
      a: "Use the contact form and tell us the question, the answer shown, and what you believe the correct answer is. We review all reports promptly.",
    },
    {
      q: "Can I use your games for Sunday school or youth group?",
      a: "Absolutely! Our games are perfect for group settings. Simply open the page on any device with a browser and you're ready to go.",
    },
    {
      q: "Do you have an app for iOS or Android?",
      a: "Not yet — but all our games are fully optimised for phones and tablets, so they work great in your mobile browser.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      <PageSEO
        title="Contact Us | Bible Games Online"
        description="Get in touch with the Bible Games Online team. We'd love to hear your questions, feedback, or suggestions about our free Bible games."
        canonicalPath="/contact"
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
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 relative">Contact Us</h1>
        <p className="text-base sm:text-lg text-secondary-foreground/75 max-w-2xl mx-auto relative">
          Have a question, found an error, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — info + quick FAQs */}
          <div className="lg:col-span-2 space-y-8">

            {/* Info card */}
            <div className="bg-card rounded-3xl border border-border/60 shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold mb-1">Get in Touch</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We're a small team passionate about faith-based gaming. We read every message and aim
                  to reply within 2–3 business days.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/15 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:hello@biblegamesonline.net" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    hello@biblegamesonline.net
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/15 shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Response Time</p>
                  <p className="text-sm font-medium text-foreground">2–3 business days</p>
                </div>
              </div>
            </div>

            {/* Common questions */}
            <div>
              <h2 className="text-lg font-display font-bold mb-4 text-foreground">Common Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border/60 p-4 shadow-card">
                    <p className="text-sm font-semibold text-foreground mb-1.5">{faq.q}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-3xl border border-border/60 shadow-card-lg p-6 sm:p-10">

              <h2 className="text-2xl font-display font-bold mb-1">Send a Message</h2>
              <p className="text-muted-foreground text-sm mb-7">
                Fill in the form below and we'll get back to you as soon as possible.
              </p>

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="text-center py-10"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 mb-4 shadow-sm">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm mb-7 max-w-xs mx-auto">
                      Thank you for reaching out. Your email client should have opened — we'll reply within 2–3 business days.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="px-6 py-3 rounded-xl text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Your Name" required>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="John Smith"
                          className="field-input"
                        />
                      </Field>
                      <Field label="Email Address" required>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="field-input"
                        />
                      </Field>
                    </div>

                    <Field label="Subject">
                      <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Question about Bible Trivia…"
                        className="field-input"
                      />
                    </Field>

                    <Field label="Message" required>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us what's on your mind…"
                        className="field-input resize-none"
                      />
                    </Field>

                    <motion.button
                      type="submit"
                      disabled={formState === "submitting"}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl font-bold bg-primary text-primary-foreground shadow-gold hover:shadow-lg hover:bg-primary/90 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formState === "submitting" ? (
                        <span>Opening email client…</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-muted-foreground text-center">
                      Submitting will open your email app with the message pre-filled.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
              {" · "}
              <Link href="/terms-of-service" className="text-primary hover:underline font-medium">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, required = false, children,
}: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
