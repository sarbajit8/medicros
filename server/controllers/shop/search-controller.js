const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    let { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be a string",
      });
    }

    // ✅ Normalize keyword (Remove spaces & lowercase)
    keyword = keyword.toLowerCase().replace(/\s+/g, "");

    // ✅ Create a case-insensitive regex with space normalization
    const regEx = new RegExp(keyword.split("").join("\\s*"), "i");

    // ✅ Search across multiple fields while normalizing spaces
    const searchResults = await Product.find({
      $or: [
        { title: { $regex: regEx } },
        { description: { $regex: regEx } },
        { category: { $regex: regEx } },
        { brand: { $regex: regEx } },
      ],
    });

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while searching",
    });
  }
};

module.exports = { searchProducts };
