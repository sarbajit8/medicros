import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  pcdOrderList: [],
  pcdOrderDetails: null,
};

export const createNewPcdOrderCod = createAsyncThunk(
  "/order/createNewPcdOrderCod",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdorder/create`,
      orderData
    );
    return response.data;
  }
);

export const capturePcdCodOrder = createAsyncThunk(
  "/order/capturePcdCodOrder",
  async ({ orderId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdorder/capture`,
      { orderId }
    );
    return response.data;
  }
);

export const getAllPcdOrdersByUserId = createAsyncThunk(
  "/order/getAllPcdOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdorder/user/${userId}`
    );
    return response.data;
  }
);

export const getPcdOrderDetails = createAsyncThunk(
  "/order/getPcdOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/pcdorder/details/${id}`
    );
    return response.data;
  }
);

const pcdOrderSlice = createSlice({
  name: "pcdOrderSlice",
  initialState,
  reducers: {
    resetPcdOrderDetails: (state) => {
      state.pcdOrderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPcdOrderCod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPcdOrderCod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentPcdOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewPcdOrderCod.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      .addCase(getAllPcdOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPcdOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdOrderList = action.payload.data;
      })
      .addCase(getAllPcdOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.pcdOrderList = [];
      })
      .addCase(getPcdOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPcdOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdOrderDetails = action.payload.data;
      })
      .addCase(getPcdOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.pcdOrderDetails = null;
      });
  },
});

export const { resetPcdOrderDetails } = pcdOrderSlice.actions;

export default pcdOrderSlice.reducer;
