import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin/rules`;

// ✅ Get all rules
export const getAllRules = createAsyncThunk("rules/getAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/list`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch rules");
  }
});

// ✅ Add rule (formData: { title, date, image (File) })
export const addRule = createAsyncThunk("rules/add", async (formData, thunkAPI) => {
  try {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("date", formData.date);
    form.append("image", formData.image); // Must be a PDF File

    const res = await axios.post(`${API_URL}/add`, form);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add rule");
  }
});

// ✅ Edit rule
export const editRule = createAsyncThunk("rules/edit", async ({ id, formData }, thunkAPI) => {
  try {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("date", formData.date);
    if (formData.image) {
      form.append("image", formData.image); // Optional new file
    }

    const res = await axios.put(`${API_URL}/edit/${id}`, form);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to edit rule");
  }
});

// ✅ Delete rule
export const deleteRule = createAsyncThunk("rules/delete", async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete rule");
  }
});

const rulesSlice = createSlice({
  name: "rules",
  initialState: {
    rulesList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllRules.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRules.fulfilled, (state, action) => {
        state.loading = false;
        state.rulesList = action.payload;
      })
      .addCase(getAllRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addRule.fulfilled, (state, action) => {
        state.rulesList.unshift(action.payload);
      })

      // Edit
      .addCase(editRule.fulfilled, (state, action) => {
        const index = state.rulesList.findIndex(rule => rule._id === action.payload._id);
        if (index !== -1) state.rulesList[index] = action.payload;
      })

      // Delete
      .addCase(deleteRule.fulfilled, (state, action) => {
        state.rulesList = state.rulesList.filter(rule => rule._id !== action.payload);
      });
  },
});

export default rulesSlice.reducer;
