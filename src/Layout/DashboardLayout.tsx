import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
  User,
  Users,
  LogOut,
  Bike
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoAdd } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = user?.role || "customer";
  const navigate = useNavigate();


  const menuItems =
    role == "customer"
      ? [
          { icon: Home, text: "Dashboard", path: "/dashboard" },
          { icon: BarChart3, text: "My Orders", path: "/dashboard/my-orders" },
          { icon: Settings, text: "Profile", path: "/dashboard/my-profile" },
        ]
      : [
          { icon: Home, text: "Dashboard", path: "/dashboard" },
          {
            icon: BarChart3,
            text: "Order Management",
            path: "/dashboard/order-management",
          },
          {
            icon: Users,
            text: "User Management",
            path: "/dashboard/user-management",
          },
          {
            icon: Bike,
            text: "Bicycle Management",
            path: "/dashboard/bicycle-management",
          },
          {
            icon: IoAdd,
            text: "Add Bicycle",
            path: "/dashboard/add-bicycle",
          },
          {
            icon: User,
            text: "Profile",
            path: "/dashboard/my-profile",
          },
          {
            icon: Settings,
            text: "Settings",
            path: "/dashboard/settings",
          },
        ];

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to={'/'} className="text-xl font-semibold text-blue-400">Cycle Mart</Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems?.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-50 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.text}
            </NavLink>
          ))}
        </nav>
        {/* log out button  */}
        <div className="p-4 fixed bottom-2 w-full">
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("token");
              toast.success("Log out Successful");
              navigate("/login");
            }}
            className="flex cursor-pointer items-center px-4 py-3 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="py-4 px-6 lg:px-8 mt-16">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
