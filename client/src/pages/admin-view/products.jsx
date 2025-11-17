import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands } from "@/store/admin/brand-slice";
import { fetchAllCategorys } from "@/store/admin/category-slice";
import ProductImageUpload1 from "@/components/admin-view/image1-upload";
import ProductImageUpload2 from "@/components/admin-view/image2-upload";
import ProductImageUpload3 from "@/components/admin-view/image3-upload";
import ProductImageUpload4 from "@/components/admin-view/image4-upload";

const initialFormData = {
  image: null,
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
  margin:"",
  freescheme:"",
  discount:"",
  slider: "",
  composition: "",
  productquantity: "",
  mrp: "",
  packof:"",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [imageFile1, setImageFile1] = useState("");
  const [uploadedImageUrl1, setUploadedImageUrl1] = useState("");
  const [imageLoadingState1, setImageLoadingState1] = useState(false);

  const [imageFile2, setImageFile2] = useState("");
  const [uploadedImageUrl2, setUploadedImageUrl2] = useState("");
  const [imageLoadingState2, setImageLoadingState2] = useState(false);

  const [imageFile3, setImageFile3] = useState("");
  const [uploadedImageUrl3, setUploadedImageUrl3] = useState("");
  const [imageLoadingState3, setImageLoadingState3] = useState(false);

  const [imageFile4, setImageFile4] = useState("");
  const [uploadedImageUrl4, setUploadedImageUrl4] = useState("");
  const [imageLoadingState4, setImageLoadingState4] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const { brandList } = useSelector((state) => state.adminBrand);
  const { categoryList } = useSelector(state => state.adminCategory);

  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllBrands());
  }, [dispatch]);



  // Handle Input Change and Auto-Calculate Sale Price
  function handleInputChange(e) {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, 
      [name]: value ,
      image: uploadedImageUrl,
      image1: uploadedImageUrl1,
      image2: uploadedImageUrl2,
      image3: uploadedImageUrl3,
      image4: uploadedImageUrl4,};

    // Automatically calculate Sale Price if Discount is applied
    if (name === "price" || name === "discount") {
      const price = parseFloat(updatedFormData.price) || 0;
      const discount = parseFloat(updatedFormData.discount) || 0;
      if (price > 0 && discount >= 0) {
        updatedFormData.salePrice = (price - (price * discount) / 100).toFixed(2);
      }
    }

    setFormData(updatedFormData);
  }

