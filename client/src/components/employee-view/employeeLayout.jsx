
import { Outlet } from "react-router-dom";
import { useState } from "react";
import EmployeeSideBar from "./employeeSidebar";
import EmployeeHeader from "./employeeHeader";
const EmployeeLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <EmployeeSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <EmployeeHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default EmployeeLayout;
