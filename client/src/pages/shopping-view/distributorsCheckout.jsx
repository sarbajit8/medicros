import React, { useEffect, useState } from 'react'
import img from '../../assets/m1.png'
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserdistributorCartItemsContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import DistributorCartItemsContent from '@/components/shopping-view/distributor-cart-content'
import { createNewDestributorOrderCod, getAllDistributorOrdersByUserId } from '@/store/shop/distributorOrder-slice'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'
import { addNotification } from '@/store/admin/notification-slice'

const DistributorCheckout = () => {
const { distributorCartItems } = useSelector((state) => state.shopDistributorCart);
console.log("distributorCartItems ssssssssssssssssssssss");


const { user } = useUser();
const { approvalURL } = useSelector((state) => state.shopOrder);
  const {orderList, orderDetails} = useSelector(state=>state.shopOrder);

const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
const [isPaymentStart, setIsPaymemntStart] = useState(false);
const dispatch = useDispatch();
const {toast} = useToast();
const navigate = useNavigate();

console.log(currentSelectedAddress);
useEffect(()=>{

    dispatch(getAllDistributorOrdersByUserId(user?.id))

  },[dispatch])


function handleCodPayment(){
  console.log(distributorCartItems,"cart fnjfsfsfdjjkdsk");
  

  if (distributorCartItems.items.length ===0) {
    console.log(distributorCartItems.items.length );
    
    toast({
      title: "Your cart is empty. Please add items to proceed",
      variant: "destructive",
    });

    return;
  }
  if (currentSelectedAddress === null ) {

    toast({
      title: "Please select one address to proceed.",
      variant: "destructive",
    });

    return;
  }
// console.log( singleCartItem?.title,"oiiiiiiiiiiiiiiiiii");
console.log(distributorCartItems.productname,"duuuuuuuuuuuuuuuuuuuuuuuuuuuu");


  const orderData = {
    userId: user?.id,
    cartId : distributorCartItems?._id,
    distributorCartItems: distributorCartItems.items.map((singleCartItem) => ({
      productId: singleCartItem?.productId,
      title: singleCartItem?.productname,
      price: "billing",
        
      quantity: singleCartItem?.quantity,
    })),
    addressInfo: {
      addressId: currentSelectedAddress?._id,
      address: currentSelectedAddress?.address,
      city: currentSelectedAddress?.city,
      pincode: currentSelectedAddress?.pincode,
      phone: currentSelectedAddress?.phone,
      notes: currentSelectedAddress?.notes,
    },
    orderStatus : 'Confirmed',
    paymentMethod : 'COD',
    paymentStatus :'cod',
    totalAmount : "billing",
    orderDate : new Date(),
    orderUpdateDate : new Date(),
    paymentId : "",    
  }


      const data = {
      title: "Order Alert ",
      description: "New  distributor order added",
    };
  
    dispatch(addNotification(data)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
        console.error("Notification failed:", res?.payload);
      }
    });


  dispatch(createNewDestributorOrderCod(orderData)).then((data) => {  
   
   
    if (data?.payload?.success) {
      console.log(data, "medicross");
      navigate('../distributor-cod-return')
     
    } else {
      console.log("some problem occured");
      
    }
  }); 
}
 







if (approvalURL) {
  window.location.href = approvalURL;
}


  return <div className='flex flex-col bg-blue-100'>
    <div className='relative h-[300px] w-full overflow-hidden'>

    <img src={img} className="h-full w-full object-cover object-center" />

    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
    <Address selectedId={currentSelectedAddress}   setCurrentSelectedAddress={setCurrentSelectedAddress}/>
    <div className='flex flex-col gap-4'>
    {distributorCartItems && distributorCartItems.items && distributorCartItems.items.length > 0
            ? distributorCartItems.items.map((item) => (
                <DistributorCartItemsContent cartItem={item} />
              ))
            : null}


<div className="mt-8 space-y-4">
<div className="flex justify-between">
              {/* <span className="font-bold">Delivery</span>
              <span className="font-bold">  Rs. {orderList.length==0?"40(60% off for youtr 1st order )":100}
              </span> */}
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.---- </span>
            </div>
          </div>
          <div className="mt-4 w-full">
            {/* <Button onClick={handleInitiatePaypalPayment}  className="w-full">
             {
              isPaymentStart?'Processing Razorpay Payment .....': 'Pay with RozorPay'
             }
            </Button> */}
            {/* <p className='flex flex-col items-center'>or</p> */}
            <Button onClick={handleCodPayment}  className="w-full bg-blue-800 hover:bg-blue-500">
              Cash On Delivery
            </Button>
            {/* <p className='flex flex-col items-center'>or</p>
            <Button onClick={handleCodPayment}  className="w-full">
             Pay with RozorPay
            </Button> */}
          </div>
    </div>
    

    </div>

  </div>
}

export default DistributorCheckout