
import React from 'react'
import { Label } from '../ui/label'
import { DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Badge } from "../ui/badge"
import { useUser } from '@clerk/clerk-react'

const PcdOrderDetailsView = ({ pcdOrderDetails }) => {
  const { user } = useUser()

  return (
    <DialogContent className="max-w-[95vw] sm:max-w-[600px] h-[80vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
      <div className='grid gap-6'>
        {/* ✅ Order Summary */}
        <div className='grid gap-2'>
          <div className='flex mt-6 items-center justify-between'>
            <p className='font-medium'>Order ID</p>
            <Label>{pcdOrderDetails?._id}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Date</p>
            <Label>{pcdOrderDetails?.orderDate?.split('T')[0]}</Label>
          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Price</p>
            <Label>{pcdOrderDetails?.totalAmount}</Label>
          </div>
          {pcdOrderDetails?.due && pcdOrderDetails?.due.trim() !== "" && (
  <div className='flex mt-2 items-center justify-between'>
    <p className='font-medium'>Due</p>
    <Label>{pcdOrderDetails.due}</Label>
  </div>
)}

          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  pcdOrderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : pcdOrderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {pcdOrderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        {/* ✅ Product Details */}
        <div className="grid gap-4">
          <div className="font-medium">Order Details</div>
          <ul className="grid gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            {pcdOrderDetails?.distributorCartItems?.length > 0 ? (
              pcdOrderDetails.distributorCartItems.map((item, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
                    Product {index + 1}:
                  </h2>
                  <div className="grid gap-1 text-gray-700">
                    <p className="break-words max-w-[400px]"><strong>📌 Product:</strong> {item.title}</p>
                    <p><strong>🏭 Manufacturer:</strong> {item.pcdName}</p>
                    <p><strong>📦 Quantity:</strong> {item.quantity}</p>
                    <p><strong>💰 Price:</strong> ₹{item.productprice ?? "Processing..."}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No items found</p>
            )}
          </ul>
        </div>

        {/* ✅ Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span className="block break-words max-w-[200px]">{user?.userName}</span>
              <span className="block break-words max-w-[200px]">{pcdOrderDetails?.addressInfo?.address}</span>
              <span className="block break-words max-w-[200px]">{pcdOrderDetails?.addressInfo?.city}</span>
              <span className="block break-words max-w-[200px]">{pcdOrderDetails?.addressInfo?.pincode}</span>
              <span className="block break-words max-w-[200px]">{pcdOrderDetails?.addressInfo?.phone}</span>
              <span className="block break-words max-w-[200px]">{pcdOrderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default PcdOrderDetailsView
