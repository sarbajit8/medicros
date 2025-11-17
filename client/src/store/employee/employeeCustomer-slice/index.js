import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  employeeCustomerList: [],
//   employeeCustomerDetails: null,
};

// ✅ Add a new Employee Customer
export const addEmployeeCustomer = createAsyncThunk(
  "/employeeCustomer/addEmployeeCustomer",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/employee/customer/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// ✅ Fetch all Employee Customers by Employee ID
export const getAllCustomerByEmployee = createAsyncThunk(
  "/employeeCustomer/getAllCustomerByEmployee",
  async (employeeid) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/customer/list/${employeeid}`
    );
    return response.data;
  }
);

// ✅ Edit Employee Customer by ID
export const editEmployeeCustomer = createAsyncThunk(
  "/employeeCustomer/editEmployeeCustomer",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/customer/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// ✅ Delete Employee Customer by ID
export const deleteEmployeeCustomer = createAsyncThunk(
  "/employeeCustomer/deleteEmployeeCustomer",
  async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/employee/customer/delete/${id}`
    );
    return id; // Return the deleted ID to remove it from Redux state
  }
);

const employeeCustomerSlice = createSlice({
  name: "employeeCustomer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployeeCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEmployeeCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeCustomerList.push(action.payload.data);
      })
      .addCase(addEmployeeCustomer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCustomerByEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomerByEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeCustomerList = action.payload.data;
      })
      .addCase(getAllCustomerByEmployee.rejected, (state) => {
        state.isLoading = false;
        state.employeeCustomerList = [];
      })
      .addCase(editEmployeeCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEmployeeCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeCustomerList = state.employeeCustomerList.map((customer) =>
          customer._id === action.payload.data._id ? action.payload.data : customer
        );
      })
      .addCase(editEmployeeCustomer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEmployeeCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeCustomerList = state.employeeCustomerList.filter(
          (customer) => customer._id !== action.payload
        );
      })
      .addCase(deleteEmployeeCustomer.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default employeeCustomerSlice.reducer;
