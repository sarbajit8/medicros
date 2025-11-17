import React, { useEffect, useState } from 'react'
import img from '../../assets/rm1.jpg'
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder, createNewOrderCod, getAllOrdersByUserId } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'
import { addNotification } from '@/store/admin/notification-slice'


const ShoppingCheckout = () => {

const {cartItems} = useSelector(state=> state.shopCart);
// const {user} = useSelector(state=> state.auth);
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

    dispatch(getAllOrdersByUserId(user?.id))

  },[dispatch])


if(orderList.length==0){
  var totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
cartItems.items.reduce((sum,currentItem)=> sum + (
 currentItem?.salePrice >0?currentItem?.salePrice : currentItem.price
)*currentItem?.quantity,0)+40
:0
}else{
  var totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
  cartItems.items.reduce((sum,currentItem)=> sum + (
   currentItem?.salePrice >0?currentItem?.salePrice : currentItem.price
  )*currentItem?.quantity,0)+100
  :0
  
}




function handleInitiatePaypalPayment(){
  console.log(cartItems,"cart fnjfsfsfdjjkdsk");
  

  if (cartItems.items.length ===0) {
    toast({
      title: "Your cart is empty. Please add items to proceed",
      variant: "destructive",
    });

    return;
  }
  if (currentSelectedAddress === null) {
    toast({
      title: "Please select one address to proceed.",
      variant: "destructive",
    });

    return;
  }

  const orderData = {
    userId: user?.id,
    cartId : cartItems?._id,
    cartItems: cartItems.items.map((singleCartItem) => ({
      productId: singleCartItem?.productId,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      price:
        singleCartItem?.salePrice > 0
          ? singleCartItem?.salePrice
          : singleCartItem?.price,
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
    orderStatus : 'pending',
    paymentMethod : 'paypal',
    paymentStatus :'pending',
    totalAmount : totalCartAmount,
    orderDate : new Date(),
    orderUpdateDate : new Date(),
    paymentId : "",
    payerId : "",
    

  }


  dispatch(createNewOrder(orderData)).then((data) => {
    console.log(data, "sangam");
    if (data?.payload?.success) {
      setIsPaymemntStart(true);
    } else {
      setIsPaymemntStart(false);
    }
  }); 
}







function handleCodPayment(){
  console.log(cartItems,"cart fnjfsfsfdjjkdsk");
  

  if (cartItems.items.length ===0) {
    console.log(cartItems.items.length );
    
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

  const orderData = {
    userId: user?.id,
    cartId : cartItems?._id,
    cartItems: cartItems.items.map((singleCartItem) => ({
      productId: singleCartItem?.productId,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      price:
        singleCartItem?.salePrice >0
          ? singleCartItem?.salePrice
          : singleCartItem?.price,
        freescheme: singleCartItem.freescheme,
          margin: singleCartItem.margin,
          mrp: singleCartItem.mrp,
          packof: singleCartItem.packof,
          productquantity: singleCartItem.productquantity,
      quantity: singleCartItem?.quantity,
    })),
    addressInfo: {
      addressId: currentSelectedAddress?._id,
      name:currentSelectedAddress?.name,
      address: currentSelectedAddress?.address,
      city: currentSelectedAddress?.city,
      pincode: currentSelectedAddress?.pincode,
      phone: currentSelectedAddress?.phone,
      notes: currentSelectedAddress?.notes,
    },
    orderStatus : 'Confirmed',
    paymentMethod : 'COD',
    paymentStatus :'cod',
    totalAmount : totalCartAmount,
    orderDate : new Date(),
    orderUpdateDate : new Date(),
    paymentId : "",
    payerId : "",
    

  }





    const data = {
    title: "Order Alert ",
    description: "New order added",
  };

  dispatch(addNotification(data)).then((res) => {
    if (res?.meta?.requestStatus === "fulfilled") {
      setIsPaymemntStart(true);
    } else {
      setIsPaymemntStart(false);
      console.error("Notification failed:", res?.payload);
    }
  });


  dispatch(createNewOrderCod(orderData)).then((data) => {  
   
   
    if (data?.payload?.success) {
      console.log(data, "medicross");
      navigate('../cod-return');
    
     
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
    {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}


<div className="mt-8 space-y-4">
<div className="flex justify-between">
              <span className="font-bold">Delivery</span>
              <span className="font-bold">  Rs. {orderList.length==0?40:100}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs. {totalCartAmount.toFixed(2)}</span>
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

export default ShoppingCheckout