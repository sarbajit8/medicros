import React, { useEffect, useState } from 'react';
import img from '../../assets/m1.png';
import Address from '@/components/shopping-view/address';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
// import { createNewPcdOrderCod, getAllPcdOrdersByUserId } from '@/store/shop/pcdOrder-slice';
import PcdCartItemsContent from '@/components/shopping-view/pcd-cart-content';
import { createNewPcdOrderCod, getAllPcdOrdersByUserId } from '@/store/shop/pcdOrders-slice';
import { addNotification } from '@/store/admin/notification-slice';

const PcdCheckout = () => {
  const { pcdCartItems } = useSelector((state) => state.shopPcdCart);
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { approvalURL } = useSelector((state) => state.shopPcdOrder);
  const { pcdOrderList } = useSelector(state => state.shopPcdOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(getAllPcdOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  function handleCodPayment() {
    if (!pcdCartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
        userId: user?.id,
        cartId: pcdCartItems?._id,
        pcdCartItems: pcdCartItems.items.map((item) => ({
          productId: item?.productId,
          title: item?.productname,
          pcdName: item?.distributorName,
          quantity: item?.quantity,
          productprice: 0, // Or set actual price
        })),
        addressInfo: {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          notes: currentSelectedAddress?.notes,
        },
        orderStatus: 'Confirmed',
        paymentMethod: 'COD',
        paymentStatus: 'cod',
        totalAmount: 'billing',
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymentId: '',
      };
      

         const data = {
            title: "Order Alert ",
            description: "New  pcd order added",
          };
        
          dispatch(addNotification(data)).then((res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              setIsPaymemntStart(true);
            } else {
              setIsPaymemntStart(false);
              console.error("Notification failed:", res?.payload);
            }
          });

    dispatch(createNewPcdOrderCod(orderData)).then((data) => {
      if (data?.payload?.success) {
        navigate('../pcd-cod-return');
      } else {
        toast({
          title: 'Error placing order',
          variant: 'destructive',
        });
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className='flex flex-col bg-blue-100'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className='flex flex-col gap-4'>
          {pcdCartItems?.items?.length > 0 &&
            pcdCartItems.items.map((item) => (
              <PcdCartItemsContent key={item.productId} cartItem={item} />
            ))}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.----</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button
              onClick={handleCodPayment}
              className="w-full bg-blue-800 hover:bg-blue-500"
            >
              Cash On Delivery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcdCheckout;
