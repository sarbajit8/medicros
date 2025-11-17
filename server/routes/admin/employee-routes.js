const express = require("express");
const { addEmployee,
        editEmployee, 
        deleteEmployee, 
        fetchAllEmployee, 
        loginEmployee,
        employeeMiddleware,
        logoutEmployee,
        fetchDeliveryEmployees,
        getEmployeeImageById,
        getEmployeeById
    } = require("../../controllers/admin/employee-controller");


const router = express.Router();

router.post("/add", addEmployee);
router.put("/edit/:id", editEmployee);
router.delete("/delete/:id", deleteEmployee);
router.get("/get", fetchAllEmployee);
router.post("/login", loginEmployee);
router.post("/logout", logoutEmployee);
router.get("/delivery-employees", fetchDeliveryEmployees);
router.get("/employeeimage/:id", getEmployeeImageById);
router.get("/employee/:id", getEmployeeById);

router.get("/check-auth", employeeMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  });


module.exports = router;
