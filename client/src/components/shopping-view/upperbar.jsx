import { X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXRay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Upperbar = () => {

  const { t } = useTranslation();
  
  return (
<div className="hidden lg:block w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white text-sm py-2 shadow-md">
<div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 h-auto sm:h-10">
        
        {/* Special Offer Message - Left on small screens, Centered on large */}
        <div className="text-center sm:text-left font-semibold tracking-wide animate-fade-in text-white">
  <strong className="text-yellow-400">{t("bpah")} </strong>!  
  {t("eybwu")}
</div>



        {/* Social Media Icons - Right on larger screens, Below on small screens */}
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="https://www.facebook.com/MedicrossRemediesOPC?notif_id=1730201188934163&notif_t=profile_plus_admin_invite&ref=notif" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaFacebookF size={18} />
          </a>
          <a href="https://www.instagram.com/medicrossremedies/?next=%2F" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram size={18} />
          </a>
          <Link to="https://www.youtube.com/@medicrossremedies" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <FaYoutube size={18} />
          </Link>
          <Link to="https://www.linkedin.com/in/medicrossremedies/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <FaLinkedinIn size={18} />
          </Link>
          <Link to="https://x.com/medicross2020" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <X size={18} />
          </Link>
          {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedinIn size={18} />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Upperbar;
