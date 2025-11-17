const Employee = require("../../models/Employee");
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//add a new product
const addEmployee = async (req, res) => {
  try {
    const {
        image,
        name,
        username,
        usertype,
        usersubtype,
        password,
        designation,
        dateofbirth,
        dateofjoining,
        personalcontact,
        officialcontact,
        address,
        adharorvoter, 
        pan,   
        cheque,

    } = req.body;
    const newlyCreatedEmployee = new Employee({
        image,
        name,
        username,
        usertype,
        password,
        designation,
        usersubtype,
        dateofbirth,
        dateofjoining,
        personalcontact,
        officialcontact,
        address,
        adharorvoter, 
        pan,   
        cheque,
    });

    await newlyCreatedEmployee.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedEmployee,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//login the user


const loginEmployee = (req, res) => {
  const { email, password } = req.body;

  Employee.findOne({username:email})
    .then(checkUser  => {
      if (!checkUser ) {
        return res.json({
          success: false,
          message: "Employee doesn't exist!",
          
          
        });
      }

      // Simple string comparison (not secure)
      if (password !== checkUser .password) {
        return res.json({
          success: false,
          message: "Incorrect password! Please try again",
        });
      };
 const tokenemployee = jwt.sign(
      {
        id: checkUser ._id,
        name: checkUser .name,
        username: checkUser.username,
        usertype:checkUser.usertype,
        usersubtype:checkUser.usersubtype,
        pan:checkUser.pan,

      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("tokenemployee", tokenemployee, { httpOnly: true, secure: true }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: checkUser ._id,
        name: checkUser .name,
        username: checkUser.username,
        usertype:checkUser.usertype,
        usersubtype:checkUser.usersubtype,
        pan:checkUser.pan,

      },
    });
    
    })
    .catch(e => {
      console.error(e); // Use console.error for logging errors
      res.status(500).json({
        success: false,
        error: e.message,
        message: "An error occurred during login",
      });
    });
};

//authenticate employee login
const employeeMiddleware = async (req, res, next) => {
  const tokenemployee = req.cookies.tokenemployee;
  if (!tokenemployee)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  try {
    const decoded = jwt.verify(tokenemployee, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};


//fetch all employees

const fetchAllEmployee = async (req, res) => {
  try {
    const listOfEmployee = await Employee.find({});
    res.status(200).json({
      success: true,
      data: listOfEmployee,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


//edit a product
const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        image,
        name,
        username,
        usertype,
        usersubtype,
        password,
        designation,
        dateofbirth,
        dateofjoining,
        personalcontact,
        officialcontact,
        address,
        adharorvoter, 
        pan,   
        cheque,
    } = req.body;

    let findEmployee = await Employee.findById(id);
    if (!findEmployee)
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });

      findEmployee.name = name || findEmployee.name;
      findEmployee.username = username || findEmployee.username;
      findEmployee.usertype = usertype || findEmployee.usertype;
      findEmployee.usersubtype = usersubtype || findEmployee.usersubtype;      
      findEmployee.password = password || findEmployee.password;
      findEmployee.image = image || findEmployee.image;
      findEmployee.designation = designation || findEmployee.designation;
      findEmployee.dateofbirth = dateofbirth || findEmployee.dateofbirth;
      findEmployee.dateofjoining = dateofjoining || findEmployee.dateofjoining;
      findEmployee.personalcontact = personalcontact || findEmployee.personalcontact;
      findEmployee.officialcontact = officialcontact || findEmployee.officialcontact;
      findEmployee.address = address || findEmployee.address;
      findEmployee.adharorvoter = adharorvoter || findEmployee.adharorvoter;
      findEmployee.pan = pan || findEmployee.pan;
      findEmployee.cheque = cheque || findEmployee.cheque;

    await findEmployee.save();
    res.status(200).json({
      success: true,
      data: findEmployee,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee)
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });

    res.status(200).json({
      success: true,
      message: "Employee delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const logoutEmployee = (req, res) => {
  res.clearCookie("tokenemployee").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// ✅ Fetch all employees with usertype "delivery"
const fetchDeliveryEmployees = async (req, res) => {
  try {
    const deliveryEmployees = await Employee.find({ usertype: "delivery" });

    if (deliveryEmployees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No delivery employees found!",
      });
    }

    res.status(200).json({
      success: true,
      data: deliveryEmployees,
    });
  } catch (error) {
    console.error("Error fetching delivery employees:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching delivery employees.",
    });
  }
};



const getEmployeeImageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee by ID
    const employee = await Employee.findById(id);

    if (!employee || !employee.image) {
      return res.status(404).json({
        success: false,
        message: "Employee or image not found!",
      });
    }

    res.status(200).json({
      success: true,
      image: employee.image, // Returning the image URL or path
    });
  } catch (error) {
    console.error("Error fetching employee image:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching employee image.",
    });
  }
};




const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching employee data.",
    });
  }
};





module.exports = {
    addEmployee,
    fetchAllEmployee,
    editEmployee,
    deleteEmployee,
    loginEmployee,
    employeeMiddleware,
    logoutEmployee,
    fetchDeliveryEmployees,
    getEmployeeImageById,
    getEmployeeById

  };
  