import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
    toast.success("Logout successful");
  };
  return (
    <div className="max-w-[100%] mx-auto w-80">
      <div className="rounded-lg border-2 border-primary bg-transparent px-4 py-8 text-center shadow-lg">
        <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-person-fill text-white dark:text-rose-300"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          </svg>
          <figcaption className="sr-only">{currentUser?.name}</figcaption>
        </figure>
        <h2 className="mt-4 text-xl font-bold text-primary dark:text-rose-400">
          {currentUser?.name}
        </h2>
        <p className="mb-4 text-gray-600">
          Role:{" "}
          <span className="font-bold text-primary">
            {currentUser?.role.toUpperCase()}
          </span>
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={handleLogout}
            className="rounded-full cursor-pointer bg-primary px-4 py-2 text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
