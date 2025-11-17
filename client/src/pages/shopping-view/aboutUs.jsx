import About from '@/components/shopping-view/about';
import React from 'react';
import logo from '../../assets/mlogo.png';
import DirectorDesk from '@/components/shopping-view/directorDesk';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md flex items-center justify-between p-6 relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-white animate-fade-in">
            📖 About Us
          </h1>
          <p className="text-white mt-1">Discover our journey and vision</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <About />
        <DirectorDesk/>
      </main>

      {/* 🌟 Our Mission Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto text-center">
          
          {/* Heading with Gradient Effect */}
          <h2 className="text-4xl font-bold text-gray-900 relative animate-fade-in"> 🎯
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            {t("omn")}
            </span>
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg"></span>
          </h2>

          {/* Mission Description */}
          <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
          {t("omnm")}          </p>

          {/* Mission Statement Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            
            {/* Card 1 */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <i className="fas fa-leaf text-green-500 text-4xl mb-3"></i>
              <h3 className="text-xl font-semibold text-gray-800"> {t("omfst")}  </h3>
              <p className="text-gray-600 text-sm mt-2">
              {t("omnfsp")} 

              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <i className="fas fa-users text-blue-500 text-4xl mb-3"></i>
              <h3 className="text-xl font-semibold text-gray-800">{t("om2ndt")} </h3>
              <p className="text-gray-600 text-sm mt-2">
              {t("om2ndp")}

              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <i className="fas fa-lightbulb text-yellow-500 text-4xl mb-3"></i>
              <h3 className="text-xl font-semibold text-gray-800">{t("om3dt")}</h3>
              <p className="text-gray-600 text-sm mt-2">
              {t("om3dp")}

              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
