const QuickOrder  = require("../../models/Quickorder");


const addQuickOrder = async (req, res) => {
    try {
      const { name, shopname, gst, dl, phone, address,requirement} = req.body;
  
      // Validation (Ensure required fields are provided)
      if (!name || !shopname || !phone) {
        return res.status(400).json({
          success: false,
          message: "Name, Shop Name, and Phone are required fields.",
        });
      }
  
      const newQuickOrder = new QuickOrder({
        name,
        shopname,
        gst,
        dl,
        phone,
       address,
       requirement
      });
  
      await newQuickOrder.save();
  
      res.status(201).json({
        success: true,
        message: "Quick Order added successfully!",
        data: newQuickOrder,
      });
    } catch (error) {
      console.error("Error adding Quick Order:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while adding Quick Order.",
      });
    }
  };

  
  const getAllQuickOrders = async (req, res) => {
    try {
      const quickOrders = await QuickOrder.find().sort({ createdAt: -1 }); // Fetches latest first
  
      res.status(200).json({
        success: true,
        data: quickOrders,
      });
    } catch (error) {
      console.error("Error fetching Quick Orders:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching Quick Orders.",
      });
    }
  };
  

  module.exports = { addQuickOrder, getAllQuickOrders };
