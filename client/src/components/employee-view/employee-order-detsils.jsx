import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function EmployeeOrderDetailsView({ employeeOrderDetails }) {
  return (
    <DialogContent 
      className="max-w-[95vw] sm:max-w-[600px] h-[80vh] overflow-x-auto p-4 sm:p-6 rounded-lg shadow-lg"
    >
      {/* Scrollable Container */}
      <div className="grid gap-6 overflow-y-auto max-h-[450px] sm:max-h-[550px] p-4 sm:p-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{employeeOrderDetails?._id}</Label>
          </div>

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
          {employeeOrderDetails?.due && employeeOrderDetails?.due.trim() !== "" && (
  <div className="flex mt-2 items-center justify-between">
    <p className="font-medium">Due</p>
    <Label>{employeeOrderDetails.due}</Label>
  </div>
)}

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Date</p>
            <Label>
              {employeeOrderDetails?.orderDate ? employeeOrderDetails.orderDate.split("T")[0] : "N/A"}
            </Label>
          </div>
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
                      <Label className="break-words max-w-[200px] bg-gray-100 p-2" >{employeeOrderDetails?.[quantityKey]}</Label>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-medium">price {index + 1}</p>
                      <Label className="break-words max-w-[200px] bg-gray-100 p-2">
                        {employeeOrderDetails?.[priceKey]}
                      </Label>
                    </div>
        
                   
                  </div>
                ) : null;
              })}
        
              {/* <Button
                className="mt-4 bg-blue-600 text-white w-full"
                onClick={handleUpdatePrices}
              >
                Update Prices
              </Button> */}
            </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <p className="break-words max-w-[200px] break-all bg-gray-100 p-2">
              {employeeOrderDetails?.address}
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default EmployeeOrderDetailsView;
