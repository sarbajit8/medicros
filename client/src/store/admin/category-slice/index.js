import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  categoryList: [],
};

export const addNewCategory = createAsyncThunk(
  "/admin/addNewCategory",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/category/add`,
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

export const fetchAllCategorys = createAsyncThunk(
  "/admin/fetchAllCategorys",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/category/get`
    );

    return result?.data;
  }
);
export const deleteCategory = createAsyncThunk(
  "/admin/deleteCategory",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/category/delete/${id}`
    );

    return result?.data;
  }
);

const AdminCategorySlice = createSlice({
  name: "adminCategorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(fetchAllCategorys.rejected, (state, action) => {
        state.isLoading = false;
        state.categoryList = [];
      });
  },
});

export default AdminCategorySlice.reducer;
