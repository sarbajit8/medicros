import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'

const ShopingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common hedder */}
        <ShoppingHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default ShopingLayout