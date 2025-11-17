import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload1({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
  fieldName,
}) {
  const inputRef = useRef(null);

  function handleImputFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  //  function handleRemoveImagefromProduct() {
  //   setImageFile(null);
  //   setUploadedImageUrl("");
  //   if (inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  // }


  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      data.append("field_name", fieldName);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload {fieldName}</Label>
      <div className="border-2 border-dashed rounded-lg p-4">
        <Input
          id={`image-upload-${fieldName}`}
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImputFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor={`image-upload-${fieldName}`}
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <FileIcon className="w-8 text-primary mr-2 h-8" />
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      {/* ✅ Preview Uploaded Image with Cross Icon */}
      {uploadedImageUrl && (
        <div className="mt-4 relative w-fit">
          <img
            src={uploadedImageUrl}
            alt={`Preview ${fieldName}`}
            className="w-32 h-32 object-cover border rounded"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload1;
