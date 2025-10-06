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
      <div className="w-full m-2 rounded-xl drop-shadow-xs bg-white">
        <Header toggleShowSidebar={toggleShowSidebar} />
        <main className="relative flex-1 overflow-auto">
          <div className="m-auto h-full p-2">{children}</div>
        </main>
      </div>
    </div>
  )
}
