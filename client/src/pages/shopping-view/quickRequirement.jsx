import React, { useEffect, useState } from "react";
import logo from "../../assets/mlogo.png"; // Brand logo
import { addQuickOrder, fetchAllQuickOrders } from "@/store/shop/quickorder-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addNotification } from "@/store/admin/notification-slice";

const QuickRequirement = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { quickOrderList } = useSelector(state => state.quickOrder);

  // Form State
  const [userQuickOrderData, setUserQuickOrderData] = useState({
    name: "",
    shopname: "",
    phone: "",
    gst: "",
    dl: "",
    address: "",
    requirement: "",
  });

  const handleQuickOrderChange = (e) => {
    setUserQuickOrderData({
      ...userQuickOrderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuickOrderSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuickOrder(userQuickOrderData));
    toast({ title: `Your order has been sent successfully! 🎉` });

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

  useEffect(() => {
    dispatch(fetchAllQuickOrders());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Quick Requirement Form */}
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto border border-gray-200">
          <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
            📝 Quick Requirement Form
          </h2>
          <form onSubmit={handleQuickOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userQuickOrderData.name}
              onChange={handleQuickOrderChange}
              required
              className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <input
              type="text"
              name="shopname"
              placeholder="Shop Name"
              value={userQuickOrderData.shopname}
              onChange={handleQuickOrderChange}
              required
              className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            {/* Phone, GST, PAN in One Line */}
            <div className="md:flex md:space-x-4 w-full col-span-1 md:col-span-2">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={userQuickOrderData.phone}
                onChange={handleQuickOrderChange}
                required
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <input
                type="text"
                name="gst"
                placeholder="GST /PAN Number"
                value={userQuickOrderData.gst}
                onChange={handleQuickOrderChange}
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <input
                type="text"
                name="dl"
                placeholder="DL No. /MRD no."
                value={userQuickOrderData.dl}
                onChange={handleQuickOrderChange}
                className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Address & Requirement */}
            <textarea
              name="address"
              placeholder="Enter Full Address"
              value={userQuickOrderData.address}
              onChange={handleQuickOrderChange}
              required
              className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm h-24"
            />
            <textarea
              name="requirement"
              placeholder="Enter Requirement Details"
              value={userQuickOrderData.requirement}
              onChange={handleQuickOrderChange}
              required
              className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 shadow-sm h-24"
            />

            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold p-3 rounded-md transition-all transform hover:scale-105"
            >
              🚀 Submit Requirement
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
   
    </div>
  );
};

export default QuickRequirement;
