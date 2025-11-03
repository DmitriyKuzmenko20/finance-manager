import { lazy, Suspense } from 'react'
import { Routes as ReactRouter, Route } from 'react-router-dom'
import { ROUTES } from './constant'
import { RouteItem } from './types'
import Dashboard from '@/pages/Dashboard'
import { HelmetWrapper } from '@/components'

const Expenses = lazy(() => import('../pages/Expenses'))
const Assets = lazy(() => import('../pages/Assets'))

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
]

export const Routes = () => {
  return (
    <ReactRouter>
      {routList.map((route) => {
        return <Route key={route.path} {...route} />
      })}
    </ReactRouter>
  )
}
