import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckEmployeeAuth = ({ isAuthenticatedEmployee, employee, children }) => {
    const location = useLocation();
    console.log(employee?.usertype, "User Type Check");

    // Get user type safely
    const userType = employee?.usertype; 

    // If the user is not authenticated
    if (!isAuthenticatedEmployee) {
        // Allow access to the login page only
        if (location.pathname === "/employeelogin") {
            return <>{children}</>;
        } else {
            return <Navigate to="/employeelogin" />;
        }
    }

    // Redirect authenticated users from login to their respective dashboards
    if (location.pathname === "/employeelogin") {
        if (userType === "delivery") {
            return <Navigate to="/delivery/dashboard" />;
        } else if(userType === "sales") {
            return <Navigate to="/employee/dashboard" />;
        }else{
            return <Navigate to="/other"/>;
        }
    }
    // if (userType !== "delivery"||"sales" && location.pathname.includes("/employee/dashboard") && location.pathname.includes("/delivery/dashboard")) {
    //     return <Navigate to="/other" />;
    // }

    // 🚀 **Prevent delivery employees from accessing the employee dashboard**
    if (userType === "delivery" && location.pathname.includes("/employee/dashboard")) {
        return <Navigate to="/delivery/dashboard" />;
    }
   

    // 🚀 **Prevent employees (non-delivery) from accessing delivery dashboard**
    if (userType !== "delivery" && location.pathname.includes("/delivery/dashboard")) {
        return <Navigate to="/employee/dashboard" />;
    }

    // Allow access if none of the conditions match
    return <>{children}</>;
};

export default CheckEmployeeAuth;
