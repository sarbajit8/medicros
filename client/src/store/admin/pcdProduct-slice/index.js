import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  adminPcdProductList: [],
  pcdProductList: [],
};

export const addPcdProduct = createAsyncThunk(
  "admin/addPcdProduct",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdProduct/add`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const fetchAllPcdProduct = createAsyncThunk(
  "admin/fetchAllPcdProduct",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdProduct/get`
    );
    return response.data;
  }
);

export const getAllPcdProductsByPcdId = createAsyncThunk(
  "admin/getAllPcdProductsByPcdId",
  async (PcdId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdProduct/pcd/${PcdId}`
    );
    return response.data;
  }
);

export const editPcdProduct = createAsyncThunk(
  "admin/editPcdProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdProduct/edit/${id}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const deletePcdProduct = createAsyncThunk(
  "admin/deletePcdProduct",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/pcdProduct/delete/${id}`
    );
    return response.data;
  }
);

const AdminPcdProductSlice = createSlice({
  name: "adminPcdProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPcdProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPcdProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminPcdProductList = action.payload.data;
      })
      .addCase(fetchAllPcdProduct.rejected, (state) => {
        state.isLoading = false;
        state.adminPcdProductList = [];
      })
      .addCase(getAllPcdProductsByPcdId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPcdProductsByPcdId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pcdProductList = action.payload.data;
      })
      .addCase(getAllPcdProductsByPcdId.rejected, (state) => {
        state.isLoading = false;
        state.pcdProductList = [];
      });
  },
});

export default AdminPcdProductSlice.reducer;
