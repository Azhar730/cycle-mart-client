import { selectCurrentToken, TUser } from "@/Redux/features/auth/authSlice";
import { useAppSelector } from "@/Redux/hooks";
import { adminPaths } from "@/Routes/admin.routes";
import { customerPaths } from "@/Routes/customer.routes";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { verifyToken } from "@/utils/verifyToken";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

const userRole = {
  Admin: "admin",
  Customer: "customer",
};


const Sidebar = () => {
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const role = (user as TUser)?.role;
  let sidebarItems;
  switch (role) {
    case userRole.Admin:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.Admin);
      break;
    case userRole.Customer:
      sidebarItems = sidebarItemsGenerator(customerPaths, userRole.Customer);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <Link
        to={"/"}
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          fontSize: "24px",
        }}
      >
        PH University
      </Link>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
