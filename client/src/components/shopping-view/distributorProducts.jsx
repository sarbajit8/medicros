import React, { useEffect, useState } from "react";
import img from "../../assets/dist.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsByDistributorId } from "@/store/admin/distributorProduct-slice";
import { fetchAllDistributor } from "@/store/admin/distributor-slice";
import { Button } from "../ui/button";
import {
  distributorAddToCart,
  fetchDistributorCartItems,
} from "@/store/shop/distributocart-slice";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";

const ShoppingDistributorProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { distributorId } = useParams();
  const { distributorProductList } = useSelector(
    (state) => state.DistributorProduct
  );
  const { distributorCartItems } = useSelector(
    (state) => state.shopDistributorCart
  );
  const { adminDistributorList } = useSelector(
    (state) => state.adminDistributor
  );
  const { user } = useUser();

  const distributor = adminDistributorList.find((d) => d._id === distributorId);

  useEffect(() => {
    dispatch(fetchAllDistributor());
    dispatch(getAllProductsByDistributorId(distributorId));
  }, [dispatch, distributorId]);

  const handleAddtoCart = (productId, totalStock) => {
    const items = distributorCartItems.items || [];
    const existing = items.find((item) => item.productId === productId);

    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existing.quantity} quantity can be added for this item`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      distributorAddToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchDistributorCartItems(user?.id));
        toast({ title: "Product is added to cart" });
      }
    });
  };

  const filteredDistributor = distributorProductList.filter((product) =>
    product.productname
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
  );

  return (
    <div className="flex flex-col bg-blue-100">
      {/* Banner Image */}
      <div className="relative h-[300px] w-full overflow-hidden pb-4">
        <img
          src={img}
          className="h-full w-full object-cover object-center"
          alt="Banner"
        />
      </div>

      <div className="mt-16">
        {/* Distributor Info Card */}
        {distributor && (
          <div className="bg-white shadow-md rounded-xl w-full md:w-1/2 mx-auto -mt-16 mb-8 px-6 py-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Distributor Image */}
            {distributor.image ? (
              <img
                src={distributor.image}
                alt={distributor.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-base font-medium text-gray-500 shadow-inner">
                No Image
              </div>
            )}

            {/* Distributor Details */}
            <div className="flex flex-col justify-center text-center md:text-left space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                {distributor.name}
              </h2>
              <p className="text-sm font-semibold text-blue-600">
                @{distributor.username}
              </p>

              <div className="mt-2 text-sm space-y-1">
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {distributor.email}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Address:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {distributor.address}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Pin:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {distributor.pin}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page Header */}
      <header className="bg-blue-100 shadow flex">
        <div className="max-w-7xl mx-auto px-4 py-6 flex-grow">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto p-4">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDistributor.length > 0 ? (
            filteredDistributor.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col items-center justify-between min-h-[160px] transition-transform transform hover:scale-105 relative"
              >
                <p className="text-gray-800 font-bold break-words max-w-[300px] md:max-w-[300px] text-center mb-5">
                  {product.productname}
                </p>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <Button
                    onClick={() =>
                      handleAddtoCart(product._id, product.totalStock)
                    }
                    className="w-[80%] bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingDistributorProducts;
