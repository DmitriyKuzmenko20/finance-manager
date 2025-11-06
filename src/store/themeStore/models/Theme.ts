import { THEME_TYPE } from '@/constant'

export type Theme = (typeof THEME_TYPE)[keyof typeof THEME_TYPE]
