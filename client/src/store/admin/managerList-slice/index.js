import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/managerlist`;

const initialState = {
  isLoading: false,
  logData: null,
  error: null,
};

// ✅ Create or update manager daily log
export const upsertManagerDailyLog = createAsyncThunk(
  "managerDailyLog/upsertManagerDailyLog",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/upsert`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Fetch manager daily log by employeeId and date
export const fetchManagerDailyLog = createAsyncThunk(
  "managerDailyLog/fetchManagerDailyLog",
  async ({ employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-log`, {
        params: { employeeId, date }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const managerDailyLogSlice = createSlice({
  name: "managerDailyLog",
  initialState,
  reducers: {
    clearManagerLogState: (state) => {
      state.isLoading = false;
      state.logData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upsert
      .addCase(upsertManagerDailyLog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(upsertManagerDailyLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logData = action.payload.data;
      })
      .addCase(upsertManagerDailyLog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Fetch
      .addCase(fetchManagerDailyLog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchManagerDailyLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logData = action.payload.data || null;
      })
      .addCase(fetchManagerDailyLog.rejected, (state, action) => {
        state.isLoading = false;
        state.logData = null;
      });
  },
});

export const { clearManagerLogState } = managerDailyLogSlice.actions;
export default managerDailyLogSlice.reducer;
