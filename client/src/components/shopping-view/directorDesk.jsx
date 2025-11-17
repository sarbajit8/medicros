import React from "react";
import directorimg from "../../assets/director.jpg"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const DirectorDesk = () => {
  const { t } = useTranslation();
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gray-900 py-12">
        <div className="max-w-6xl px-6 mx-auto">
          <h1 className=" text-4xl tracking-tight font-extrabold text-blue-900 dark:text-white text-center mb-10">
          {t("dd")} 
          </h1>
          <main className="relative flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
            {/* Director Image */}
            <div className="w-full md:w-2/5 flex justify-center items-center p-6">
              <img
                className="object-cover rounded-2xl shadow-lg md:h-[28rem] md:w-80 lg:h-[30rem] lg:w-[22rem]"
                src={directorimg}
                alt="Director"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 w-full md:w-3/5">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {t("dn")} 
              </h2>
              <p className="text-blue-600 font-medium mb-6">
              {t("dceo")} 
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t("dds1")} <br/>
              {t("dds2")} <br/>
              {t("dds3")} 
              </p>
              {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                <Link to={"../aboutus"}>Learn More</Link>
              </button> */}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default DirectorDesk;
