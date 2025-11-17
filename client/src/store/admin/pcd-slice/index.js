import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  adminPcdList: [],
};

export const addPcd = createAsyncThunk(
  "/admin/addPcd",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/pcd/add`,
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

export const fetchAllPcd = createAsyncThunk(
  "/admin/fetchAllPcd",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/pcd/all`
    );
    return result?.data;
  }
);

export const editPcd = createAsyncThunk(
  "/admin/editPcd",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/pcd/edit/${id}`,
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

export const deletePcd = createAsyncThunk(
  "/admin/deletePcd",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/pcd/delete/${id}`
    );
    return result?.data;
  }
);

const AdminPcdSlice = createSlice({
  name: "adminPcd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPcd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPcd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminPcdList = action.payload.data;
      })
      .addCase(fetchAllPcd.rejected, (state) => {
        state.isLoading = false;
        state.adminPcdList = [];
      });
  },
});

export default AdminPcdSlice.reducer;
