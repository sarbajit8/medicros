import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  pcdOrderList: [],
  pcdOrderDetails: null,
  pcdOrdersByDeliveryBoy: [],
};

export const getAllPcdOrdersForAdmin = createAsyncThunk(
  "/order/getAllPcdOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/get`
    );
    return response.data;
  }
);

export const getPcdOrderDetailsForAdmin = createAsyncThunk(
  "/order/getPcdOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/details/${id}`
    );
    return response.data;
  }
);

export const updatePcdOrderStatus = createAsyncThunk(
  "/order/updatePcdOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update/${id}`,
      { orderStatus }
    );
    return response.data;
  }
);

export const updatePcdOrderProductPrice = createAsyncThunk(
  "/order/updatePcdProductPrice",
  async ({ orderId, productId, productprice }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update-price/${orderId}/${productId}`,
      { productprice }
    );
    return response.data;
  }
);

export const updatePcdOrderTotalAmount = createAsyncThunk(
  "/order/updatePcdTotalAmount",
  async ({ orderId, totalAmount }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update-total-amount/${orderId}`,
      { totalAmount }
    );
    return response.data;
  }
);

export const updatePcdDeliveryBoy = createAsyncThunk(
  "/order/updatePcdDeliveryBoy",
  async ({ id, deliveryboy }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update-deliveryboy/${id}`,
      { deliveryboy }
    );
    return response.data;
  }
);

export const getPcdOrdersByDeliveryBoy = createAsyncThunk(
  "/order/getPcdOrdersByDeliveryBoy",
  async (deliveryboy) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/deliveryboy/${deliveryboy}`
    );
    return response.data;
  }
);

export const updatePcdPaymentStatus = createAsyncThunk(
  "order/updatePcdPaymentStatus",
  async ({ orderId, paymentStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update-payment-status/${orderId}`,
        { paymentStatus }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePcdPaymentMethod = createAsyncThunk(
  "order/updatePcdPaymentMethod",
  async ({ orderId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update-payment-method/${orderId}`,
        { paymentMethod }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePcdOrderDue = createAsyncThunk(
  "order/updatePcdDue",
  async ({ orderId, due }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/pcdorder/update-due/${orderId}`,
        { due }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const adminPcdOrderSlice = createSlice({
  name: "adminPcdOrderSlice",
  initialState,
  reducers: {
    resetPcdOrderDetails: (state) => {
      state.pcdOrderDetails = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(getAllPcdOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPcdOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdOrderList = action.payload.data;
      })
      .addCase(getAllPcdOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.pcdOrderList = [];
      })
      .addCase(getPcdOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPcdOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdOrderDetails = action.payload.data;
      })
      .addCase(getPcdOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.pcdOrderDetails = null;
      })
      .addCase(getPcdOrdersByDeliveryBoy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPcdOrdersByDeliveryBoy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdOrdersByDeliveryBoy = action.payload.data;
      })
      .addCase(getPcdOrdersByDeliveryBoy.rejected, (state) => {
        state.isLoading = false;
        state.pcdOrdersByDeliveryBoy = [];
      })
      .addCase(updatePcdOrderDue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePcdOrderDue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdOrderDetails = action.payload.data; // Update state with new data
      })
      .addCase(updatePcdOrderDue.rejected, (state) => {
        state.isLoading = false;
      })
      ;
  },
});

export const { resetPcdOrderDetails } = adminPcdOrderSlice.actions;

export default adminPcdOrderSlice.reducer;
