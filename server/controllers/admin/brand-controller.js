const Brand = require("../../models/Brand");


const addBrand = async (req, res) => {
  try {
    const {
      image,
      name,
      type,
      type2
      
    } = req.body;

    const newlyCreatedBrand = new Brand({
      image,
      name,
      type,
      type2
    });

    await newlyCreatedBrand.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedBrand,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


const fetchAllBrands = async (req, res) => {
  try {
    const listOfBrands = await Brand.find({});
    res.status(200).json({
      success: true,
      data: listOfBrands,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Brand.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, type, type2 } = req.body;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { image, name, type, type2 },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating brand",
    });
  }
};

module.exports = {
    addBrand,
    fetchAllBrands,
    deleteBrand,
    updateBrand
  };
  