import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmployeeLeaves,
  updateEmployeeLeaveStatus,
  updateLeaveReplyById,
} from "@/store/employee/employeeLeave-slice";
import { toast } from "@/hooks/use-toast";
import { addOrUpdateAlertByAdmin } from "@/store/admin/alert-slice";

const AllLeaveApplication = () => {
  const dispatch = useDispatch();
  const { employeeLeaveList } = useSelector((state) => state.employeeLeave);
  const [replyMessages, setReplyMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search term

  useEffect(() => {
    dispatch(fetchAllEmployeeLeaves());
  }, [dispatch]);

  // Handle Status Change
const onChangeHandler = (e, id) => {
  e.preventDefault();
  const status = e.target.value;

  dispatch(updateEmployeeLeaveStatus({ id, leaveStatus: status })).then(
    (data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllEmployeeLeaves());
        toast({ title: data?.payload?.message });

        // Create or update alert
        const updatedLeave = employeeLeaveList.find((leave) => leave._id === id);

        if (updatedLeave) {
          dispatch(
            addOrUpdateAlertByAdmin({
              username: updatedLeave.employeeName,
              userid: updatedLeave.employeeId, // make sure this is in the leave data
              type: `Leave ${status}`, // "Leave approved" or "Leave rejected"
            })
          );
        }
      }
    }
  );
};

  // Handle Reply Change
  const handleReplyChange = (e, id) => {
    setReplyMessages({ ...replyMessages, [id]: e.target.value });
  };

  // Submit Reply Update
  const handleReplySubmit = (id) => {
    const reply = replyMessages[id];

    if (!reply || reply.trim() === "") {
      toast({ title: "Reply cannot be empty!", type: "error" });
      return;
    }

    dispatch(updateLeaveReplyById({ id, reply })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllEmployeeLeaves());
        toast({ title: "Reply updated successfully!" });
      }
    });

    dispatch(updateLeaveReplyById({ id, reply })).then((data) => {
  if (data?.payload?.success) {
    dispatch(fetchAllEmployeeLeaves());
    toast({ title: "Reply updated successfully!" });

    const updatedLeave = employeeLeaveList.find((leave) => leave._id === id);

    if (updatedLeave) {
      dispatch(
        addOrUpdateAlertByAdmin({
          username: updatedLeave.employeeName,
          userid: updatedLeave.employeeId,
         type: `Leave reply updated`,

        })
      );
    }
  }
});

  };

  // Filter Leave Applications based on Search (Ignoring Extra Spaces)
  const normalizeText = (text) =>
    text.toLowerCase().replace(/\s+/g, " ").trim(); // Normalize text by removing extra spaces

  const filteredLeaves = employeeLeaveList.filter((leave) =>
    normalizeText(leave.employeeName).includes(normalizeText(searchTerm))
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-1/2 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm transition"
          placeholder="Search by Employee Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredLeaves.length > 0 ? (
        filteredLeaves.reverse().map((leave) => (
          <section
            key={leave._id}
            className="bg-white shadow-md rounded-lg p-6 w-full relative mb-6 transition-transform transform hover:scale-105"
          >
            {/* Employee Info */}
            <div className="mb-4">
              <span className="text-gray-600 text-sm">
                Employee Name: {leave.employeeName}
              </span>
              <span className="flex text-gray-600 text-sm ml-4">
                Employee ID:<p className="uppercase">MR{leave.employeePan}</p> 
              </span>
            </div>

            {/* Leave Date */}
            <span className="block text-gray-500 text-sm mb-2">
              {leave?.date ? leave.date.split("T")[0] : "N/A"}
            </span>

            {/* Leave Title & Application */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 break-words max-w-[400px]">
              {leave.title}
            </h2>
            <p className="text-gray-600 text-base mb-4 break-words max-w-[500px]">{leave.application}</p>

            {/* Status Badge */}
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full 
                                ${
                                  leave.leaveStatus === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : leave.leaveStatus === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : leave.leaveStatus === "pending"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
            >
              Status: {leave.leaveStatus}
            </span>

            {/* Reply Text Area & Submit Button */}
            <div className="mt-4">
              <p className="break-words max-w-[500px]">Reply: {leave.reply}</p>
              <br />
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 mb-2"
                placeholder="Add your reply here..."
                rows="3"
                value={replyMessages[leave._id] || ""}
                onChange={(e) => handleReplyChange(e, leave._id)}
              ></textarea>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                onClick={() => handleReplySubmit(leave._id)}
              >
                Update Reply
              </button>
            </div>

            {/* Status Update Section */}
            <div className="mt-4">
              <select
                name="status"
                onChange={(e) => onChangeHandler(e, leave._id)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
              >
                <option value="" disabled selected>
                  Change Status
                </option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </section>
        ))
      ) : (
        <p className="text-gray-500 text-center">No leave applications found.</p>
      )}
    </div>
  );
};

export default AllLeaveApplication;
