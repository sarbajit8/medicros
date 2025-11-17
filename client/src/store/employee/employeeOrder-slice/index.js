import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  employeeOrderList: [],
  employeeOrderDetails: null,
  orderList: [],
  deliveryBoyOrders: [],
  


};

export const addNewOrder = createAsyncThunk(
  "/employeeorders/addNewOrder",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllEmployeeOrders = createAsyncThunk(
  "/employeeorders/fetchAllEmployeeOrders",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/get`
    );

    return result?.data;
  }
);

export const getOrderDetailsForEmployee = createAsyncThunk(
    "/employeeorder/getOrderDetailsForEmployee",
    async (id) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employee/orders/details/${id}`
      );
  
      return response.data;
    }
  );

export const getAllOrdersByEmployeeId = createAsyncThunk(
    "/employeeorder/getAllOrdersByEmployeeId",
    async (employeeId) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employee/orders/list/${employeeId}`
      );
  
      return response.data;
    }
  );

export const editEmployeeOrders = createAsyncThunk(
  "/employeeorders/editEmployeeOrders",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);
export const updateEmployeeOrderStatus = createAsyncThunk(
  "/employeeorders/updateEmployeeOrderStatus",
  async ({ id, orderstatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/update/${id}`,
      {
        orderstatus,
      }
    );

    return response.data;
  }
);


export const updateEmployeeDeliveryBoy = createAsyncThunk(
  "/order/updateDeliveryBoy",
  async ({ id, deliveryboy }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/update-deliveryboy/${id}`,
      {
        deliveryboy,
      }
    );
    return response.data;
  }
);



// ✅ Fetch orders assigned to a specific delivery boy
export const getOrdersByDeliveryBoy = createAsyncThunk(
  "/employeeorders/getOrdersByDeliveryBoy",
  async (deliveryboy) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/deliveryboy/${deliveryboy}`
    );
    return response.data;
  }
);



// ✅ Update Payment Status
export const updatePaymentStatus = createAsyncThunk(
  "/employeeorders/updatePaymentStatus",
  async ({ id, paymentstatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/update-payment-status/${id}`,
      { paymentstatus }
    );
    return response.data;
  }
);

// ✅ Update Payment Method
export const updatePaymentMethod = createAsyncThunk(
  "/employeeorders/updatePaymentMethod",
  async ({ id, paymentmethod }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/update-payment-method/${id}`,
      { paymentmethod }
    );
    return response.data;
  }
);


// ✅ Update Employee Order MRP
export const updateEmployeeOrderMRP = createAsyncThunk(
  "/employeeorders/updateEmployeeOrderMRP",
  async ({ id, mrp }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/update-mrp/${id}`,
      { mrp }
    );
    return response.data;
  }
);


// ✅ Update Due Amount
export const updateEmployeeOrderDue = createAsyncThunk(
  "/employeeorders/updateEmployeeOrderDue",
  async ({ id, due }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/orders/update-due/${id}`,
        { due }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong!" });
    }
  }
);



//update individual price
export const updateAllProductsInOrder = createAsyncThunk(
  "/employeeorders/updateAllProductsInOrder",
  async ({ id, updatedProducts }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/orders/update-products/${id}`,
      updatedProducts
    );
    return response.data;
  }
);





const EmployeeOrderSlice = createSlice({
  name: "employeeOrders",
  initialState,
  reducers: {
    resetEmployeeOrderDetails: (state) => {
        state.employeeOrderDetails = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployeeOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEmployeeOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeOrderList = action.payload.data;
      })
      .addCase(fetchAllEmployeeOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.employeeOrderList = [];
      })
       .addCase(getAllOrdersByEmployeeId.pending, (state) => {
              state.isLoading = true;
      })
        .addCase(getAllOrdersByEmployeeId.fulfilled, (state, action) => {
              state.isLoading = false;
              state.orderList = action.payload.data;
      })
        .addCase(getAllOrdersByEmployeeId.rejected, (state) => {
              state.isLoading = false;
              state.orderList = [];
      })
       .addCase(getOrderDetailsForEmployee.pending, (state) => {
              state.isLoading = true;
      })
        .addCase(getOrderDetailsForEmployee.fulfilled, (state, action) => {
              state.isLoading = false;
              state.employeeOrderDetails = action.payload.data;
      })
        .addCase(getOrderDetailsForEmployee.rejected, (state) => {
              state.isLoading = false;
              state.employeeOrderDetails = null;
     })
     .addCase(getOrdersByDeliveryBoy.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getOrdersByDeliveryBoy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deliveryBoyOrders = action.payload.data;
    })
    .addCase(getOrdersByDeliveryBoy.rejected, (state) => {
      state.isLoading = false;
      state.deliveryBoyOrders = [];
    })
    .addCase(updateEmployeeOrderDue.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateEmployeeOrderDue.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employeeOrderDetails = action.payload.data; // update local state
    })
    .addCase(updateEmployeeOrderDue.rejected, (state) => {
      state.isLoading = false;
    });
    
   
  },
});

export const { resetEmployeeOrderDetails } = EmployeeOrderSlice.actions;


export default EmployeeOrderSlice.reducer;
