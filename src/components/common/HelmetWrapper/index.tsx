import { Helmet } from '@dr.pogodin/react-helmet'
import { HelmetWrapperProps } from './types'
import { metaTagsData } from './constant'

export const HelmetWrapper = ({ route, children }: HelmetWrapperProps) => {
  const { title, description, twitterCard, keywords } = metaTagsData[route]

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords.join(', ')} />}

        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Finance Manager" />

        <meta name="twitter:card" content={twitterCard || 'summary_large_image'} />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      {children}
    </>
  )
}
