const Distributor = require("../../models/Distributor");

const addDistributor = async (req, res) => {
  try {
    const {
      image,
      name,
      companyname, 
      username,
      address,
      pin,
      gst,         
      dl,          
      email,       
      mobile,
    } = req.body;

    const existingDistributor = await Distributor.findOne({ username });
    if (existingDistributor) {
      return res.json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    const newlyCreatedDistributor = new Distributor({
      image,
      name,
      companyname, 
      username,
      address,
      pin,
      gst,         
      dl,          
      email,       
      mobile,
    });

    await newlyCreatedDistributor.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedDistributor,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

const fetchAllDistributor = async (req, res) => {
  try {
    const distributors = await Distributor.find({});
    res.status(200).json({
      success: true,
      data: distributors,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const editDistributor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      name,
      companyname,
      username,
      address,
      pin,
      gst,
      dl,
      email,
      mobile
    } = req.body;

    let distributor = await Distributor.findById(id);
    if (!distributor) {
      return res.status(404).json({
        success: false,
        message: "Distributor not found",
      });
    }

    distributor.image = image || distributor.image;
    distributor.name = name || distributor.name;
    distributor.companyname = companyname || distributor.companyname;
    distributor.username = username || distributor.username;
    distributor.address = address || distributor.address;
    distributor.pin = pin || distributor.pin;
    distributor.gst = gst || distributor.gst;
    distributor.dl = dl || distributor.dl;
    distributor.email = email || distributor.email;
    distributor.mobile = mobile || distributor.mobile;

    await distributor.save();

    res.status(200).json({
      success: true,
      data: distributor,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const deleteDistributor = async (req, res) => {
  try {
    const { id } = req.params;
    const distributor = await Distributor.findByIdAndDelete(id);

    if (!distributor) {
      return res.status(404).json({
        success: false,
        message: "Distributor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Distributor deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  addDistributor,
  fetchAllDistributor,
  editDistributor,
  deleteDistributor
};
