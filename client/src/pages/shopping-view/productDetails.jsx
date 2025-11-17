import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchProductDetails } from '@/store/shop/products-slice';
import { addReview, getReviews } from '@/store/shop/review-slice';
import StarRatingComponent from '@/components/common/star-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

const ProductDetailPage = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    dispatch(fetchProductDetails(productId)).then((res) => {
      if (res?.payload?.image) {
        setMainImage(res.payload.image); // Set default main image
      }
    });
    dispatch(getReviews(productId));
  }, [dispatch, productId]);

  function changeImage(src) {
    setMainImage(src);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      // if (indexOfCurrentItem > -1) {
      //   const getQuantity = getCartItems[indexOfCurrentItem].quantity;
      //   if (getQuantity + 1 > getTotalStock) {
      //     toast({
      //       title: `Only ${getQuantity} quantity can be added for this item`,
      //       variant: 'destructive',
      //     });
      //     return;
      //   }
      // }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: 'Product is added to cart' });
      }
    });
  }

  function handleAddReview() {
    if (!productDetails?._id || !user?.id) {
      toast({ title: 'Product details or user info missing!', variant: 'destructive' });
      return;
    }

    dispatch(addReview({
      productId: productDetails._id,
      userId: user.id,
      userName: user.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    }))
    .then((data) => {
      if (data.payload?.success) { // Safe check
        setRating(0);
        setReviewMsg('');
        dispatch(getReviews(productDetails._id));
        toast({ title: 'Review added successfully!' });
      } else {
        console.error("Error adding review:", data.payload);
        toast({ title: data.payload?.message || 'You need to purchase product to review it.', variant: 'destructive' });
      }
    })
    .catch((error) => {
      console.error("API request failed:", error);
      toast({ title: "Something went wrong!", variant: "destructive" });
    });
    
  }

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 0;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images Section */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage || productDetails?.image}
              alt="Product"
              className="w-full h-[500px] object-cover rounded-lg shadow-md mb-4"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {[productDetails?.image, productDetails?.image1, productDetails?.image2, productDetails?.image3, productDetails?.image4]
                .filter(Boolean)
                .map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt="Product"
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(imgSrc)}
                  />
                ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2 uppercase break-words max-w-[500px]">{productDetails?.title}</h2>
          <div className="mb-4">
              <span className="text-2xl font-bold mr-2">₹{productDetails?.salePrice}</span>
              {productDetails?.discount&&(<span className="text-gray-500 ">{`₹${productDetails?.price}`}</span>)}
              {productDetails?.discount&&(<span>{`|(Discount-${productDetails?.discount}%)`}</span>)}
            </div>
            <div className="flex items-center mb-4">
              <StarRatingComponent rating={averageReview} />
            </div>
            <h2 className='text-[30px] font-bold' >Discription</h2>
            <p className="text-[20px] text-gray-700 mb-6  break-words max-w-[500px]">{productDetails?.description}</p>
            {productDetails?.mrp&&(
             <div className='flex'>
              <h2 className='text-[20px] font-bold p-2'>MRP -</h2>
              <h2 className='text-[20px] uppercase p-2'>₹{productDetails?.mrp}</h2>

             </div>)}

             {productDetails?.productquantity&&(
             <div className='flex'>
              <h2 className='text-[20px] font-bold p-2'>Quantity -</h2>
              <h2 className='text-[20px] uppercase p-2'>{productDetails?.productquantity}</h2>

             </div>)}
             
             {productDetails?.packof&&(
             <div className='flex'>
              <h2 className='text-[20px] font-bold p-2'>Pack Of -</h2>
              <h2 className='text-[20px] uppercase p-2'>{productDetails?.packof}</h2>

             </div>)}
           
           
            {productDetails?.brand&&(
             <div className='flex'>
              <h2 className='text-[20px] font-bold p-2'>Brand -</h2>
              <h2 className='text-[20px]  p-2'>{productDetails?.brand}</h2>


             </div>)}
             {productDetails?.category&&(
             <div className='flex'>
              <h2 className='text-[20px] font-bold p-2'>Category -</h2>
              <h2 className='text-[20px] uppercase p-2'>{productDetails?.category}</h2>


             </div>)}
            {productDetails?.composition&&(
             <div className='flex flex-col'>
              <h2 className='text-[20px] font-bold p-2'>Composition -</h2>
              <p className="text-[20px] text-gray-700 mb-6  break-words max-w-[500px]">{productDetails?.composition}</p>


             </div>)}

             {productDetails?.freescheme&&(
             <div className='flex mb-5'>
              <h2 className='text-[20px] font-bold p-2'>Free Scheme -</h2>
              <h2 className='text-[20px]  p-2 uppercase '>{`${productDetails?.freescheme} free`}</h2>


             </div>)}
            {/* Add to Cart */}
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Add to Cart
              </Button>
            </div>

            {/* Reviews Section */}
            <div className="max-h-[300px] overflow-auto mt-6">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem._id} className="flex gap-4">
                      <div className="grid gap-1">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                        <div className='flex gap-2'>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />

                        </div>
                        <p className="text-muted-foreground">{reviewItem.reviewMessage}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Reviews</h1>
                )}
              </div>

              {/* Add a Review */}
              <div className="mt-10 flex-col flex gap-2">
                <Label>Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent rating={rating} handleRatingChange={setRating} />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === ''}
                  className="bg-blue-800 hover:bg-blue-500"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
