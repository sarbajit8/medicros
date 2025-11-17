import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  galleryItemsList: [],
  error: null,
};

// GET
export const getGalleryItems = createAsyncThunk(
  "/gallery/getGalleryItems",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/gallery/get`
    );
    return response.data;
  }
);

// ADD
export const addGalleryItems = createAsyncThunk(
  "/gallery/addGalleryItems",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/gallery/add`,
      formData
      // Do NOT set headers manually for multipart/form-data, let Axios handle it
    );
    return result?.data;
  }
);

// DELETE
export const deleteGalleryItem = createAsyncThunk(
  "/gallery/deleteGalleryItem",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/common/gallery/delete/${id}`
    );
    return { id, ...result.data };
  }
);

// EDIT
export const editGalleryItem = createAsyncThunk(
  "/gallery/editGalleryItem",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/common/gallery/edit/${id}`,
      formData
    );
    return result?.data;
  }
);

// Slice
const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getGalleryItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGalleryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.galleryItemsList = action.payload.data;
      })
      .addCase(getGalleryItems.rejected, (state) => {
        state.isLoading = false;
        state.galleryItemsList = [];
      })

      // ADD
      .addCase(addGalleryItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGalleryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.galleryItemsList.push(action.payload.data);
      })
      .addCase(addGalleryItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Failed to add item";
      })

      // DELETE
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.galleryItemsList = state.galleryItemsList.filter(
          (item) => item._id !== action.payload.id
        );
      })

      // EDIT
      .addCase(editGalleryItem.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.galleryItemsList.findIndex((item) => item._id === updated._id);
        if (index !== -1) {
          state.galleryItemsList[index] = updated;
        }
      });
  },
});

export default gallerySlice.reducer;
