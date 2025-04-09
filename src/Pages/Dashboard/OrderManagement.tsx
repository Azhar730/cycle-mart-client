import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/Redux/features/order/order.api";
import { useAppSelector } from "@/Redux/hooks";
import { Select } from "antd";
import { toast } from "sonner";

const OrderManagement = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllOrdersQuery(undefined, { skip: !userId });

  const [updateShippingStatus] = useUpdateOrderStatusMutation();

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

  const handleChange = async (value: string, id: string) => {
    const toastId = toast.loading("Updating Shipping Status");
    const payload = {
      id: id,
      shippingStatus: value,
    };
    try {
      const res = await updateShippingStatus(payload).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    }
  };

  const allOrders = response?.data;

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Manage Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipping Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOrders?.map((order: any) => (
                <tr key={order?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order?.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order?.email}</div>
                    <div className="text-sm text-gray-500">{order?.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Quantity: {order?.quantity}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Total: ${order?.totalPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        {
                          "text-blue-500 bg-blue-100":
                            order?.shippingStatus === "Shipped",
                          "text-green-500 bg-green-100":
                            order?.shippingStatus === "Delivered",
                          "text-yellow-500":
                            order?.shippingStatus === "Processing",
                        }
                      )}
                    >
                      {order?.shippingStatus || "Processing"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      defaultValue={order?.shippingStatus || "Pending"}
                      style={{ width: 120 }}
                      onChange={(value) => handleChange(value, order?._id)}
                      options={[
                        { value: "Pending", label: "Pending" },
                        { value: "Processing", label: "Processing" },
                        { value: "Shipped", label: "Shipped" },
                        { value: "Delivered", label: "Delivered" },
                      ]}
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

export default OrderManagement;
