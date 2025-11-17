import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { captureCodOrder } from '@/store/shop/order-slice'
import { captureDistributorCodOrder } from '@/store/shop/distributorOrder-slice';

const DistributorCodReturn = () => {
const dispatch = useDispatch(); 

      useEffect(() => {
    
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      
        dispatch(captureDistributorCodOrder({orderId})).then((data) => {
            
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/shop/paymentsuccess";
              
            }
          });
         
         }, [dispatch])


  return (
    <div>
        <h1>Order Processing...</h1>
    </div>
  )
}

export default DistributorCodReturn