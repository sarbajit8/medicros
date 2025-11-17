import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployeeOrders, getOrderDetailsForEmployee, updateEmployeeDeliveryBoy, updateEmployeeOrderStatus, updateEmployeeOrderMRP, updateAllProductsInOrder } from "@/store/employee/employeeOrder-slice";
import { toast } from "@/hooks/use-toast";
import { fetchDeliveryEmployees } from "@/store/admin/employee-slice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { addOrUpdateDeleveryAlert } from "@/store/admin/deleveryalert-slice";

const initialFormData = {
  orderstatus: "",
};

function EmployeeOrderDetails({ employeeOrderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [deliveryBoy, setDeliveryBoy] = useState(""); 
  const [mrp, setMrp] = useState(employeeOrderDetails?.mrp || ""); // ✅ Track MRP input
  const dispatch = useDispatch();
  const { DeliveryEmployeeList } = useSelector(state => state.adminEmployee);

  // ✅ Function to update order status
  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(updateEmployeeOrderStatus({ id: employeeOrderDetails?._id, orderstatus: status }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForEmployee(employeeOrderDetails?._id));
          dispatch(fetchAllEmployeeOrders());
          setFormData(initialFormData);
          toast({
            title: data?.payload?.message,
          });
        }
      });
  }

  // ✅ Function to update delivery boy
