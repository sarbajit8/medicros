// src/store/admin/warning-slice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  warningList: [],
};

// ✅ Add new warning using raw form data
export const addWarning = createAsyncThunk(
  "warning/addWarning",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/warning/add`,
      formData
    );
    return response.data;
  }
);

// ✅ Get all warnings by employeeId
export const getWarningsByEmployeeId = createAsyncThunk(
  "warning/getWarningsByEmployeeId",
  async (employeeId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/warning/list/${employeeId}`
    );
    return response.data;
  }
);

// ✅ Edit warning using raw form data
export const editWarning = createAsyncThunk(
  "warning/editWarning",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/warning/edit/${id}`,
      formData
    );
    return response.data;
  }
);

// ✅ Delete warning
export const deleteWarning = createAsyncThunk(
  "warning/deleteWarning",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/warning/delete/${id}`
    );
    return response.data;
  }
);

const warningSlice = createSlice({
  name: "warning",
  initialState,
  reducers: {
    resetWarnings: (state) => {
      state.warningList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWarningsByEmployeeId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarningsByEmployeeId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warningList = action.payload.data;
      })
      .addCase(getWarningsByEmployeeId.rejected, (state) => {
        state.isLoading = false;
        state.warningList = [];
      });
  },
});

export const { resetWarnings } = warningSlice.actions;
export default warningSlice.reducer;
