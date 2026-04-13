import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Bible Games Online</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
        <h1>Terms of Service</h1>
        <p><em>Last updated: January 2025</em></p>
        <p>By using Bible Games Online, you agree to these Terms of Service. Please read them carefully.</p>

        <h2>Use of the Website</h2>
        <p>Bible Games Online is provided for educational and entertainment purposes. All games are free to play. You agree to use the website only for lawful purposes and in accordance with these terms.</p>

        <h2>Intellectual Property</h2>
        <p>All content, including game designs, text, and graphics on Bible Games Online, is owned by or licensed to us. You may not copy, reproduce, or distribute our content without permission.</p>

        <h2>Disclaimer of Warranties</h2>
        <p>Our website and games are provided "as is" without warranties of any kind. We do not guarantee that the website will be error-free, uninterrupted, or free from viruses.</p>

        <h2>Limitation of Liability</h2>
        <p>Bible Games Online shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or games.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about these terms, please contact us through our <a href="/contact/">Contact page</a>.</p>
      </div>
    </>
  );
}
