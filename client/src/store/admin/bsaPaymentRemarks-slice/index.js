import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/bsaremarks`;

const initialState = {
  isLoading: false,
  data: null,
  success: false,
  error: null,
};

// ✅ Upsert (Add or Update) BSA payment remarks
export const upsertBsaPaymentRemarks = createAsyncThunk(
  "bsaPaymentRemarks/upsert",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/upsert`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Fetch BSA remarks by employeeId and date
export const fetchBsaPaymentRemarksByEmployeeAndDate = createAsyncThunk(
  "bsaPaymentRemarks/fetch",
  async ({ employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-remarks/?employeeId=${employeeId}&date=${date}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const bsaPaymentRemarksSlice = createSlice({
  name: "bsaPaymentRemarks",
  initialState,
  reducers: {
    clearBsaPaymentRemarksState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ⬇️ Upsert
      .addCase(upsertBsaPaymentRemarks.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(upsertBsaPaymentRemarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload?.data || null;
      })
      .addCase(upsertBsaPaymentRemarks.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // ⬇️ Fetch
      .addCase(fetchBsaPaymentRemarksByEmployeeAndDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchBsaPaymentRemarksByEmployeeAndDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload?.data || null;
      })
      .addCase(fetchBsaPaymentRemarksByEmployeeAndDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch remarks";
      });
  },
});

export const { clearBsaPaymentRemarksState } = bsaPaymentRemarksSlice.actions;
export default bsaPaymentRemarksSlice.reducer;
