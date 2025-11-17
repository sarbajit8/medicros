const Pcd = require("../../models/PcdManufacturers");

const addPcd = async (req, res) => {
  try {
    const {
      image,
      name,
      company,
      username,
      address,
      pin,
      gst,
      dl,
      email,
      mobile,
    } = req.body;

    // Check for existing username
    const existingPcd = await Pcd.findOne({ username });
    if (existingPcd) {
      return res.json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    const newlyCreatedPcd = new Pcd({
      image,
      name,
      company,
      username,
      address,
      pin,
      gst,
      dl,
      email,
      mobile,
    });

    await newlyCreatedPcd.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedPcd,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

const fetchAllPcd = async (req, res) => {
  try {
    const listOfPcd = await Pcd.find({});
    res.status(200).json({
      success: true,
      data: listOfPcd,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};



const editPcd = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      name,
      company,
      username,
      address,
      pin,
      gst,
      dl,
      email,
      mobile,
    } = req.body;

    const findPcd = await Pcd.findById(id);
    if (!findPcd) {
      return res.status(404).json({
        success: false,
        message: "Pcd not found",
      });
    }
    findPcd.image = image || findPcd.image;
    findPcd.name = name || findPcd.name;
    findPcd.company = company || findPcd.company;
    findPcd.username = username || findPcd.username;
    findPcd.address = address || findPcd.address;
    findPcd.pin = pin || findPcd.pin;
    findPcd.gst = gst || findPcd.gst;
    findPcd.dl = dl || findPcd.dl;
    findPcd.email = email || findPcd.email;
    findPcd.mobile = mobile || findPcd.mobile;

    await findPcd.save();

    res.status(200).json({
      success: true,
      data: findPcd,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};


const deletePcd = async (req, res) => {
  try {
    const { id } = req.params;
    const pcd = await Pcd.findByIdAndDelete(id);

    if (!pcd)
      return res.status(404).json({
        success: false,
        message: "Pcd not found",
      });

    res.status(200).json({
      success: true,
      message: "Pcd delete successfully",
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
    addPcd,
    fetchAllPcd,
    editPcd,
    deletePcd   
  };
  