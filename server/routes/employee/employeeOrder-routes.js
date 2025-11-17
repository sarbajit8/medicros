const express = require("express");
const { addEmployeeOrders,
     fetchAllEmployeeOrders, 
     editOrder,
      getOrderDetailsForEmployee,
       getAllOrdersByEmployee,
        updateEmployeeOrderStatus,
         updateDeliveryBoy,
          getEmployeeOrdersByDeliveryBoy,
         
          updateEmployeePaymentStatus,
          updateEmployeePaymentMethod,
          updateEmployeeOrderMRP,
          updateAllProductsInOrder,
          updateEmployeeOrderDue,  } = require("../../controllers/employee/employeeOrder-controller");



const router = express.Router();

router.post("/add", addEmployeeOrders);
router.get("/get", fetchAllEmployeeOrders);
router.get("/list/:employeeId", getAllOrdersByEmployee);
router.get("/details/:id", getOrderDetailsForEmployee);
router.post("/edit/:id", editOrder);
router.put("/update/:id", updateEmployeeOrderStatus);
router.put("/update-deliveryboy/:id", updateDeliveryBoy);
router.get("/deliveryboy/:deliveryboy", getEmployeeOrdersByDeliveryBoy);
router.put("/update-payment-status/:id", updateEmployeePaymentStatus);
router.put("/update-payment-method/:id", updateEmployeePaymentMethod);
router.put("/update-mrp/:id", updateEmployeeOrderMRP);
router.put("/update-products/:id", updateAllProductsInOrder); 

router.put("/update-due/:id", updateEmployeeOrderDue); // ✅ New route




module.exports = router;
