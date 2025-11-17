import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const sendOTP = createAsyncThunk("auth/sendOTP", async (mobile) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auths/send-otp`, { mobile });
  return response.data;
});

export const verifyOTP = createAsyncThunk("auth/verifyOTP", async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auths/verify-otp`, userData);
  return response.data;
});

const authMSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => { state.loading = true; })
      .addCase(sendOTP.fulfilled, (state) => { state.loading = false; })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      });
  },
});

export default authMSlice.reducer;
