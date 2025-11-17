import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  brandList: [],
};

export const addNewBrand = createAsyncThunk(
  "/admin/addNewBrand",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/brand/add`,
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

export const fetchAllBrands = createAsyncThunk(
  "/admin/fetchAllBrands",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/brand/get`
    );
    return result?.data;
  }
);

export const deleteBrand = createAsyncThunk(
  "/admin/deleteBrand",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/brand/delete/${id}`
    );
    return result?.data;
  }
);

export const updateBrand = createAsyncThunk(
  "/admin/updateBrand",
  async ({ id, updatedData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/brand/update/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const AdminBrandsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandList = action.payload.data;
      })
      .addCase(fetchAllBrands.rejected, (state) => {
        state.isLoading = false;
        state.brandList = [];
      })

      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedBrand = action.payload.data;
        const index = state.brandList.findIndex((brand) => brand._id === updatedBrand._id);
        if (index !== -1) {
          state.brandList[index] = updatedBrand;
        }
      })
      .addCase(updateBrand.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminBrandsSlice.reducer;
