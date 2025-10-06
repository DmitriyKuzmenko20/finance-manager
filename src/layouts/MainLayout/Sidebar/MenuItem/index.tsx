import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { MenuItemProps } from './types'

export const MenuItem = memo(({ name, path, icon: Icon }: MenuItemProps) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          clsx(
            'flex items-center gap-2 px-2.5 py-2 w-full rounded-lg text-sm font-medium transition-shadow hover:shadow-md',
            isActive ? 'drop-shadow-md bg-white' : 'text-gray-600'
          )
        }
      >
        <Icon className="w-5 h-5" />
        <span>{name}</span>
      </NavLink>
    </li>
  )
})
