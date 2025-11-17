import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/bsalist`;

const initialState = {
  isLoading: false,
  logData: null,
  error: null,
};

// ✅ Create or update BSA daily log
export const upsertBsaDailyLog = createAsyncThunk(
  "bsaDailyLog/upsertBsaDailyLog",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/upsert`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Fetch BSA daily log by employeeId and date
export const fetchBsaDailyLog = createAsyncThunk(
  "bsaDailyLog/fetchBsaDailyLog",
  async ({ employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/by-date`, {
        params: { employeeId, date },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const bsaDailyLogSlice = createSlice({
  name: "bsaDailyLog",
  initialState,
  reducers: {
    clearBsaLogState: (state) => {
      state.isLoading = false;
      state.logData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upsert
      .addCase(upsertBsaDailyLog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(upsertBsaDailyLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logData = action.payload.data;
      })
      .addCase(upsertBsaDailyLog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Fetch
      .addCase(fetchBsaDailyLog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBsaDailyLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logData = action.payload.data || null;
      })
      .addCase(fetchBsaDailyLog.rejected, (state, action) => {
        state.isLoading = false;
        state.logData = null;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearBsaLogState } = bsaDailyLogSlice.actions;
export default bsaDailyLogSlice.reducer;
