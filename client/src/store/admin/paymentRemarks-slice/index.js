import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/remarks`;

const initialState = {
  isLoading: false,
  data: null,
  success: false,
  error: null,
};

// ✅ Upsert (Add or Update) remarks by employeeId + date
export const upsertPaymentRemarks = createAsyncThunk(
  "paymentRemarks/upsert",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/upsert`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Fetch remarks by employeeId and date
export const fetchPaymentRemarksByEmployeeAndDate = createAsyncThunk(
  "paymentRemarks/fetch",
  async ({ employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-remarks/?employeeId=${employeeId}&date=${date}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const paymentRemarksSlice = createSlice({
  name: "paymentRemarks",
  initialState,
  reducers: {
    clearPaymentRemarksState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ⬇️ Upsert
      .addCase(upsertPaymentRemarks.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(upsertPaymentRemarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload?.data || null;
      })
      .addCase(upsertPaymentRemarks.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // ⬇️ Fetch
      .addCase(fetchPaymentRemarksByEmployeeAndDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchPaymentRemarksByEmployeeAndDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload?.data || null;
      })
      .addCase(fetchPaymentRemarksByEmployeeAndDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch remarks";
      });
  },
});

export const { clearPaymentRemarksState } = paymentRemarksSlice.actions;
export default paymentRemarksSlice.reducer;
