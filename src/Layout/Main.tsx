import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="max-w-5xl md:max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Main;
