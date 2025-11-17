import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  distributorOrderList: [],
  distributorOrderDetails: null,
  distributorsOrdersByDeliveryBoy: [],

};

export const getAllDistributorOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/distributororders/get`
    );

    return response.data;
  }
);

export const getDistributorOrderDetailsForAdmin = createAsyncThunk(
  "/order/getDistributorOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/distributororders/details/${id}`
    );

    return response.data;
  }
);

export const updateDistributorOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);


export const updateDistributorOrderProductPrice = createAsyncThunk(
    "/order/updateProductPrice",
    async ({ orderId, productId, productprice }) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update-price/${orderId}/${productId}`,
        { productprice }
      );
      return response.data;
    }
  );
  export const updateDistributorOrderTotalAmount = createAsyncThunk(
    "/order/updateTotalAmount",
    async ({ orderId, totalAmount }) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update-total-amount/${orderId}`,
        { totalAmount }
      );
      return response.data;
    }
  );


  // ✅ New: Update Delivery Boy
export const updatedistributorDeliveryBoy = createAsyncThunk(
  "/order/updateDeliveryBoy",
  async ({ id, deliveryboy }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update-deliveryboy/${id}`,
      {
        deliveryboy,
      }
    );
    return response.data;
  }
);


// ✅ Fetch Orders by Delivery Boy
export const getDistributorOrdersByDeliveryBoy = createAsyncThunk(
  "/order/getOrdersByDeliveryBoy",
  async (deliveryboy) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/distributororders/deliveryboy/${deliveryboy}`
    );
    return response.data;
  }
);



// ✅ Update Payment Status
export const updateDistributorPaymentStatus = createAsyncThunk(
  "order/updatePaymentStatus",
  async ({ orderId, paymentStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update-payment-status/${orderId}`,
        { paymentStatus }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Update Payment Method
export const updateDistributorPaymentMethod = createAsyncThunk(
  "order/updatePaymentMethod",
  async ({ orderId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update-payment-method/${orderId}`,
        { paymentMethod }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// ✅ Update Due Amount
export const updateDistributorOrderDue = createAsyncThunk(
  "order/updateDue",
  async ({ orderId, due }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/distributororders/update-due/${orderId}`,
        { due }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





const adminDistributorOrderSlice = createSlice({
  name: "adminDistributorOrderSlice",
  initialState,
  reducers: {
    resetDistributorOrderDetails: (state) => {
      console.log("resetDistributorOrderDetails");

      state.distributorOrderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDistributorOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDistributorOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorOrderList = action.payload.data;
      })
      .addCase(getAllDistributorOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.distributorOrderList = [];
      })
      .addCase(getDistributorOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDistributorOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorOrderDetails = action.payload.data;
      })
      .addCase(getDistributorOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.distributorOrderDetails = null;
      })
      .addCase(getDistributorOrdersByDeliveryBoy.pending, (state) => {
              state.isLoading = true;
            })
      .addCase(getDistributorOrdersByDeliveryBoy.fulfilled, (state, action) => {
              state.isLoading = false;
              state.distributorsOrdersByDeliveryBoy = action.payload.data;
            })
      .addCase(getDistributorOrdersByDeliveryBoy.rejected, (state) => {
              state.isLoading = false;
              state.distributorsOrdersByDeliveryBoy = [];
            });
  },
});

export const { resetDistributorOrderDetails } = adminDistributorOrderSlice.actions;

export default adminDistributorOrderSlice.reducer;
