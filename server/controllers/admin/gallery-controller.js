const Feature = require("../../models/Feature");

const addGlleryItems = async (req, res) => {
  try {
    const {title,designation, image, type } = req.body;

    console.log(image,title, "image");

    const galleryItems = new Gallery({
        title,
        designation,
        image,
        type,
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



module.exports = { addGlleryItems,getGlleryItems};
