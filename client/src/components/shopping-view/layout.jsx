import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
import Topbar from './topbar'
import Upperbar from './upperbar'
import Footer from './footer'
import MobileHeader from './mobileHeader'

const ShopingLayout = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 90; // Approx. height of Upperbar + Topbar
      if (window.scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      {/* Common header sections */}
      <MobileHeader/>
      <Upperbar />
      <Topbar />

      {/* Sticky Shopping Header */}
      <div className={isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''}>
        <ShoppingHeader />
      </div>

      {/* Add margin top when header becomes sticky to avoid content jump */}
      <main className={`flex flex-col w-full ${isSticky ? 'mt-[64px]' : ''}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ShopingLayout
