import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
  setUploadedImageUrl,
  setUploadedImageUrl1,
  setUploadedImageUrl2,
  setUploadedImageUrl3,
  setUploadedImageUrl4,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <div>
        <div className="relative w-full">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-60 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="flex-grow flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2 mt-2 line-clamp-2 break-words max-w-[300px]">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? 'line-through' : ''
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>

            {product?.salePrice > 0 && (
              <span className="text-lg font-bold">₹{product?.salePrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);

              // Set form data
              setFormData({
                ...product,
                image: product.image || "",
                image1: product.image1 || "",
                image2: product.image2 || "",
                image3: product.image3 || "",
                image4: product.image4 || "",
              });

              // Set image previews
              setUploadedImageUrl(product.image || "");
              setUploadedImageUrl1(product.image1 || "");
              setUploadedImageUrl2(product.image2 || "");
              setUploadedImageUrl3(product.image3 || "");
              setUploadedImageUrl4(product.image4 || "");
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
