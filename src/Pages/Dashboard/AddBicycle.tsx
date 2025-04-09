import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddBicycleMutation } from "@/Redux/features/bicycle/bicycle.api";
import ShopForm from "@/components/Form/ShopForm";
import { brands, categories, models } from "@/constant/bicycle.constant";
import ShopInput from "@/components/Form/ShopInput";
import ShopSelect from "@/components/Form/ShopSelect";
import ShopImageUpload from "@/components/Form/ShopImageUpload";
import ShopTextArea from "@/components/Form/ShopTextArea";
import Button from "@/components/Button/Button";

const validationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  brand: z.string().nonempty("Brand is required"),
  model: z.string().nonempty("Model is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  category: z.string().nonempty("Category is required"),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Quantity must be at least 1")
  ),
  description: z.string().nonempty("Description is required"),
  image: z.instanceof(File).optional(),
});

const AddBicycle = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [addBicycle] = useAddBicycleMutation();
  const navigate = useNavigate();
  // submit update
  const handleSubmit = async (formData: any) => {
    const toastId = toast.loading("Creating Bicycle...");

    const formDataToSend = new FormData();
    if (formData.image) {
      formDataToSend.append("file", formData.image);
      delete formData.image;
    }
    formDataToSend.append("data", JSON.stringify({ ...formData }));

    try {
      const res = await addBicycle(formDataToSend).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
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
  const modelOptions = models?.map((model) => ({
    label: model,
    value: model,
  }));
  const categoryOptions = categories?.map((category) => ({
    label: category,
    value: category,
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
            <ShopInput
              placeHolder="Bike Name"
              name={"name"}
              label="Name"
              type="text"
            />
            <ShopSelect
              placeHolder="Select Brand"
              options={brandOptions}
              name={"brand"}
              label="Select Brand"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ShopSelect
              placeHolder="Select Model"
              options={modelOptions}
              name={"model"}
              label="Select Model"
            />
            <ShopInput
              placeHolder="Bicycle Quantity"
              name={"quantity"}
              label="Quantity"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ShopSelect
              placeHolder="Select Category"
              options={categoryOptions}
              name={"category"}
              label="Select Category"
            />
            <ShopInput
              placeHolder="Bicycle Price"
              name={"price"}
              label="Price"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-4">
            <ShopImageUpload
              setShowProfile={setShowProfile}
              showProfile={showProfile}
              name="image"
              label="Upload Image"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"></div>
          <ShopTextArea name={"description"} label="Description" />
        </div>

        <div className="flex justify-start gap-4">
          <Button isFullWidth={true} text="Add Bicycle" type="submit" />
        </div>
      </ShopForm>
    </div>
  );
};

export default AddBicycle;
