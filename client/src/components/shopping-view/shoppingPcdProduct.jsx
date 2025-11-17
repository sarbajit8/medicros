import React, { useEffect, useState } from 'react';
import img from '../../assets/dist.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPcdProductsByPcdId } from '@/store/admin/pcdProduct-slice';
import { fetchAllPcd } from '@/store/admin/pcd-slice';
import { Button } from '../ui/button';
import { pcdAddToCart, fetchPcdCartItems } from '@/store/shop/pcdCart-slice';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';

const ShoppingPcdProductById = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { pcdProductList } = useSelector(state => state.adminPcdProduct);
  const { adminPcdList } = useSelector(state => state.adminPcd);
  const { pcdCartItems } = useSelector((state) => state.shopPcdCart);
  const { pcdId } = useParams();
  const { user } = useUser();

  const pcd = adminPcdList.find(p => p._id === pcdId);

  useEffect(() => {
    dispatch(fetchAllPcd());
    dispatch(getAllPcdProductsByPcdId(pcdId));
  }, [dispatch, pcdId]);

  const filteredProducts = pcdProductList.filter(product =>
    product.productname.toLowerCase().replace(/\s+/g, '').includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
  );

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = pcdCartItems.items || [];

    if (getCartItems.length) {
      const index = getCartItems.findIndex(item => item.productId === getCurrentProductId);
      if (index > -1 && getCartItems[index].quantity + 1 > getTotalStock) {
        toast({
          title: `Only ${getCartItems[index].quantity} quantity can be added for this item`,
          variant: "destructive",
        });
        return;
      }
    }

    dispatch(pcdAddToCart({
      userId: user?.id,
      productId: getCurrentProductId,
      quantity: 1,
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchPcdCartItems(user?.id));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  return (
    <div className='flex flex-col bg-blue-100'>
      {/* Banner */}
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
<div className='mt-20'>


     {/* PCD Info */}
      {pcd && (
        <div className="bg-white shadow-md rounded-xl w-full md:w-1/2 mx-auto -mt-16 mb-8 px-6 py-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          {pcd.image ? (
            <img
              src={pcd.image}
              alt={pcd.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-base font-medium text-gray-500 shadow-inner">
              No Image
            </div>
          )}
          <div className="flex flex-col justify-center text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{pcd.name}</h2>
            <p className="text-sm font-semibold text-blue-600">@{pcd.username}</p>
            <div className="mt-2 text-sm space-y-1">
              <p><span className="font-semibold text-gray-700">Email:</span> <span className="font-medium text-gray-800">{pcd.email}</span></p>
              <p><span className="font-semibold text-gray-700">Address:</span> <span className="font-medium text-gray-800">{pcd.address}</span></p>
              <p><span className="font-semibold text-gray-700">Pin:</span> <span className="font-medium text-gray-800">{pcd.pin}</span></p>
            </div>
          </div>
        </div>
      )}


</div>
   
      {/* Header */}
      <header className="bg-blue-100 shadow flex">
        <div className="max-w-7xl mx-auto px-4 py-6 flex-grow">
          <h1 className="text-3xl font-bold text-gray-800">PCD Products</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product._id}
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col items-center justify-between min-h-[120px] transition-transform transform hover:scale-105 relative"
              >
                <p className="text-gray-800 font-bold break-words max-w-[300px] text-center mb-5">
                  {product.productname}
                </p>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <Button
                    onClick={() => handleAddtoCart(product._id, product.totalStock)}
                    className="w-[80%] bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingPcdProductById;
