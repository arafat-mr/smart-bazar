import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;

  const fetchUserOrders = async ({ queryKey }) => {
    const [_key, email] = queryKey;
    const res = await axiosSecure.get(`/payments/my-orders?email=${email}`);
    return res.data;
  };

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["myOrders", userEmail],
    queryFn: fetchUserOrders,
    enabled: !!userEmail,
  });

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="p-4 md:p-6 bg-transparent backdrop-blur-2xl shadow-2xl rounded-2xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-300 text-black">
              <th className="border p-2 text-left">Product Name</th>
              <th className="border p-2 text-left">Market Name</th>
              <th className="border p-2 text-right">Price per Kg (৳)</th>
              <th className="border p-2 text-right">Total Price (৳)</th>
              <th className="border p-2 text-left">Payment Date</th>
              <th className="border p-2 text-center">View Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-teal-950 hover:text-white">
                <td className="border p-2">{order.productName}</td>
                <td className="border p-2">{order.marketName}</td>
                <td className="border p-2 text-right">{parseFloat(order.pricePerKg).toFixed(2)}</td>
                <td className="border p-2 text-right">{parseFloat(order.amount).toFixed(2)}</td>
                <td className="border p-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
                  <Link
                    to={`/allProductsApproved/${order.productId}`}
                    className="text-blue-700 hover:underline"
                  >
                    View Details
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

export default MyOrders;
