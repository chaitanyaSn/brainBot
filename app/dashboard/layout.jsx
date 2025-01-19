import React from 'react'
import SideBar from './_components/SideBar'
import DashHeader from './_components/DashHeader'

const DashLayout = ({children}) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="sticky top-0 h-screen md:w-64 hidden md:block bg-gray-900 shadow-lg border-r-2 border-slate-500">
        <SideBar />
      </aside>
      
      <main className="flex-1 flex flex-col">
        <DashHeader className="sticky top-0 z-10" />
        <div className="flex-1 p-10 bg-gradient-to-br from-blue-900 to-gray-900">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashLayout
