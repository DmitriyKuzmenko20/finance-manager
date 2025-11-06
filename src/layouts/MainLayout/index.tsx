import { useCallback, useState } from 'react'
import { Header } from './Header'
import { SideBar } from './Sidebar'
import { MainLayoutProps } from './types'

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isShowSidebar, setIsShowSidebar] = useState(false)

  const toggleShowSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev)
  }, [])

  return (
    <div className="flex h-screen w-full gap-1 overflow-hidden bg-layout">
      <SideBar isShowSidebar={isShowSidebar} toggleShowSidebar={toggleShowSidebar} />
      <div className="flex flex-col w-full m-2 rounded-xl drop-shadow-xs bg-card overflow-hidden">
        <Header toggleShowSidebar={toggleShowSidebar} />
        <main className="relative flex-1 overflow-y-auto">
          <div className="m-auto p-4">{children}</div>
        </main>
      </div>
    </div>
  )
}
