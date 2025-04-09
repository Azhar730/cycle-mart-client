import Button from "@/components/Button/Button";
import Loading from "@/components/Loading";
import { useGetSingleBicycleQuery } from "@/Redux/features/bicycle/bicycle.api";
import { useNavigate, useParams } from "react-router-dom";

const BicycleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetSingleBicycleQuery(id);

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

  if (!bicycle) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Car not found!
      </h3>
    );
  }

  return (
    <div className="max-w-5xl mt-32 md:mt-48 mb-16 md:mb-24 w-[90%] md:w-[88%] mx-auto flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div>
          <img
            src={
              bicycle?.image ||
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            } // Assuming `car.image` contains the image URL
            alt={`${bicycle.brand} ${bicycle.model}`}
            className="w-full h-64 md:h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-primary text-2xl md:text-3xl font-bold">
            {bicycle.brand} {bicycle.model}
          </h3>
          <p>{bicycle.description}</p>
          <div className="flex flex-col text-sm gap-1">
            <p>
              <span className="font-semibold">Name:</span> {bicycle.name}
            </p>
            <p>
              <span className="font-semibold">Brand:</span> {bicycle.brand}
            </p>
            <p>
              <span className="font-semibold">Model:</span> {bicycle.model}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {bicycle.category}
            </p>
            <p>
              <span className="font-semibold">Price:</span> $
              {bicycle.price.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {bicycle.description}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {bicycle.quantity}
            </p>
          </div>
          <Button
            text="Buy Now"
            handleClick={() => {
              navigate(`/checkout?id=${id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BicycleDetails;
