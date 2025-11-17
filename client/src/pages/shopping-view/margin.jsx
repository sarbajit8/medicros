import { Button } from "@/components/ui/button";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'
import { useToast } from "@/hooks/use-toast";

const discounts = [
  "All", "80-90%", "70-80%", "60-70%", "50-60%", "40-50%", "30-40%", "20-30%", "10-20%"
];

const Margin = () => {
  const{percent} = useParams();
  const { user } = useUser();
  const [selectedDiscount, setSelectedDiscount] = useState(percent);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();




  //handel add to cart
  
    function handleAddtoCart(getCurrentProductId
      , getTotalStock
    ) {
      console.log(cartItems);
      let getCartItems = cartItems.items || [];
  
      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCurrentProductId
        );
        // if (indexOfCurrentItem > -1) {
        //   const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        //   if (getQuantity + 1 > getTotalStock) {
        //     toast({
        //       title: `Only ${getQuantity} quantity can be added for this item`,
        //       variant: "destructive",
        //     });
  
        //     return;
        //   }
        // }
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
  
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
// Filter products based on selected discount margin and ensure margin exists
const filteredProduct = selectedDiscount === "All"
  ? productList.filter(product => product.margin !== null && product.margin !== undefined && product.margin !== "")
  : productList.filter(product => product.margin !== null && product.margin !== undefined && product.margin !== "" && product.margin === selectedDiscount);
  // Filter products based on selected discount margin
  const filteredProducts = selectedDiscount === "All" 
    ? filteredProduct 
    : filteredProduct.filter(product => {
        const discountValue = product.margin;
        return discountValue === selectedDiscount;
      });

  return (
    <div className="w-full bg-white p-4 shadow-md rounded-lg">
<h2 className="text-3xl font-extrabold text-blue-700 mb-3 tracking-wide drop-shadow-lg">
  Margin
</h2>

      {/* Discount Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b">
        {discounts.map((discount) => (
          <button
            key={discount}
            onClick={() => setSelectedDiscount(discount)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md ${
              selectedDiscount === discount
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-orange-400"
            }`}
          >
            {discount}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (

<div key={product.id} className="border rounded-lg shadow-sm p-4 relative">
<Link to={`../productdetailpage/${product?._id}`}>

  {/* Offer Badge */}
  {product.freescheme && (
    <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
      {product.freescheme}
    </div>
  )}
  {product.margin && (
    <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
      Margin-{product.margin}
    </div>
  )}

  {/* Product Image */}
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-auto object-contain rounded-md" // Adjusted image size with object-contain
  />

  {/* Product Name */}
  <h3 className="mt-2 text-sm font-semibold text-gray-700 break-words max-w-[300px]">{product.title}</h3>

  {/* Price Details */}
  <div className="mt-1 flex items-center space-x-2 justify-between">
    <span className="text-blue-600 font-bold text-lg">
      ₹{product.salePrice == null || product.salePrice == 0 ? product.price : product.salePrice}
    </span>
    <span className="text-blue-600 font-bold text-lg line-through">
      {product.salePrice == null || product.salePrice == 0 ? "" : `₹ ${product.price}`}
    </span>
  </div>
</Link>

{/* Quantity Selector & Add Button */}
<div className="mt-3 flex items-center space-x-2">
  {user?.id ? (
    <Button
      onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-semibold"
    >
      Add to Cart 🛒
    </Button>
  ) : (
    <Button
      onClick={() => toast({ title: "Please log in to add products to your cart." })}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-semibold"
    >
      Add to Cart 🛒
    </Button>
  )}
</div>
</div>

        ))}
      </div>
    </div>
  );
};

export default Margin;
