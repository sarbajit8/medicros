import React from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import UserCartItemsContent from './cart-items-content';
import DistributorCartItemsContent from './distributor-cart-content';
import PcdCartItemsContent from './pcd-cart-content'; // ✅ Make sure this file exists

import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({ cartItems, setOpenCartSheet, distributorCartItems, pcdCartItems }) => {
  const navigate = useNavigate();

  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, item) =>
        sum + ((item?.salePrice > 0 ? item?.salePrice : item.price) * item?.quantity), 0)
    : 0;

  return (
    <SheetContent className="sm:max-w-md overflow-x-scroll">
      <h1 className='font-bold text-[20px]'>CART</h1>

      {/* 🛒 General Product Cart */}
      {cartItems && cartItems.length > 0 && (
        <>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className='mt-8 space-y-4'>
            {cartItems.map(item => (
              <UserCartItemsContent key={item._id} cartItem={item} />
            ))}
          </div>
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>Total</span>
              <span className='font-bold'>Rs.{totalCartAmount}</span>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate('/shop/checkout');
              setOpenCartSheet(false);
            }}
            className="w-full mt-6 bg-blue-800 hover:bg-blue-500"
          >
            Checkout
          </Button>
        </>
      )}

      {/* 🛒 Distributor Cart */}
      {distributorCartItems && distributorCartItems.length > 0 && (
        <>
          <SheetHeader className="mt-3">
            <SheetTitle>Your Distributor Cart</SheetTitle>
            <p>Items you added directly from your favourite distributors</p>
          </SheetHeader>
          <div className='mt-8 space-y-4'>
            {distributorCartItems.map(item => (
              <DistributorCartItemsContent key={item._id} cartItem={item} />
            ))}
          </div>
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>Billing</span>
              <span className='font-bold'>...</span>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate('/shop/distributorcheckout');
              setOpenCartSheet(false);
            }}
            className="w-full mt-6 bg-blue-800 hover:bg-blue-500"
          >
            Checkout
          </Button>
        </>
      )}

      {/* 🛒 PCD Manufacturer Cart */}
      {pcdCartItems && pcdCartItems.length > 0 && (
        <>
          <SheetHeader className="mt-3">
            <SheetTitle>Your PCD Manufacturer Cart</SheetTitle>
            <p>Products added from PCD manufacturers</p>
          </SheetHeader>
          <div className='mt-8 space-y-4'>
            {pcdCartItems.map(item => (
              <PcdCartItemsContent key={item._id} cartItem={item} />
            ))}
          </div>
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>Billing</span>
              <span className='font-bold'>...</span>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate('/shop/pcdcheckout');
              setOpenCartSheet(false);
            }}
            className="w-full mt-6 bg-blue-800 hover:bg-blue-500"
          >
            Checkout
          </Button>
        </>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
