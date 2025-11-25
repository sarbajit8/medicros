import React from "react";
import logo from "../../assets/logor.png";
import { QRCodeCanvas } from "qrcode.react";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  const upiId = "medicrossremedies@cnrb";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Medicross Remedies&cu=INR`;

  return (
    <footer className="w-full bg-blue-400 text-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Logo & Socials */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start">
            <img className="w-[160px] mb-3" src={logo} alt="Medicross Logo" />
            <p className="text-sm text-center lg:text-left">
              Trusted across India with 100,000+ happy customers.
            </p>
            <p className="mt-2 font-bold">Follow Us On -</p>
            <div className="flex gap-2 mt-1 flex-wrap justify-center lg:justify-start items-center">
              <a href="https://www.instagram.com/medicrossremedies/" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.facebook.com/MedicrossRemediesOPC" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.youtube.com/@medicrossremedies" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.linkedin.com/in/medicrossremedies/" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="https://x.com/medicross2020" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <X className="w-4 h-4 text-white" />
              </a>
              <a href="https://g.co/kgs/jWXGW83" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <FaGoogle className="w-4 h-4 text-white" />
              </a>

              {/* ✅ QR code right after social icons */}
              <div className="p-1 bg-white rounded shadow ml-2">
                <QRCodeCanvas
                  value={upiUrl}
                  size={64}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Pages</h4>
            <ul className="text-sm space-y-1">
              <li><a href="./home" className="hover:underline">Home</a></li>
              <li><a href="./aboutus" className="hover:underline">About</a></li>
              <li><a href="./listing" className="hover:underline">Products</a></li>
              <li><a href="./contactus" className="hover:underline">Contact</a></li>
              <li><a href="./termsandconditions" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="./privacypolicy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="./refundpolicy" className="hover:underline">Refund Policy</a></li>

            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Products</h4>
            <ul className="text-sm space-y-1">
              <li><a href="./freeproducts" className="hover:underline">Free Schemes</a></li>
              <li><a href="./discount" className="hover:underline">Promo Offer</a></li>
              <li><a href="./margin/All" className="hover:underline">High Margin</a></li>
              <li><a href="./generic" className="hover:underline">Generic</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Resources</h4>
            <ul className="text-sm space-y-1">
              <li><a href="../employeelogin" className="hover:underline">Employee Login</a></li>
              <li><a href="./quickrequirement" className="hover:underline">Quick Order</a></li>
              <li><a href="./howtoregister" className="hover:underline">How To Register</a></li>
              <li><a href="./career" className="hover:underline">Career</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Contact</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>Muktinagar, SH 11, Raninagar, Berhampore, WB 742102</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+918001339943" className="hover:underline">+91 8001339943</a>
              </li>
             <li className="flex items-start gap-2">
  <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
  <a
    href="mailto:medicrossremedies@gmail.com"
    className="hover:underline break-words max-w-[140px] leading-snug text-sm"
  >
    medicrossremedies@gmail.com
  </a>
</li>

            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/30 mt-6 pt-4 text-center text-xs text-white/80">
          © 2025 Medicross Remedies* • Created by{" "}
          <a href="https://rasaap.in/" className="underline">Rasaap Info Solutions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
