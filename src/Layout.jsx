import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className='h-full w-full'>
         <Header />
     <Outlet />
     </div>
  )
}

export default Layout