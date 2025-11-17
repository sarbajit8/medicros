const Gallery = require("../../models/Gallery");

const addGlleryItems = async (req, res) => {
  try {
    const {title,designation,image,type } = req.body;

    console.log(image,title, "image");

    const galleryItems = new Gallery({
        title,
        designation,
        image,
        type
    });

    await galleryItems.save();
    res.status(201).json({
      success: true,
      data: galleryItems,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const getGlleryItems = async (req, res) => {
  try {
    const data = await Gallery.find({});

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const editGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,  
      designation,
      type
    } = req.body;

    let findProduct = await Gallery.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.image = image || findProduct.image;
    findProduct.designation = designation || findProduct.designation;
    findProduct.type = type || findProduct.type;


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





const deleteGallery= async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Gallery.findByIdAndDelete(id);

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



module.exports = { addGlleryItems,editGallery,getGlleryItems,deleteGallery,};
