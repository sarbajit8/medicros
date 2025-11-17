import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  ordersByDeliveryBoy: [],
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

// ✅ New: Update Delivery Boy
export const updateDeliveryBoy = createAsyncThunk(
  "/order/updateDeliveryBoy",
  async ({ id, deliveryboy }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update-deliveryboy/${id}`,
      {
        deliveryboy,
      }
    );
    return response.data;
  }
);


// ✅ Fetch Orders by Delivery Boy
export const getOrdersByDeliveryBoy = createAsyncThunk(
  "/order/getOrdersByDeliveryBoy",
  async (deliveryboy) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/deliveryboy/${deliveryboy}`
    );
    return response.data;
  }
);



// ✅ Update Payment Status
export const updatePaymentStatus = createAsyncThunk(
  "order/updatePaymentStatus",
  async ({ orderId, paymentStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/update-payment-status/${orderId}`,
        { paymentStatus }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateDueAmount = createAsyncThunk(
  "order/updateDueAmount",
  async ({ orderId, due }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/update-due/${orderId}`,
        { due }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// ✅ Update Payment Method
export const updatePaymentMethod = createAsyncThunk(
  "order/updatePaymentMethod",
  async ({ orderId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/update-payment-method/${orderId}`,
        { paymentMethod }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(getOrdersByDeliveryBoy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByDeliveryBoy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersByDeliveryBoy = action.payload.data;
      })
      .addCase(getOrdersByDeliveryBoy.rejected, (state) => {
        state.isLoading = false;
        state.ordersByDeliveryBoy = [];
      })
      .addCase(updateDueAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDueAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data; // update order details in store
      })
      .addCase(updateDueAmount.rejected, (state) => {
        state.isLoading = false;
      })
      ;
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