const handleUpdateDeliveryBoy = () => {
  if (!deliveryBoy.trim()) {
    toast({ title: "Please enter a valid delivery boy name!" });
    return;
  }

  const selectedDeliveryBoy = DeliveryEmployeeList.find(
    (emp) => emp.name === deliveryBoy
  );

  if (!selectedDeliveryBoy) {
    toast({ title: "Selected delivery boy not found!" });
    return;
  }

  dispatch(updateEmployeeDeliveryBoy({
    id: employeeOrderDetails?._id,
    deliveryboy: selectedDeliveryBoy.name,
  })).then((data) => {
    if (data?.payload?.success) {
      dispatch(getOrderDetailsForEmployee(employeeOrderDetails?._id));
      dispatch(fetchAllEmployeeOrders());
      setDeliveryBoy("");
      toast({ title: data?.payload?.message });

      // ✅ Add delivery alert of type "employeeorders"
      dispatch(addOrUpdateDeleveryAlert({
        username: selectedDeliveryBoy.name,
        userid: selectedDeliveryBoy._id,
        type: "employeeorders",
      }));
    }
  });
};






  const [updatedPrices, setUpdatedPrices] = useState({});

  // Handle price changes correctly
  const handlePriceChange = (key, value) => {
    setUpdatedPrices((prev) => ({
      ...prev,
      [key]: value, // Correctly update state for each price input
    }));
  };

  // Handle price update submission
  const handleUpdatePrices = () => {
    if (Object.keys(updatedPrices).length > 0) {
      dispatch(
        updateAllProductsInOrder({
          id: employeeOrderDetails._id,
          updatedProducts: updatedPrices,
        })
      ).then(() => {
        toast({ title: "Prices updated successfully!" });

      });
    }
  };


  // ✅ Function to update MRP
  const handleUpdateMRP = () => {
    if (!mrp.trim() || isNaN(mrp) || parseFloat(mrp) <= 0) {
      toast({ title: "Please enter a valid MRP!", variant: "destructive" });
      return;
    }

    dispatch(updateEmployeeOrderMRP({ id: employeeOrderDetails?._id, mrp }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForEmployee(employeeOrderDetails?._id));
          dispatch(fetchAllEmployeeOrders());
          toast({
            title: "MRP updated successfully!",
          });
        }
      });
  };

  useEffect(() => {
    dispatch(fetchDeliveryEmployees());
  }, [dispatch]);

  return (
    <DialogContent className="max-w-[95vw] sm:max-w-[600px] h-[80vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{employeeOrderDetails?._id}</Label>
          </div>
          <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{employeeOrderDetails?._id}</Label>
          </div>
       <div>
      {Array.from({ length: 30 }, (_, index) => {
        const productKey = `product${index + 1}`;
        const quantityKey = `quantity${index + 1}`;
        const priceKey = `price${index + 1}`;

        return employeeOrderDetails?.[productKey] ? (
          <div key={index} className="mt-4 p-4 border rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-medium">Product {index + 1}</p>
              <Label className="break-words max-w-[200px] bg-gray-100 p-2">
                {employeeOrderDetails?.[productKey]}
              </Label>
            </div>
          

            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Quantity</p>
              <Label>{employeeOrderDetails?.[quantityKey]}</Label>
            </div>

            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Price</p>
              <Input
                type="text"
                className="border rounded p-1 w-[100px]"
                value={updatedPrices[priceKey] ?? employeeOrderDetails?.[priceKey] ?? ""}
                onChange={(e) => handlePriceChange(priceKey, e.target.value)}
              />
            </div>
          </div>
        ) : null;
      })}

      <Button
        className="mt-4 bg-blue-600 text-white w-full"
        onClick={handleUpdatePrices}
      >
        Update Prices
      </Button>
    </div>
    {employeeOrderDetails?.due && employeeOrderDetails.due.trim() !== "" && (
  <div className="flex mt-2 items-center justify-between">
    <p className="font-medium">Due</p>
    <Label>{employeeOrderDetails.due}</Label>
  </div>
)}

     <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Customer Name</p>
            <Label className="break-words max-w-[200px] break-all">{employeeOrderDetails?.customername}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Customer Mobile</p>
            <Label  className="break-words max-w-[200px] break-all">{employeeOrderDetails?.customermobile}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Customer Email</p>
            <Label  className="break-words max-w-[200px] break-all">{employeeOrderDetails?.customeremail}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Shop Name</p>
            <Label  className="break-words max-w-[200px] break-all">{employeeOrderDetails?.shopname}</Label>
          </div>

         
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">PAN/GST</p>
            <Label>{employeeOrderDetails?.pangst}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Drag Licence</p>
            <Label>{employeeOrderDetails?.draglicence}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>{employeeOrderDetails?.orderstatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Price</p>
            <Label>{employeeOrderDetails?.mrp}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Date</p>
            <Label>
              {employeeOrderDetails?.orderDate ? employeeOrderDetails.orderDate.split("T")[0] : "N/A"}
            </Label>
          </div>
        </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="text-gray-800 break-words max-w-[200px]">PAN/GST</p>
            <Label className="text-gray-800 break-words max-w-[200px]">{employeeOrderDetails?.pangst}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Drug Licence</p>
            <Label className="text-gray-800 break-words max-w-[200px]">{employeeOrderDetails?.draglicence}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>{employeeOrderDetails?.orderstatus}</Label>
          </div>

          {/* ✅ Update MRP Section */}
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Price</p>
            <Label className="flex items-center gap-2">
              <Input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder={employeeOrderDetails?.mrp}
                className="w-full border rounded-md p-2"
              />
              <Button onClick={handleUpdateMRP} className="bg-blue-500 text-white hover:bg-blue-600">
                Update
              </Button>
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Date</p>
            <Label>
              {employeeOrderDetails?.orderDate ? employeeOrderDetails.orderDate.split("T")[0] : "N/A"}
            </Label>
          </div>

          {/* ✅ Assign Delivery Boy Section */}
          <div>
            <p className="font-medium">Delivery Boy</p>
            <Label className="flex items-center gap-2">
              <select
                value={deliveryBoy}
                onChange={(e) => setDeliveryBoy(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">{employeeOrderDetails?.deliveryboy || "Select Delivery Boy"}</option>
                {DeliveryEmployeeList.map((delivery) => (
                  <option key={delivery.name} value={delivery.name}>
                    {delivery.name}
                  </option>
                ))}
              </select>
              <Button onClick={handleUpdateDeliveryBoy} className="bg-blue-500 text-white hover:bg-blue-600">
                Assign
              </Button>
            </Label>
          </div>
        </div>
        <Separator />
        
        {/* ✅ Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <ul className="text-gray-800 break-words max-w-[200px]">{employeeOrderDetails?.address}</ul>
          </div>
        </div>

        {/* ✅ Update Order Status Form */}
        <div>
          <CommonForm
            formControls={[
              { label: "Order Status", name: "status", componentType: "select",
                 options: [{ id: "In_process", label: "In Process" },{ id: "Confirmed", label: "Confirmed" },{ id: "Ready_for_delivery", label: "Ready for Delivery" }, { id: "Outfor_delivery", label: "Out For Delivery" },{ id: "Delivered", label: "Delivered" }, { id: "Rejected", label: "Rejected" }
                  
                 ] }]}

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

export default EmployeeOrderDetails;
