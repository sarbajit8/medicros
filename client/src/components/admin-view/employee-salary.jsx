import { fetchAllEmployee } from '@/store/admin/employee-slice';
import { Dialog } from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SalarySlipByEmployee from './salarySlipByEmployee';
import { Button } from '../ui/button';

const SearchAndCards = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { EmployeeList } = useSelector(state => state.adminEmployee);
    const dispatch = useDispatch();

        const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    

    useEffect(() => {
        dispatch(fetchAllEmployee());
    }, [dispatch]);

    // Filter employees based on search term
    const filteredEmployees = EmployeeList.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        employee.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    className="border border-gray-300 rounded-lg p-2 w-full"
                />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                       
                        <div key={employee.id} className="cursor-pointer bg-white shadow-md rounded-lg p-4 m-2 flex flex-col items-center justify-center min-h-[80px] transition-transform transform hover:scale-105">
                            <p className="text-gray-800 font-bold break-words max-w-[200px]">{employee.name}</p>
                            <p className="text-gray-600 break-words max-w-[200px]">{employee.username}</p>
                             {/* <input type="text" /> */}
                        </div>                 
                    ))
                ) : (
                    <p className="text-gray-500">No employees found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchAndCards;