import React, { Suspense } from 'react'
import { Routes as ReactRouter, Route } from 'react-router-dom'
import { ROUTES } from './constant'
import { RouteItem } from './types'
import Dashboard from '@/pages/Dashboard'

const Expenses = React.lazy(() => import('../pages/Expenses'))

const routList: RouteItem[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.EXPENSES,
    element: (
      <Suspense>
        <Expenses />
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
