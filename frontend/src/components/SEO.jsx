import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'SmorX.ai'
const SITE_URL = 'https://smorx.ai'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default function SEO({
  title,
  description,
  canonical = '/',
  ogImage = OG_IMAGE,
  type = 'website',
  article = null,
  breadcrumbs = null,
  extraSchema = null,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `Enterprise AI Automation Platform & AI Agent Infrastructure | ${SITE_NAME}`
  const fullCanonical = `${SITE_URL}${canonical}`

  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.path}`,
        })),
      }
    : null

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        description,
        author: {
          '@type': 'Organization',
          name: 'SmorX.ai',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SmorX.ai',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/smorx-logo.png`,
          },
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullCanonical,
        },
      }
    : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={article ? 'article' : type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {extraSchema && (
        <script type="application/ld+json">
          {JSON.stringify(extraSchema)}
        </script>
      )}
    </Helmet>
  )
}
