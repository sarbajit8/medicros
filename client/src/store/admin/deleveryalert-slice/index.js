import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add or Update Delivery Alert
export const addOrUpdateDeleveryAlert = createAsyncThunk(
  'deliveryAlert/addOrUpdate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/deleveryalerts/add`, data);
      return response.data.alert;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

// Mark as Read by userid and type
export const markDeleveryAlertAsRead = createAsyncThunk(
  'deliveryAlert/markAsRead',
  async ({ userid, type }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/deleveryalerts/read/${userid}/${type}`);
      return response.data.alert;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

// Get alert by userid and type
export const getDeleveryAlertByUserAndType = createAsyncThunk(
  'deliveryAlert/getByUserAndType',
  async ({ userid, type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/deleveryalerts/get/${userid}/${type}`);
      return response.data.alert;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

const deliveryAlertSlice = createSlice({
  name: 'deliveryAlert',
  initialState: {
    alert: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDeliveryAlertState: (state) => {
      state.alert = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add/Update
      .addCase(addOrUpdateDeleveryAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateDeleveryAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = action.payload;
      })
      .addCase(addOrUpdateDeleveryAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark as Read
      .addCase(markDeleveryAlertAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markDeleveryAlertAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = action.payload;
      })
      .addCase(markDeleveryAlertAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By User and Type
      .addCase(getDeleveryAlertByUserAndType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeleveryAlertByUserAndType.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = action.payload;
      })
      .addCase(getDeleveryAlertByUserAndType.rejected, (state, action) => {
        state.loading = false;
        state.alert =[];
      });
  },
});

export const { clearDeliveryAlertState } = deliveryAlertSlice.actions;
export default deliveryAlertSlice.reducer;