function onSubmit(event) {
  event.preventDefault();

  const productData = {
    ...formData,
    image: uploadedImageUrl,
    image1: uploadedImageUrl1,
    image2: uploadedImageUrl2,
    image3: uploadedImageUrl3,
    image4: uploadedImageUrl4,
  };

  const resetFormAndImages = () => {
    setFormData(initialFormData);
    setCurrentEditedId(null);

    // Reset all image file + URL states
    setImageFile("");
    setUploadedImageUrl("");

    setImageFile1("");
    setUploadedImageUrl1("");

    setImageFile2("");
    setUploadedImageUrl2("");

    setImageFile3("");
    setUploadedImageUrl3("");

    setImageFile4("");
    setUploadedImageUrl4("");
  };

  if (currentEditedId !== null) {
    dispatch(editProduct({ id: currentEditedId, formData: productData })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          resetFormAndImages();
          toast({ title: "Product edited successfully" });
        }
      }
    );
  } else {
    dispatch(addNewProduct(productData)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        resetFormAndImages();
        toast({ title: "Product added successfully" });
      }
    });
  }
}


  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }
   useEffect(() => {
          dispatch(fetchAllCategorys());
      }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }



  // ✅ Normalize text to remove extra spaces and make search case-insensitive
  const normalizeText = (text) => text?.toLowerCase().trim().replace(/\s+/g, ' ') || "";

  // ✅ Search Logic (ignoring extra spaces)
  const filteredProducts = productList?.filter(product => 
    normalizeText(product.title).includes(normalizeText(searchQuery)) ||
    normalizeText(product._id).includes(normalizeText(searchQuery))
  );
  return (
    <Fragment>
  <div className="mb-5 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search by Title or Product ID..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="border rounded p-2 w-full sm:w-1/3 focus:ring focus:ring-blue-300"
  />

  {/* Add Product Button */}
  <Button 
    className="w-full sm:w-auto"
    onClick={() => setOpenCreateProductsDialog(true)}
  >
    Add New Product
  </Button>
</div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((productItem) => (
             <AdminProductTile
  product={productItem}
  setFormData={setFormData}
  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
  setCurrentEditedId={setCurrentEditedId}
  handleDelete={handleDelete}
  setUploadedImageUrl={setUploadedImageUrl}
  setUploadedImageUrl1={setUploadedImageUrl1}
  setUploadedImageUrl2={setUploadedImageUrl2}
  setUploadedImageUrl3={setUploadedImageUrl3}
  setUploadedImageUrl4={setUploadedImageUrl4}
/>

            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
       onOpenChange={() => {
  setOpenCreateProductsDialog(false);
  setCurrentEditedId(null);
  setFormData(initialFormData);

  // Reset all image files and URLs
  setImageFile("");
  setImageFile1("");
  setImageFile2("");
  setImageFile3("");
  setImageFile4("");

  setUploadedImageUrl("");
  setUploadedImageUrl1("");
  setUploadedImageUrl2("");
  setUploadedImageUrl3("");
  setUploadedImageUrl4("");
}}

      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload1 fieldName="Main Image" imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} />
          <ProductImageUpload1 fieldName="Side Image 1" imageFile={imageFile1} setImageFile={setImageFile1} uploadedImageUrl={uploadedImageUrl1} setUploadedImageUrl={setUploadedImageUrl1} setImageLoadingState={setImageLoadingState1} imageLoadingState={imageLoadingState1}  />
          <ProductImageUpload1 fieldName="Side Image 2" imageFile={imageFile2} setImageFile={setImageFile2} uploadedImageUrl={uploadedImageUrl2} setUploadedImageUrl={setUploadedImageUrl2} setImageLoadingState={setImageLoadingState2} imageLoadingState={imageLoadingState2}  />
          <ProductImageUpload1 fieldName="Side Image 3" imageFile={imageFile3} setImageFile={setImageFile3} uploadedImageUrl={uploadedImageUrl3} setUploadedImageUrl={setUploadedImageUrl3} setImageLoadingState={setImageLoadingState3} imageLoadingState={imageLoadingState3} />
          <ProductImageUpload1 fieldName="Side Image 4" imageFile={imageFile4} setImageFile={setImageFile4} uploadedImageUrl={uploadedImageUrl4} setUploadedImageUrl={setUploadedImageUrl4} setImageLoadingState={setImageLoadingState4} imageLoadingState={imageLoadingState4}   />
         
          <div className="py-6">
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-700 font-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-bold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Brand Select */}
              <div>
                <label className="block text-gray-700 font-bold">Brand</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select a brand</option>
                  {brandList.map((brand) => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-gray-700 font-bold">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  required
                >
                  
                  <option value="">Select a Category</option>
                  {categoryList.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
               
              </div>
              {/* <div>
                <label className="block text-gray-700 font-bold">Composition</label>
                <input
                  type="text"
                  name="title"
                  value={formData.composition}
                  onChange={(e) =>
                    setFormData({ ...formData, composition: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter product title"
                  
                />
              </div> */}
              <div>
                <label className="block text-gray-700 font-bold">
                Composition
                </label>
                <textarea
                  name="composition"
                  value={formData.composition}
                  onChange={(e) =>
                    setFormData({ ...formData, composition: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter product composition"
                  required
                />
              </div>
              {/* freescheme Select */}
              <div>
                <label className="block text-gray-700 font-bold">freescheme</label>
                <select
                  name="freescheme" 
                  value={formData.freescheme}
                  onChange={(e) =>
                    setFormData({ ...formData, freescheme: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  
                >
                  <option value="">Select a freescheme</option>
                <option>buy1get1</option>
                <option>buy2get1</option>
                <option>buy3get1</option>
                <option>buy4get1</option>
                <option>buy5get1</option>
                </select>
              </div>
                 {/* margin Select */}
                 <div>
                <label className="block text-gray-700 font-bold">margin</label>
                <select
                  name="margin"
                  value={formData.margin}
                  onChange={(e) =>
                    setFormData({ ...formData, margin: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  
                >
                  <option value="">Select margin</option>
                <option>1-10%</option>
                <option>10-20%</option>
                <option>20-30%</option>
                <option>30-40%</option>
                <option>40-50%</option>
                <option>50-60%</option>
                <option>60-70%</option>
                <option>70-80%</option>
                <option>80-90%</option>
                </select>
              </div>

              {/* slider */}
              <div>
                <label className="block text-gray-700 font-bold">Add In Slider</label>
                <select
                  name="slider" 
                  value={formData.slider}
                  onChange={(e) =>
                    setFormData({ ...formData, slider: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  
                >
                <option value="">Select a slider</option>
                <option value="otc">otc</option>
                <option value="spc">spc</option>
                <option value="generic">Generic</option>
                <option value="ethical">Ethical</option>



                </select>
              </div>

            {/* Price & Discount (Auto-Calculates Sale Price) */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                    placeholder="Enter discount (%)"
                  />
                </div>
              </div>

              {/* Sale Price (Auto-calculated) */}
              <div>
                <label className="block text-gray-700 font-bold">Sale Price (Auto-Calculated)</label>
                <input
                  type="text"
                  name="salePrice"
                  value={formData.salePrice}
                  className="w-full border rounded-md p-2 bg-gray-100"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Quantity</label>
                <input
                  type="text"
                  name="productquantity"
                  value={formData.productquantity}
                  onChange={(e) =>
                    setFormData({ ...formData, productquantity: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">Pack Of -</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.packof}
                  onChange={(e) =>
                    setFormData({ ...formData, packof: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Pack Of ?"
                  
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">MRP</label>
                <input
                  type="text"
                  name="mrp"
                  value={formData.mrp}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter MRP"
                  required
                />
              </div>



              
              <div>
                <label className="block text-gray-700 font-bold">Total Stock</label>
                <input
                  type="text"
                  name="totalstock"
                  value={formData.totalStock}
                  onChange={(e) =>
                    setFormData({ ...formData, totalStock: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter total stock"
                  required
                />
              </div>


              {/* Submit Button */}
              <Button type="submit" 
              
              >
                {currentEditedId !== null ? "Edit" : "Add"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
