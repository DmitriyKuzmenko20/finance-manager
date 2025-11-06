import { lazy, Suspense } from 'react'
import { Routes as ReactRouter, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ROUTES } from './constant'
import { RouteItem } from './types'
import Dashboard from '@/pages/Dashboard'
import { HelmetWrapper } from '@/components'

const Expenses = lazy(() => import('../pages/Expenses'))
const Assets = lazy(() => import('../pages/Assets'))
const Targets = lazy(() => import('../pages/Targets'))

const routList: RouteItem[] = [
  {
    path: ROUTES.DASHBOARD,
    element: (
      <HelmetWrapper route={ROUTES.DASHBOARD}>
        <Dashboard />
      </HelmetWrapper>
    ),
  },
  {
    path: ROUTES.EXPENSES,
    element: (
      <Suspense>
        <Expenses />
      </Suspense>
    ),
  },
  {
    path: ROUTES.ASSETS,
    element: (
      <Suspense>
        <Assets />
      </Suspense>
    ),
  },
  {
    path: ROUTES.TARGETS,
    element: (
      <Suspense>
        <Targets />
      </Suspense>
    ),
  },
]

export const Routes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <ReactRouter location={location} key={location.pathname}>
        {routList.map((route) => {
          return <Route key={route.path} {...route} />
        })}
      </ReactRouter>
    </AnimatePresence>
  )
}
