import { metaTagsData } from './constant'

export type HelmetWrapperProps = {
  route: keyof typeof metaTagsData
  children: React.ReactNode
}
