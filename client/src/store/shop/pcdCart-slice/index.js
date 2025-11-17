// src/store/shop/pcdCart-slice.js

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  pcdCartItems: [],
  isLoading: false,
};

export const pcdAddToCart = createAsyncThunk(
  "cart/pcdAddToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdcart/add`,
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const fetchPcdCartItems = createAsyncThunk(
  "cart/fetchPcdCartItems",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdcart/items/${userId}`
    );
    return response.data;
  }
);

export const deletePcdCartItem = createAsyncThunk(
  "cart/deletePcdCartItem",
  async ({ userId, productId }, { dispatch }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdcart/delete/${userId}/${productId}`
    );

    if (response.data.success) {
      dispatch(fetchPcdCartItems(userId));
    }

    return response.data;
  }
);

export const updatePcdCartItemQty = createAsyncThunk(
  "cart/updatePcdCartItemQty",
  async ({ userId, productId, quantity }, { dispatch }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdcart/update`,
      { userId, productId, quantity }
    );

    if (response.data.success) {
      dispatch(fetchPcdCartItems(userId));
    }

    return response.data;
  }
);

const pcdCartSlice = createSlice({
  name: "pcdCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pcdAddToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pcdAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdCartItems = action.payload.data;
      })
      .addCase(pcdAddToCart.rejected, (state) => {
        state.isLoading = false;
        state.pcdCartItems = [];
      })
      .addCase(fetchPcdCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPcdCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdCartItems = action.payload.data;
      })
      .addCase(fetchPcdCartItems.rejected, (state) => {
        state.isLoading = false;
        state.pcdCartItems = [];
      })
      .addCase(updatePcdCartItemQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdCartItems = action.payload.data;
      })
      .addCase(deletePcdCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdCartItems = action.payload.data;
      });
  },
});

export default pcdCartSlice.reducer;
