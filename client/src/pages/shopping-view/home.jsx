import { Button } from "@/components/ui/button";

import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Milk,
  MoveRight,
  Pill,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  SprayCan,
  Syringe,
  Tablet,
  Tablets,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import img4 from '../../assets/rm4.jpg';
import img5 from '../../assets/pcd.jpg';

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { useToast } from "@/hooks/use-toast";
import About from "@/components/shopping-view/about";
import DirectorDesk from "@/components/shopping-view/directorDesk";
import WhatsAppIcon from "@/components/shopping-view/whatsappIcon";
import PopupCard from "@/components/shopping-view/popupCard";
import ArwIcon from "@/components/shopping-view/arwicon";
import CardSlider from "@/components/shopping-view/productslider";
import { fetchAllBrands } from "@/store/admin/brand-slice";
import { fetchAllCategorys } from "@/store/admin/category-slice";
import { sendOTP, verifyOTP } from "@/store/authm-slice";

const categoriesWithIcon = [
  { id: "tablets", label: "Tablets",icon: Tablets   },
      { id: "capsules", label: "Capsules",icon: Pill },
      { id: "syrups", label: "Syrups",icon: Milk   },
      { id: "injections", label: "Injections",icon: Syringe   },
      { id: "dropsandsprays", label: "Drops & Sprays",icon: SprayCan   },
];
const distributorWithIcon = [
  { id: "distributor", label: "Distributor",icon: Tablets   },
     
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt,img:img4  },
  { id: "adidas", label: "Adidas", icon: WashingMachine,img:img4  },
  { id: "puma", label: "Puma", icon: ShoppingBasket ,img:img4 },
  { id: "levi", label: "Levi's", icon: Airplay ,img:img4 },
  { id: "zara", label: "Zara", icon: Images,img:img4  },
  { id: "h&m", label: "H&M", icon: Heater },
 

];

import { useClerk,UserButton, useUser} from '@clerk/clerk-react'
import Sliderleft from "./sliderleft";
import { addQuickOrder } from "@/store/shop/quickorder-slice";
import ProductrSection from "@/components/shopping-view/rscroll";
import OtcSlider from "@/components/shopping-view/otcslider";
import ServiceSection from "@/components/shopping-view/serviceSection";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import SpecialProducts from "@/components/shopping-view/specialProducts";
import GenericSlider from "@/components/shopping-view/generic";
import EthicalSlider from "@/components/shopping-view/ethical";
import TestimonialSlider from "./testimonials";

