import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/bsalisttable`;

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  data: null,
};

// ✅ Fetch BSA collection by employeeId and date
export const fetchBsaPartyCollectionByDate = createAsyncThunk(
  "bsaPartyCollection/fetchByDate",
  async ({ employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-by-date`, {
        params: { employeeId, date },
      });
      return res.data.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Add or update entries
export const upsertBsaPartyCollection = createAsyncThunk(
  "bsaPartyCollection/upsert",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/upsert`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Edit entry by ID
export const editBsaPartyRowById = createAsyncThunk(
  "bsaPartyCollection/edit-by-id",
  async ({ entryId, employeeId, date, updatedEntry }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/edit-by-id`, {
        entryId,
        employeeId,
        date,
        updatedEntry,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// ✅ Delete entry by ID
export const deleteBsaPartyRowById = createAsyncThunk(
  "bsaPartyCollection/delete-by-id",
  async ({ entryId, employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete-by-id`, {
        params: { entryId, employeeId, date },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const bsaPartyCollectionSlice = createSlice({
  name: "bsaPartyCollection",
  initialState,
  reducers: {
    clearBsaPartyCollectionState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertBsaPartyCollection.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(upsertBsaPartyCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(upsertBsaPartyCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(fetchBsaPartyCollectionByDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchBsaPartyCollectionByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBsaPartyCollectionByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(editBsaPartyRowById.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(deleteBsaPartyRowById.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { clearBsaPartyCollectionState } = bsaPartyCollectionSlice.actions;
export default bsaPartyCollectionSlice.reducer;
