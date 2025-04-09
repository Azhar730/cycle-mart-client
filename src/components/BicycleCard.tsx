import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteBicycleMutation } from "@/Redux/features/bicycle/bicycle.api";
import { TBicycle } from "@/types/bicycle.type";
import Button from "./Button/Button";
import { cn } from "@/lib/utils";

const BicycleCard = ({
  bicycle,
  isAdmin,
}: {
  bicycle: TBicycle;
  isAdmin?: boolean;
}) => {
  // console.log(bicycle);
  const navigate = useNavigate();
  const [deleteBicycle] = useDeleteBicycleMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting Bicycle...");
    try {
      const result = await deleteBicycle(bicycle?._id).unwrap();
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error: any) {
      if (error?.status === 401) {
        toast.error(error?.data?.message, { id: toastId });
        return;
      }
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <div
          className={cn(
            "absolute top-2 left-2 text-white text-xs font-semibold py-1 px-2 rounded",
            {
              "bg-green-500": bicycle.inStock,
              "bg-rose-500": !bicycle.inStock,
            }
          )}
        >
          {bicycle?.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <img
          src={
            bicycle?.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={bicycle.brand || "Product Image"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold mb-2">Brand: {bicycle?.brand}</p>
        <p className="text-sm font-semibold mb-2">
          Category: {bicycle?.category}
        </p>
        <p className="text-sm text-primary font-semibold mb-2">
          Price: ${bicycle.price}
        </p>
        {/* View Details button */}
        <div className="flex justify-end items-center">
          {!isAdmin && (
            <Button
              text={"View Details"}
              handleClick={() => {
                navigate(`/bicycle/${bicycle?._id}`);
              }}
            />
          )}
        </div>
        {isAdmin && (
          <div className="flex items-center justify-between gap-3">
            <Button
              text={"Edit Bicycle"}
              handleClick={() => {
                navigate(`/dashboard/edit-bicycle/${bicycle?._id}`);
              }}
            />
            <Button text={"Delete Bicycle"} handleClick={handleDelete} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BicycleCard;
