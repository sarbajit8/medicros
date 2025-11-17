import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  legalList: [],
};

// ✅ Add new legal document (PDF upload via FormData)
export const addNewLegal = createAsyncThunk(
  "employeeLegal/addNewLegal",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/legal/add`,
      formData
    );
    return response.data;
  }
);

// ✅ Get all legal documents by employee ID
export const getAllLegalByEmployeeId = createAsyncThunk(
  "employeeLegal/getAllLegalByEmployeeId",
  async (employeeId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/legal/list/${employeeId}`
    );
    return response.data;
  }
);

// ✅ Edit a legal document
export const editEmployeeLegal = createAsyncThunk(
  "employeeLegal/editEmployeeLegal",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/legal/edit/${id}`,
      formData
    );
    return response.data;
  }
);

// ✅ Delete legal document
export const deleteLegal = createAsyncThunk(
  "employeeLegal/deleteLegal",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/legal/delete/${id}`
    );
    return response.data;
  }
);

const employeeLegalSlice = createSlice({
  name: "employeeLegal",
  initialState,
  reducers: {
    resetLegalList: (state) => {
      state.legalList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLegalByEmployeeId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLegalByEmployeeId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.legalList = action.payload.data;
      })
      .addCase(getAllLegalByEmployeeId.rejected, (state) => {
        state.isLoading = false;
        state.legalList = [];
      });
  },
});

export const { resetLegalList } = employeeLegalSlice.actions;

export default employeeLegalSlice.reducer;
