import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addOrUpdateAlertByAdmin = createAsyncThunk(
  'alert/addOrUpdateByAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/alert/add`, data);
      return response.data.alert;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

export const markAlertAsReadByEmployee = createAsyncThunk(
  'alert/markAsRead',
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/alert/update/${userid}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

export const getAlertByUserId = createAsyncThunk(
  'alert/getByUserId',
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/alert/fetch/${userid}`);
      return response.data.alert;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

export const deleteAlertById = createAsyncThunk(
  'alert/deleteById',
  async (alertId, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/alert/delete/${alertId}`);
      return { id: alertId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alert: null,
    alerts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAlertState: (state) => {
      state.alert = null;
      state.alerts = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrUpdateAlertByAdmin.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.loading = false;
      })
      .addCase(markAlertAsReadByEmployee.fulfilled, (state) => {
        state.alerts = state.alerts.map(alert => ({
          ...alert,
          status: 'read',
        }));
        state.loading = false;
      })
      .addCase(getAlertByUserId.fulfilled, (state, action) => {
        state.alerts = action.payload;
        state.loading = false;
      })
      .addCase(deleteAlertById.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter(alert => alert._id !== action.payload.id);
        state.loading = false;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAlertState } = alertSlice.actions;
export default alertSlice.reducer;
