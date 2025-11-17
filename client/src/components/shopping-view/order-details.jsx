import React, { useState } from 'react'
import { Label } from '../ui/label'
import { DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { Badge } from "../ui/badge";
import { useSelector } from 'react-redux'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'


const ShoppingOrderDetailsView = ({orderDetails}) => {


  const { user } = useUser();
  return (
     
    <DialogContent className="max-w-[95vw] sm:max-w-[600px] h-[80vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>
                        Order ID
                    </p>
                    <Label>{orderDetails?._id}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>
                        Order Date
                    </p>
                    <Label>{orderDetails?.orderDate.split('T')[0]}</Label>

                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>
                        Order Price
                    </p>
                    <Label>{orderDetails?.totalAmount}</Label>

                </div>
                    
          {orderDetails?.packof ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Pack of</p>
           <Label>{orderDetails.packof}</Label>
         </div>
          ) : null}
     
          {orderDetails?.mrp ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">MRP</p>
           <Label>{orderDetails.mrp}</Label>
         </div>
          ) : null}
                {orderDetails?.due ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Due</p>
           <Label>{orderDetails.due}</Label>
         </div>
          ) : null}
       
          {orderDetails?.productquantity ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Product Quantity</p>
           <Label>{orderDetails.productquantity}</Label>
         </div>
          ) : null}

          {orderDetails?.margin ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Margin</p>
           <Label>{orderDetails.margin}</Label>
         </div>
          ) : null}
          
          {orderDetails?.discount ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Discount</p>
           <Label>{orderDetails.discount}</Label>
         </div>
          ) : null}
         {orderDetails?.freescheme ? (
          <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Free Scheme</p>
          <Label>{orderDetails.freescheme}</Label>
         </div>
          ) : null}

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>
                        Order Status
                    </p>
                    <Label>
                    <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
                    </Label>

                </div>

            </div>

            <Separator/>
            <div className='grid gap-4 '>
               

            </div>
            <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
  {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
    ? orderDetails?.cartItems.map((item, index) => (
        <li
          key={item.productId}
          className="bg-white p-4 rounded-md shadow-md"
        >
          {/* Product Title */}
          <h2 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
            Product {index + 1}:
          </h2>

          {/* Product Details - One per Line */}
          <div className="grid gap-1 text-gray-700">
            <p className="break-words max-w-[400px]"><strong>📌 Title:</strong> {item.title}</p>
            <p><strong>📊 Packof:</strong> {item?.packof || "-"}</p>
            <p><strong>📦 Product Quantity:</strong> {item.productquantity}</p>
            <p><strong>📊 Margin:</strong> {item?.margin || "-"}</p>
            <p><strong>🎁 Free Scheme:</strong> {item?.freescheme || "None"}</p>
            <p><strong>📦 Order Quantity:</strong> {item.quantity}</p>
            <p><strong>💰 MRP:</strong> ₹{item.mrp}</p>
            <p><strong>💰 Price:</strong> ₹{item.price}</p>
          </div>
        </li>
      ))
    : <p className="text-center text-gray-500">No items found</p>}
</ul>
          </div>
        </div>
        <div className="grid gap-4">
  <div className="grid gap-2">
    <div className="font-medium">Shipping Info</div>
    <div className="grid gap-0.5 text-muted-foreground">
      <span className="block break-words max-w-[400px]">{user.name}</span>
      <span className="block break-words max-w-[400px]">{orderDetails?.addressInfo?.address}</span>
      <span className="block break-words max-w-[400px]">{orderDetails?.addressInfo?.city}</span>
      <span className="block break-words max-w-[400px]">{orderDetails?.addressInfo?.pincode}</span>
      <span className="block break-words max-w-[400px]">{orderDetails?.addressInfo?.phone}</span>
      <span className="block break-words max-w-[400px]">{orderDetails?.addressInfo?.notes}</span>
    </div>
  </div>
</div>
            

        </div>

    </DialogContent>
  )
}

export default ShoppingOrderDetailsView