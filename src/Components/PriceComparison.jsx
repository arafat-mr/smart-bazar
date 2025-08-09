import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PriceComparison = ({ marketName, products }) => {
  const axios = useAxiosSecure();
  const [selectedProductId, setSelectedProductId] = useState("");

  const selectedProduct = products.find((p) => p._id === selectedProductId);

  const { data: priceTrend = [], isLoading: trendLoading } = useQuery({
    queryKey: ["price-trend", selectedProductId],
    enabled: !!selectedProductId,
    queryFn: async () => {
      const res = await axios.get(`/price-trend/${selectedProductId}`);
      return res.data;
    },
  });

  const sortedPriceTrend = [...priceTrend].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const yesterdayPrice = sortedPriceTrend?.[sortedPriceTrend.length - 2]?.price;
  const latestPrice = sortedPriceTrend?.[sortedPriceTrend.length - 1]?.price;
  const priceDiff =
    latestPrice != null && yesterdayPrice != null ? latestPrice - yesterdayPrice : null;

  return (
    <div className="mt-10 p-4 border rounded-xl bg-white shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">📊 Price Trend Comparison</h2>

      <div className="flex justify-center mb-6">
        <select
          className="select select-bordered max-w-xs"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option disabled value="">
            Select Product
          </option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.itemName} - {product.vendorName || product.vendorEmail}
            </option>
          ))}
        </select>
      </div>

      {trendLoading && <p className="text-center">Loading price trend...</p>}

      {!trendLoading && selectedProductId && sortedPriceTrend.length === 0 && (
        <p className="text-center text-gray-500">No price data available for this product.</p>
      )}

      {!trendLoading && sortedPriceTrend.length > 0 && (
        <>
          <div className="text-center mt-2 font-semibold text-lg">
            Latest Price: ৳{latestPrice ?? "N/A"}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={sortedPriceTrend}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => format(parseISO(dateStr), "MMM d")}
              />
              <YAxis />
              <Tooltip labelFormatter={(dateStr) => format(parseISO(dateStr), "PPP")} />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                dot
                connectNulls
                name="Price"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="text-center mt-4 font-medium">
            {priceDiff !== null ? (
              priceDiff > 0 ? (
                <span className="text-red-600">
                  🔺 Increased by ৳{priceDiff.toFixed(2)} since yesterday
                </span>
              ) : priceDiff < 0 ? (
                <span className="text-green-600">
                  🟢 Decreased by ৳{Math.abs(priceDiff).toFixed(2)} since yesterday
                </span>
              ) : (
                <span className="text-gray-600">No change since yesterday</span>
              )
            ) : (
              <span className="text-gray-400">Not enough data to compare</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PriceComparison;
