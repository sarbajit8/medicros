import { Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import AdminSideBar from "../admin-view/sidebar";
import AdminHeader from "../admin-view/header";
import DeleveryHeader from "./header";
import DeleverySidebar from "./sidebar";

function DeleveryLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();


  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
   
      <DeleverySidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <DeleveryHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default DeleveryLayout