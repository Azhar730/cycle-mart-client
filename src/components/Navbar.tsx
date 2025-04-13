import { useEffect, useRef, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { toast } from "sonner";
import { LogOut, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout, selectCurrentToken, selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { cn } from "@/lib/utils";
import menuItems from "@/data/menuItems";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Listen to scroll events
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsNavOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={cn(
        "flex justify-between items-center py-4 md:py-8 mx-auto z-[100] bg-transparent fixed top-0 w-full md:h-[100px] text-white",
        {
          "bg-gray-800 shadow-md":
            isScrolled ||
            (location.pathname !== "/" && location.pathname !== "/about"),
        }
      )}
    >
      <div className="w-[90%] md:w-[88%] mx-auto flex justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center">
        <Link to={'/'} className="text-xl font-semibold text-blue-400">Cycle Mart</Link>
        </div>

        {/* Menu links for large devices */}
        <div className="hidden lg:flex items-center justify-center gap-12 font-questrial text-para text-[14px] font-normal bg-primary px-12 py-3 rounded-full transition-transform duration-300">
          {menuItems.map((menu, idx) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={idx}
                to={menu.path}
                className={`${
                  isActive ? "text-teal-600 font-semibold" : "text-para"
                } hover:text-teal-600 transition-all duration-300`}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Login and Button */}
        <div className="hidden lg:flex items-center gap-8">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-para hover:text-primary transition-all duration-300"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 cursor-pointer rounded-full transition-colors"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <User className="w-6 h-6" />
                <MdKeyboardArrowDown className="h-5 w-5 text-gray-600" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-4 z-20">
                  <div className="flex items-center gap-3 mx-3">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <h3 className="font-medium text-black">{user?.name}</h3>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard/my-profile")}
                    className="w-full flex items-center hover:bg-blue-50 gap-3 px-4 py-2 mt-2 text-sm text-black transition-colors"
                  >
                    <FiUser className="h-4 w-4 text-main" />
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center hover:bg-blue-50 gap-3 px-4 py-2 text-sm text-black transition-colors"
                  >
                    <RxDashboard className="h-4 w-4 text-main" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("token");
                      toast.success("Log out Successful");
                      navigate("/login");
                    }}
                    className="w-full flex items-center hover:bg-blue-50 gap-3 px-4 py-2 text-sm text-black transition-colors"
                  >
                    <BiLogOut className="h-4 w-4 text-main" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu bar */}
        <div className="flex lg:hidden items-center gap-3 md:gap-8 font-questrial text-[14px] font-normal text-gray-800">
          {isNavOpened ? (
            <IoClose
              className="text-primary"
              onClick={() => setIsNavOpened(!isNavOpened)}
              size={32}
            />
          ) : (
            <IoMenu
              className="text-primary"
              onClick={() => setIsNavOpened(!isNavOpened)}
              size={32}
            />
          )}
        </div>

        {/* Mobile menu */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-[calc(100vh+72px)] bg-gray-800 shadow-lg z-40 transform transition-all duration-500 ease-in-out ${
            isNavOpened
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
          style={{ width: "70%" }}
        >
          <div className="flex flex-col items-start gap-6 px-6 py-5">
            <Link to="/" className="font-semibold text-white text-xl">
              CarZ
            </Link>
            <div className="mt-2 md:mt-8 flex flex-col gap-4">
              {menuItems.map((menu, idx) => {
                const isActive = location.pathname === menu.path;
                return (
                  <Link
                    key={idx}
                    to={menu.path}
                    onClick={() => setIsNavOpened(!isNavOpened)}
                    className={`${
                      isActive ? "text-primary" : ""
                    } text-[16px] text-white`}
                  >
                    {menu.name}
                  </Link>
                );
              })}
              {!isLoggedIn ? (
                <Link to="/login" className="w-full text-white">
                  Login
                </Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link to="/dashboard" className="w-full text-white">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("token");
                      toast.success("Log out Successful");
                      navigate("/login");
                    }}
                    className="flex items-center px-4 py-3 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50 w-full"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
