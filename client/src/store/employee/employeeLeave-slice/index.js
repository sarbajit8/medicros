import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  employeeLeaveList: [],
  employeeOrderDetails: null,
  leaveList: [],

};

export const addEmployeeLeave = createAsyncThunk(
  "/employeeleave/addEmployeeLeave",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/employee/leave/add`,
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

export const fetchAllEmployeeLeaves = createAsyncThunk(
  "/employeeleave/fetchAllEmployeeLeaves",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/leave/get`
    );

    return result?.data;
  }
);

export const getAllLeaveByEmployee = createAsyncThunk(
    "/employeeleave/getAllLeaveByEmployee",
    async (employeeId) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employee/leave/list/${employeeId}`
      );
  
      return response.data;
    }
  );

export const editLeave = createAsyncThunk(
  "/employeeleave/editLeave",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/leave/edit/${id}`,
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





export const updateEmployeeLeaveStatus = createAsyncThunk(
  "/employeeleave/updateEmployeeLeaveStatus",
  async ({ id, leaveStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/leave/update/${id}`,
      {
        leaveStatus,
      }
    );

    return response.data;
  }
);

export const updateLeaveReplyById = createAsyncThunk(
  "/employeeleave/updateLeaveReplyById",
  async ({ id, reply }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/employee/leave/update-reply/${id}`,
      { reply },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data;
  }
);




const EmployeeLeaveSlice = createSlice({
  name: "employeeleave",
  initialState,
  reducers: {
    // resetEmployeeOrderDetails: (state) => {
    //     state.employeeOrderDetails = null;
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployeeLeaves.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEmployeeLeaves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeLeaveList = action.payload.data;
      })
      .addCase(fetchAllEmployeeLeaves.rejected, (state, action) => {
        state.isLoading = false;
        state.employeeLeaveList = [];
      })
       .addCase(getAllLeaveByEmployee.pending, (state) => {
              state.isLoading = true;
      })
        .addCase(getAllLeaveByEmployee.fulfilled, (state, action) => {
              state.isLoading = false;
              state.leaveList = action.payload.data;
      })
        .addCase(getAllLeaveByEmployee.rejected, (state) => {
              state.isLoading = false;
              state.leaveList = [];
      })
      .addCase(updateLeaveReplyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeaveReplyById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update reply inside employeeLeaveList
        state.employeeLeaveList = state.employeeLeaveList.map((leave) =>
          leave._id === action.payload.data._id
            ? { ...leave, reply: action.payload.data.reply }
            : leave
        );
      })
      .addCase(updateLeaveReplyById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { resetEmployeeOrderDetails } = EmployeeOrderSlice.actions;


export default EmployeeLeaveSlice.reducer;
