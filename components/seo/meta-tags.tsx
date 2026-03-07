import Head from 'next/head'

interface MetaTagsProps {
  title: string
  description: string
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
}

export function MetaTags({
  title,
  description,
  ogImage = '/og-image.png',
  ogType = 'website',
  canonical,
  noindex = false,
}: MetaTagsProps) {
  const fullTitle = `${title} | ID Academy`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}

// For use in page components
export function useMetaTags(
  title: string,
  description: string,
  options?: Omit<MetaTagsProps, 'title' | 'description'>
) {
  return (
    <MetaTags
      title={title}
      description={description}
      {...options}
    />
  )
}
