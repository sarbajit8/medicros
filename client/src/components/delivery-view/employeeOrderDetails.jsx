import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch } from "react-redux";
import { useToast } from '@/hooks/use-toast';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { QRCodeCanvas } from "qrcode.react";
import { 
  fetchAllEmployeeOrders, 
  getOrderDetailsForEmployee, 
  updateEmployeeOrderDue, 
  updateEmployeeOrderStatus, 
  updatePaymentMethod, 
  updatePaymentStatus 
} from "@/store/employee/employeeOrder-slice";

const initialFormData = {
  status: "",
};

function DeleveryorderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [paymentStatus, setPaymentStatus] = useState(orderDetails?.paymentstatus || "");
  const [paymentMethod, setPaymentMethod] = useState(orderDetails?.paymentmethod || "");
  const [showQR, setShowQR] = useState(false); // ✅ Control QR display
  const [due, setDue] = useState(orderDetails?.due || "");


  // ✅ Generate the UPI QR Code
  const upiId = "medicrossremedies@cnrb"; 
  const merchantName = "medicrossremedies";
  const mrp = orderDetails?.mrp || 0; 
  const upiURL = `upi://pay?pa=${upiId}&pn=${merchantName}&cu=INR`;

  function handleUpdateStatus(event) {
    event.preventDefault();
    if (!formData.status) {
      toast({ title: "Please select a valid order status!", variant: "destructive" });
      return;
    }
    dispatch(updateEmployeeOrderStatus({ id: orderDetails?._id, orderstatus: formData.status }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForEmployee(orderDetails?._id));
          dispatch(fetchAllEmployeeOrders());
          setFormData(initialFormData);
          toast({ title: "Order status updated successfully!" });
        }
      });
  }

  const handleUpdatePaymentStatus = () => {
    if (!paymentStatus.trim()) {
      toast({ title: "Please enter a valid payment status", variant: "destructive" });
      return;
    }
    dispatch(updatePaymentStatus({ id: orderDetails?._id, paymentstatus: paymentStatus }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForEmployee(orderDetails?._id));
          toast({ title: "Payment status updated successfully!" });
        }
      });
  };

  const handleUpdatePaymentMethod = () => {
    if (!paymentMethod.trim()) {
      toast({ title: "Please enter a valid payment method", variant: "destructive" });
      return;
    }
    dispatch(updatePaymentMethod({ id: orderDetails?._id, paymentmethod: paymentMethod }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForEmployee(orderDetails?._id));
          toast({ title: "Payment method updated successfully!" });

          // ✅ Show QR only if payment method is "Online"
          setShowQR(paymentMethod === "Online");
        }
      });
  };
  const handleUpdateDue = () => {
    if (due === "" || isNaN(due)) {
      toast({ title: "Please enter a valid due amount!", variant: "destructive" });
      return;
    }
  
    dispatch(updateEmployeeOrderDue({ id: orderDetails?._id, due }))
      .then((res) => {
        if (res?.payload?.success) {
          toast({ title: "Due amount updated successfully!" });
          dispatch(getOrderDetailsForEmployee(orderDetails?._id));
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
            <Label>{orderDetails?.orderDate ? orderDetails.orderDate.split("T")[0] : "N/A"}</Label>
          </div>
          <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Product 1</p>
            <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">{orderDetails?.product1}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Quantity</p>
            <Label>{orderDetails?.quantity1}</Label>
          </div>
 {orderDetails?.product2 && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 2</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product2}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity2}</Label>
    </div>
  </>
)}
   {orderDetails?.product3  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 3</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product3}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity3}</Label>
    </div>
  </>
)}
 {orderDetails?.product4  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 4</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product4}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity4}</Label>
    </div>
  </>
)}
 {orderDetails?.product5  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 5</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product5}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity5}</Label>
    </div>
  </>
)}
 {orderDetails?.product6  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 6</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product6}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity6}</Label>
    </div>
  </>
)}
 {orderDetails?.product7  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 7</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product7}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity7}</Label>
    </div>
  </>
)}
 {orderDetails?.product8  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 8</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product8}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity8}</Label>
    </div>
  </>
)}
 {orderDetails?.product9  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 9</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product9}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity9}</Label>
    </div>
  </>
)}
 {orderDetails?.product10  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 10</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product10}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity10}</Label>
    </div>
  </>
)}
 {orderDetails?.product11  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 11</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product11}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity11}</Label>
    </div>
  </>
)}
 {orderDetails?.product12  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 12</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product12}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity12}</Label>
    </div>
  </>
)}
 {orderDetails?.product13  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 13</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product13}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity13}</Label>
    </div>
  </>
)}
 {orderDetails?.product14  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 14</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product14}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity14}</Label>
    </div>
  </>
)}
 {orderDetails?.product15  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 15</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product15}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity15}</Label>
    </div>
  </>
)}
 {orderDetails?.product16  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 16</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product16}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity16}</Label>
    </div>
  </>
)}
 {orderDetails?.product17  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 17</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product17}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity17}</Label>
    </div>
  </>
)}
 {orderDetails?.product18  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 18</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product18}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity18}</Label>
    </div>
  </>
)}
 {orderDetails?.product19  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 19</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product19}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity19}</Label>
    </div>
  </>
)}
 {orderDetails?.product20  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 20</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product20}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity20}</Label>
    </div>
  </>
)}
 {orderDetails?.product21 && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 21</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product21}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity21}</Label>
    </div>
  </>
)}
 {orderDetails?.product22  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 22</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product22}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity22}</Label>
    </div>
  </>
)}
 {orderDetails?.product23  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 23</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product23}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity23}</Label>
    </div>
  </>
)}
 {orderDetails?.product24  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 24</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product24}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity24}</Label>
    </div>
  </>
)}
 {orderDetails?.product25  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 25</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product25}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity25}</Label>
    </div>
  </>
)}
 {orderDetails?.product26  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 26</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product26}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity26}</Label>
    </div>
  </>
)}
 {orderDetails?.product27  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 27</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product27}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity27}</Label>
    </div>
  </>
)}
 {orderDetails?.product28  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 28</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product28}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity28}</Label>
    </div>
  </>
)}
 {orderDetails?.product29  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 29</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product29}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity29}</Label>
    </div>
  </>
)}
 {orderDetails?.product30  && (
  <>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Product 30</p>
      <Label className="break-words max-w-[200px] break-all bg-gray-100 p-2">
        {orderDetails?.product30}
      </Label>
    </div>
    <div className="flex mt-2 items-center justify-between">
      <p className="font-medium">Quantity</p>
      <Label>{orderDetails?.quantity30}</Label>
    </div>
  </>
)}
     <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Customer Name</p>
            <Label className="break-words max-w-[200px] break-all">{orderDetails?.customername}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Customer Mobile</p>
            <Label  className="break-words max-w-[200px] break-all">{orderDetails?.customermobile}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Customer Email</p>
            <Label  className="break-words max-w-[200px] break-all">{orderDetails?.customeremail}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Shop Name</p>
            <Label  className="break-words max-w-[200px] break-all">{orderDetails?.shopname}</Label>
          </div>

         
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">PAN/GST</p>
            <Label>{orderDetails?.pangst}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Drag Licence</p>
            <Label>{orderDetails?.draglicence}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>{orderDetails?.orderstatus}</Label>
          </div>
          {/* <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Price</p>
            <Label>{orderDetails?.mrp}</Label>
          </div> */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Date</p>
            <Label>
              {orderDetails?.orderDate ? orderDetails.orderDate.split("T")[0] : "N/A"}
            </Label>
          </div>
        </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Total Price</p>
            <Label>Rs.{orderDetails?.mrp}</Label>
          </div>
          <div className="flex flex-col gap-2 mt-2">
  <p className="font-medium">Due Amount</p>
  <div className="flex items-center gap-2">
    <Input
      type="number"
      value={due}
      onChange={(e) => setDue(e.target.value)}
      placeholder="Enter due amount"
      className="w-full border rounded-md p-2"
    />
    <Button onClick={handleUpdateDue} className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2">
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
                <option value="">{orderDetails?.paymentmethod || "Select Payment Method"}</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              <Button onClick={handleUpdatePaymentMethod} className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2">
                Update
              </Button>
            </div>
          </div>

          {/* ✅ Show QR Code only after clicking "Update" */}
          {showQR && (
            <div className="flex flex-col items-center mt-4">
              <p className="text-lg font-semibold">Scan to Pay with Google Pay</p>
              <QRCodeCanvas value={upiURL} size={180} bgColor="#ffffff" fgColor="#000000" />
              {/* <p className="text-sm text-gray-500 mt-2">Total Amount: <strong>Rs.{mrp}</strong></p> */}
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
                <option value="">{orderDetails?.paymentstatus || "Select Payment Status"}</option>
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
            <Label>{orderDetails?.orderstatus}</Label>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium ">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <p className="break-words max-w-[300px]">{orderDetails?.address}</p>
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

export default DeleveryorderDetailsView;
