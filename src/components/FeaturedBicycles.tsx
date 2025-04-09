import { useGetAllBicycleQuery } from "@/Redux/features/bicycle/bicycle.api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { TBicycle } from "@/types/bicycle.type";
import BicycleCard from "./BicycleCard";
import Button from "./Button/Button";
import SectionHead from "./SectionHead";

const FeaturedBicycle = () => {
  const queryParams = [{ name: "limit", value: 8 }];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllBicycleQuery(queryParams);
  console.log(response);
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
  const bicycles = response?.data;
  return (
    <section className="my-8 md:my-16 bg-gray-100">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="Featured Bicycles"
          description="Check out our latest featured Bicycle"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bicycles.map((bicycle: TBicycle, index: number) => (
            <BicycleCard key={index} bicycle={bicycle} />
          ))}
        </div>
        <div className="text-center mt-5 flex justify-end">
          <Link to="/all-bicycles">
            <Button text="View All Bicycle" />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedBicycle;
