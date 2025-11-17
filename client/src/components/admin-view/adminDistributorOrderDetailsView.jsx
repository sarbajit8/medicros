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
  updateDistributorOrderStatus,
  updateDistributorOrderProductPrice,
  updateDistributorOrderTotalAmount,
  updatedistributorDeliveryBoy, // ✅ Import the action for total amount
} from "@/store/admin/distributorOrder-slice";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fetchDeliveryEmployees } from "@/store/admin/employee-slice";
import { addOrUpdateDeleveryAlert } from "@/store/admin/deleveryalert-slice";

const initialFormData = {
  status: "",
};

function AdminDistributorOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [priceInputs, setPriceInputs] = useState({});
  const [totalAmount, setTotalAmount] = useState(""); // ✅ State for total amount
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [deliveryBoy, setDeliveryBoy] = useState(""); // ✅ Track delivery boy input
  const { DeliveryEmployeeList } = useSelector(state => state.adminEmployee);


   const handleUpdateDeliveryBoy = () => {
  if (!deliveryBoy.trim()) {
    toast({ title: "Please select a delivery boy!" });
    return;
  }

  const selectedDeliveryBoy = DeliveryEmployeeList.find(
    (emp) => emp.name === deliveryBoy
  );

  if (!selectedDeliveryBoy) {
    toast({ title: "Selected delivery boy not found!" });
    return;
  }

  dispatch(
    updatedistributorDeliveryBoy({
      id: orderDetails?._id,
      deliveryboy: selectedDeliveryBoy.name,
    })
  ).then((data) => {
    if (data?.payload?.success) {
      dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
      dispatch(getAllDistributorOrdersForAdmin());
      setDeliveryBoy("");

      toast({ title: data?.payload?.message });

      // ✅ Trigger Delivery Alert for distributor order
      dispatch(
        addOrUpdateDeleveryAlert({
          username: selectedDeliveryBoy.name,
          userid: selectedDeliveryBoy._id,
          type: "distributororders",
        })
      );
    }
  });
};



  const handlePriceChange = (productId, value) => {
    setPriceInputs((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleUpdatePrice = (productId) => {
    const productprice = parseFloat(priceInputs[productId]);

    if (isNaN(productprice) || productprice <= 0) {
      toast({ title: "Please enter a valid price!" });
      return;
    }

    dispatch(
      updateDistributorOrderProductPrice({
        orderId: orderDetails?._id,
        productId,
        productprice,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllDistributorOrdersForAdmin());
        setPriceInputs((prev) => ({ ...prev, [productId]: "" }));
        toast({ title: data?.payload?.message });
      }
    });
  };

  const handleUpdateTotalAmount = () => {
    const amount = parseFloat(totalAmount);

    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Please enter a valid total amount!" });
      return;
    }

    dispatch(
      updateDistributorOrderTotalAmount({
        orderId: orderDetails?._id,
        totalAmount: amount,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllDistributorOrdersForAdmin());
        setTotalAmount("");
        toast({ title: data?.payload?.message });
      }
    });
  };

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateDistributorOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getDistributorOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllDistributorOrdersForAdmin());
        setFormData(initialFormData);
        toast({ title: data?.payload?.message });
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
            <Label className="flex items-center gap-2">
              <Input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder={orderDetails?.totalAmount}
                className="w-24"
              />
              <Button
                onClick={handleUpdateTotalAmount}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Add
              </Button>
            </Label>
          </div>
          {orderDetails?.due && orderDetails.due.trim() !== "" && (
  <div className="flex mt-2 items-center justify-between">
    <p className="font-medium">Due</p>
    <Label>{orderDetails.due}</Label>
  </div>
)}

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
            <ul className="grid gap-3">
              {orderDetails?.distributorCartItems &&
                orderDetails?.distributorCartItems.map((item) => (
                  <li key={item.productId} className="flex items-center justify-between gap-4">
                    <span className="text-gray-800 break-words max-w-[200px]">Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={priceInputs[item.productId] || ""}
                        onChange={(e) => handlePriceChange(item.productId, e.target.value)}
                        placeholder={item.productprice}
                        className="w-24"
                      />
                      <Button
                        onClick={() => handleUpdatePrice(item.productId)}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Add
                      </Button>
                    </div>
                  </li>
                ))}
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
                ]
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

export default AdminDistributorOrderDetailsView;
