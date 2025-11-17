const DistributorProduct = require("../../models/DistributorProducts");


const addDistributorProduct = async (req, res) => {
  try {
    const {
    distributorId,
    distributorName,
    totalStock,
    productname
    } = req.body;

    const newlyCreatedDistributorProduct = new DistributorProduct({
     distributorId,
     distributorName,
     totalStock,
     productname
    });

    await newlyCreatedDistributorProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedDistributorProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const fetchAllDistributorProduct = async (req, res) => {
  try {
    const listOfDistributorProduct = await DistributorProduct.find({});
    res.status(200).json({
      success: true,
      data: listOfDistributorProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllProductByDistributor = async (req, res) => {
  try {
    const { distributorId } = req.params;

    const product = await DistributorProduct.find({ distributorId });

    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: "No leave found!",
        data:"newuse"
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const editDistributorProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
    distributorId,
    distributorName,
    totalStock,
    productname
    } = req.body;

    let findDistributorProduct = await DistributorProduct.findById(id);
    if (!findDistributorProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
      findDistributorProduct.distributorId = distributorId || findDistributorProduct.distributorId;
      findDistributorProduct.distributorName = distributorName || findDistributorProduct.distributorName;
      findDistributorProduct.totalStock = totalStock || findDistributorProduct.totalStock;
      findDistributorProduct.productname = productname || findDistributorProduct.productname;
    await findDistributorProduct.save();
    res.status(200).json({
      success: true,
      data: findDistributorProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteDistributorProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await DistributorProduct.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
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
    addDistributorProduct,
    getAllProductByDistributor,
    editDistributorProduct,
    deleteDistributorProduct,
    fetchAllDistributorProduct
  };
  

