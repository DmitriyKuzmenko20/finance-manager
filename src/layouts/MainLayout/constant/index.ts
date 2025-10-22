import { ROUTES } from '@/routes/constant'
import { LayoutDashboard, NotepadText, Wallet } from 'lucide-react'

export const menu = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Expenses', path: ROUTES.EXPENSES, icon: NotepadText },
  { name: 'Assets', path: ROUTES.ASSETS, icon: Wallet },
]
