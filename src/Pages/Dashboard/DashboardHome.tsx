import { Users, DollarSign, Package, TrendingUp } from "lucide-react";

const DashboardHome = () => {
  // Demo data for analytics
  const analyticsData = {
    totalSales: 1250000,
    monthlyRevenue: 320000,
    totalInventory: 45,
    customerSatisfaction: 4.8,
  };

  const popularVehicles = [
  { name: "Trail Blazer", sales: 12, revenue: 600000, trend: "+15%" },
  { name: "Speed Pro", sales: 8, revenue: 280000, trend: "+8%" },
  { name: "Eco Urban", sales: 6, revenue: 210000, trend: "+5%" }
]

  const recentSales = [
  {
    id: 1,
    customer: "John Smith",
    bicycle: "Trail Blazer",
    price: 65000,
    date: "2024-03-15",
    status: "Completed",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    bicycle: "Speed Pro",
    price: 75000,
    date: "2024-03-14",
    status: "Processing",
  },
  {
    id: 3,
    customer: "Michael Brown",
    bicycle: "Eco Urban",
    price: 58000,
    date: "2024-03-13",
    status: "Completed",
  }
]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <main>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to Cycle Mart
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your dealership today.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(analyticsData.totalSales)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(analyticsData.monthlyRevenue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Inventory
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {analyticsData.totalInventory} vehicles
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Customer Rating
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {analyticsData.customerSatisfaction}/5.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Vehicles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Popular Vehicles
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {popularVehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {vehicle.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {vehicle.sales} units sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(vehicle.revenue)}
                      </p>
                      <p className="text-sm text-green-600">{vehicle.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Sales
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {sale.customer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {sale.bicycle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(sale.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sale.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
