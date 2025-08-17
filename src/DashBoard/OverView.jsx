import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Wallet, ShoppingCart, Heart, Users, Package } from "lucide-react";
import useUserInfo from "../Hooks/useUserInfo";

const Overview = () => {
  const { user } = useAuth();
  const { userInfo } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const role = userInfo?.role || "user";

  // User-specific queries
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/my-orders?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalOrders = orders.length;
  const totalWatchlist = watchlist.length;
  const totalSpent = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  // Admin-specific queries
  const { data: allUsersData = { users: [], total: 0 } } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: role === "admin",
  });

  const totalUsers = allUsersData.total;
  // const allUsersArray = allUsersData.users;

  const { data: allProducts = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (role !== "admin") return [];
      const res = await axiosSecure.get("/products");
      return res.data;
    },
    enabled: role === "admin",
  });

  const { data: allPayments = [] } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      if (role !== "admin") return [];
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
    enabled: role === "admin",
  });

  const totalProducts = allProducts.length;
  const totalSales = allPayments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  // Vendor-specific queries
  const { data: vendorProducts = [] } = useQuery({
    queryKey: ["vendorProducts", user?.email],
    queryFn: async () => {
      if (role !== "vendor") return [];
      const res = await axiosSecure.get(`/products/vendor/${user?.email}`);
      return res.data;
    },
    enabled: role === "vendor",
  });

  const { data: vendorAds = [] } = useQuery({
    queryKey: ["vendorAds", user?.email],
    queryFn: async () => {
      if (role !== "vendor") return [];
      const res = await axiosSecure.get(`/advertisements?vendorEmail=${user.email}`);
      return res.data;
    },
    enabled: role === "vendor",
  });

  const { data: vendorPayments = [] } = useQuery({
    queryKey: ["vendorPayments", user?.email],
    queryFn: async () => {
      if (role !== "vendor") return [];
      const res = await axiosSecure.get(`/payments/vendor/${user.email}`);
      return res.data;
    },
    enabled: role === "vendor",
  });
  


  const totalVendorProducts = vendorProducts.length;
  const totalVendorAds = vendorAds.length;
  const totalVendorEarnings = vendorPayments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  const vendorChartData = [
    { name: "Products", value: totalVendorProducts },
    { name: "Ads", value: totalVendorAds },
    { name: "Earnings", value: totalVendorEarnings },
  ];

  const userChartData = [
    { name: "Orders", value: totalOrders },
    { name: "Watchlist", value: totalWatchlist },
    { name: "Spent", value: totalSpent },
  ];

  const adminChartData = [
    { name: "Users", value: totalUsers },
    { name: "Products", value: totalProducts },
    { name: "Sales", value: totalSales },
  ];

  const COLORS = ["#4f46e5", "#f97316", "#10b981"];

  return (
    <div className="p-6 space-y-8">
      {/* User Cards */}
      {role === "user" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">Total Orders</p>
                <h2 className="text-3xl font-bold">{totalOrders}</h2>
              </div>
              <ShoppingCart size={40} />
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">Watchlist</p>
                <h2 className="text-3xl font-bold">{totalWatchlist}</h2>
              </div>
              <Heart size={40} />
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">Total Spent</p>
                <h2 className="text-3xl font-bold">৳{totalSpent.toFixed(2)}</h2>
              </div>
              <Wallet size={40} />
            </div>
          </div>

          {/* User Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userChartData}
                    cx="50%"
                    cy="50%"
                    labelLine
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {userChartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Trend</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
      {/* Vendor Cards */}
      {role === "vendor" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-500 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">My Products</p>
                <h2 className="text-3xl font-bold">{totalVendorProducts}</h2>
              </div>
              <Package size={40} />
            </div>

            <div className="bg-orange-500 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">My Ads</p>
                <h2 className="text-3xl font-bold">{totalVendorAds}</h2>
              </div>
              <ShoppingCart size={40} />
            </div>

            <div className="bg-teal-500 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">My Earnings</p>
                <h2 className="text-3xl font-bold">
                  ৳{totalVendorEarnings.toFixed(2)}
                </h2>
              </div>
              <Wallet size={40} />
            </div>
          </div>

          {/* Vendor Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vendorChartData}
                    cx="50%"
                    cy="50%"
                    labelLine
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {vendorChartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Trend</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vendorChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Admin Cards */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-500 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">Total Users</p>
                <h2 className="text-3xl font-bold">{totalUsers}</h2>
              </div>
              <Users size={40} />
            </div>

            <div className="bg-orange-500 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">Total Products</p>
                <h2 className="text-3xl font-bold">{totalProducts}</h2>
              </div>
              <Package size={40} />
            </div>

            <div className="bg-teal-500 text-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-lg">Total Sales</p>
                <h2 className="text-3xl font-bold">৳{totalSales.toFixed(2)}</h2>
              </div>
              <Wallet size={40} />
            </div>
          </div>

          {/* Admin Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adminChartData}
                    cx="50%"
                    cy="50%"
                    labelLine
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {adminChartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 h-72">
              <h3 className="text-lg font-semibold mb-2">Trend</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adminChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
