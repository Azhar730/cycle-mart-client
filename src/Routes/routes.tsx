import DashboardLayout from "@/Layout/DashboardLayout";
import Main from "@/Layout/Main";
import About from "@/Pages/About";
import AllBicycles from "@/Pages/AllBicycles";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import { createBrowserRouter } from "react-router-dom";
import DashboardHome from "@/Pages/Dashboard/DashboardHome";
import OrderManagement from "@/Pages/Dashboard/OrderManagement";
import UserManagement from "@/Pages/Dashboard/UserManagement";
import Profile from "@/Pages/Dashboard/Profile";
import Settings from "@/Pages/Dashboard/Settings";
import AddBicycle from "@/Pages/Dashboard/AddBicycle";
import BicycleManagement from "@/Pages/Dashboard/BicycleManagement";
import BicycleDetails from "@/Pages/BicycleDetails";
import EditBicycle from "@/Pages/Dashboard/EditBicycle";
import Checkout from "@/Pages/Checkout";
import VerifyOrder from "@/Pages/VerifyOrder";
import MyOrders from "@/Pages/Dashboard/MyOrder";
import ErrorPage from "@/Pages/Error";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-bicycles",
        element: <AllBicycles />,
      },
      {
        path: "/bicycle/:id",
        element: (
          <PrivateRoute>
            <BicycleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "shurjopay-response",
        element: (
          <PrivateRoute>
            <VerifyOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "order-management",
        element: (
          <ProtectedRoute role="admin">
            <OrderManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "bicycle-management",
        element: (
          <ProtectedRoute role="admin">
            <BicycleManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-bicycle",
        element: (
          <ProtectedRoute role="admin">
            <AddBicycle />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-bicycle/:id",
        element: (
          <ProtectedRoute role="admin">
            <EditBicycle />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
