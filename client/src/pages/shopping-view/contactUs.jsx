import React from 'react';
import logo from '../../assets/mlogo.png';

const ContactUs = () => {
  return (
   <div>
  <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md flex items-center justify-between p-6">
    <div className="text-center md:text-left">
      <h1 className="text-4xl font-bold text-white animate-fade-in">📞 Contact Us</h1>
      <p className="text-white mt-1">We’re here to help! Get in touch with us.</p>
    </div>
  </header>

  <section className="mb-32">
  {/* Google Map */}
  <div id="map" className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.328809681751!2d88.2971889!3d24.125088200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f97d594e18cf55%3A0x500e081962f49dd7!2sMEDICROSS%20REMEDIES!5e0!3m2!1sen!2sin!4v1741584556891!5m2!1sen!2sin"
      width="100%"
      height="480"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>

  {/* Contact Info Block */}
  <div className="container px-6 md:px-12">
    <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
      <div className="flex flex-wrap align-middle">
        <div className="w-full shrink-0 grow-0 basis-auto">
          <div className="flex flex-wrap">

            {/* Mobile & Email side-by-side */}
            <div className="flex flex-wrap md:flex-nowrap w-full mb-12 px-3 gap-6">
              {/* Mobile */}
              <div className="w-full md:w-1/2">
                <div className="flex h-full bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-violet-400 p-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Mobile</p>
                    <p className="text-neutral-500">+91 8001339943</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="w-full md:w-1/2">
                <div className="flex h-full bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-violet-400 p-4 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75l7.5 4.5 7.5-4.5M4.5 18h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v9A2.25 2.25 0 004.5 18z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Email</p>
                    <p className="text-neutral-500 break-all">medicrossremedies@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-3">

              {/* Head Office */}
              <div className="flex flex-col items-start gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="inline-block rounded-md bg-blue-100 p-4 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M7 13V7a4 4 0 018 0v6" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Head Office</p>
                  <p className="text-sm text-gray-600 mt-1">RK-32, Mohan Garden, New Delhi-110059</p>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="flex flex-col items-start gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="inline-block rounded-md bg-green-100 p-4 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a1 1 0 011-1h2a1 1 0 011 1v1h3a2 2 0 012 2v11a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Corporate Office</p>
                  <p className="text-sm text-gray-600 mt-1">226/3, Chaltia, Berhampore, Murshidabad, 742407</p>
                </div>
              </div>

              {/* Branch Office */}
              <div className="flex flex-col items-start gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="inline-block rounded-md bg-purple-100 p-4 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M5 14h14a1 1 0 011 1v4H4v-4a1 1 0 011-1zm1 0v-4h12v4" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Branch Office</p>
                  <p className="text-sm text-gray-600 mt-1">B.B. Sen Road, Berhampore, Murshidabad, 742103</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>



</div>

    
  );
};



export default ContactUs;
