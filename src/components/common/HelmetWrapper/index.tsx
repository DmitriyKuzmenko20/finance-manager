import { Helmet } from 'react-helmet-async'
import { HelmetWrapperProps } from './types'
import { metaTagsData } from './constant'

export const HelmetWrapper = ({ route, children }: HelmetWrapperProps) => {
  const { title, description } = metaTagsData[route]

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      {children}
    </>
  )
}