function ShoppingHome() {
  const [popupCard, setPopupCard] = useState(true);
  const desktopSliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { brandList } = useSelector(state => state.adminBrand);
  const { categoryList } = useSelector(state => state.adminCategory);

  const [filterType, setFilterType] = useState("all");
      const { t } = useTranslation();

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useUser();
  // const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.name],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };
// REGISTER WITH OTP----------------------
const [userData, setUserData] = useState({
  name: "",
  email: "",
  mobile: "",
  otp: "",
});
const [step, setStep] = useState(1);

const handleChange = (e) => {
  setUserData({ ...userData, [e.target.id]: e.target.value });
};

const handleSendOTP = async () => {
  if (userData.name.trim() === "" || userData.email.trim() === "" || userData.mobile.trim() === "") {
    return  toast({
      title: `All fields are required`,
      variant: "destructive",
    }); 
  }
  // if (userData.mobile.length !== 10) return toast.error("Enter a valid 10-digit mobile number");

  const result = await dispatch(sendOTP(userData.mobile));
  if (result.error) {
    toast({
      title: `Failed to send OTP. Please try again.`,
      variant: "destructive",
    });
    
  } else {
    setStep(2);
  }
};

const handleVerifyOTP = async () => {
  if (userData.otp.trim().length !== 6) return  toast({
    title: `Enter a valid 6-digit OTP`,
    variant: "destructive",
  });
  

  const result = await dispatch(verifyOTP(userData));
  if (!result.error) {
    toast({
      title: `User registered successfully`,
    
    });
  }
};




//quickorder
 // State to handle form inputs
 const [userQuickOrderData, setUserQuickOrderData] = useState({
  name: "",
  shopname: "",
  phone: "",
  gst: "",
  pan: "",
  address: "",
});

// Handle Input Change
const handleQuickOrderChange = (e) => {
  setUserQuickOrderData({ ...userQuickOrderData, [e.target.id]: e.target.value });
};

// Handle Form Submission
const handleQuickOrderSubmit = (e) => {
  e.preventDefault();
  dispatch(addQuickOrder(userQuickOrderData));
  toast({
    title: `your order send successfully`,
   
  });
  setUserQuickOrderData({
    name: "",
    shopname: "",
    phone: "",
    gst: "",
    pan: "",
    address: "",
  }); // Reset form after submission
};

//quickorderend






  // Function to filter the brand list based on the selected type
  const filteredBrandList = brandList.filter((brandItem) => {
    // if (filterType === "all") return true; // Show all brands
    return brandItem?.type2 === "mostselling"; // Filter by type
  });

  const filteredBrandListByPopularrity = brandList.filter((brandItem) => {
    return brandItem.type === "populer"; 
  });

  // Function to handle dropdown selection
  // const handleFilterChange = (e) => {
  //   setFilterType(e.target.value);
  // };
  
    const [showAll, setShowAll] = useState(false); // State to toggle between showing 20 cards and all cards
    const [showAll1, setShowAll1] = useState(false); // State to toggle between showing 20 cards and all cards
    const [showAll2, setShowAll2] = useState(false); // State to toggle between showing 20 cards and all cards


    const displayedCategory = showAll2 ? categoryList : categoryList.slice(0, 8);


    // Determine the brands to display based on `showAll` state
    const displayedBrands = showAll ? filteredBrandList : filteredBrandList.slice(0,24);


    const displayedBrands1 = showAll1 ? filteredBrandListByPopularrity : filteredBrandListByPopularrity.slice(0,24);
  






  function handleAddtoCart(getCurrentProductId,getTotalStock) {

   
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }




    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // useEffect(() => {
  //   if (productDetails !== null) setOpenDetailsDialog(true);
  // }, [productDetails]);




  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);


 useEffect(() => {
        dispatch(fetchAllCategorys());
    }, [dispatch]);



  
  console.log(brandList,"brandsWithIcon");
  

  return (
    <div className="flex flex-col min-h-screen">






<div className="flex flex-col md:flex-row items-center justify-center bg-cyan-200 md:m-4 m-0 p-0 md:p-2 rounded-none md:rounded-lg shadow-lg"> 
  {/* Image Slider Section - Full Width on Mobile */} 
<div className="relative w-full md:w-3/4 h-[350px] md:h-[400px] rounded-none md:rounded-xl overflow-hidden shadow-2xl">
  {featureImageList && featureImageList.length > 0
    ? featureImageList.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image with Overlay Gradient */}
          <img
            src={slide?.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Dark Gradient Overlay for Better Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/40"></div>

          {/* Centered Text - Stays Within Image Bounds */}
          {slide?.text && (
            <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
              <div className="text-center max-w-[90%] md:max-w-[80%] lg:max-w-[70%] animate-fadeIn">
                <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight drop-shadow-2xl break-words">
                  {slide?.text}
                </h2>
                {/* Decorative Accent Line */}
                <div className="w-16 md:w-24 h-1 bg-cyan-400 rounded-full mt-4 md:mt-6 mx-auto shadow-lg"></div>
              </div>
            </div>
          )}
        </div>
      ))
    : null}

  {/* Left Navigation Button */}
  <Button
    variant="outline"
    size="icon"
    onClick={() =>
      setCurrentSlide(
        (prevSlide) =>
          (prevSlide - 1 + featureImageList.length) % featureImageList.length
      )
    }
    className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full shadow-2xl p-2 md:p-3 hover:scale-110 transition-all duration-300 border-2 border-white/50 backdrop-blur-sm z-10"
  >
    <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-cyan-600" />
  </Button>

  {/* Right Navigation Button */}
  <Button
    variant="outline"
    size="icon"
    onClick={() =>
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
    }
    className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full shadow-2xl p-2 md:p-3 hover:scale-110 transition-all duration-300 border-2 border-white/50 backdrop-blur-sm z-10"
  >
    <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-cyan-600" />
  </Button>

  {/* Slide Indicators/Dots */}
  <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
    {featureImageList.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`transition-all duration-300 rounded-full ${
          index === currentSlide
            ? "w-8 md:w-10 h-2 md:h-3 bg-cyan-400 shadow-lg"
            : "w-2 md:w-3 h-2 md:h-3 bg-white/60 hover:bg-white/80"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      ></button>
    ))}
  </div>
</div>



  {/* Form Section - No padding on mobile */} 
  <div className="relative w-full bg-cyan-400 md:w-1/4 md:p-2 p-0 h-[350px] md:h-[400px] overflow-hidden shadow-lg"> 
    <PopupCard/> 
  </div> 
</div>











{/* <Sliderleft/> */}

<ProductrSection/>



{/* //banner2 */}
{/* <div className="my-4 mx-2 md:mx-auto w-[100%] max-w-screen-xl relative h-[300px] md:h-[350px] rounded-none md:rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
  {featureImageList && featureImageList.length > 0
    ? featureImageList.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide?.text && (
            <div
              className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-0 text-2xl md:text-4xl font-extrabold rounded-md shadow-lg w-[90%] max-w-[800px] text-center break-words ${
                slide?.text ? "bg-cyan-500/60 backdrop-blur-sm" : "bg-transparent"
              }`}
            >
              {slide?.text}
            </div>
          )}

          <img
            src={slide?.image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))
    : null}

  <button
    aria-label="Previous slide"
    onClick={() =>
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
      )
    }
    className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/95 text-blue-700 rounded-full p-2 shadow-md hover:scale-105 transition z-50"
  >
    <ChevronLeftIcon className="w-6 h-6" />
  </button>

  <button
    aria-label="Next slide"
    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
    className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/95 text-blue-700 rounded-full p-2 shadow-md hover:scale-105 transition z-50"
  >
    <ChevronRightIcon className="w-6 h-6" />
  </button>
