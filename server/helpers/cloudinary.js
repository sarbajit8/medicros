const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: "dowy8hfnp",
    api_key: "894688631488246",
    api_secret: "ZgS_jatMzYspxuvJYIElnwP5bRM",
    // cloud_name: "dkdnjzpqj",
    // api_key: "118165385957989",
    // api_secret: "gWWplw05cduWNSla3N8CXSRE8lo",
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };