import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-main mb-4 text-primary">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button text="Go Back Home" />
      </Link>
    </div>
  );
};

export default ErrorPage;
