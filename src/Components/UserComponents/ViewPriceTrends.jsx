import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const ITEMS_PER_PAGE = 5;

const ViewPriceTrends = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch all approved products
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axios.get("/productsApproved");
      return res.data.products || [];
    },
  });

  // Pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Find selected product details
  const selectedProduct = products.find(p => p._id === selectedProductId);

  // Prepare price data for chart (latest 5 days sorted ascending)
  let priceData = [];
  if (selectedProduct?.prices?.length) {
    priceData = [...selectedProduct.prices]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-5);
  }

  // Calculate percentage change
  let percentChange = null;
  if (priceData.length >= 2) {
    const first = priceData[0].price;
    const last = priceData[priceData.length - 1].price;
    percentChange = ((last - first) / first) * 100;
  }

  if (isLoading) return <p className="text-center mt-6 text-black">Loading products...</p>;
  if (isError) return <p className="text-center mt-6 text-red-400">Error loading products.</p>;

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 p-4 min-h-[600px] bg-transparent backdrop-blur-2xl shadow-2xl  rounded-2xl">
      {/* Left: Product list with pagination */}
      <div className="w-full lg:w-1/4 text-black bg-opacity-90 rounded-lg p-4 shadow-md h-[600px] overflow-y-auto">
        <h2 className="font-bold mb-4 text-lg text-black">Products (Page {page} of {totalPages})</h2>
        <ul>
          {paginatedProducts.map(product => (
            <li
              key={product._id}
              className={`cursor-pointer p-3 rounded mb-3 flex text-black  flex-col sm:flex-row gap-3 items-center ${
                product._id === selectedProductId ? "bg-gray-500 font-semibold " : "hover:bg-gray-500"
              }`}
              onClick={() => setSelectedProductId(product._id)}
            >
              <img
                src={product.image}
                alt={product.itemName}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 text-center sm:text-left  ">
                <div className="text-lg font-medium">{product.itemName}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: Price Trend Chart */}
      <div className="w-full lg:w-3/4  bg-opacity-90 rounded-lg p-6 shadow-md flex flex-col">
        {!selectedProduct ? (
          <p className="text-center text-black mt-20">Select a product to view price trend</p>
        ) : priceData.length === 0 ? (
          <p className="text-center text-black mt-20">No price data available</p>
        ) : (
          <>
            {/* Vendor and Market info */}
            <div className="mb-6 text-center text-black">
              <p className="text-lg font-semibold">
                Vendor: <span className="font-normal">{selectedProduct.vendorName || selectedProduct.vendorEmail}</span>
              </p>
              <p className="text-md font-medium">
                Market: {selectedProduct.marketName}
              </p>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={priceData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(dateStr) => format(parseISO(dateStr), "MMM d")}
                  stroke="black"
                />
                <YAxis stroke="black" />
                <Tooltip labelFormatter={(dateStr) => format(parseISO(dateStr), "PPP")} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="black"
                  dot
                  connectNulls
                  name="Price (৳)"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Price change */}
            <div className="text-center mt-4 font-semibold text-black">
              Price change compare last 5 days:{" "}
              {percentChange > 0
                ? `🔺 Increased by ${percentChange.toFixed(2)}%`
                : percentChange < 0
                ? `🟢 Decreased by ${Math.abs(percentChange).toFixed(2)}%`
                : "No change"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPriceTrends;
