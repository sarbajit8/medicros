import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import img from "../../assets/d3.png";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useUser } from '@clerk/clerk-react';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { fetchAllProducts } from "@/store/admin/product-slice";

const SpecialProducts = () => {
  const { user } = useUser();
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function handleAddtoCart(productId, totalStock) {
    dispatch(
      addToCart({ userId: user?.id, productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" });
      }
    });
  }

  const sortedProducts = productList.filter(product => product.slider === "spc");
  const displayedProducts = showAll ? sortedProducts : sortedProducts.slice(0, 8);

  return (
    <div className="m-8">
      <div className="container mx-auto bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-lg p-4 shadow-xl relative">
        <div className="flex flex-col sm:flex-row justify-between text-center mb-3 relative">
          <h2 className="text-4xl font-bold text-white p-4">{t("spf")}</h2>
          <a href="/shop/listing">
            <button className="mt-4 sm:mt-0 bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 sm:absolute sm:right-0 sm:top-0">
              View More
            </button>
          </a>
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-6">
            {displayedProducts.map((product) => (
              <div key={product._id} className="border bg-white rounded-lg shadow-sm p-1">
                <Link to={`../productdetailpage/${product?._id}`}>
                  <img src={product.image || img} alt={product.title} className="w-full h-[150px] object-cover" />
                  <h3 className="mt-1 text-sm font-bold text-gray-700 break-words">{product.title}</h3>
                  <div className="mt-1 text-center">
                    <span className="text-cyan-600 font-bold text-lg">₹{product.salePrice || product.price}</span>
                    {product.salePrice > 0 && (
                      <span className="text-gray-500 line-through text-lg block mt-1">₹{product.price}</span> // Moved below the selling price
                    )}
                  </div>
                </Link>
                <div className="mt-1">
                  <Button
                    onClick={() => user?.id ? handleAddtoCart(product._id, product.totalStock) : toast({ title: "Please log in to add products to your cart." })}
                    className="mt-2 bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700 w-full"
                  >
                    Add🛒
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div key={product._id} className="border bg-white rounded-lg shadow-sm p-4">
                <Link to={`../productdetailpage/${product._id}`}>
                  <img
                    src={product.image || img}
                    alt={product.name}
                    className="w-full h-[200px] object-cover rounded-md" // Set fixed height and width
                  />
                  <h3 className="mt-2 text-sm font-semibold text-gray-700 break-words">{product.title}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-cyan-600 font-bold text-lg">₹{product.salePrice || product.price}</span>
                    {product.salePrice > 0 && <span className="text-gray-500 line-through text-lg">₹{product.price}</span>}
                  </div>
                </Link>
                <div className="mt-3">
                  <Button
                    onClick={() => user?.id ? handleAddtoCart(product._id, product.totalStock) : toast({ title: "Please log in to add products to your cart." })}
                    className="mt-2 bg-cyan-600 text-white text-sm py-2 px-4 rounded hover:bg-cyan-700 w-full"
                  >
                    Add to Cart 🛒
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show More Button */}
        {sortedProducts.length > 8 && (
          <div className="text-center mt-6">
            <Button
              className="bg-cyan-700 text-white px-6 py-2 rounded hover:bg-cyan-800"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialProducts;
