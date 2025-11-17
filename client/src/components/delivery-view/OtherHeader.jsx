import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {  logoutEmployee } from "@/store/admin/employee-slice";
import { useNavigate } from "react-router-dom";


function OtherHeader({ setOpen }) {
 const navigate = useNavigate();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {   
    dispatch(logoutEmployee()).then(()=>{
      window.location.reload();
    })
  }

  

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block bg-blue-800 hover:bg-blue-400">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-blue-800 hover:bg-blue-400"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}


export default OtherHeader