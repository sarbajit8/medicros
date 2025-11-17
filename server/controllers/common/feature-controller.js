const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image,text } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,text
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const editFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,  
    } = req.body;

    let findProduct = await Feature.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteFeatureImages = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Feature.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "image not found",
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

module.exports = { addFeatureImage, getFeatureImages,deleteFeatureImages,editFeatureImage };
