import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

const SITE_NAME = "Bible Games Online";
const BASE_URL  = "https://www.biblegamesonline.com";

export function PageSEO({ title, description, canonicalPath = "" }: PageSEOProps) {
  const canonical = `${BASE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={`${BASE_URL}/opengraph.jpg`} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={`${BASE_URL}/opengraph.jpg`} />

      {/* Extra signals */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
