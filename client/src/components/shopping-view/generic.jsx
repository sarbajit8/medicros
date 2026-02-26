import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

const GenericSlider = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const scrollContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { user } = useUser();
  const { toast } = useToast();

  // Fetch products from backend
  const { productList } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Filter generic slider products
  const products = productList.filter((p) => p.slider === "generic");

  // Add to cart handler
  const handleAddToCart = (productId) => {
    if (!user?.id) {
      showToastMessage("Please log in to add products to your cart.");
      return;
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
        toast({ title: "Product added to cart" });
      }
    });
  };

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Product Card
  const ProductCard = ({ product }) => (
    <div className="w-full md:w-1/2 px-2 mb-4 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-full">
        <div className="flex flex-col md:flex-row h-full">

          {/* Image */}
          <div className="md:w-2/5 relative overflow-hidden group cursor-pointer">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="md:w-3/5 p-3 md:p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 hover:text-cyan-600 transition-colors cursor-pointer line-clamp-2">
                {product.title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg md:text-xl font-bold text-cyan-600">
                  ₹{product.salePrice || product.price}
                </span>

                {product.salePrice > 0 && (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                      {Math.round(
                        ((product.price - product.salePrice) / product.price) * 100
                      )}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Stock */}
              {product.totalStock && (
                <div className="mb-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      product.totalStock > 10
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {product.totalStock > 10
                      ? "In Stock"
                      : `Only ${product.totalStock} left`}
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(product._id)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group text-xs md:text-sm"
            >
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-bounce" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="m-4 md:m-8 font-sans">

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-white shadow-2xl rounded-lg p-4 z-50 animate-slide-in border-l-4 border-cyan-600">
          <p className="text-gray-800 font-medium">{toastMessage}</p>
        </div>
      )}

      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-500 rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 border-b border-white/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Tag className="w-7 h-7" />
              Generic Medicines
            </h2>
          </div>

          {/* Scrollable list */}
          <div className="p-4 md:p-8">
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto h-[700px] md:h-[800px] scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 hover:scrollbar-thumb-white/50 px-2"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex flex-wrap -mx-2">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pb-4 text-white/80 text-sm">
            <p className="animate-bounce">↓ Scroll to see more products ↓</p>
          </div>
        </div>
      </div>

      {/* Animations & Scrollbar */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }

        .scrollbar-thin::-webkit-scrollbar { width: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default GenericSlider;
