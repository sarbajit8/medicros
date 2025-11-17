import React, { useEffect, useState } from "react";
import accImg from '../../assets/rm5.jpg';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { Link } from "react-router-dom";

const Discount = () => {
    const { user } = useUser();
    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { cartItems } = useSelector((state) => state.shopCart);
    
    const [selectedDiscount, setSelectedDiscount] = useState("all");

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // ✅ Filtering products where discount is NOT null, undefined, or 0
    let filteredProducts = productList.filter(
        (product) => product.discount !== null && product.discount !== undefined && product.discount !== 0
    );

    // ✅ Apply filter based on selected discount range
    if (selectedDiscount !== "all") {
        const [min, max] = selectedDiscount.split("-").map(Number);
        filteredProducts = filteredProducts.filter(
            (product) => product.discount >= min && product.discount <= max
        );
    }

    // 🛒 Handle Add to Cart Function
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

    return (
        <div className="bg-gray-100">
            {/* Promo Sale Banner with Background Image Only */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    width={"1600"}
                    height={"300"}
                    src={accImg}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            {/* Title & Filter Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-8 px-4">
                <div className="w-full md:w-auto">
                    <h2 className="text-4xl font-extrabold text-blue-800 tracking-wide text-left">
                        🔥 Promo Offers!
                    </h2>
                    <p className="text-lg text-gray-600 mt-2 text-left">
                        Get the best deals on top products while stocks last!
                    </p>
                </div>

                {/* Discount Filter Dropdown */}
                <div className="w-full md:w-auto mt-4 md:mt-0">
                    <select
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-gray-700"
                        value={selectedDiscount}
                        onChange={(e) => setSelectedDiscount(e.target.value)}
                    >
                        <option value="all">All Discounts</option>
                        <option value="1-10">1-10%</option>
                        <option value="11-20">11-20%</option>
                        <option value="21-30">21-30%</option>
                        <option value="31-40">31-40%</option>
                        <option value="41-50">41-50%</option>
                        <option value="51-60">51-60%</option>
                        <option value="61-70">61-70%</option>
                        <option value="71-80">71-80%</option>
                        <option value="81-90">81-90%</option>
                        <option value="91-100">91-100%</option>
                    </select>
                </div>
            </div>

            {/* Product Grid Section */}
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                            
                            {/* Buy 1 Get 1 Free Badge - Top Left */}
                            {product.freescheme && (
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                                    {product.freescheme} Free
                                </span>
                            )}

                            {/* Discount Badge - Top Right */}
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                                {product.discount}% OFF
                            </span>

                            {/* Product Image - Full Card Size */}
                            <Link to={`../productdetailpage/${product?._id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>

                            {/* Product Details */}
                            <div className="p-4 text-center">
                                <h4 className="text-lg font-semibold text-gray-800">{product.title}</h4>
                                <p className="text-gray-500 line-through text-sm">₹{product.salePrice}</p>
                                <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                                <Button
                                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all transform hover:scale-105"
                                    onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                                >
                                    Add to Cart 🛒
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discount;
