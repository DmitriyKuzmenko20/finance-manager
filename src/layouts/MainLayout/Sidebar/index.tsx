import { memo } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { SidebarProps } from './types'
import { Logo } from '@/assets'
import { menu } from '../constant'
import { MenuItem } from './MenuItem'

export const SideBar = memo(({ isShowSidebar, toggleShowSidebar }: SidebarProps) => {
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 w-full h-screen backdrop-blur-sm transition-opacity duration-300 z-5 bg-black/70',
          isShowSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggleShowSidebar}
      />
      <aside
        className={clsx(
          'fixed top-0 left-0 flex-[1_0_auto] h-full w-64 z-6 transition-transform duration-300 lg:relative lg:translate-x-0',
          isShowSidebar ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Sidebar"
      >
        <div>
          <div className="flex items-center justify-between p-2">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="w-10 h-10 rounded" />
              <h2 className="text-lg font-semibold leading-4">Finance Manager</h2>
            </Link>
            <button className="block cursor-pointer lg:hidden" onClick={toggleShowSidebar}>
              <X className=" size-5" />
            </button>
          </div>
          <nav aria-label="Sidebar Navigation">
            <ul className="grid gap-2 p-2">
              {menu.map((menuItem) => (
                <MenuItem key={menuItem.path} {...menuItem} />
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
})
