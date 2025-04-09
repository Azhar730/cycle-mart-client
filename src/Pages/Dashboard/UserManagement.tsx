import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/Redux/features/auth/authApi";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/Redux/features/user/user.api";
import { Select } from "antd";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const UserManagement = () => {
  const { data: response, isLoading, isError } = useGetAllUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setTimeout(() => toast.success("User deleted successfully"), 1000);
  };
  const handleChange = async (value: string, id: string) => {
    const toastId = toast.loading("Updating User Status");
    const payload = {
      id,
      status: value,
    };
    console.log(payload);
    try {
      const res = await updateUserStatus(payload).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    }
  };
  const handleRole = async (value: string, id: string) => {
    const toastId = toast.loading("Updating User Role");
    console.log(value);
    const payload = {
      id,
      role: value,
    };
    console.log(payload);
    try {
      const res = await updateUserRole(payload).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong !
      </h3>
    );
  }

  const allUsers = response?.data;

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-sm buser buser-gray-200 overflow-hidden">
        <div className="px-6 py-4 buser-b buser-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Manage users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allUsers?.map((user: any) => (
                <tr key={user?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={cn("text-sm", {
                        "text-blue-500": user?.status === "active",
                        "text-rose-500": user?.status === "blocked",
                      })}
                    >
                      {user?.status === "blocked" ? "Blocked" : "Active"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={cn("text-sm", {
                        "text-teal-500": user?.role === "customer",
                        "text-orange-500": user?.role === "admin",
                      })}
                    >
                      {user?.role === "customer" ? "Customer" : "Admin"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      defaultValue={
                        user?.status === "blocked" ? "Blocked" : "Active"
                      }
                      style={{ width: 120 }}
                      onChange={(value) => handleChange(value, user?._id)}
                      options={[
                        { value: "active", label: "Active" },
                        { value: "blocked", label: "Block" },
                      ]}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      defaultValue={
                        user?.role === "customer" ? "Customer" : "Admin"
                      }
                      style={{ width: 120 }}
                      onChange={(value) => handleRole(value, user?._id)}
                      options={[
                        { value: "customer", label: "Customer" },
                        { value: "admin", label: "Admin" },
                      ]}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                    <Trash2
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
