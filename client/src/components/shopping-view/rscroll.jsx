import { useState } from "react";
import CardSlider from "./productslider";
import PopupCard from "./popupCard";
import { useDispatch } from "react-redux";
import { addQuickOrder } from "@/store/shop/quickorder-slice";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { addNotification } from "@/store/admin/notification-slice";

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState("medicines");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

      const { t } = useTranslation();

//quickorder
 // State to handle form inputs
 const [userQuickOrderData, setUserQuickOrderData] = useState({
  name: "",
  shopname: "",
  phone: "",
  gst: "",
  dl: "",
  address: "",
});
const dispatch = useDispatch();

// Handle Input Change
const handleQuickOrderChange = (e) => {
  setUserQuickOrderData({ 
    ...userQuickOrderData, 
    [e.target.name]: e.target.value // ✅ Change from id to name
  });
};

// Handle Form Submission
const handleQuickOrderSubmit = (e) => {
  e.preventDefault();

  // Check if the phone number contains only numbers
  const phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(userQuickOrderData.phone)) {
    toast({
      title: "Invalid Phone Number!",
      description: "Phone number must contain only digits.",
      variant: "destructive",
    });
    return; // Stop form submission
  }

  // Dispatch the quick order if validation passes
  dispatch(addQuickOrder(userQuickOrderData));
  toast({
    title: "Your order has been sent successfully! 🎉",
  });

  // Reset form after submission
  setUserQuickOrderData({
    name: "",
    shopname: "",
    phone: "",
    gst: "",
    dl: "",
    address: "",
    requirement: "",
  });


   const data = {
         title: "Requiremment Alert ",
         description: "New Requiremment added",
       };
     
       dispatch(addNotification(data)).then((res) => {
         if (res?.meta?.requestStatus === "fulfilled") {
                   console.error("Requiremment Added");
  
         } else {
           console.error("Notification failed:", res?.payload);
         }
       });



};

//quickorderend
  
  
  const products = [
    { name: "Zafoli T 10 Tablets", price: "₹153.57", oldPrice: "₹215", image: "img1.jpg" },
    { name: "Bestozyme Paediatric Syrup", price: "₹106.5", oldPrice: "₹149.1", image: "img2.jpg" },
    { name: "Kbion G 10 Capsules", price: "₹94.92", oldPrice: "₹140", image: "img3.jpg" },
    { name: "Inmozek 15 Tablets", price: "₹254.24", oldPrice: "₹375", image: "img4.jpg" },
  ];
  
  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  // };
  
  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  // };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow-lg">
      {/* Left Section - New Arrivals with Carousel */}
      <div className="w-full md:w-2/3">
       <CardSlider/>
      </div>
      
      {/* Right Section - Product Request Form */}
      <div className="w-full md:w-1/3 bg-cyan-500 p-6 rounded-lg shadow-md">
  {/* Desktop Form */}
  <div className="hidden md:block">
    <form onSubmit={handleQuickOrderSubmit} className="bg-cyan-500 p-4 rounded-lg max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl text-center font-extrabold tracking-wide text-gray-900 relative">
        <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
          {t("sr")}
        </span>
      </h2>

      <div>
        <input
          type="text"
          name="name"
          value={userQuickOrderData.name}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition"
          placeholder="Full Name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="shopname"
          value={userQuickOrderData.shopname}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition"
          placeholder="Shop Name"
          required
        />
        <input
          type="tel"
          name="phone"
          value={userQuickOrderData.phone}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition"
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="gst"
          value={userQuickOrderData.gst}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition"
          placeholder="GST / PAN Number"
          required
        />
        <input
          type="text"
          name="dl"
          value={userQuickOrderData.dl}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition"
          placeholder="DL / MRD No."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <textarea
          name="address"
          value={userQuickOrderData.address}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition h-24"
          placeholder="Enter your address..."
          required
        ></textarea>
        <textarea
          name="requirement"
          value={userQuickOrderData.requirement}
          onChange={handleQuickOrderChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition h-24"
          placeholder="Enter your requirement..."
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold rounded-lg py-3 shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-1"
      >
        {t("sr")}
      </button>
    </form>
  </div>

  {/* Mobile Form */}
  <div className="block md:hidden">
    <form onSubmit={handleQuickOrderSubmit} className="bg-cyan-500 p-3 rounded-lg space-y-2">
      <h2 className="text-xl text-center font-bold text-white mb-2">
        {t("sr")}
      </h2>

      <input
        type="text"
        name="name"
        value={userQuickOrderData.name}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Full Name"
        required
      />

      <input
        type="text"
        name="shopname"
        value={userQuickOrderData.shopname}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Shop Name"
        required
      />

      <input
        type="tel"
        name="phone"
        value={userQuickOrderData.phone}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Phone"
        required
      />

      <input
        type="text"
        name="gst"
        value={userQuickOrderData.gst}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="GST / PAN"
        required
      />

      <input
        type="text"
        name="dl"
        value={userQuickOrderData.dl}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="DL / MRD No."
        required
      />

      <textarea
        name="address"
        value={userQuickOrderData.address}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Address"
        required
      ></textarea>

      <textarea
        name="requirement"
        value={userQuickOrderData.requirement}
        onChange={handleQuickOrderChange}
        className="w-full border border-gray-300 rounded-md text-sm p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Requirement"
        required
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-sm font-semibold rounded-md py-2 shadow hover:bg-blue-700"
      >
        {t("sr")}
      </button>
    </form>
  </div>
</div>

    </div>
  )
}