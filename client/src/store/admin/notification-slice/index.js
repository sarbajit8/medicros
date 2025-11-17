import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add a new notification
export const addNotification = createAsyncThunk(
  'notification/add',
  async (data, { rejectWithValue }) => {
    console.log("Inside addNotification thunk", data); // <--- Add this
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/notification/add`, data);
      return response.data.data;
    } catch (err) {
      console.error("Error in addNotification:", err); // <--- Add this
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

// Get all notifications
export const getAllNotifications = createAsyncThunk(
  'notification/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/notification/get`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

// Delete a notification by ID
export const deleteNotification = createAsyncThunk(
  'notification/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/notification/delete/${id}`);
      return { id, deletedNotification: response.data.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);
// Mark all notifications as read
export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/notification/mark-all-read`);
      return response.data; // includes modifiedCount and message
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

// Slice
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: null,    // Single notification (for create/update)
    notifications: [],     // List of notifications
    loading: false,
    error: null,
  },
  reducers: {
    clearNotificationState: (state) => {
      state.notification = null;
      state.notifications = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Notifications
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.notifications = [];
      })

      // Delete Notification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted notification from the list
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== action.payload.id
        );
        // If the current notification is the one being deleted, clear it
        if (state.notification && state.notification._id === action.payload.id) {
          state.notification = null;
        }
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
  state.loading = false;
  // Optimistically update all "unread" to "read"
  state.notifications = state.notifications.map((n) =>
    n.status === 'unread' ? { ...n, status: 'read' } : n
  );
})

  },
});

export const { clearNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;