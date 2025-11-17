import { Outlet, useLocation } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";
import SemiAdminSideBar from "./sidebar";
import SemiAdminHeader from "./header";

function SemiAdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();


  return (

    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}   
      <SemiAdminSideBar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <SemiAdminHeader setOpen={setOpenSidebar}/>
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SemiAdminLayout;
