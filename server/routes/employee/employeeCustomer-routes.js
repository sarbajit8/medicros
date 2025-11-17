const express = require("express");
const { addEmployeeCustomer, getAllCustomerByEmployee, editEmployeeCustomer, deleteEmployeeCustomer } = require("../../controllers/employee/employeeCustomer-controller");


const router = express.Router();

// 🔹 Add a new Employee Customer
router.post("/add", addEmployeeCustomer);

// 🔹 Get all customers for a specific employee
router.get("/list/:employeeid", getAllCustomerByEmployee);

// 🔹 Edit an Employee Customer by ID
router.put("/edit/:id", editEmployeeCustomer);

// 🔹 Delete an Employee Customer by ID
router.delete("/delete/:id", deleteEmployeeCustomer);

module.exports = router;
  


