import React from "react";
import img1 from "../../assets/rm4.jpg";
import img2 from "../../assets/sm1.jpg";
import img3 from "../../assets/sm2.jpg";
import img4 from "../../assets/sm3.jpg";
import img5 from "../../assets/sm4.jpg";
import img6 from "../../assets/sm5.jpg";
import img8 from "../../assets/pcd.png";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServiceSection = () => {
  const { t } = useTranslation();

  const services = [
    { to: "/shop/freeproducts", img: img4, label: t("freesch") },
    { to: "/shop/margin/All", img: img3, label: t("hmr") },
    { to: "/shop/generic", img: img2, label: t("gmed") },
    { to: "../discount", img: img6, label: t("pof") },
    { to: "../distributors", img: img5, label: t("fd") },
    { to: "../pcd-manufacturer", img: img8, label: t("pcm") },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6">

      {/* === Desktop / Large Screen Section === */}
      <div className="hidden md:flex flex-col rounded-lg shadow-xl items-center py-12 px-6 border-2 border-[#0092B5]">
        <div className="w-full p-6">
          <h2 className="text-4xl font-extrabold text-[#0092B5] drop-shadow-lg text-center md:text-left mb-8">
            {t("oss")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {services.map((item, idx) => (
              <Link key={idx} to={item.to}>
                <div className="flex flex-col items-center p-4 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#0092B5] hover:shadow-xl transition-all duration-300 h-full min-h-[230px]">
                  <img src={item.img} alt="" className="w-24 h-24 rounded-full border-4 border-[#0092B5] mb-4" />
                  <h3 className="text-sm md:text-base font-bold text-[#0092B5] text-center">{item.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* === Mobile View Section === */}
      <div className="block md:hidden pt-8 pb-12">
        <h2 className="text-3xl font-extrabold text-[#0092B5] drop-shadow-md text-center mb-6">
          {t("oss")}
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-1 pb-1">
          {services.map((item, idx) => (
            <Link key={idx} to={item.to} className="min-w-[160px] flex-shrink-0">
              <div className="flex flex-col items-center p-3 rounded-xl shadow-md border-2 border-gray-200 hover:border-[#0092B5] hover:shadow-lg transition-all duration-300">
                <img src={item.img} alt="" className="w-20 h-20 rounded-full border-4 border-[#0092B5] mb-3" />
                <h3 className="text-sm font-semibold text-[#0092B5] text-center leading-tight">{item.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;