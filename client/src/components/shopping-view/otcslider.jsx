import { fetchAllProducts } from "@/store/admin/product-slice";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../ui/button";
import img from "../../assets/d3.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useUser } from '@clerk/clerk-react';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const OtcSlider = () => {
  const desktopSliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const { user } = useUser();
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function handleAddtoCart(productId, totalStock) {
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
  }

  const sortedProducts = productList.filter(product => product.slider === "otc");

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

  return (
    <div className="m-8">
      <div className="container mx-auto bg-gradient-to-r from-violet-500 to-violet-300 rounded-lg p-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white pt-2 mb-3">{t("otchme")}</h2>

        {/* Desktop Slider */}
        <div className="hidden md:block relative">
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-violet-800 text-white rounded-full p-3 text-lg shadow-xl hover:bg-violet-400 z-10"
            onClick={() => desktopSliderRef.current.slickPrev()}
          >
            &lt;
          </button>

          <div className="w-full py-6">
            <Slider ref={desktopSliderRef} {...desktopSettings}>
              {sortedProducts.map((product) => (
                <div key={product._id} className="p-2">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <Link to={`../productdetailpage/${product?._id}`}>
                      <img src={product.image || img} alt={product.title} className="w-full h-[300px] object-cover" />
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-violet-600 font-bold text-lg">
                          ₹{product.salePrice || product.price}
                        </span>
                        {product.salePrice > 0 && (
                          <span className="text-gray-500 line-through text-lg">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                      {/* <Button
                        onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                        className="mt-2 bg-violet-600 text-white text-sm py-2 px-4 rounded hover:bg-violet-700 w-full"
                      >
                        Add to Cart 🛒
                      </Button> */}

                           {user?.id ? (
                                              <Button
                                              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                                              className="mt-2 bg-violet-600 text-white text-sm py-2 px-4 rounded hover:bg-violet-700 w-full"
                                              >
                                                Add to Cart 🛒
                                              </Button>
                                            ) : (
                                              <Button
                                                onClick={() => toast({ title: "Please log in to add products to your cart." })}
                                                className="mt-2 bg-violet-600 text-white text-sm py-2 px-4 rounded hover:bg-violet-700 w-full"
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-violet-800 text-white rounded-full p-3 text-lg shadow-xl hover:bg-violet-400 z-10"
            onClick={() => desktopSliderRef.current.slickNext()}
          >
            &gt;
          </button>
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden">
          <Slider ref={mobileSliderRef} {...mobileSettings}>
            {sortedProducts.map((product) => (
              <div key={product._id} className="p-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`../productdetailpage/${product?._id}`}>
                    <img
                      src={product.image || img}
                      alt={product.title}
                      className="w-full h-[150px] object-cover"
                    />
                  </Link>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {product.title}
                    </h3>
                    <div className="text-sm font-bold text-violet-600 flex flex-col justify-between">
                      <span>₹{product.salePrice || product.price}</span>
                      {product.salePrice > 0 && (
                        <span className="line-through text-gray-500">₹{product.price}</span>
                      )}
                    </div>
                    {user?.id ? (
                                           <Button
                                           onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                                           className="mt-2 bg-violet-600 text-white text-xs py-2 px-3 w-full hover:bg-violet-700"
                                           >
                                             Add🛒
                                           </Button>
                                         ) : (
                                           <Button
                                             onClick={() => toast({ title: "Please log in to add products to your cart." })}
                                             className="mt-2 bg-violet-600 text-white text-xs py-2 px-3 w-full hover:bg-violet-700"
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
  );
};

export default OtcSlider;
