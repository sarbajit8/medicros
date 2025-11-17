import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
 
  adminDistributorList: [],
//employeeOrderDetails: null,
// distributorList: [],

};

export const addDistributor = createAsyncThunk(
  "/admin/addDistributor",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/distributor/add`,
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

export const fetchAllDistributor = createAsyncThunk(
  "/admin/fetchAllDistributor",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/distributor/get`
    );

    return result?.data;
  }
);



export const editDistributor = createAsyncThunk(
  "/admin/editDistributor",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/distributor/edit/${id}`,
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

export const deleteDistributor = createAsyncThunk(
    "/admin/deleteDistributor",
    async (id) => {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/distributor/delete/${id}`
      );
  
      return result?.data;
    }
  );


const AdminDistributorSlice = createSlice({
  name: "employeeOrders",
  initialState,
  reducers: {
    resetEmployeeOrderDetails: (state) => {
        state.employeeOrderDetails = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDistributor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllDistributor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminDistributorList = action.payload.data;
      })
      .addCase(fetchAllDistributor.rejected, (state, action) => {
        state.isLoading = false;
        state.adminDistributorList = [];
      })
    //    .addCase(getAllSalarySlipByEmployeeId.pending, (state) => {
    //           state.isLoading = true;
    //   })
    //     .addCase(getAllSalarySlipByEmployeeId.fulfilled, (state, action) => {
    //           state.isLoading = false;
    //           state.distributorList = action.payload.data;
    //   })
    //     .addCase(getAllSalarySlipByEmployeeId.rejected, (state) => {
    //           state.isLoading = false;
    //           state.distributorList = [];
    //   });
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



export default AdminDistributorSlice.reducer;
