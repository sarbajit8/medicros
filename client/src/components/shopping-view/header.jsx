import categoryImage from '../../assets/mdd.png'

import {
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import logo from "../../assets/logor.png";
import { useEffect, useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "./changeLanguage";
import UserCartWrapper from "./cart-wrapper";
import {
  fetchCartItems,
} from "@/store/shop/cart-slice";
import {
  fetchDistributorCartItems,
} from "@/store/shop/distributocart-slice";
import {
  fetchPcdCartItems,
} from "@/store/shop/pcdCart-slice";

function MenuItems({ setIsSheetOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const { categoryList } = useSelector((state) => state.adminCategory);
  const { user } = useUser();
  const { t } = useTranslation();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.name],
    };
    setIsMobileDropdownOpen(false);
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
    if (setIsSheetOpen) setIsSheetOpen(false);
  }

  function handleNavigate(path) {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("filters", JSON.stringify(null));
    navigate(path);
    if (setIsSheetOpen) setIsSheetOpen(false);
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1 px-6 py-0">
        {/* Mega Dropdown */}
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-4 py-3 text-white font-semibold hover:bg-white/10 rounded-lg transition-all duration-300"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Menu className="w-5 h-5" />
            <span>{t("svc")}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute left-0 mt-2 w-[700px] bg-white shadow-2xl border border-gray-200 rounded-xl p-6 flex z-50"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 w-3/4">
                {categoryList.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 py-2 px-3 hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg cursor-pointer transition-all duration-200 group"
                    onClick={() =>
                      handleNavigateToListingPage(category, "category")
                    }
                  >
                    <div className="w-2 h-2 bg-[#0092B5] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <b className='text-gray-800 uppercase text-xs group-hover:text-[#0092B5]'> {category?.name}</b>
                  </div>
                ))}
              </div>
              <div className="w-1/4 flex justify-center items-center bg-gradient-to-br from-[#0092B5]/10 to-[#0092B5]/5 rounded-xl p-4">
                <img
                  src={categoryImage}
                  alt="Category"
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <Label
          onClick={() => handleNavigate("../shop/home")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("Home")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/listing")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("Products")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/gallery")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("Gallery")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/aboutus")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("AboutUs")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/distributors")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("Distributors")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/pcd-manufacturer")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("pcm")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/career")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("cr")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/contactus")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("ContactUs")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        <Label
          onClick={() => handleNavigate("../shop/search")}
          className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
        >
          {t("Search")}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
        </Label>

        {user?.id && (
          <Label
            onClick={() => handleNavigate("../shop/account")}
            className="px-4 py-3 text-white font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
          >
            {t("MyOrders")}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300"></span>
          </Label>
        )}

        <ChangeLanguage />
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white p-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#0092B5] scrollbar-track-blue-200 space-y-2 rounded-lg">
        {/* Category Dropdown Button */}
        <div>
          <button
            className="w-full text-left flex items-center justify-between gap-2 p-3 text-[#0092B5] font-semibold bg-[#0092B5]/10 hover:bg-[#0092B5]/20 rounded-lg transition-all"
            onClick={() => setIsMobileDropdownOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Menu className="w-5 h-5" />
              <span>{t("svc")}</span>
            </div>
            <ChevronDown className="w-4 h-4 " />
          </button>
        </div>

        {/* Category Modal for Mobile */}
        {isMobileDropdownOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative" style={{ animation: 'slideUp 0.3s ease-out' }}>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-all"
                onClick={() => setIsMobileDropdownOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-[#0092B5]">
                {t("svc")}
              </h2>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {categoryList.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#0092B5]/10 cursor-pointer transition-all group"
                    onClick={() =>
                      handleNavigateToListingPage(category, "category")
                    }
                  >
                    <div className="w-2 h-2 bg-[#0092B5] rounded-full"></div>
                    <span className="text-gray-700 font-medium group-hover:text-[#0092B5]">{category?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Nav Links (Static) */}
        <div>
          <Label
            onClick={() => handleNavigate("../shop/home")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("Home")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/listing")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("Products")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/gallery")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("Gallery")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/aboutus")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("AboutUs")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/distributors")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("Distributors")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/pcd-manufacturer")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("pcm")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/career")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("cr")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/contactus")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("ContactUs")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        <div>
          <Label
            onClick={() => handleNavigate("../shop/search")}
            className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
          >
            {t("Search")}
          </Label>
          <hr className="border-t border-gray-300" />
        </div>

        {user?.id && (
          <>
            <Label
              onClick={() => handleNavigate("../shop/account")}
              className="block p-3 text-gray-700 font-medium cursor-pointer hover:bg-[#0092B5]/10 hover:text-[#0092B5] rounded-lg transition-all"
            >
              {t("MyOrders")}
            </Label>
            <hr className="border-t border-gray-300" />
          </>
        )}

        <ChangeLanguage  />
      </nav>
    </>
  );
}

function HeaderRightContent() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const { distributorCartItems } = useSelector(
    (state) => state.shopDistributorCart
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { pcdCartItems } = useSelector((state) => state.shopPcdCart);

  const [openCartSheet, setOpenCartSheet] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
      dispatch(fetchDistributorCartItems(user.id));
      dispatch(fetchPcdCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  const totalCartItems = 
    (cartItems?.items?.length || 0) + 
    (distributorCartItems?.items?.length || 0) + 
    (pcdCartItems?.items?.length || 0);

  return (
    <div className="flex items-center flex-row gap-3">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative bg-white/10 hover:bg-white/20 border-none text-white p-3 rounded-lg transition-all duration-300 hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
          distributorCartItems={
            distributorCartItems?.items?.length > 0
              ? distributorCartItems.items
              : []
          }
          pcdCartItems={pcdCartItems?.items?.length > 0 ? pcdCartItems.items : []}
        />
      </Sheet>
    </div>
  );
}

function ShoppingHeader() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className={`bg-gradient-to-r from-[#0092B5] to-[#00b4d8] transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-between px-4 md:px-6">
          <Link to="/shop/home" className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-300">
            <img className={`transition-all duration-300 ${isScrolled ? 'w-[80px]' : 'w-[80px]'}`} src={logo} alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <MenuItems />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block gap-2">
              <HeaderRightContent />
            </div>

            <div className="gap-2">
              {/* Mobile Sheet */}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden bg-white/10 hover:bg-white/20 border-none text-white p-3 rounded-lg transition-all"
                    onClick={() => setIsSheetOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs bg-gradient-to-b from-[#0092B5] to-[#00b4d8] overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <img className="w-[80px]" src={logo} alt="Logo" />
                      <button
                        onClick={() => setIsSheetOpen(false)}
                        className="text-white hover:bg-white/10 p-2 rounded-lg transition-all"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <MenuItems setIsSheetOpen={setIsSheetOpen} />
                    <HeaderRightContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="gap-2">
              {user ? (
                <UserButton
                  appearance={{
                    elements: { userButtonPopoverFooter: "hidden", Orders: "shop/acount" },
                  }}
                />
              ) : (
                <Button
                  onClick={openSignIn}
                  className="bg-white text-[#0092B5] hover:bg-gray-100 font-semibold px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
}

export default ShoppingHeader;