</div>  */}




<ServiceSection/>

<div className="py-16">
   {/* SHOP BY CATEGORY SECTION */}
      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    
    {/* Beautiful Animated Heading */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-left">
      
      <h2 className="text-4xl font-extrabold tracking-wide text-gray-900 relative">
        <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
         {t("ec")}
        </span>
      </h2>

      {/* View More Button (Responsive & Professional) */}
      <button
  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg hover:ring-4 hover:ring-indigo-400 mt-4 md:mt-0 font-medium"
  onClick={() => setShowAll2((prevState) => !prevState)}
>
{showAll2 ? t("sl") : t("vm")}
</button>

    </div>

    {/* Category Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 animate-fade-in-up">
  {displayedCategory.map((categoryItem, index) => (
    <Card
      key={categoryItem.id}
      onClick={() => handleNavigateToListingPage(categoryItem, "category")}
      className="cursor-pointer shadow-xl bg-white/60 backdrop-blur-xl border border-gray-300 hover:shadow-2xl hover:-translate-y-2 transition-all rounded-2xl overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="flex flex-col items-center justify-center aspect-square p-4">
        <img
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110 rounded-lg"
          src={categoryItem.image}
          alt={categoryItem.name}
        />
        <div className="mt-3 text-center">
          <span className="text-lg font-semibold text-gray-900 drop-shadow-md uppercase">
            {categoryItem.name}
          </span>
        </div>
      </CardContent>
    </Card>
  ))}
</div>




  </div>
</section>
</div>


<SpecialProducts/>


<div className="py-16">
      
   


      {/* SHOP BY  MOST SELLING  BRAND SECTION */}
 <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    
    {/* Heading Section */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
      
      <h2 className="text-4xl font-extrabold tracking-wide text-gray-900 relative">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
          {t("tsbr")}
        </span>
      </h2>

      {/* Select & View More Button */}
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
        {/* <select
          value={filterType}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-md mt-4 sm:mt-0"
        >
          <option value="all">All</option>
          <option value="mostselling">Most Selling Brand</option>
          <option value="populer">Popular Brand</option>
        </select> */}
        <button
          onClick={() => setShowAll((prevState) => !prevState)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg hover:ring-4 hover:ring-purple-400"
        >
          {/* {showAll ? "Show Less" : "View More"} */}
          {showAll ? t("sl") : t("vm")}
        </button>
      </div>
    </div>

    {/* Brand List */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 animate-fade-in-up  ">
    {[...displayedBrands].reverse().map((brandItem, index) => (
  <Card
    key={brandItem.name}
    onClick={() => handleNavigateToListingPage(brandItem, "brand")}
    className="cursor-pointer shadow-lg bg-white/40 backdrop-blur-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all rounded-xl animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <CardContent className="flex flex-col items-center h-[120px] justify-center p-1">
      <div className="flex items-center justify-center">
        <img
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 transform hover:scale-105"
          src={brandItem.image}
          alt={brandItem.name}
        />
      </div>
    </CardContent>
  </Card>
))}

    </div>
  </div>
  </section>
      {/* SHOP BY  MOST POPULER  BRAND SECTION */}
      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    
    {/* Heading Section */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
      
      <h2 className="text-4xl font-extrabold tracking-wide text-gray-900 relative">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
        {t("mpbr")}
        </span>
      </h2>

      {/* Select & View More Button */}
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
        {/* <select
          value={filterType}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-md mt-4 sm:mt-0"
        >
          <option value="all">All</option>
          <option value="mostselling">Most Selling Brand</option>
          <option value="populer">Popular Brand</option>
        </select> */}
        <button
          onClick={() => setShowAll1((prevState) => !prevState)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg hover:ring-4 hover:ring-purple-400"
        >
          {/* {showAll1 ? "Show Less" : "View More"} */}
          {showAll1 ? t("sl") : t("vm")}

        </button>
      </div>
    </div>

    {/* Brand List */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 animate-fade-in-up">
    {[...displayedBrands1].reverse().map((brandItem, index) => (
  <Card
    key={brandItem.name}
    onClick={() => handleNavigateToListingPage(brandItem, "brand")}
    className="cursor-pointer shadow-lg bg-white/40 backdrop-blur-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all rounded-xl animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <CardContent className="flex flex-col items-center h-[120px] justify-center p-1">
      <div className="flex items-center justify-center">
        <img
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 transform hover:scale-105"
          src={brandItem.image}
          alt={brandItem.name}
        />
      </div>
    </CardContent>
  </Card>
))}

    </div>
  </div>
  </section>






</div>

{/* slider */}
<OtcSlider/>

<GenericSlider/>
<EthicalSlider/>


  {/* distributor section     */}
  <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mb-12 px-4">
  {/* Distributor Section - Left */}
  <section
    className="relative w-full md:w-1/2 rounded-3xl shadow-2xl overflow-hidden bg-cover bg-center transition-transform duration-500 ease-in-out transform group hover:scale-105 hover:shadow-3xl"
    style={{ backgroundImage: `url(${img4})` }} // Distributor background
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600 opacity-70 group-hover:opacity-80 transition-all duration-500 rounded-3xl"></div>

    <div className="relative p-10 sm:p-16 text-center z-10">
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-200 animate-fade-in">
        🔹 {t("cyfd")} 🔹
      </p>
      <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white leading-tight animate-fade-in-up">
        {t("oftd")}
      </h2>
      <a
        href={"/shop/distributors"}
        className="mt-8 inline-block rounded-full bg-blue-700 hover:bg-blue-500 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-blue-400"
      >
        {t("on")}
      </a>
    </div>
    <div className="absolute top-10 left-10 w-16 h-16 bg-blue-400 opacity-30 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-500 opacity-30 rounded-full blur-2xl animate-pulse"></div>
  </section>

  {/* PCD Manufacturer Section - Right */}
  <section
    className="relative w-full md:w-1/2 rounded-3xl shadow-2xl overflow-hidden bg-cover bg-center transition-transform duration-500 ease-in-out transform group hover:scale-105 hover:shadow-3xl"
    style={{ backgroundImage: `url(${img5})` }} // Change to another image if desired
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-700 opacity-70 group-hover:opacity-80 transition-all duration-500 rounded-3xl"></div>

    <div className="relative p-10 sm:p-16 text-center z-10">
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-purple-200 animate-fade-in">
        🔹 {t("cyfp")} 🔹
      </p>
      <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white leading-tight animate-fade-in-up">
        {t("buyfrompcd")}
      </h2>
      <a
        href={"/shop/pcd-manufacturer"}
        className="mt-8 inline-block rounded-full bg-purple-800 hover:bg-purple-600 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-purple-400"
      >
        {t("on")}
      </a>
    </div>
    <div className="absolute top-10 left-10 w-16 h-16 bg-purple-400 opacity-30 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-700 opacity-30 rounded-full blur-2xl animate-pulse"></div>
  </section>
</div>


{/* //feature products */}
<div className="m-8">
      <div className="container mx-auto bg-gradient-to-r from-blue-500 to-indigo-400 rounded-lg p-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white pt-2 mb-3">Feature Products</h2>

        {/* Desktop Slider */}
        <div className="hidden md:block relative">
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-indigo-800 text-white rounded-full p-3 shadow hover:bg-indigo-600 z-10"
            onClick={() => desktopSliderRef.current.slickPrev()}
          >
            &lt;
          </button>

          <div className="py-6">
            <Slider ref={desktopSliderRef} {...desktopSettings}>
              {productList.map((product) => (
                <div key={product._id} className="p-2">
                  <div className="bg-white rounded-lg shadow-lg h-full">
                    <Link  to={`../productdetailpage/${product?._id}`}>
                      <img
                        src={product.image || img}
                        alt={product.title}
                        className="w-full h-[300px] object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                      <div className="flex justify-between text-sm font-bold text-indigo-600">
                        <span>₹{product.salePrice || product.price}</span>
                        {product.salePrice > 0 && (
                          <span className="line-through text-gray-500">₹{product.price}</span>
                        )}
                      </div>
                      {/* <Button
                           onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                        className="mt-2 bg-indigo-600 text-white w-full hover:bg-indigo-700"
                      >
                        Add to Cart 🛒
                      </Button> */}
                      {user?.id ? (
                                           <Button
                                           onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                                           className="mt-2 bg-indigo-600 text-white text-xs py-2 px-3 w-full hover:bg-indigo-700"
                                           >
                                              Add to Cart 🛒
                                           </Button>
                                         ) : (
                                           <Button
                                             onClick={() => toast({ title: "Please log in to add products to your cart." })}
                                             className="mt-2 bg-indigo-600 text-white text-xs py-2 px-3 w-full hover:bg-indigo-700"
                                             >
                                             Add to Cart 🛒
                                           </Button>
                                         )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-800 text-white rounded-full p-3 shadow hover:bg-indigo-600 z-10"
            onClick={() => desktopSliderRef.current.slickNext()}
          >
            &gt;
          </button>
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden">
          <Slider ref={mobileSliderRef} {...mobileSettings}>
            {productList.map((product) => (
              <div key={product._id} className="p-2">
                <div className="bg-white rounded-lg shadow-md">
                  <Link to={`../productdetailpage/${product?._id}`}>
                    <img
                      src={product.image || img}
                      alt={product.title}
                      className="w-full h-[150px] object-cover"
                    />
                  </Link>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-800 truncate">{product.title}</h3>
                    <div className="text-sm text-indigo-600 font-bold flex flex-col justify-between">
                      <span>₹{product.salePrice || product.price}</span>
                      {product.salePrice > 0 && (
                        <span className="line-through text-gray-400">₹{product.price}</span>
                      )}
                    </div>
                    {/* <Button
                        onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                      className="mt-2 bg-indigo-600 text-white text-xs py-2 px-3 w-full hover:bg-indigo-700"
                    >
                      Add 🛒
                    </Button> */}

                        {user?.id ? (
                                           <Button
                                           onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                                           className="mt-2 bg-indigo-600 text-white text-xs py-2 px-3 w-full hover:bg-indigo-700"
                                           >
                                             Add🛒
                                           </Button>
                                         ) : (
                                           <Button
                                             onClick={() => toast({ title: "Please log in to add products to your cart." })}
                                             className="mt-2 bg-indigo-600 text-white text-xs py-2 px-3 w-full hover:bg-indigo-700"
                                             >
                                             Add🛒
                                           </Button>
                                         )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>


  

   

<div> 
  <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gray-900"> 
    <div className="py-16 px-6 mx-auto max-w-screen-xl lg:py-24 lg:px-8"> 
      {/* Centered Content Section */} 
      <div className="text-center max-w-3xl mx-auto"> 
        <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-blue-900 dark:text-white"> 
          {t("abu")} 
        </h2> 
        <p className="mb-6 text-lg leading-relaxed md:text-xl text-gray-700 dark:text-gray-300"> 
          {t("aboutcntt")}
        </p> 
        <div className="mt-8"> 
        <a href="./aboutus">
                   <Button className="align-center bg-blue-600 hover:bg-blue-500 ">Lern More</Button>

                  </a>
        </div> 
      </div> 
    </div> 
  </section> 
</div>


<TestimonialSlider/>

      <DirectorDesk/>

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
          {t("omnmm")}   
               </p>
                <div className="w-full mt-4">
                  <a href="./aboutus">
                   <Button className="align-center bg-blue-600 hover:bg-blue-500 ">Lern More</Button>

                  </a>

            </div> 
          {/* Mission Statement Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            
{/*  
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <i className="fas fa-leaf text-green-500 text-4xl mb-3"></i>
              <h3 className="text-xl font-semibold text-gray-800"> {t("omfst")}  </h3>
              <p className="text-gray-600 text-sm mt-2">
              {t("omnfsp")} 

              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <i className="fas fa-users text-blue-500 text-4xl mb-3"></i>
              <h3 className="text-xl font-semibold text-gray-800">{t("om2ndt")} </h3>
              <p className="text-gray-600 text-sm mt-2">
              {t("om2ndp")}

              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <i className="fas fa-lightbulb text-yellow-500 text-4xl mb-3"></i>
              <h3 className="text-xl font-semibold text-gray-800">{t("om3dt")}</h3>
              <p className="text-gray-600 text-sm mt-2">
              {t("om3dp")}

              </p>
            </div> */}

          </div>
        </div>
      </section>


 
      {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
        {/* {
         popupCard===true?(
         <div
       
           href="" // Replace with your WhatsApp number
          target="_blank"
           rel="noopener noreferrer"
           className="fixed bottom-21  right-16  shadow-lg p-2 hover:shadow-xl  duration-200 w-[300px]"
         >
           <PopupCard setPopupCard={setPopupCard} />
         </div>):(
           <button
           onClick={()=>setPopupCard(true)}
        // Replace with your WhatsApp number
          target="_blank"
           rel="noopener noreferrer"
           className="fixed bottom-21  right-4 bg-white rounded-full shadow-lg p-2 hover:shadow-xl transition-shadow duration-200 -z-100"
         >
           <ArwIcon  />
         </button>
         

         )
         } */}


          <a
           href="https://wa.me/+918001339943" // Replace with your WhatsApp number
          target="_blank"
           rel="noopener noreferrer"
           className="fixed bottom-4  right-4 bg-white rounded-full shadow-lg p-2 hover:shadow-xl transition-shadow duration-200 -z-100"
         >
           <WhatsAppIcon />
         </a>
         <a
           href="tel:+918001339943" // Replace with your mobile number
          target="_blank"
           rel="noopener noreferrer"
           className="fixed bottom-4  left-4 bg-white rounded-full shadow-lg p-2 hover:shadow-xl transition-shadow duration-200 -z-100"
         >
          <img className="w-10" src="https://static.vecteezy.com/system/resources/previews/014/441/078/original/phone-call-icon-design-in-blue-circle-png.png"></img>
         </a>

      
  
    </div>
    
  );
}

export default ShoppingHome;
