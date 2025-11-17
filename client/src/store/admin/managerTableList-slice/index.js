import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/managertablelist`;

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  data: null, // holds fetched collection
};

// Fetch collection by employeeId and date
export const fetchManagerPartyCollectionByDate = createAsyncThunk(
  "managerPartyCollection/fetchByDate",
  async ({ employeeId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/by-date`, {
        params: { employeeId, date },
      });
      return res.data.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// Add or update entries
export const upsertManagerPartyCollection = createAsyncThunk(
  "managerPartyCollection/upsert",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/upsert`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// Edit table row by tableId
export const editManagerPartyRowById = createAsyncThunk(
  "managerPartyCollection/edit-by-id",
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

// Delete table row by tableId
// export const deleteManagerPartyRowById = createAsyncThunk(
//   "managerPartyCollection/delete-by-id",
//   async ({ entryId, employeeId, date }, { rejectWithValue }) => {
//     try {
//       const res = await axios.delete(`${BASE_URL}/delete-by-id`, {
//         params: {
//           entryId,
//           employeeId,
//           date,
//         },
//       });
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: "Server error" });
//     }
//   }
// );

// Delete manager party collection entry by ID
export const deleteManagerPartyRowById = createAsyncThunk(
  'managerParty/deleteManagerPartyCollectionEntryById',
  async ({ entryId, employeeId, date }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-by-id`, {
        params: { entryId, employeeId, date },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Server error' });
    }
  }
);


const managerPartyCollectionSlice = createSlice({
  name: "managerPartyCollection",
  initialState,
  reducers: {
    clearPartyCollectionState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertManagerPartyCollection.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(upsertManagerPartyCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload.data; // update latest doc
      })
      .addCase(upsertManagerPartyCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(fetchManagerPartyCollectionByDate.pending, (state) => {
        state.isLoading = true;
        state.data = null;
      
      })
      .addCase(fetchManagerPartyCollectionByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchManagerPartyCollectionByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload?.message || "Something went wrong";
      })
      // Edit entry
        .addCase(editManagerPartyRowById.fulfilled, (state, action) => {
         state.data = action.payload;
        })
        .addCase(deleteManagerPartyRowById.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(deleteManagerPartyRowById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload.data; // Updated document after deletion
        })
        .addCase(deleteManagerPartyRowById.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload?.message || 'Failed to delete entry';
        });

          // Delete entry
        //   .addCase(deleteManagerPartyRowById.fulfilled, (state, action) => {
        //    state.data = action.payload;
        // })


     ;
  },
});

export const { clearPartyCollectionState } = managerPartyCollectionSlice.actions;
export default managerPartyCollectionSlice.reducer;
