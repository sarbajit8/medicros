import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'


function ShoppingProductTile({
  product,
  // handleGetProductDetails,
  handleAddtoCart,
}) {

  // const { isAuthenticated } = useSelector((state) => state.auth);

   const { user } = useUser();
 

  return (
    <Card className="w-full max-w-sm mx-auto bg-blue-200">
      <Link
      to={`../productdetailpage/${product?._id}`}
      //  onClick={() => handleGetProductDetails(product?._id)}
       >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          <div>
          
         

           

          
          {
            
          // product?.totalStock === 0 ? (
          //   <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
          //     Out Of Stock
          //   </Badge>
          // ) : product?.totalStock < 10 ? (
          //   <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
          //     {`Only ${product?.totalStock} items left`}
          //   </Badge>
          // ) :
           product?.discount > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {product?.discount}%
            </Badge>  
          ) : null}
           </div>
           <div>
            {
           product?.freescheme !==""? (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              {product?.freescheme}
            </Badge>  
          ) : null}

           </div>
        </div>
        <CardContent className="p-4">
        <h2 
  className="text-xl font-bold mb-2 break-words max-w-[300px] truncate overflow-hidden whitespace-nowrap"
  title={product?.title} // Show full title on hover
>
  {product?.title}
</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
             {product?.brand}  {/* Handle unknown brand */}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </Link>
      <CardFooter>
        {
        // product?.totalStock === 0 ? (
        //   <Button className="w-full opacity-60 cursor-not-allowed bg-blue-800 hover:bg-blue-500">
        //     Out Of Stock
        //   </Button>
        // ) : (
          user?(
            <Button
            onClick={() => handleAddtoCart(product?._id
              , product?.totalStock
            )}
            className="w-full bg-blue-800 hover:bg-blue-500"
          >
            Add to cart
          </Button>
          // <Button
           
          //   className="w-full bg-blue-800 hover:bg-blue-500"
          // >
          //   <Link to={`shop/productdetailpage/${product?._id}/${product?.totalStock}`}>Add to cart</Link>
            
          // </Button>

           ) :(
            <Button
             className="w-full bg-blue-800 hover:bg-blue-500"
          >
           <Link to={"/"}>Add to cart</Link>
          </Button>


           )
        
        // )
        }

      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;