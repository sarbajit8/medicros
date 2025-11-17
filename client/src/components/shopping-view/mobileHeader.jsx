import { X } from "lucide-react";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const MobileHeader = () => {
  return (
    <div className="lg:hidden bg-violet-600 text-white px-4 py-2 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-sm font-medium text-center sm:text-left">
          {/* <div className="flex items-center gap-2 justify-center">
            <HiOutlineMail className="text-yellow-300 w-5 h-5" />
            <span>medicrossremedies@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <HiOutlinePhone className="text-yellow-300 w-5 h-5" />
            <span>+91 8001339943</span>
          </div> */}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center sm:justify-end">
          <a
            href="https://facebook.com/medicrossremedies"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaFacebookF className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/medicrossremedies"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@medicrossremedies"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaYoutube className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/medicrossremedies/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/medicross2020"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-300 transition"
          >
            <X className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
