import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { capturePcdCodOrder } from '@/store/shop/pcdOrders-slice';

const PcdCodReturn = () => {
const dispatch = useDispatch(); 

      useEffect(() => {
    
        const orderId = JSON.parse(sessionStorage.getItem("currentPcdOrderId"));
      
        dispatch(capturePcdCodOrder({orderId})).then((data) => {
            
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentPcdOrderId");
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

export default PcdCodReturn;
