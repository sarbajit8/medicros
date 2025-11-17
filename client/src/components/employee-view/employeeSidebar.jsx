import {
    AmpersandsIcon,
    ArrowDownLeftFromCircleIcon,
    ArrowUpFromDotIcon,
    BadgeCheck,
    Bell,
    ChartNoAxesCombined,
    GalleryHorizontal,
    LayoutDashboard,
    ListCheck,
    ShoppingBasket,
    User,
    User2,
    UserRound,
  } from "lucide-react";
  import { Fragment, useEffect } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
  import logo from '../../assets/mlogo.png';
import { useDispatch, useSelector } from "react-redux";
import { getAlertByUserId } from "@/store/admin/alert-slice";



function MenuItems({ setOpen }) {
  const { employee } = useSelector(state => state.adminEmployee);
  const { alerts } = useSelector(state => state.alert); // ✅ select alert slice

  const navigate = useNavigate();
  const isBsa = employee?.usersubtype === 'BSA';
  const unreadCount = alerts.filter(alert => alert.status === 'unread').length;

  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/employee/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/employee/profile",
      icon: <User2 />,
    },
    {
      id: "customers",
      label: "Customers",
      path: "/employee/customers",
      icon: <User />,
    },
    {
      id: isBsa ? "bsa" : "manager",
      label: "Daily List",
      path: isBsa ? "/employee/bsa" : "/employee/manager",
      icon: <ListCheck />,
    },
    {
      id: "notifications",
      label: "Notifications",
      path: "/employee/notifications",
      icon: (
        <div className="relative">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      ),
    },
  ];
    const dispatch = useDispatch();

useEffect(() => {
  if (employee?.id) {
    dispatch(getAlertByUserId(employee.id));
  }
}, [dispatch, employee?.id]);

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

  function EmployeeSideBar({ open, setOpen }) {
    const navigate = useNavigate();
  
    return (
      <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-5 mb-5">
                <img className="w-20" src={logo} alt="" />
                  <h1 className="text-2xl font-extrabold">Employee Panel</h1>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            {/* <ArrowDownLeftFromCircleIcon size={30} /> */}
               <img className="w-20" src={logo} alt="" />
            
            <h1 className="text-2xl font-extrabold">Employee Panel</h1>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    );
  }
  
  export default EmployeeSideBar;
  