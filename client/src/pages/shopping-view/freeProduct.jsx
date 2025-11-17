import { Button } from "@/components/ui/button";
import { fetchAllProducts } from "@/store/admin/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'
import { useToast } from "@/hooks/use-toast";



const FreeProductsScheme = () => {
   const { productList } = useSelector((state) => state.adminProducts);
   const { user } = useUser();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();


  
  const products = [
    {
      title: "A TO Z Gold (New) 15 Capsules",
      ptr: "Rs. 167.46",
      mrp: "Rs. 247",
      discount: "5%",
      offer: "Buy 9 Get 1 Free",
    },
    {
      title: "A TO Z NS Mango Flavour Syrup 200 ml",
      ptr: "Rs. 142.37",
      mrp: "Rs. 210",
      discount: "5%",
      offer: "Buy 5 Get 1 Free",
    },
    {
      title: "A TO Z NS Mango Flavour Syrup 100 ml",
      ptr: "Rs. 77.97",
      mrp: "Rs. 115",
      discount: "5%",
      offer: "Buy 9 Get 1 Free",
    }
  ];


  const offers = ["BUY1GET1", "BUY2GET1", "BUY3GET1", "BUY4GET1", "BUY5GET1"];

  const filteredProducts = productList.filter(product => 
    product.freescheme && product.freescheme.trim() !== "" &&
    (!selectedLetter || selectedLetter === "#" || product.title.toUpperCase().startsWith(selectedLetter)) &&
    (!selectedOffer || product.freescheme.toUpperCase() === selectedOffer.toUpperCase()) &&
    (searchQuery.trim() === "" || product.title.toUpperCase().includes(searchQuery.trim().toUpperCase())) // Case-insensitive search
  );
  
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

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-center p-6">
        <h1 className="text-white text-3xl font-bold">Free Products Scheme</h1>
        <div className="mt-6">
        <input
  type="text"
  placeholder="Search Product with Free Scheme"
  className="w-1/2 p-2 rounded-md border border-gray-300"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
<button 
  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
  onClick={() => setSearchQuery(searchQuery.trim())} // Ensures spaces at the start/end do not affect the search
>
  Search
</button>

        </div>
        <div className="mt-6">
          <span className="text-white font-semibold">Search by Alphabets:</span>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["#", ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")].map((char) => (
              <button
                key={char}
                onClick={() => setSelectedLetter(char)}
                className={`bg-white text-black px-3 py-1 border border-gray-300 rounded-md ${selectedLetter === char ? "bg-gray-300" : ""}`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-6">
  <span className="text-white font-semibold">Filter by Offer:</span>
  <div className="flex flex-wrap justify-center gap-2 mt-2">
    {offers.map((offer, index) => (
      <button
        key={index}
        onClick={() => setSelectedOffer(offer)}
        className={`bg-white p-4 rounded-lg shadow-md text-center w-44 ${selectedOffer === offer ? "bg-gray-300" : ""}`}
      >
        <span className="block text-red-500 font-bold">{offer}</span>
        <strong className="block text-blue-500 text-xl">FREE</strong>
      </button>
    ))}
    {/* Button to Clear Offer Filter */}
    <button
      onClick={() => setSelectedOffer(null)}
      className="bg-white p-4 rounded-lg shadow-md text-center w-44"
    >
      <span className="block text-red-500 font-bold">Clear Filter</span>
      <strong className="block text-blue-500 text-xl">ALL</strong>
    </button>
  </div>
</div>

        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6 p-6 bg-gray-100">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-80">
              
              <Link  to={`../productdetailpage/${product?._id}`}>
              <div className="w-full">

              <span className="bg-black text-yellow-400 px-2 py-1 rounded-md text-sm">{product.freescheme} free</span>
              <h3 className="mt-2 font-semibold text-lg  break-words max-w-[250px]">{product.title}</h3>

              <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span><br/>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
             
              <p className="text-gray-700"><strong>Brand:</strong> {product.brand}</p>
              </div>
            </Link>

              {/* <p className="text-green-500"><strong>Discount:</strong> {product.discount}</p> */}
              <div className="flex justify-between items-center mt-4">
                {/* <input type="number" className="border p-2 w-16" min="1" defaultValue="1" /> */}
             

{user?.id ? (
  <Button
    onClick={() => handleAddToCart(product._id)}
    className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-md items-center"  >
    Add to Cart 🛒
  </Button>
) : (
  <Button
    onClick={() => toast({ title: "Please log in to add products to your cart." })}
    className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-md items-center"  >
    Add to Cart 🛒
  </Button>
)}

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found for selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default FreeProductsScheme;
