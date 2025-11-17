import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employee:null,
  employeebyid:null,
  isAuthenticatedEmployee:false,
  isEpLoading: true,
  EmployeeList: [],
  DeliveryEmployeeList: [], 
  employeeImage: null,
};

export const addEmployee = createAsyncThunk(
  "/employee/addnewEmployee",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllEmployee = createAsyncThunk(
  "/employee/fetchAllEmployee",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/get`
    );

    return result?.data;
  }
);


// ✅ New: Fetch Delivery Employees
export const fetchDeliveryEmployees = createAsyncThunk(
  "/employee/fetchDeliveryEmployees",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/delivery-employees`
    );

    return result?.data;
  }
);

export const editEmployee = createAsyncThunk(
  "/employee/editEmployee",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "/employee/deleteEmployee",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/delete/${id}`
    );

    return result?.data;
  }
);
export const loginUser = createAsyncThunk('/employee/login',
  async(formData)=>{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/employee/login`,formData,{
          withCredentials: true
      });
      return response.data;
  }
)


export const getEmployeeById = createAsyncThunk(
  "/employee/getEmployeeById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/employee/${id}`
    );
    return response?.data;
  }
);


export const checkEpAuth = createAsyncThunk(
  "/employeelogin/checkauth",

  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/check-auth`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);
export const logoutEmployee = createAsyncThunk(
  "/employee/logout",

  async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);


export const fetchEmployeeImageById = createAsyncThunk(
  "/employee/fetchImageById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/employee/employeeimage/${id}`
    );
    return response?.data;
  }
);


const AdminEmployeeSlice = createSlice({
  name: "adminEmployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployee.pending, (state) => {
        state.isEpLoading = true;
      })
      .addCase(fetchAllEmployee.fulfilled, (state, action) => {
        state.isEpLoading = false;
        state.EmployeeList = action.payload.data;
      })
      .addCase(fetchAllEmployee.rejected, (state, action) => {
        state.isEpLoading = false;
        state.EmployeeList = [];
      })
      .addCase(fetchDeliveryEmployees.pending, (state) => {
        state.isEpLoading = true;
      })
      .addCase(fetchDeliveryEmployees.fulfilled, (state, action) => {
        state.isEpLoading = false;
        state.DeliveryEmployeeList = action.payload.data;
      })
      .addCase(fetchDeliveryEmployees.rejected, (state) => {
        state.isEpLoading = false;
        state.DeliveryEmployeeList = [];
      })
      .addCase(loginUser.pending, (state) => {
                  state.isEpLoading = true;
                })
      .addCase(loginUser.fulfilled, (state, action) => {
                  console.log(action);
          
                  state.isEpLoading = false;
                  state.employee = action.payload.success ? action.payload.user : null;
                  state.isAuthenticatedEmployee = action.payload.success;
                    // state.token = action.payload.token
                    // sessionStorage.setItem('token', JSON.stringify(action.payload.token));
                })
      .addCase(loginUser.rejected, (state, action) => {
                  state.isEpLoading = false;
                  state.employee = null;
                  state.isAuthenticatedEmployee = false;
                  // state.token = null;
                })
      .addCase(checkEpAuth.pending, (state) => {
                  state.isEpLoading = true;
                })
      .addCase(checkEpAuth.fulfilled, (state, action) => {
                  state.isEpLoading = false;
                  state.employee = action.payload.success ? action.payload.user : null;
                  state.isAuthenticatedEmployee = action.payload.success;
                })
      .addCase(checkEpAuth.rejected, (state, action) => {
                  state.isEpLoading = false;
                  state.employee = null;
                  state.isAuthenticatedEmployee = false;
                })
      .addCase(logoutEmployee.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.user = null;
                  state.isAuthenticated = false;
                })
      .addCase(fetchEmployeeImageById.pending, (state) => {
                  state.isEpLoading = true;
                })
      .addCase(fetchEmployeeImageById.fulfilled, (state, action) => {
                  state.isEpLoading = false;
                  state.employeeImage = action.payload.image; // ✅ Save fetched image in state
                })
      .addCase(fetchEmployeeImageById.rejected, (state) => {
                  state.isEpLoading = false;
                  state.employeeImage = null; // ✅ Reset image on error
                })
      .addCase(getEmployeeById.pending, (state) => {
                  state.isEpLoading = true;
                })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
                  state.isEpLoading = false;
                  state.employeebyid = action.payload.data;
                })
      .addCase(getEmployeeById.rejected, (state) => {
                  state.isEpLoading = false;
                  state.employeebyid = null;
                });
  },
});

export default AdminEmployeeSlice.reducer;
