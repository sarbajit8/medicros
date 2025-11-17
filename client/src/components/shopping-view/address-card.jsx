import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) => {
  console.log(selectedId,addressInfo._id);
  
  return (
    <div>
        <Card onClick={setCurrentSelectedAddress?()=>setCurrentSelectedAddress(addressInfo):null}
             className={`cursor-pointer ${selectedId?._id === addressInfo?._id? ' border-red-900 border-[4px]':'border-black'}`}
          >
            <CardContent className={`${selectedId=== addressInfo?._id? 'border-black':''}grid p-4 gap-4`}>
            <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">Name: {addressInfo?.name}</Label>

                <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">Address: {addressInfo?.address}</Label>
                <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">City: {addressInfo?.city}</Label>
                <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">Pincode: {addressInfo?.pincode}</Label>
                <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">Phone: {addressInfo?.phone}</Label>
                <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">DL No: {addressInfo?.deagLicence}</Label>
                <Label className="block overflow-hidden text-ellipsis whitespace-nowrap">Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="p-3 flex justify-between">
                <Button className="bg-blue-800 hover:bg-blue-500" onClick={()=>handleEditAddress(addressInfo)} >Edit</Button>
                <Button className="bg-blue-800 hover:bg-blue-500" onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>

        </Card>
    </div>
  )
}

export default AddressCard