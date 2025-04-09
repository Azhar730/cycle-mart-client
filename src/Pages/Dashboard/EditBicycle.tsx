import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSingleBicycleQuery,
  useUpdateBicycleMutation,
} from "@/Redux/features/bicycle/bicycle.api";
import Loading from "@/components/Loading";
import { brands, categories, models } from "@/constant/bicycle.constant";
import ShopForm from "@/components/Form/ShopForm";
import ShopSelect from "@/components/Form/ShopSelect";
import ShopInput from "@/components/Form/ShopInput";
import ShopImageUpload from "@/components/Form/ShopImageUpload";
import ShopTextArea from "@/components/Form/ShopTextArea";
import Button from "@/components/Button/Button";

const validationSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  image: z.instanceof(File).optional(),
  year: z
    .number()
    .min(2018, "Year must be 2018 or later")
    .max(2024, "Year must be 2024 or earlier")
    .optional(),
  price: z
    .preprocess(
      (val) => Number(val),
      z.number().min(0, "Price must be a positive number").optional()
    )
    .optional(),
  category: z.string().optional(),
  quantity: z
    .preprocess(
      (val) => Number(val),
      z.number().min(1, "Quantity must be at least 1").optional()
    )
    .optional(),
  description: z.string().optional(),
});

const EditBicycle = () => {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetSingleBicycleQuery(id);
  const [updateCar] = useUpdateBicycleMutation();
  const navigate = useNavigate();

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError || !response) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong !
      </h3>
    );
  }

  // Car data from the response
  const bicycle = response?.data;

  console.log(bicycle);

  if (!bicycle) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Bicycle not found!
      </h3>
    );
  }

  // submit update
  const handleSubmit = async (formData: any) => {
    const toastId = toast.loading("Updating Bicycle...");

    const formDataToSend = new FormData();
    if (formData?.image) {
      formDataToSend.append("file", formData?.image);
      delete formData?.image;
    }
    formDataToSend.append(
      "data",
      JSON.stringify({ ...formData, inStock: formData.quantity > 0 })
    );

    try {
      const res = await updateCar({
        id: id,
        formData: formDataToSend,
      }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setTimeout(() => navigate("/dashboard/bicycle-management"), 1000);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const brandOptions = brands?.map((brand) => ({
    label: brand,
    value: brand,
  }));
  const modelOptions = models?.map((brand) => ({
    label: brand,
    value: brand,
  }));
  const categoryOptions = categories?.map((brand) => ({
    label: brand,
    value: brand,
  }));

  return (
    <div>
      <ShopForm
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
        className="flex flex-col gap-5 my-5"
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ShopSelect
              defaultValue={bicycle?.brand}
              placeHolder="Select Brand"
              options={brandOptions}
              name={"brand"}
              label="Brand"
            />
            <ShopSelect
              defaultValue={bicycle?.model}
              placeHolder="Select Model"
              options={modelOptions}
              name={"model"}
              label="Model"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ShopInput
              value={bicycle?.price}
              name={"price"}
              label="Price"
              type="number"
            />
            <ShopInput
              value={bicycle?.quantity}
              name={"quantity"}
              label="Quantity"
              type="number"
            />
          </div>
          <ShopImageUpload name="image" label="Upload Image" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ShopSelect
              defaultValue={bicycle?.category}
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
              className="-mt-1"
            />
          </div>
          <ShopTextArea
            value={bicycle?.description}
            name={"description"}
            label="Description"
          />
        </div>

        <div className="flex justify-start gap-4">
          <Button text="Update" type="submit" />
        </div>
      </ShopForm>
    </div>
  );
};

export default EditBicycle;
