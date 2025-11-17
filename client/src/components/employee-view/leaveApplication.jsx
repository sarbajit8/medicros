import React, { useEffect, useState } from 'react';
import CommonForm from '../common/form';
import { addEmployeeLeaveApplication } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployeeLeave, getAllLeaveByEmployee } from '@/store/employee/employeeLeave-slice';
import { toast } from '@/hooks/use-toast';
import { addNotification } from '@/store/admin/notification-slice';

const initialFormData = {
    employeeId: "",
    employeeName: "",
    title: "",
    application: "",
    leaveStatus: "",
    date: ""
};

const LeaveApplication = () => {
    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.adminEmployee);
    const { leaveList } = useSelector(state => state.employeeLeave);
    const [formData, setFormData] = useState(initialFormData);

    function onSubmit(e) {
        e.preventDefault();
      console.log(employee,"leave");
      
        dispatch(addEmployeeLeave({
            ...formData,
            employeeName: employee?.name,
            employeeId: employee?.id,
            employeePan: employee?.pan,
            leaveStatus: "pending",
            date: new Date(),
        })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getAllLeaveByEmployee(employee?.id));
                setFormData(initialFormData);
                toast({
                    title: 'Leave application submitted successfully',
                });
            }
        });

  const data = {
    title: "Leave Request ",
    description: `${employee?.name} applied for leave`,
  };

  dispatch(addNotification(data)).then((res) => {
    if (res?.meta?.requestStatus === "fulfilled") {
        console.log("leave request added");
        
    } else {
    
      console.error("Notification failed");
    }
  });



    }

    useEffect(() => {
        dispatch(getAllLeaveByEmployee(employee?.id));
    }, [dispatch]);

    return (
        <div className="p-4">
            <section>
                <CommonForm
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText="Submit"
                    formControls={addEmployeeLeaveApplication}
                />
            </section>

           {leaveList && leaveList.length > 0 ? (
    [...leaveList].reverse().map(leave => (
                    <section key={leave.id} className="bg-white shadow-md rounded-lg p-6 w-full relative mb-4 transition-transform transform hover:scale-105">
                        {/* Leave Date */}
                        <span className="absolute top-4 right-4 text-gray-500 text-sm">
                            {leave?.date ? leave.date.split("T")[0] : 'N/A'}
                        </span>

                        {/* Leave Title & Application */}
                        <h2 className="break-words w-[400px] break-all  p-2">{leave.title}</h2>
                        <p className="break-words max-w-[800px] md:max-w-[800px] sm:max-w-[200px] break-all  p-2">{leave.application}</p>

                        {/* Reply Section */}
                        <p className="text-gray-600 text-base mb-4">Reply: {leave.reply || "No reply yet"}</p><br/>

                        {/* Leave Status Badge with Color Coding */}
                        <span className={`absolute bottom-4 left-4 text-xs font-semibold px-2 py-1 rounded-full 
                            ${leave.leaveStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                              leave.leaveStatus === 'rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-blue-100 text-blue-800'}`}>
                            Status: {leave.leaveStatus}
                        </span>
                    </section>
                ))
            ) : (
                <p className="text-gray-500 text-center">No leave applications found.</p>
            )}
        </div>
    );
};

export default LeaveApplication;
