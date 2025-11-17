import React from "react";
import logo from "../../assets/fv.mp4"; // Brand logo

const HowtoRegister = () => {
  return (
    <div>
    <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-16 px-6 text-white text-center">
      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
        🎥 How It Works
      </h2>
      
      {/* Video Container */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          {/* Embed YouTube or MP4 Video */}
          <iframe
            className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
            src={`${logo}`}
            title="Introduction Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
   
               </div>
    
  );
};




export default HowtoRegister