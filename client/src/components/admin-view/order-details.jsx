import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  updateDeliveryBoy, // ✅ Import the new action
} from "@/store/admin/order-slice";
import { useToast } from '@/hooks/use-toast';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { fetchDeliveryEmployees } from "@/store/admin/employee-slice";
import { addOrUpdateDeleveryAlert } from "@/store/admin/deleveryalert-slice";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [deliveryBoy, setDeliveryBoy] = useState(""); // ✅ Track delivery boy input
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
      const { DeliveryEmployeeList } = useSelector(state => state.adminEmployee);
  

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  const handleUpdateDeliveryBoy = () => {
  if (!deliveryBoy.trim()) {
    toast({ title: "Please select a delivery boy!" });
    return;
  }

  const selectedDeliveryBoy = DeliveryEmployeeList.find(
    (emp) => emp.name === deliveryBoy
  );

  if (!selectedDeliveryBoy) {
    toast({ title: "Selected delivery boy not found in list!" });
    return;
  }

  dispatch(
    updateDeliveryBoy({
      id: orderDetails?._id,
      deliveryboy: selectedDeliveryBoy.name,
    })
  ).then((data) => {
    if (data?.payload?.success) {
      dispatch(getOrderDetailsForAdmin(orderDetails?._id));
      dispatch(getAllOrdersForAdmin());
      setDeliveryBoy("");

      toast({
        title: data?.payload?.message,
      });

      // ✅ Add alert to delivery boy
      dispatch(
        addOrUpdateDeleveryAlert({
          username: selectedDeliveryBoy.name,
          userid: selectedDeliveryBoy._id,
          type: "order",
        })
      );
    }
  });
};



  useEffect(() => {
    dispatch(fetchDeliveryEmployees(orderDetails?._id));
   
  }, [dispatch])
  

  return (
    <DialogContent className="max-w-[95vw] sm:max-w-[600px] h-[80vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          {orderDetails?.due && orderDetails?.due.trim() !== "" && (
  <div className="flex mt-2 items-center justify-between">
    <p className="font-medium">Due</p>
    <Label>{orderDetails.due}</Label>
  </div>
)}

      
{/*            
          {orderDetails?.packof ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Pack of</p>
           <Label>{orderDetails.packof}</Label>
         </div>
          ) : null}
     
          {orderDetails?.mrp ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">MRP</p>
           <Label>{orderDetails.mrp}</Label>
         </div>
          ) : null}
       
          {orderDetails?.productquantity ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Product Quantity</p>
           <Label>{orderDetails.productquantity}</Label>
         </div>
          ) : null}

          {orderDetails?.margin ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Margin</p>
           <Label>{orderDetails.margin}</Label>
         </div>
          ) : null}
          
          {orderDetails?.discount ? (
          <div className="flex mt-2 items-center justify-between">
           <p className="font-medium">Discount</p>
           <Label>{orderDetails.discount}</Label>
         </div>
          ) : null}
         {orderDetails?.freescheme ? (
          <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Free Scheme</p>
          <Label>{orderDetails.freescheme}</Label>
         </div>
          ) : null} */}

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Delivery Boy</p>
            <Label className="flex items-center gap-2">


            <select
                  name="brand"
                  value={deliveryBoy}
                 
                  onChange={(e) => setDeliveryBoy(e.target.value)}
                
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">{orderDetails?.deliveryboy}</option>
                  {DeliveryEmployeeList.map((deliveryBoy) => (
                    <option key={deliveryBoy.name} value={deliveryBoy.name}>
                      {deliveryBoy.name}
                    </option>
                  ))}
                </select> 
            {/* <Input
                type="text"
                value={deliveryBoy}
                onChange={(e) => setDeliveryBoy(e.target.value)}
                placeholder={orderDetails?.deliveryboy || "Enter name"}
                className="w-32"
              /> */},
              <Button
                onClick={handleUpdateDeliveryBoy}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Add
              </Button>
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
 <ul className="grid gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
  {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
    ? orderDetails?.cartItems.map((item, index) => (
        <li
          key={item.productId}
          className="bg-white p-4 rounded-md shadow-md"
        >
          {/* Product Title */}
          <h2 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
            Product {index + 1}:
          </h2>

          {/* Product Details - One per Line */}
          <div className="grid gap-1 text-gray-700">
            <p className="break-words max-w-[400px]"><strong>📌 Title:</strong> {item.title}</p>
            <p><strong>📊 Packof:</strong> {item?.packof || "-"}</p>
            <p><strong>📦 Product Quantity:</strong> {item.productquantity}</p>
            <p><strong>📊 Margin:</strong> {item?.margin || "-"}</p>
            <p><strong>🎁 Free Scheme:</strong> {item?.freescheme || "None"}</p>
            <p><strong>📦 Order Quantity:</strong> {item.quantity}</p>
            <p><strong>💰 Price:</strong> ₹{item.price}</p>
          </div>
        </li>
      ))
    : <p className="text-center text-gray-500">No items found</p>}
</ul>

          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {/* <span>{user.userName}</span> */}
              <span className="text-gray-800 break-words max-w-[200px]">{orderDetails?.addressInfo?.name}</span>
              <span className="text-gray-800 break-words max-w-[200px]">{orderDetails?.addressInfo?.address}</span>
              <span className="text-gray-800 break-words max-w-[200px]">{orderDetails?.addressInfo?.city}</span>
              <span className="text-gray-800 break-words max-w-[200px]">{orderDetails?.addressInfo?.pincode}</span>
              <span className="text-gray-800 break-words max-w-[200px]">{orderDetails?.addressInfo?.phone}</span>
              <span className="text-gray-800 break-words max-w-[200px]">{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [{ id: "In_process", label: "In Process" },{ id: "Confirmed", label: "Confirmed" },{ id: "Ready_for_delivery", label: "Ready for Delivery" }, { id: "Outfor_delivery", label: "Out For Delivery" },{ id: "Delivered", label: "Delivered" }, { id: "Rejected", label: "Rejected" }

                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
