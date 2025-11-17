import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  distributorOrderList: [],
  distributorOrderDetails: null,

};

export const createNewDestributorOrderCod = createAsyncThunk(
  "/order/createNewDestributorOrderCod",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/distributororder/createcod`,
      orderData
      
    );

    return response.data;
  }
);



export const captureDistributorCodOrder = createAsyncThunk(
  "/order/captureDistributorCodOrder",
  async ({ orderId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/distributororder/captureorder`,
      {
        orderId,
      }
    );

    return response.data;
  }
);

export const getAllDistributorOrdersByUserId = createAsyncThunk(
  "/order/getAllDistributorOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/distributororder/list/${userId}`
    );

    return response.data;
  }
);

export const getDistributorOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/distributororder/details/${id}`
    );

    return response.data;
  }
);

const distributorOrderSlice = createSlice({
  name: "distributorOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewDestributorOrderCod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewDestributorOrderCod.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.approvalURL = action.payload;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewDestributorOrderCod.rejected, (state) => {
        state.isLoading = false;
        
        // state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllDistributorOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDistributorOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorOrderList = action.payload.data;
      })
      .addCase(getAllDistributorOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.distributorOrderList = [];
      })
      .addCase(getDistributorOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDistributorOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorOrderDetails = action.payload.data;
      })
      .addCase(getDistributorOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.distributorOrderDetails = null;
      });
  },
});

export const { resetOrderDetails } = distributorOrderSlice.actions;

export default distributorOrderSlice.reducer;
