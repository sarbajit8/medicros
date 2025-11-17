import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { deletePcdCartItem, fetchPcdCartItems, updatePcdCartItemQty } from "@/store/shop/pcdCart-slice";
import { useUser } from "@clerk/clerk-react";

function PcdCartItemsContent({ cartItem }) {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handlePcdUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updatePcdCartItemQty({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchPcdCartItems(user?.id));
        toast({
          title: "PCD cart item updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deletePcdCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "PCD cart item removed successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <h3 className="font-extrabold break-words max-w-[200px]">{cartItem?.productname}</h3>
        <h3 className="text-gray-600">{cartItem?.distributorName}</h3>

        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handlePcdUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handlePcdUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">Qty: {cartItem?.quantity}</p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default PcdCartItemsContent;
