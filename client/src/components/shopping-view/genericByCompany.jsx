import { useToast } from "@/hooks/use-toast";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const MedicineCard = ({ medicine }) => {

    const dispatch = useDispatch();
    const { user } = useUser();

    const { toast } = useToast();
    const { cartItems } = useSelector((state) => state.shopCart);

        function handleAddtoCart(productId, totalStock) {
            let cartItemList = cartItems.items || [];
    
            if (cartItemList.length) {
                const existingItemIndex = cartItemList.findIndex(
                    (item) => item.productId === productId
                );
                // if (existingItemIndex > -1) {
                //     const itemQuantity = cartItemList[existingItemIndex].quantity;
                //     if (itemQuantity + 1 > totalStock) {
                //         toast({
                //             title: `Only ${itemQuantity} quantity available for this item`,
                //             variant: "destructive",
                //         });
                //         return;
                //     }
                // }
            }
    
            dispatch(
                addToCart({
                    userId: user?.id,
                    productId,
                    quantity: 1,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    toast({
                        title: "Product added to cart",
                    });
                }
            });
        }
          useEffect(() => {
                dispatch(fetchAllProducts());
            }, [dispatch]);
    
  return (
    <div className="bg-white shadow-md hover:shadow-lg rounded-xl border border-gray-200 w-full md:w-80 transition-transform transform hover:scale-105">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 rounded-t-xl font-semibold text-lg">
        🏥 {medicine?.title}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Company */}
        <Link  to={`../productdetailpage/${medicine?._id}`}>

        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg font-semibold">
            {medicine?.brand?.slice(0, 6)}...
          </div>
          <p className="text-gray-600 text-sm font-medium">{medicine?.brand}</p>
        </div>

        {/* Generic Name */}
        <p className="text-red-600 text-sm font-semibold">
          GENERIC NAME: {medicine?.composition}
        </p>

        {/* Price Section */}
        {
        medicine?.price && (
          <>
            <p className="text-blue-700 font-semibold text-lg">
              Price - ₹{medicine?.price}{" "}
              {medicine?.discount && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {medicine?.discount}
                </span>
              )}
            </p>
            <p className="text-gray-600 text-sm">
              MRP: <span className="font-semibold">₹{medicine?.mrp}</span>
            </p>
            <p className="text-gray-400 text-xs">(* Inclusive of all taxes)</p>
            <p className="text-gray-500 text-xs">Exp. Date: {medicine?.expiry}</p>
          </>
        )}
              </Link>

        {/* Action Button */}
        <div className="flex items-center space-x-3 mt-3">
          {medicine?.buttonType === "add" ? (
            <input
              type="number"
              defaultValue="1"
              min="1"
              className="w-12 p-1 border border-gray-300 rounded-lg text-center text-sm"
            />
          ) : null}
       
       {user?.id ? (
                          <button
                          onClick={() => handleAddtoCart(medicine?._id, medicine?.totalStock)}
                          className="px-5 py-2 text-white text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition"                          >
                            Add to Cart 🛒
                          </button>
                        ) : (
                          <button
                            onClick={() => toast({ title: "Please log in to add products to your cart." })}
                            className="px-5 py-2 text-white text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition"                            >
                            Add to Cart 🛒
                          </button>
                        )}
        </div>
      </div>
    </div>
  );
};

const GenericByCompany = () => {
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { company } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Function to normalize strings (removes spaces & converts to lowercase)
  const normalizeText = (text) => text?.toLowerCase().replace(/\s+/g, "");

  // Filter products where composition matches, ignoring case & spaces
  const filteredProducts = productList.filter(
    (medicine) => normalizeText(medicine?.brand) === normalizeText(company)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title & Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 uppercase">{company}</h1>

        <div className="relative mt-4 md:mt-0">
          <input
            type="text"
            placeholder="🔍 Search Medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:ring focus:ring-blue-300 focus:outline-none text-gray-600"
          />
          <span className="absolute right-3 top-2 text-gray-400 text-lg">🔍</span>
        </div>
      </div>

      {/* Medicine Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter((medicine) =>
              normalizeText(medicine?.title).includes(normalizeText(search))
            )
            .map((medicine, index) => <MedicineCard key={index} medicine={medicine} />)
        ) : (
          <p className="text-gray-500 text-center w-full">
            ❌ No products found for this composition.
          </p>
        )}
      </div>
    </div>
  );
};



export default GenericByCompany