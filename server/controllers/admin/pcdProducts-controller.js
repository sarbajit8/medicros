const PcdProduct = require("../../models/PcdProducts");


const addPcdProduct = async (req, res) => {
  try {
    const {
        PcdId,
    distributorName,
    totalStock,
    productname
    } = req.body;

    const newlyCreatedPcdProduct = new PcdProduct({
        PcdId,
     distributorName,
     totalStock,
     productname
    });

    await newlyCreatedPcdProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedPcdProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const fetchAllPcdProduct = async (req, res) => {
  try {
    const listOfPcdProduct = await PcdProduct.find({});
    res.status(200).json({
      success: true,
      data: listOfPcdProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllProductByPcd = async (req, res) => {
  try {
    const { PcdId } = req.params;

    const product = await PcdProduct.find({ PcdId: PcdId });

    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: "No products found!",
        data: "newuse"
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
      message: "Some error occurred!",
    });
  }
};


const editPcdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
    PcdId,
    distributorName,
    totalStock,
    productname
    } = req.body;

    let findPcdProduct = await PcdProduct.findById(id);
    if (!findPcdProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
      findPcdProduct.distributorId = PcdId || findPcdProduct.distributorId;
      findPcdProduct.distributorName = distributorName || findPcdProduct.distributorName;
      findPcdProduct.totalStock = totalStock || findPcdProduct.totalStock;
      findPcdProduct.productname = productname || findPcdProduct.productname;
    await findPcdProduct.save();
    res.status(200).json({
      success: true,
      data: findPcdProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deletePcdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await PcdProduct.findByIdAndDelete(id);

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
    addPcdProduct,
    getAllProductByPcd,
    editPcdProduct,
    deletePcdProduct,
    fetchAllPcdProduct
  };
  

