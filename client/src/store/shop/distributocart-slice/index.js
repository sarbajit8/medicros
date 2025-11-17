import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartItems } from "../cart-slice";

const initialState = {
    distributorCartItems: [],
    isLoading: false,
};

export const distributorAddToCart = createAsyncThunk(
  "cart/distributorAddToCart",
  async ({ userId,productId,quantity}) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/distributorcart/add`,
      {
        userId,
        productId,
        quantity
      },
      
    );

    return response.data;
  }
);

export const fetchDistributorCartItems = createAsyncThunk(
  "cart/fetchDistributorCartItems",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/distributorcart/get/${userId}`
    );

    return response.data;
  }
);

export const deleteDistributorCartItem = createAsyncThunk(
  "cart/deleteDistributorCartItem",
  async ({ userId, productId }, { dispatch }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/distributorcart/${userId}/${productId}`
    );

    // Fetch updated distributor cart after deleting item
    if (response.data.success) {
      dispatch(fetchDistributorCartItems(userId));
    }

    return response.data;
  }
);

export const updateDistributorCartItemQty = createAsyncThunk(
  "cart/updateDistributorCartItemQty",
  async ({ userId, productId, quantity }, { dispatch }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/distributorcart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    // Fetch updated distributor cart after updating quantity
    if (response.data.success) {
      dispatch(fetchDistributorCartItems(userId));
    }

    return response.data;
  }
);


const shoppingDistributorCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(distributorAddToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(distributorAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorCartItems = action.payload.data;
      })
      .addCase(distributorAddToCart.rejected, (state) => {
        state.isLoading = false;
        state.distributorCartItems = [];
      })
      .addCase(fetchDistributorCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDistributorCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorCartItems = action.payload.data;
      })
      .addCase(fetchDistributorCartItems.rejected, (state) => {
        state.isLoading = false;
        state.distributorCartItems = [];
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        // ❌ Prevent overwriting distributorCartItems
        state.cartItems = action.payload.data;
      })
      .addCase(updateDistributorCartItemQty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDistributorCartItemQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorCartItems = action.payload.data;
      })
      .addCase(updateDistributorCartItemQty.rejected, (state) => {
        state.isLoading = false;
        state.distributorCartItems = [];
      })
      .addCase(deleteDistributorCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDistributorCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorCartItems = action.payload.data;
      })
      .addCase(deleteDistributorCartItem.rejected, (state) => {
        state.isLoading = false;
        state.distributorCartItems = [];
      });
  },
});

export default shoppingDistributorCartSlice.reducer;
