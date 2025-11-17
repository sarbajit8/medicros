import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cart-items-content'
import { useNavigate } from 'react-router-dom'
import DistributorCartItemsContent from './distributor-cart-content'

const DistributorCartWrapper = ({setOpenCartSheet,distributorCartItems}) => {

  const navigate = useNavigate();

//  const totalCartAmount = cartItems && cartItems.length > 0 ?
//  cartItems.reduce((sum,currentItem)=> sum + (
//   currentItem?.salePrice >0?currentItem?.salePrice : currentItem.price
//  )*currentItem?.quantity,0)
//  :0
console.log(distributorCartItems,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

  return<SheetContent className="sm:max-w-md overflow-x-scroll" >
    <SheetHeader>
        <SheetTitle>
            Your Cart 2
        </SheetTitle>
    </SheetHeader>
    <div className='mt-8 space-y-4'>
      {
        distributorCartItems && distributorCartItems.length > 0 ?
        distributorCartItems.map(item=> < DistributorCartItemsContent cartItem={item}/>): null
      }

    </div>
    <div className='mt-8 space-y-4'>
        <div className='flex justify-between'>
            <span className='font-bold'>Total  </span>
            <span className='font-bold'>Rs.</span>

        </div>

    </div>
    <Button onClick={()=>{
       navigate('/shop/checkout');
       setOpenCartSheet(false);
    }
       } className="w-full mt-6 bg-blue-800 hover:bg-blue-500 ">Checkout</Button>

  </SheetContent>
  
}

export default DistributorCartWrapper