import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { HeaderProps } from './types'
import { menu } from '../constant'

export const Header = memo(({ toggleShowSidebar }: HeaderProps) => {
  const location = useLocation()

  const currentMenuItem = menu.find((m) => location.pathname === m.path)

  return (
    <header className="sticky top-0 py-4 px-8 z-5 border-b border-solid border-gray-100">
      <div className="flex items-center gap-4">
        <button className="hidden tablet:block" onClick={toggleShowSidebar}>
          <Menu className="w-5 h-5" />
        </button>
        {currentMenuItem && (
          <div className="flex items-center gap-2">
            <currentMenuItem.icon className="w-5 h-5" />
            <span className="text-sm">{currentMenuItem.name}</span>
          </div>
        )}
      </div>
    </header>
  )
})
