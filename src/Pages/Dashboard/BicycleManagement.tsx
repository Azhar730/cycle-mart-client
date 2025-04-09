import { useState } from "react";
import { Button, GetProps, Input, Select } from "antd";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useGetAllBicycleQuery } from "@/Redux/features/bicycle/bicycle.api";
import Loading from "@/components/Loading";
import { TBicycle } from "@/types/bicycle.type";
import BicycleCard from "@/components/BicycleCard";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const models = [
  "Trail Master 500",
  "Speedster X",
  "Eco Ride 300",
  "BMX Blazer",
  "Hybrid Explorer",
  "Road King 700",
];
const brands = [
  "Giant",
  "Trek",
  "Specialized",
  "Cannondale",
  "Scott",
  "Bianchi",
];
const categories = ["Mountain", "Road", "Hybrid", "BMX", "Electric"];
const availabilities = [
  { name: "In Stock", value: "inStock" },
  { name: "Out of Stock", value: "outOfStock" },
];

const BicycleManagement = () => {
  const [search, setSearch] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState<any>([0, 200000]);
  // console.log(priceRange);
  const queryParams = [
    { name: "searchTerm", value: search },
    { name: "model", value: model },
    { name: "brand", value: brand },
    { name: "category", value: category },
    { name: "availability", value: availability },
    { name: "priceRange", value: priceRange },
  ];
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

  const handleModelChange = (value: string) => {
    setModel(value);
  };
  const handleBrandChange = (value: string) => {
    setBrand(value);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
  };
  const handleSliderChange = (value: any) => {
    setPriceRange(value);
  };
  const handleResetFilter = () => {
    setModel("");
    setBrand("");
    setCategory("");
    setAvailability("");
    setPriceRange([0, 200000]);
    window.location.reload();
  };
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearch(value);
  };
  return (
    <section className="my-6 bg-gray-100">
      <div className="flex gap-4 flex-wrap justify-between items-center">
        <Search
          className="lg:basis-2/6 hover:outline-0"
          placeholder="Search by brand, car name or category"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <div className="flex flex-wrap items-center gap-4">
          <Select
            placeholder="Filter by model"
            style={{ width: 160, height: 40 }}
            onChange={handleModelChange}
            options={models.map((model) => ({
              label: model,
              value: model,
            }))}
          />
          <Select
            placeholder="Filter by brand"
            style={{ width: 160, height: 40 }}
            onChange={handleBrandChange}
            options={brands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
          />
          <Select
            placeholder="Filter by category"
            style={{ width: 160, height: 40 }}
            onChange={handleCategoryChange}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
          <Select
            placeholder="Filter by availability"
            style={{ width: 160, height: 40 }}
            onChange={handleAvailabilityChange}
            options={availabilities.map((option) => ({
              label: option.name,
              value: option.value,
            }))}
          />
          <Button onClick={handleResetFilter} type="primary" className="h-10">
            Clear Filter
          </Button>
        </div>
      </div>

      {/* price range  */}
      <div className="p-6 mt-4 bg-white shadow-md rounded-md z-30">
        <Slider
          range
          min={0}
          max={200000}
          value={priceRange}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: "#E53E29", height: 8 }]}
          handleStyle={[
            {
              borderColor: "#E53E29",
              height: 24,
              width: 24,
              marginTop: -8,
            },
            {
              borderColor: "#E53E29",
              height: 24,
              width: 24,
              marginTop: -8,
            },
          ]}
          railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
        />

        <p className="mt-3 text-gray-600">
          Price Range: <span className="font-semibold">${priceRange[0]}</span> -{" "}
          <span className="font-semibold">${priceRange[1]}</span>
        </p>
      </div>

      {/* product cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mt-4">
        {bicycles?.map((bicycle: TBicycle, index: number) => (
          <BicycleCard key={index} bicycle={bicycle} isAdmin={true} />
        ))}
      </div>
    </section>
  );
};

export default BicycleManagement;
