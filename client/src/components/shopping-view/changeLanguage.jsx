import { Globe } from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const ChangeLanguage = () => {
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { i18n } = useTranslation();
  
    const changeLanguage = (lang) => {
      setIsLanguageDropdownOpen(false); 
  
      i18n.changeLanguage(lang);
    };
    
  return (
    <div>
         <div className="relative">
          <button
            className="flex items-center space-x-2 text-white focus:outline-none"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            <Globe className="w-6 h-6 cursor-pointer text-blue-800" />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute left-0 mt-2 w-36 bg-white text-black rounded-lg shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => changeLanguage("en")}
              >
                🇬🇧 English
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => changeLanguage("hi")}
              >
                🇮🇳 हिंदी
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => changeLanguage("bn")}
              >
                🇧🇩 বাংলা
              </button>
            </div>
          )}
        </div>





    </div>
  )
}

export default ChangeLanguage