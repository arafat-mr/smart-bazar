import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const fetchAllOrders = async () => {
    const res = await axiosSecure.get("/all-orders");
    return res.data;
  };

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["allOrders"],
    queryFn: fetchAllOrders,
  });

  if (isLoading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error loading orders.</p>;
  if (!orders.length) return <p className="text-center">No orders found.</p>;

  return (
    <div className="p-6 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Orders</h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-2 text-left">Buyer Email</th>
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Market</th>
              <th className="border p-2 text-right">Price/kg (৳)</th>
              <th className="border p-2 text-right">Amount (৳)</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-teal-950 text-white">
                <td className="border p-2">{order.userEmail}</td>
                <td className="border p-2">{order.productName}</td>
                <td className="border p-2">{order.marketName}</td>
                <td className="border p-2 text-right">{parseFloat(order.pricePerKg).toFixed(2)}</td>
                <td className="border p-2 text-right">{parseFloat(order.amount).toFixed(2)}</td>
                <td className="border p-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="border p-2 text-center">
                  <Link
                    to={`/allProductsApproved/${order.productId}`}
                    className="text-blue-400 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
