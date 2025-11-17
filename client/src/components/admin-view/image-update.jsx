// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useEffect, useRef } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { Skeleton } from "../ui/skeleton";

// function UpdateProductImage({
//     imageFile,
//     setImageFile,
//     uploadedImageUrl,
//     setUploadedImageUrl,
//     setImageLoadingState,
//     imageLoadingState,
//     productId,
//     isEditMode,
//     isCustomStyleing = false,
// }) {
//     const inputRef = useRef(null);

//     console.log(productId,"product id lll");
    

//     function handleInputFileChange(event) {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) setImageFile(selectedFile);
//     }

//     function handleDragOver(event) {
//         event.preventDefault();
//     }

//     function handleDrop(event) {
//         event.preventDefault();
//         const droppedFile = event.dataTransfer.files?.[0];
//         if (droppedFile) setImageFile(droppedFile);
//     }

//     function handleRemoveImage() {
//         setImageFile(null);
//         if (inputRef.current) {
//             inputRef.current.value = "";
//         }
//     }

//     async function updateImageOnCloudinary() {
//         if (!productId) {
//             console.error("Product ID is required for updating the image.");
//             return;
//         }

//         setImageLoadingState(true);
//         const data = new FormData();
//         data.append("my_file", imageFile);

//         try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_API_URL}/api/admin/products/update-image/${productId}`,
//                 data
//             );

//             console.log(response, "response");

//             if (response?.data?.success) {
//                 setUploadedImageUrl(response.data.result);
//             }
//         } catch (error) {
//             console.error("Error updating image:", error);
//         } finally {
//             setImageLoadingState(false);
//         }
//     }

//     useEffect(() => {
//         if (imageFile !== null) updateImageOnCloudinary();
//     }, [imageFile]);

//     return (
//         <div className={`w-full mt-4 ${isCustomStyleing ? '' : 'max-w-md mx-auto'}`}>
//             <Label className="text-lg font-semibold mb-2 block">Update Image</Label>
//             <div
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//                 className={` border-2 border-dashed rounded-lg p-4`}
//             >
//                 <Input
//                     id="image-upload"
//                     type="file"
//                     className="hidden"
//                     ref={inputRef}
//                     onChange={handleInputFileChange}
//                     // disabled={isEditMode}
//                 />
//                 {!imageFile ? (
//                     <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
//                         <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//                         <span>Drag & drop or click to update image</span>
//                     </Label>
//                 ) : imageLoadingState ? (
//                     <Skeleton className="h-10 bg-gray-100" />
//                 ) : (
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <FileIcon className="w-8 text-primary mr-2 h-8" />
//                         </div>
//                         <p className="text-sm font-medium">{imageFile.name}</p>
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="text-muted-foreground hover:text-foreground"
//                             onClick={handleRemoveImage}
//                         >
//                             <XIcon className="w-4 h-4" />
//                             <span className="sr-only">Remove File</span>
//                         </Button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UpdateProductImage;
