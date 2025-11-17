import { fetchEmployeeImageById, getEmployeeById } from '@/store/admin/employee-slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeMyProfile = () => {
    const { employee,employeeImage ,employeebyid} = useSelector(state => state.adminEmployee);
    console.log(employeeImage,"dddddddddddddddddd");
    const dispatch = useDispatch();
    
useEffect(() => {
    dispatch(fetchEmployeeImageById(employee.id))
 
}, [dispatch])
useEffect(() => {
  dispatch(getEmployeeById(employee.id))

}, [dispatch])

console.log(employee,"uuuudddddddddddddd");


//   const user = {
//     name: "John Doe",
//     username: "johndoe123",
//     password: "********",
//     type: "Admin",
//     profilePic: "https://via.placeholder.com/150" // Replace with actual image URL
//   };

  return (
    <div className="max-w-lg mx-auto bg-white  rounded-lg p-6 text-center">
      {/* Profile Picture */}
      <div className="flex justify-center">
        <img
          src={employeeImage} 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-xl font-bold text-gray-800">{employee.name}</h2>
      <p className="text-gray-500 uppercase">id: MR{employeebyid?.pan}</p>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Username:</span>
          <span className="text-gray-800">{employee.username}</span>
        </div>
        
        {/* <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Password:</span>
          <span className="text-gray-800">{employee.password}</span>
        </div> */}
        
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Account Type:</span>
          <span className="text-gray-800 capitalize">{employee.usertype}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Designation:</span>
          <span className="text-gray-800">{employeebyid?.designation}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Date Of Birth:</span>
          <span className="text-gray-800">{employeebyid?.dateofbirth}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Date Of Joining:</span>
          <span className="text-gray-800">{employeebyid?.dateofjoining}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Personal Contact Number:</span>
          <span className="text-gray-800">{employeebyid?.personalcontact}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Official Contact Number:</span>
          <span className="text-gray-800">{employeebyid?.officialcontact}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Address:</span>
          <span className="text-gray-800 break-words max-w-[200px]">{employeebyid?.address}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Adhar No / Voter Id No:</span>
          <span className="text-gray-800">{employeebyid?.adharorvoter}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">PAN No:</span>
          <span className="text-gray-800">{employeebyid?.pan}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Sequirity Cheque Details:</span>
          <span className="text-gray-800 break-words max-w-[200px]">{employeebyid?.cheque}</span>
        </div>
        
       
       
        
      
      </div>
    </div>
  );
};

export default EmployeeMyProfile;
