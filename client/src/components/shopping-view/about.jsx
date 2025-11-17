import React from 'react';
import abt1 from "../../assets/abt1.png"
import abt2 from "../../assets/abt2.png"
import { useTranslation } from 'react-i18next';


const About = () => {

      const { t } = useTranslation();
  
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gray-900">
        <div className="gap-16 items-center py-16 px-6 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-24 lg:px-8">
          {/* Content Section */}
          <div className="text-gray-700 dark:text-gray-300">
            <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-blue-900 dark:text-white">
             {t("abu")}
            </h2>
            <p className="mb-6 text-lg leading-relaxed md:text-xl">
             {t("aboutcnt")}        </p>
            {/* <p className="text-lg leading-relaxed md:text-xl">
              With a team of creative thinkers and problem solvers, we focus on delivering meaningful results that align with your vision. Let us take your ideas and turn them into reality.
            </p> */}
            <div className="mt-8">
              {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                Learn More
              </button> */}
            </div>
          </div>

          {/* Image Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <img
                className="w-full rounded-xl shadow-lg"
                src={abt1}
                // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="Office Content 1"
              />
            </div>
            <div className="mt-6 transform hover:scale-105 transition-transform duration-300">
              <img
                className="w-full rounded-xl shadow-lg"
                src={abt2}
                // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="Office Content 2"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
