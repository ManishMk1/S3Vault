import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'
function Layout() {
  return (
    <div className='h-full w-full'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce} 
      />
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout