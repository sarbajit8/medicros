import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  adminDistributorProductList: [],
//employeeOrderDetails: null,
distributorProductList: [],

};

export const addDistributorProduct = createAsyncThunk(
  "/admin/addDistributorProduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/distributorproduct/add`,
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

export const fetchAllDistributorProduct  = createAsyncThunk(
  "/admin/fetchAllDistributorProduct",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/distributorproduct/get`
    );

    return result?.data;
  }
);


export const getAllProductsByDistributorId = createAsyncThunk(
    "/employee/getAllProductsByDistributorId",
    async (distributorId) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/distributorproduct/list/${distributorId}`
      );
  
      return response.data;
    }
  );




export const editDistributorProduct  = createAsyncThunk(
  "/admin/editDistributorProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/distributorproduct/edit/${id}`,
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

export const deleteDistributorProduct = createAsyncThunk(
    "/admin/deleteDistributor",
    async (id) => {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/distributorproduct/delete/${id}`
      );
  
      return result?.data;
    }
  );


const AdminDistributorProductSlice = createSlice({
  name: "employeeDistributorProducts",
  initialState,
  reducers: {
    resetEmployeeOrderDetails: (state) => {
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDistributorProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllDistributorProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminDistributorProductList = action.payload.data;
      })
      .addCase(fetchAllDistributorProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.adminDistributorProductList = [];
      })
       .addCase(getAllProductsByDistributorId.pending, (state) => {
              state.isLoading = true;
      })
        .addCase(getAllProductsByDistributorId.fulfilled, (state, action) => {
              state.isLoading = false;
              state.distributorProductList = action.payload.data;
      })
        .addCase(getAllProductsByDistributorId.rejected, (state) => {
              state.isLoading = false;
              state.distributorProductList = [];
      });
    //    .addCase(getOrderDetailsForEmployee.pending, (state) => {
    //           state.isLoading = true;
    //   })
    //     .addCase(getOrderDetailsForEmployee.fulfilled, (state, action) => {
    //           state.isLoading = false;
    //           state.employeeOrderDetails = action.payload.data;
    //   })
    //     .addCase(getOrderDetailsForEmployee.rejected, (state) => {
    //           state.isLoading = false;
    //           state.employeeOrderDetails = null;
    //  });
  },
});



export default AdminDistributorProductSlice.reducer;
