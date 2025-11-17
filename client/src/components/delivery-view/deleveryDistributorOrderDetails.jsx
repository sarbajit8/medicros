import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDistributorOrdersForAdmin,
  getDistributorOrderDetailsForAdmin,
  updateDistributorOrderDue,
  updateDistributorOrderStatus,
  updateDistributorPaymentMethod,
  updateDistributorPaymentStatus,
} from "@/store/admin/distributorOrder-slice";
import { useToast } from '@/hooks/use-toast';
import { Button } from "../ui/button";
import { QRCodeCanvas } from "qrcode.react";

const initialFormData = { status: "" };

function DeleveryDistributorOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { employee } = useSelector((state) => state.adminEmployee);
  const [paymentStatus, setPaymentStatus] = useState(orderDetails?.paymentStatus || "");
  const [paymentMethod, setPaymentMethod] = useState(orderDetails?.paymentMethod || "");
  const [showQR, setShowQR] = useState(false);
  const [due, setDue] = useState(orderDetails?.due || "");

  // ✅ Generate the UPI QR Code
  const upiId = "medicrossremedies@cnrb";
  const merchantName = "medicrossremedies";
  const totalAmount = orderDetails?.totalAmount || 0;
  const upiURL = `upi://pay?pa=${upiId}&pn=${merchantName}&cu=INR`;

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    if (!formData.status) {
      toast({ title: "Please select an order status", variant: "destructive" });
      return;
    }
    dispatch(updateDistributorOrderStatus({ id: orderDetails?._id, orderStatus: formData.status }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
          dispatch(getAllDistributorOrdersForAdmin());
          setFormData(initialFormData);
          toast({ title: "Order status updated successfully!" });
        }
      });
  };

  const handleUpdatePaymentStatus = () => {
    if (!paymentStatus.trim()) {
      toast({ title: "Please enter a valid payment status", variant: "destructive" });
      return;
    }
    dispatch(updateDistributorPaymentStatus({ orderId: orderDetails?._id, paymentStatus }))
      .then((data) => {
        dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
        if (data?.payload?.success) {
          toast({ title: "Payment status updated successfully!" });
        }
      });
  };

  const handleUpdatePaymentMethod = () => {
    if (!paymentMethod.trim()) {
      toast({ title: "Please enter a valid payment method", variant: "destructive" });
      return;
    }
    dispatch(updateDistributorPaymentMethod({ orderId: orderDetails?._id, paymentMethod }))
      .then((data) => {
        dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
        if (data?.payload?.success) {
          toast({ title: "Payment method updated successfully!" });
          setShowQR(paymentMethod === "Online");
        }
      });
  };
  useEffect(() => {
    setDue(orderDetails?.due || "");
  }, [orderDetails]);
  
  return (
    <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0] || "N/A"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>Rs.{totalAmount}</Label>
          </div>
          {/* ✅ New Due Input Section */}
<div className="flex flex-col gap-2 mt-3">
  <p className="font-medium">Due Amount</p>
  <div className="flex items-center gap-2">
  <input
  type="number"
  value={due}
  onChange={(e) => setDue(e.target.value)}
  placeholder="Enter due amount"
  className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow-400"
/>

    <Button
      className="bg-yellow-500 hover:bg-yellow-600 text-white"
      onClick={() => {
        if (due === "" || isNaN(due)) {
          toast({ title: "Please enter a valid due amount", variant: "destructive" });
          return;
        }

        dispatch(updateDistributorOrderDue({ orderId: orderDetails?._id, due }))
          .then((data) => {
            if (data?.payload?.success) {
              toast({ title: "Due amount updated successfully!" });
              dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
            }
          });
      }}
    >
      Update
    </Button>
  </div>
</div>

          <div className="flex flex-col gap-3">
            <p className="font-medium">Payment Method</p>
            <div className="flex items-center gap-2">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
              >
                <option value="">{orderDetails?.paymentMethod || "Select Payment Method"}</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              <Button onClick={handleUpdatePaymentMethod} className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2">
                Update
              </Button>
            </div>
          </div>

          {showQR && (
            <div className="flex flex-col items-center mt-4">
              <p className="text-lg font-semibold">Scan to Pay with Google Pay</p>
              <QRCodeCanvas value={upiURL} size={180} bgColor="#ffffff" fgColor="#000000" />
              {/* <p className="text-sm text-gray-500 mt-2">Total Amount: <strong>Rs.{totalAmount}</strong></p> */}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <p className="font-medium">Payment Status</p>
            <div className="flex items-center gap-2">
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
              >
                <option value="">{orderDetails?.paymentStatus || "Select Payment Status"}</option>
                <option value="Success">Success</option>
                <option value="Rejected">Rejected</option>
                <option value="InProcess">In Process</option>
              </select>
              <Button onClick={handleUpdatePaymentStatus} className="bg-green-500 text-white hover:bg-green-600 px-4 py-2">
                Update
              </Button>
            </div>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge className="py-1 px-3 bg-gray-600 text-white rounded-md">
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>


        <Separator />


        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
  {orderDetails?.distributorCartItems &&
  orderDetails?.distributorCartItems.length > 0
    ? orderDetails?.distributorCartItems.map((item, index) => (
        <li key={index} className="bg-white p-4 rounded-md shadow-md">
          {/* Product Title */}
          <h2 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
            Product {index + 1}:
          </h2>

          {/* Product Details - One per Line */}
          <div className="grid gap-1 text-gray-700">
            <p className='break-words max-w-[400px]'><strong>📌 Title:</strong> {item.title}</p>
            <p><strong>📦 Quantity:</strong> {item.quantity}</p>
            <p><strong>💰 Price:</strong> ₹{item.productprice ? item.productprice : "Processing..."}</p>
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

        <CommonForm
          formControls={[{ label: "Order Status", name: "status", componentType: "select", options: [{ id: "delivered", label: "Delivered" }, { id: "outfordelivery", label: "Out For Delivery" }] }]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
}

export default DeleveryDistributorOrderDetailsView;
