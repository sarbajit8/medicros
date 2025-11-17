const Category = require("../../models/Category");


const addCategory = async (req, res) => {
  try {
    const {
      image,
      name,
      
    } = req.body;

    const newlyCreatedCategory = new Category({
      image,
      name
    });

    await newlyCreatedCategory.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


const fetchAllCategorys= async (req, res) => {
  try {
    const listOfCategory = await Category.find({});
    res.status(200).json({
      success: true,
      data: listOfCategory,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Category.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Category delete successfully",
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
    addCategory,
    fetchAllCategorys,
    deleteCategory
  };
  