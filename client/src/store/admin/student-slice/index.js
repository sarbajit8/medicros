import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  studentList: [],
};

export const addNewStudent = createAsyncThunk("/admin/addNewStudent", async (formData) => {
  const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/student/add`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return result?.data;
});

export const fetchAllStudents = createAsyncThunk("/admin/fetchAllStudents", async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/student/get`);
  return result?.data;
});

export const updateStudent = createAsyncThunk("/admin/updateStudent", async ({ id, formData }) => {
  const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/student/update/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return result?.data;
});

export const deleteStudent = createAsyncThunk("/admin/deleteStudent", async (id) => {
  const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/student/delete/${id}`);
  return result?.data;
});

export const toggleStudentVisibility = createAsyncThunk("/admin/toggleStudentVisibility", async ({ id, field }) => {
  const result = await axios.patch(`${import.meta.env.VITE_API_URL}/api/admin/student/toggle/${id}`, { field });
  return result?.data;
});

// Public thunk — no admin auth needed
export const getStudentByEnrollment = createAsyncThunk("/student/getByEnrollment", async (enrollmentNumber) => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/student/public/${enrollmentNumber}`);
  return result?.data;
});

const adminStudentSlice = createSlice({
  name: "adminStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList = action.payload.data;
      })
      .addCase(fetchAllStudents.rejected, (state) => { state.isLoading = false; state.studentList = []; })

      .addCase(addNewStudent.pending, (state) => { state.isLoading = true; })
      .addCase(addNewStudent.fulfilled, (state) => { state.isLoading = false; })
      .addCase(addNewStudent.rejected, (state) => { state.isLoading = false; })

      .addCase(updateStudent.pending, (state) => { state.isLoading = true; })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload.data;
        const idx = state.studentList.findIndex((s) => s._id === updated._id);
        if (idx !== -1) state.studentList[idx] = updated;
      })
      .addCase(updateStudent.rejected, (state) => { state.isLoading = false; })

      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.studentList = state.studentList.filter((s) => s._id !== action.meta.arg);
      })

      .addCase(toggleStudentVisibility.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const idx = state.studentList.findIndex((s) => s._id === updated._id);
        if (idx !== -1) state.studentList[idx] = updated;
      });
  },
});

export default adminStudentSlice.reducer;
