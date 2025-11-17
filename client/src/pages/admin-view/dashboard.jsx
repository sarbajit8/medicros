import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteProduct, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: "",
  text: "",
};

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      alert("Please provide an image before uploading.");
      return;
    }

    const updatedFormData = {
      image: uploadedImageUrl,
      text: formData.text, // optional text
    };

    dispatch(addFeatureImage(updatedFormData)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData(initialFormData);
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  function handleDelete(deleteId) {
    dispatch(deleteProduct(deleteId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Upload Feature Image with Text</h2>

      {/* Image Upload Component */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      {/* Optional Text Input Field */}
      <div className="mt-4">
        <label className="block font-medium">Enter Image Description (Optional)</label>
        <input
          type="text"
          placeholder="Enter text for the image..."
          className="border rounded p-2 w-full mt-2"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />
      </div>

      {/* Upload Button */}
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white">
        Upload
      </Button>

      {/* Grid Layout for Displaying Images and Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <div key={featureImgItem._id} className="border p-4 rounded-lg shadow-lg bg-white">
              <img
                src={featureImgItem.image}
                className="w-full h-[250px] object-cover rounded-lg"
                alt="Feature"
              />
              {featureImgItem.text && (
                <p className="mt-2 text-center font-semibold break-words max-w-[200px]">
                  {featureImgItem.text}
                </p>
              )}
              <Button
                className="mt-3 bg-red-600 hover:bg-red-700 text-white w-full"
                onClick={() => handleDelete(featureImgItem?._id)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No feature images found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
