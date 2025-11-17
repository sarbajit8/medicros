import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  quickOrderList: [],
  quickOrderDetails: null,
};

// **Fetch All Quick Orders**
export const fetchAllQuickOrders = createAsyncThunk(
  "quickOrders/fetchAllQuickOrders",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/quick-orders/all`);
    return response?.data;
  }
);

// **Add New Quick Order**
export const addQuickOrder = createAsyncThunk(
  "quickOrders/addQuickOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/quick-orders/add`,
        orderData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding Quick Order");
    }
  }
);

const quickOrderSlice = createSlice({
  name: "quickOrders",
  initialState,
  reducers: {
    clearQuickOrderDetails: (state) => {
      state.quickOrderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Quick Orders
      .addCase(fetchAllQuickOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllQuickOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quickOrderList = action.payload.data;
      })
      .addCase(fetchAllQuickOrders.rejected, (state) => {
        state.isLoading = false;
        state.quickOrderList = [];
      })

      // Add Quick Order
      .addCase(addQuickOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addQuickOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quickOrderList = [action.payload.data, ...state.quickOrderList]; // Add new order to the list
      })
      .addCase(addQuickOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearQuickOrderDetails } = quickOrderSlice.actions;

export default quickOrderSlice.reducer;
