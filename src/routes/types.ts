import React from 'react'
import { ROUTES } from './constant'

export type RouteItem = {
  path: RouteValue
  element: React.ReactNode
}

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES]
