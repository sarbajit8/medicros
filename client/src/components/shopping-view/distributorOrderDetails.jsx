import React, { useState } from 'react'
import { Label } from '../ui/label'
import { DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { Badge } from "../ui/badge";
import { useSelector } from 'react-redux'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'


const DistributorOrderDetailsView = ({distributorOrderDetails}) => {

console.log(distributorOrderDetails,"ssssssssssssssssssssssssssssssssssss");

const { user } = useUser();
return (
     
    <DialogContent className="max-w-[95vw] sm:max-w-[600px] h-[80vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>
                        Order ID
                    </p>
                    <Label>{distributorOrderDetails?._id}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>
                        Order Date
                    </p>
                    <Label>{distributorOrderDetails?.orderDate.split('T')[0]}</Label>

                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>
                        Order Price
                    </p>
                    <Label>{distributorOrderDetails?.totalAmount}</Label>

                </div>
                {distributorOrderDetails?.due && distributorOrderDetails?.due.trim() !== "" && (
  <div className="flex mt-2 items-center justify-between">
    <p className="font-medium">Due</p>
    <Label>{distributorOrderDetails.due}</Label>
  </div>
)}

                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>
                        Order Status
                    </p>
                    <Label>
                    <Badge
                className={`py-1 px-3 ${
                    distributorOrderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : distributorOrderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {distributorOrderDetails?.orderStatus}
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
  {distributorOrderDetails?.distributorCartItems &&
  distributorOrderDetails?.distributorCartItems.length > 0
    ? distributorOrderDetails?.distributorCartItems.map((item, index) => (
        <li key={index} className="bg-white p-4 rounded-md shadow-md">
          {/* Product Title */}
          <h2 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
            Product {index + 1}:
          </h2>

          {/* Product Details - One per Line */}
          <div className="grid gap-1 text-gray-700">
            <p className='break-words max-w-[400px]'><strong>📌 Title:</strong> {item.title}</p>
            <p><strong>📦 Quantity:</strong> {item.quantity}</p>
            <p><strong>💰 Price:</strong> ₹{item.productprice ? item.productprice : "Processing..."}</p>
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
      <span className="block  break-words max-w-[200px]">{user.userName}</span>
      <span className="block  break-words max-w-[200px]">{distributorOrderDetails?.addressInfo?.address}</span>
      <span className="block  break-words max-w-[200px]">{distributorOrderDetails?.addressInfo?.city}</span>
      <span className="block  break-words max-w-[200px]">{distributorOrderDetails?.addressInfo?.pincode}</span>
      <span className="block  break-words max-w-[200px]">{distributorOrderDetails?.addressInfo?.phone}</span>
      <span className="block  break-words max-w-[200px]">{distributorOrderDetails?.addressInfo?.notes}</span>
    </div>
  </div>
</div>
            

        </div>

    </DialogContent>
  )
}

export default DistributorOrderDetailsView