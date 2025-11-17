import {
  BadgeCheck,
  BadgeCheckIcon,
  Bell,
  GalleryHorizontal,
  LayoutDashboard,
  ListOrdered,
  Notebook,
  NotebookIcon,
  ShoppingBasket,
  User2Icon,
  UserCheck2,
  UserRound,
} from "lucide-react";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import logo from '../../assets/mlogo.png';
import { FaComment, FaSortNumericDownAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "@/store/admin/notification-slice";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "notification",
    label: "Notification",
    path: "/admin/notification",
    icon: <Bell />,
  },
  {
    id: "gallery",
    label: "Gallery",
    path: "/admin/gallery",
    icon: <GalleryHorizontal />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "distribtors",
    label: "Distribtors",
    path: "/admin/distributors",
    icon: <User2Icon />,
  },
  {
    id: "distributororders",
    label: "Distributor Orders",
    path: "/admin/distributororders",
    icon: <BadgeCheck />,
  },
  {
    id: "add employee",
    label: "Employee",
    path: "/admin/manageemployee",
    icon: <UserRound />,
  },
  {
    id: "employeeorders",
    label: "Employee Orders",
    path: "/admin/employeeorders",
    icon: <BadgeCheckIcon />,
  },
  {
    id: "employeedesk",
    label: "Leave Application",
    path: "/admin/employeedesk",
    icon: <UserCheck2 />,
  },
  {
    id: "brands",
    label: "Brands",
    path: "/admin/brands",
    icon: <Notebook />,
  },
  {
    id: "categories",
    label: "Category",
    path: "/admin/category",
    icon: <NotebookIcon />,
  },
  {
    id: "requirement",
    label: "Requirement",
    path: "/admin/quickorder",
    icon: <ListOrdered />,
  },
  {
    id: "uploadexcel",
    label: "Excel",
    path: "/admin/excel",
    icon: <ListOrdered />,
  },
  {
    id: "pcd",
    label: "Pcd Manufacturer",
    path: "/admin/pcd",
    icon: <ListOrdered />,
  },
  {
    id: "pcd-orders",
    label: "Pcd Orders",
    path: "/admin/pcd-orders",
    icon: <ListOrdered />,
  },
  {
    id: "rules",
    label: "Rules & Regulations",
    path: "/admin/rules",
    icon: <ListOrdered />,
  },
  {
    id: "career",
    label: "Career",
    path: "/admin/career",
    icon: <FaSortNumericDownAlt />,
  },
  //  {
  //   id: "testimonials",
  //   label: "Testimonials",
  //   path: "/admin/testimonials",
  //   icon: <FaComment />,
  // },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  return (
    <nav className="mt-8 flex-col flex gap-2 overflow-y-scroll">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            window.scrollTo(0, 0); // ✅ Scroll to top after navigation
            setOpen?.(false);
          }}
          className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <div className="flex items-center gap-2 text-xl">
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>

          {menuItem.id === "notification" && unreadCount > 0 && (
            <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile View */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <img className="w-20" src={logo} alt="Admin Logo" />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => {
            navigate("/admin/dashboard");
            window.scrollTo(0, 0); // ✅ Scroll to top
          }}
          className="flex cursor-pointer items-center gap-2"
        >
          <img className="w-20" src={logo} alt="Admin Logo" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
