import { ROUTES } from '@/routes/constant'
import { LayoutDashboard, NotepadText } from 'lucide-react'

export const menu = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Expenses', path: ROUTES.EXPENSES, icon: NotepadText },
]
