import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminGalleryTile from '@/components/admin-view/gallery-tile';
import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addGalleryFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addGalleryItems, deleteGalleryItem, editGalleryItem, getGalleryItems } from '@/store/gallery-slice';

const initialFormData = {
  image: null,
  title: "",
  designation: "",
  type: "",
};

const AdminGallery = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateGalleryDialog, setOpenCreateGalleryDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const { galleryItemsList } = useSelector(state => state.galleryItems);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // New search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Filter gallery items based on search and filterType
  const filteredItems = galleryItemsList
    .filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
    .filter(item =>
      filterType === "All"
        ? true
        : item.type?.toLowerCase().trim() === filterType.toLowerCase().trim()
    );

  const onSubmit = (event) => {
    event.preventDefault();
    const productData = {
      ...formData,
      image: uploadedImageUrl,
    };
    if (currentEditedId !== null) {
      dispatch(editGalleryItem({
        id: currentEditedId,
        formData: productData
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(getGalleryItems());
          setFormData(initialFormData);
          setOpenCreateGalleryDialog(false);
          setCurrentEditedId(null);
          setImageFile(null);
        }
      });
    } else {
      dispatch(addGalleryItems(productData)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getGalleryItems());
          setOpenCreateGalleryDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({
            title: 'Image added successfully',
          });
        }
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteGalleryItem(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getGalleryItems());
      }
    });
  };

  useEffect(() => {
    dispatch(getGalleryItems());
  }, [dispatch]);

  return (
    <Fragment>
      <div className='mb-5 flex justify-between flex-wrap gap-4'>
        <Button onClick={() => {
          setOpenCreateGalleryDialog(true);
          setImageFile(null);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}>
          Add New Image
        </Button>

        {/* Filter buttons */}
        <div className="flex gap-3 flex-wrap">
          {["All", "Products", "Employees", "Events", "Others"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filterType === type
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm max-w-xs"
        />
      </div>

      {/* Filtered Gallery grid */}
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {filteredItems.length > 0 ? (
          filteredItems.map(galleryItem =>
            <AdminGalleryTile
              key={galleryItem._id}
              gallery={galleryItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateGalleryDialog={setOpenCreateGalleryDialog}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />
          )
        ) : (
          <p className="text-center col-span-full text-gray-500">No images found.</p>
        )}
      </div>

      <Sheet open={openCreateGalleryDialog} onOpenChange={() => {
        setOpenCreateGalleryDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
        setImageFile(null);
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Image" : "Add New Image"}
            </SheetTitle>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isCustomStyling={false}
            />
          </SheetHeader>
          <div className='py-6'>
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              formControls={addGalleryFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminGallery;
