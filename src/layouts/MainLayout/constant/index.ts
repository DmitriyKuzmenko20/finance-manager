import { ROUTES } from '@/routes/constant'
import { BugIcon, LayoutDashboard, NotepadText, Target, Wallet } from 'lucide-react'

export const menu = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Expenses', path: ROUTES.EXPENSES, icon: NotepadText },
  { name: 'Assets', path: ROUTES.ASSETS, icon: Wallet },
  { name: 'Targets', path: ROUTES.TARGETS, icon: Target },
  { name: 'Testing', path: ROUTES.TESTING, icon: BugIcon },
]
