const EmployeeOrder = require("../../models/EmployeeOrder");


const addEmployeeOrders = async (req, res) => {
  try {
    const {
    username,
    employeeId,
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15,
    product16,
    product17,
    product18,
    product19,
    product20,
    product21,
    product22,
    product23,
    product24,
    product25,
    product26,
    product27,
    product28,
    product29,
    product30,
    quantity1,
    quantity2,
    quantity3,
    quantity4,
    quantity5,
    quantity6,
    quantity7,
    quantity8,
    quantity9,
    quantity10,
    quantity11,
    quantity12,
    quantity13,
    quantity14,
    quantity15,
    quantity16,
    quantity17,
    quantity18,
    quantity19,
    quantity20,
    quantity21,
    quantity22,
    quantity23,
    quantity24,
    quantity25,
    quantity26,
    quantity27,
    quantity28,
    quantity29,
    quantity30,
    address,
    pangst,
    draglicence,
    orderstatus,
    mrp,
    orderDate,
    orderUpdateDate,
    paymentstatus,
    paymentmethod,
    customername,
    customermobile,
    customeremail,
    shopname
    } = req.body;

    const newlyCreatedProduct = new EmployeeOrder({
      username,
      employeeId,
      product1,
      product2,
      product3,
      product4,
      product5,
      product6,
      product7,
      product8,
      product9,
      product10,
      product11,
      product12,
      product13,
      product14,
      product15,
      product16,
      product17,
      product18,
      product19,
      product20,
      product21,
      product22,
      product23,
      product24,
      product25,
      product26,
      product27,
      product28,
      product29,
      product30,
      quantity1,
      quantity2,
      quantity3,
      quantity4,
      quantity5,
      quantity6,
      quantity7,
      quantity8,
      quantity9,
      quantity10,
      quantity11,
      quantity12,
      quantity13,
      quantity14,
      quantity15,
      quantity16,
      quantity17,
      quantity18,
      quantity19,
      quantity20,
      quantity21,
      quantity22,
      quantity23,
      quantity24,
      quantity25,
      quantity26,
      quantity27,
      quantity28,
      quantity29,
      quantity30,
      address,
      pangst,
      draglicence,
      orderstatus,
      mrp,
      orderDate,
      orderUpdateDate,
      paymentstatus,
      paymentmethod,
      customername,
      customermobile,
      customeremail,
      shopname
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllOrdersByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const orders = await EmployeeOrder.find({ employeeId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
        data:"newuse"
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsForEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await EmployeeOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const fetchAllEmployeeOrders = async (req, res) => {
  try {
    const listOfOrders = await EmployeeOrder.find({});
    res.status(200).json({
      success: true,
      data: listOfOrders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
    employeeId,
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15,
    product16,
    product17,
    product18,
    product19,
    product20,
    product21,
    product22,
    product23,
    product24,
    product25,
    product26,
    product27,
    product28,
    product29,
    product30,
    quantity1,
    quantity2,
    quantity3,
    quantity4,
    quantity5,
    quantity6,
    quantity7,
    quantity8,
    quantity9,
    quantity10,
    quantity11,
    quantity12,
    quantity13,
    quantity14,
    quantity15,
    quantity16,
    quantity17,
    quantity18,
    quantity19,
    quantity20,
    quantity21,
    quantity22,
    quantity23,
    quantity24,
    quantity25,
    quantity26,
    quantity27,
    quantity28,
    quantity29,
    quantity30,
    address,
    pangst,
    draglicence,
    orderstatus,
    mrp,
    orderDate,
    orderUpdateDate,
    paymentstatus,
    paymentmethod,
    customername,
    customermobile,
    customeremail,
    shopname
    } = req.body;

    let findOrder = await EmployeeOrder.findById(id);
    if (!findOrder)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
      findOrder.username = username || findOrder.username;
      findOrder.employeeId = employeeId || findOrder.employeeId;
      findOrder.product1 = product1 || findOrder.product1;
      findOrder.product2 = product2 || findOrder.product2;
      findOrder.product3 = product3 || findOrder.product3;
      findOrder.product4 = product4 || findOrder.product4;
      findOrder.product5 = product5 || findOrder.product5;
      findOrder.product6 = product6 || findOrder.product6;
      findOrder.product7 = product7 || findOrder.product7;
      findOrder.product8 = product8 || findOrder.product8;
      findOrder.product9 = product9 || findOrder.product9;
      findOrder.product10 = product10 || findOrder.product10;
      findOrder.product11 = product11 || findOrder.product11;
      findOrder.product12 = product12 || findOrder.product12;
      findOrder.product13 = product13 || findOrder.product13;
      findOrder.product14 = product14 || findOrder.product14;
      findOrder.product15 = product15 || findOrder.product15;
      findOrder.product16 = product16 || findOrder.product16;
      findOrder.product17 = product17 || findOrder.product17;
      findOrder.product18 = product18 || findOrder.product18;
      findOrder.product19 = product19 || findOrder.product19;
      findOrder.product20 = product20 || findOrder.product20;
      findOrder.product21 = product21 || findOrder.product21;
      findOrder.product22 = product22 || findOrder.product22;
      findOrder.product23 = product23 || findOrder.product23;
      findOrder.product24 = product24 || findOrder.product24;
      findOrder.product25 = product25 || findOrder.product25;
      findOrder.product26 = product26 || findOrder.product26;
      findOrder.product27 = product27 || findOrder.product27;
      findOrder.product28 = product28 || findOrder.product28;
      findOrder.product29 = product29 || findOrder.product29;
      findOrder.product30 = product30 || findOrder.product30;

      findOrder.quantity1 = quantity1 || findOrder.quantity1;
      findOrder.quantity2 = quantity2 || findOrder.quantity2;
      findOrder.quantity3 = quantity3 || findOrder.quantity3;
      findOrder.quantity4 = quantity4 || findOrder.quantity4;
      findOrder.quantity5 = quantity5 || findOrder.quantity5;
      findOrder.quantity6 = quantity6 || findOrder.quantity6;
      findOrder.quantity7 = quantity7 || findOrder.quantity7;
      findOrder.quantity8 = quantity8 || findOrder.quantity8;
      findOrder.quantity9 = quantity9 || findOrder.quantity9;
      findOrder.quantity10 = quantity10 || findOrder.quantity10;
      findOrder.quantity11 = quantity11 || findOrder.quantity11;
      findOrder.quantity12 = quantity12 || findOrder.quantity12;
      findOrder.quantity13 = quantity13 || findOrder.quantity13;
      findOrder.quantity14 = quantity14 || findOrder.quantity14;
      findOrder.quantity15 = quantity15 || findOrder.quantity15;
      findOrder.quantity16 = quantity16 || findOrder.quantity16;
      findOrder.quantity17 = quantity17 || findOrder.quantity17;
      findOrder.quantity18 = quantity18 || findOrder.quantity18;
      findOrder.quantity19 = quantity19 || findOrder.quantity19;
      findOrder.quantity20 = quantity20 || findOrder.quantity20;
      findOrder.quantity21 = quantity21 || findOrder.quantity21;
      findOrder.quantity22 = quantity22 || findOrder.quantity22;
      findOrder.quantity23 = quantity23 || findOrder.quantity23;
      findOrder.quantity24 = quantity24 || findOrder.quantity24;
      findOrder.quantity25 = quantity25 || findOrder.quantity25;
      findOrder.quantity26 = quantity26 || findOrder.quantity26;
      findOrder.quantity27 = quantity27 || findOrder.quantity27;
      findOrder.quantity28 = quantity28 || findOrder.quantity28;
      findOrder.quantity29 = quantity29 || findOrder.quantity29;
      findOrder.quantity30 = quantity30 || findOrder.quantity30;

      findOrder.category = address || findOrder.address;
      findOrder.brand = pangst || findOrder.pangst;
      findOrder.draglicence = draglicence || findOrder.draglicence;
      findOrder.orderstatus = orderstatus || findOrder.orderstatus;
      findOrder.mrp = mrp || findOrder.mrp;
      findOrder.orderDate = orderDate || findOrder.orderDate;
      findOrder.orderUpdateDate = orderUpdateDate || findOrder.orderUpdateDate;
      findOrder.paymentstatus = paymentstatus || findOrder.paymentstatus;
      findOrder.paymentmethod = paymentmethod || findOrder.paymentmethod;
      findOrder.customername = customername || findOrder.customername;

      findOrder.customermobile = customermobile || findOrder.customermobile;
      findOrder.customeremail = customeremail || findOrder.customeremail;
      findOrder.shopname = shopname || findOrder.shopname;

      

 

    await findOrder.save();
    res.status(200).json({
      success: true,
      data: findOrder,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


const updateEmployeeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderstatus } = req.body;

    const order = await EmployeeOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await EmployeeOrder.findByIdAndUpdate(id, { orderstatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const { deliveryboy } = req.body; // New Delivery Boy Name

    // ✅ Validate input
    if (!deliveryboy || typeof deliveryboy !== "string" || deliveryboy.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy name provided!",
      });
    }

    // ✅ Find the order
    const order = await EmployeeOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // ✅ Update the delivery boy
    order.deliveryboy = deliveryboy;

    // ✅ Save the updated order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery boy updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error in updateDeliveryBoy:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating the delivery boy!",
    });
  }
};
const getEmployeeOrdersByDeliveryBoy = async (req, res) => {
  try {
    const { deliveryboy } = req.params; // Extract delivery boy name from request params

    // ✅ Find all orders assigned to this delivery boy
    const orders = await EmployeeOrder.find({ deliveryboy });

    // ✅ If no orders found, return a 404 response
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this delivery boy!",
      });
    }

    // ✅ Return the list of orders
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders for delivery boy:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching orders!",
    });
  }
};


const updateEmployeePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentstatus } = req.body;

    // Validate input
    if (!paymentstatus) {
      return res.status(400).json({
        success: false,
        message: "Payment status is required!",
      });
    }

    // Find the order
    const order = await EmployeeOrder.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update payment status
    order.paymentstatus = paymentstatus;
    order.orderUpdateDate = new Date(); // Update timestamp

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating payment status!",
    });
  }
};

const updateEmployeePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentmethod } = req.body;

    // Validate input
    if (!paymentmethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required!",
      });
    }

    // Find the order
    const order = await EmployeeOrder.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update payment method
    order.paymentmethod = paymentmethod;
    order.orderUpdateDate = new Date(); // Update timestamp

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment method updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating payment method!",
    });
  }
};




const updateEmployeeOrderMRP = async (req, res) => {
  try {
    const { id } = req.params;
    const { mrp } = req.body;

    // Validate input
    if (!mrp || isNaN(mrp) || mrp <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid MRP value is required!",
      });
    }

    // Find the order
    const order = await EmployeeOrder.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update MRP
    order.mrp = mrp;
    order.orderUpdateDate = new Date(); // Update timestamp

    await order.save();

    res.status(200).json({
      success: true,
      message: "MRP updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error updating MRP:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating MRP!",
    });
  }
};





const updateAllProductsInOrder = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const updatedProducts = req.body; // Contains the updated product & quantity values

    // Find the order
    let order = await EmployeeOrder.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Loop through product and quantity fields (1-30) to update only existing ones
    for (let i = 1; i <= 30; i++) {
      if (updatedProducts[`product${i}`] !== undefined) {
        order[`product${i}`] = updatedProducts[`product${i}`];
      }
      if (updatedProducts[`quantity${i}`] !== undefined) {
        order[`quantity${i}`] = updatedProducts[`quantity${i}`];
      }
      if (updatedProducts[`price${i}`] !== undefined) {
        order[`price${i}`] = updatedProducts[`price${i}`];
      }
    }

    // Update order timestamp
    order.orderUpdateDate = new Date();

    // Save the updated order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order products updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error updating order products:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating order products!",
    });
  }
};


const updateEmployeeOrderDue = async (req, res) => {
  try {
    const { id } = req.params;
    const { due } = req.body;

    // Validate input
    if (due === undefined || due === null || isNaN(due)) {
      return res.status(400).json({
        success: false,
        message: "Invalid due amount provided!",
      });
    }

    // Find the order
    const order = await EmployeeOrder.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update due
    order.due = due;
    order.orderUpdateDate = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Due amount updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error updating due amount:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating due amount!",
    });
  }
};



module.exports = {
  addEmployeeOrders,
  fetchAllEmployeeOrders,
  editOrder,
  getOrderDetailsForEmployee,
  getAllOrdersByEmployee,
  updateEmployeeOrderStatus,
  updateDeliveryBoy,
  getEmployeeOrdersByDeliveryBoy,
  updateEmployeePaymentStatus,  // ✅ Added
  updateEmployeePaymentMethod,   // ✅ Added
  updateEmployeeOrderMRP,
  updateAllProductsInOrder,
  updateEmployeeOrderDue
};










