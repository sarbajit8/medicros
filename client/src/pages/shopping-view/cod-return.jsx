import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { captureCodOrder } from '@/store/shop/order-slice';

const CodReturn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

    dispatch(captureCodOrder({ orderId })).then((data) => {
      console.log("API Response:", data);

      if (data?.payload?.success) {
        console.log("Redirecting to payment success...");
        sessionStorage.removeItem("currentOrderId");
        window.location.href = "/shop/paymentsuccess"; // ✅ Redirect
      } else {
        console.log("Order failed or not successful:", data);
      }
    }).catch((error) => {
      console.error("Error capturing order:", error);
    });

  }, [dispatch]);

  return (
    <div>
      <h1>Processing Order...</h1>
    </div>
  );
};

export default CodReturn;
