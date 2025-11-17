const EmployeeCustomer = require("../../models/EmployeeCustomer");


const addEmployeeCustomer = async (req, res) => {
  try {
    const {
        name,
        employeeid,
        mobile,
        email,
        shopname,
        address,
        gst,
        dl,
    } = req.body;

    const newlyCreatedEmployeeCustomer = new EmployeeCustomer({
        name,
        employeeid,
        mobile,
        email,
        shopname,
        address,
        gst,
        dl,
    });

    await newlyCreatedEmployeeCustomer.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedEmployeeCustomer,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllCustomerByEmployee = async (req, res) => {
  try {
    const { employeeid } = req.params;

    const leaves = await EmployeeCustomer.find({ employeeid });

    if (!leaves.length) {
      return res.status(404).json({
        success: false,
        message: "No leave found!",
        data:"newuse"
      });
    }

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const editEmployeeCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        name,
        employeeid,
        mobile,
        email,
        shopname,
        address,
        gst,
        dl,
    } = req.body;

    let findEmployeeCustomer = await EmployeeCustomer.findById(id);
    if (!findEmployeeCustomer)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

      findEmployeeCustomer.name = name || findEmployeeCustomer.name;
      findEmployeeCustomer.employeeid = employeeid || findEmployeeCustomer.employeeid;
      findEmployeeCustomer.mobile = mobile || findEmployeeCustomer.mobile;
      findEmployeeCustomer.email = email || findProduct.email;
      findEmployeeCustomer.shopname = shopname || findProduct.shopname;
      findEmployeeCustomer.address = address || findProduct.address;
      findEmployeeCustomer.gst = gst || findProduct.gst;
      findEmployeeCustomer.dl = dl || findProduct.dl;




    await findEmployeeCustomer.save();
    res.status(200).json({
      success: true,
      data: findEmployeeCustomer,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteEmployeeCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await EmployeeCustomer.findByIdAndDelete(id);

    if (!salary)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "salary slip delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
    addEmployeeCustomer,
    getAllCustomerByEmployee,
    editEmployeeCustomer,
    deleteEmployeeCustomer
  };
  

