import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  careerList: [],
  paymentStatus: null,
  paymentError: null,
};

// Add Career (PDF upload with optional payment for internship)
export const addCareer = createAsyncThunk(
  "career/addCareer",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/career/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Get All Career Entries
export const fetchAllCareer = createAsyncThunk(
  "career/fetchAllCareer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/career/list`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Verify Payment
export const verifyPayment = createAsyncThunk(
  "career/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/career/verify-payment`,
        paymentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Download Career PDF
export const downloadCareerPdf = createAsyncThunk(
  "career/downloadCareerPdf",
  async (filename, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/career/download/${filename}`,
        { responseType: "blob" }
      );
      // Create blob URL for download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    clearPaymentStatus: (state) => {
      state.paymentStatus = null;
      state.paymentError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCareer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCareer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.careerList = action.payload.data;
      })
      .addCase(fetchAllCareer.rejected, (state) => {
        state.isLoading = false;
        state.careerList = [];
      })

      .addCase(addCareer.pending, (state) => {
        state.isLoading = true;
        state.paymentStatus = null;
        state.paymentError = null;
      })
      .addCase(addCareer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.careerList.push(action.payload.data);
        if (action.payload.payment) {
          state.paymentStatus = 'payment_required';
        } else {
          state.paymentStatus = 'no_payment_required';
        }
      })
      .addCase(addCareer.rejected, (state, action) => {
        state.isLoading = false;
        state.paymentError = action.payload || "Failed to add career entry.";
      })

      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
        state.paymentError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.paymentStatus = 'payment_completed';
        } else {
          state.paymentError = action.payload.message || 'Payment verification failed';
        }
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.paymentError = action.payload || 'Payment verification failed';
      });
  },
});

export const { clearPaymentStatus } = careerSlice.actions;

export default careerSlice.reducer;
