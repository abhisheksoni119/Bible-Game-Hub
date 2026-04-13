import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Bible Games Online</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: January 2025</em></p>
        <p>Bible Games Online ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>

        <h2>Information We Collect</h2>
        <p>We do not collect any personal information from users. Our games run entirely in your browser, and we do not require account creation, login, or personal data of any kind.</p>

        <h2>Cookies and Tracking</h2>
        <p>We may use basic analytics cookies to understand how visitors interact with our website. This data is anonymous and is used solely to improve our games and user experience. We do not use advertising cookies or sell data to third parties.</p>

        <h2>Children's Privacy</h2>
        <p>Our website is suitable for all ages. We do not knowingly collect personal information from children under 13. Since we collect no personal information from any users, there is no risk to minors.</p>

        <h2>Third-Party Services</h2>
        <p>We may use Google Fonts and similar web services to enhance the presentation of our website. These services may collect basic usage data as described in their respective privacy policies.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us through our <a href="/contact/">Contact page</a>.</p>
      </div>
    </>
  );
}
