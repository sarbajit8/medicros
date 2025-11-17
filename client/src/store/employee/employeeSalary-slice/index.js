import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  salaryList: [],
};

// ✅ Add new salary slip (supports PDF upload via FormData)
export const addNewSalary = createAsyncThunk(
  "employeeSalary/addNewSalary",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/employee/salary/add`,
      formData
    );
    return response.data;
  }
);


// ✅ Get all salary slips for a specific employee
export const getAllSalarySlipByEmployeeId = createAsyncThunk(
  "employeeSalary/getAllSalarySlipByEmployeeId",
  async (employeeId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/salary/list/${employeeId}`
    );
    return response.data;
  }
);

// ✅ Edit a salary slip (also supports FormData)
export const editEmployeeSalary = createAsyncThunk(
  "employeeSalary/editEmployeeSalary",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/salary/edit/${id}`,
      formData
    );
    return response.data;
  }
);

// ✅ Delete salary slip by ID
export const deleteSalarySlip = createAsyncThunk(
  "employeeSalary/deleteSalarySlip",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/employee/salary/delete/${id}`
    );
    return response.data;
  }
);

const employeeSalarySlice = createSlice({
  name: "employeeSalary",
  initialState,
  reducers: {
    resetSalaryList: (state) => {
      state.salaryList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalarySlipByEmployeeId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSalarySlipByEmployeeId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salaryList = action.payload.data;
      })
      .addCase(getAllSalarySlipByEmployeeId.rejected, (state) => {
        state.isLoading = false;
        state.salaryList = [];
      });
  },
});

export const { resetSalaryList } = employeeSalarySlice.actions;

export default employeeSalarySlice.reducer;
