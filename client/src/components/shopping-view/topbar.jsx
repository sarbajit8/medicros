import React, { useState } from "react"; 
import { Link } from "react-router-dom"; 
import { Phone, Mail, Menu, X, Globe } from "lucide-react"; 
import { useTranslation } from "react-i18next"; 
import ChangeLanguage from "./changeLanguage"; 


const Topbar = () => { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true); 
  const { t } = useTranslation(); 


  return ( 
    <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 shadow-md"> 
      <div className="container mx-auto flex flex-wrap justify-between items-center text-sm"> 
        {/* 🔹 Mobile Toggle Button */} 
        {/* <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        > 
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} 
        </button> */} 


        {/* 🔹 Navigation Buttons (Scrollable on Mobile and Medium screens) */} 
        <div 
          className={`w-full md:w-auto flex flex-col md:flex-row items-center justify-center transition-all ${ 
            isMobileMenuOpen ? "block" : "hidden md:flex" 
          }`} 
        > 
          <div className="flex w-full md:w-auto justify-center overflow-x-auto pb-2 scrollbar-hide"> 
            <div className="flex space-x-3 md:space-x-2 min-w-max"> 
              <Link to="/shop/howtoregister" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("htr")} 
              </Link> 
              <Link to="/shop/freeproducts" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("fps")} 
              </Link> 
              <Link to="/shop/margin/60-70%" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("mrg")} 
              </Link> 
              <Link to="/shop/generic" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("gm")} 
              </Link> 
              <Link to="/shop/quickrequirement" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("qr")} 
              </Link> 
              <Link to="/shop/available-products" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("oap")} 
              </Link> 
              {/* <Link to="/shop/career" className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md"> 
                {t("cr")} 
              </Link> */} 
            </div> 
          </div> 
        </div> 


        {/* 🔹 Contact Info (Stacked on Mobile) */} 
        <div className="flex flex-col md:flex-row md:space-x-6 mt-2 md:mt-0"> 
          <div className="flex items-center space-x-2 hover:text-gray-300 transition"> 
            {/* 🌍 Language Selector */} 
            {/* <ChangeLanguage /> */} 
          </div> 


          {/* Phone number and Email only visible on full desktop screens */} 
          {/* <div className="hidden lg:flex items-center space-x-2 hover:text-gray-300 transition"> 
            <Phone className="w-4 h-4 text-yellow-300" /> 
            <span className="font-medium text-sm">+91 8001339943</span> 
          </div>  */}


          {/* <div className="hidden lg:flex items-center space-x-2 hover:text-gray-300 transition"> 
            <Mail className="w-4 h-4 text-yellow-300" /> 
            <span className="font-medium text-sm">medicrossremedies@gmail.com</span> 
          </div>  */}
        </div>

        {/* 🔹 Version Number */}
        <div className="hidden md:flex items-center text-xs text-white/70 font-mono">
          v1.1
        </div>
      </div> 
    </div> 
  ); 
}; 


export default Topbar;