import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}`;

// Thunks
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchTestimonialById = createAsyncThunk(
  "testimonials/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/create`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/update/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/delete/${id}`);
      return { id, msg: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    items: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload;
      })
      .addCase(fetchTestimonials.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // fetch by id
      .addCase(fetchTestimonialById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestimonialById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.current = payload;
      })
      .addCase(fetchTestimonialById.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // add
      .addCase(addTestimonial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTestimonial.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items.unshift(payload);
      })
      .addCase(addTestimonial.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // update
      .addCase(updateTestimonial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTestimonial.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const idx = state.items.findIndex((i) => i._id === payload._id || i.id === payload.id);
        if (idx !== -1) state.items[idx] = payload;
        if (state.current && (state.current._id === payload._id || state.current.id === payload.id)) {
          state.current = payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // delete
      .addCase(deleteTestimonial.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTestimonial.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = state.items.filter((i) => (i._id || i.id) !== payload.id);
        if (state.current && (state.current._id === payload.id || state.current.id === payload.id)) {
          state.current = null;
        }
      })
      .addCase(deleteTestimonial.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { clearCurrent } = testimonialsSlice.actions;

export const selectTestimonials = (state) => state.testimonials.items;
export const selectTestimonialsStatus = (state) => state.testimonials.status;
export const selectTestimonialsError = (state) => state.testimonials.error;
export const selectCurrentTestimonial = (state) => state.testimonials.current;

export default testimonialsSlice.reducer;