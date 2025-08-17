import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserInfo from "../../Hooks/useUserInfo";

const ManageWatchList = () => {
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userInfo, isLoading: userLoading } = useUserInfo();
  const userEmail = userInfo?.email;

  const {
    data: watchlist = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["watchlist", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      const res = await axios.get(`/watchlist/${userEmail}`);
      return res.data || [];
    },
    enabled: !!userEmail,
  });

  const handleRemove = async (productId, productName) => {
    const result = await Swal.fire({
      title: `Remove "${productName}" from your watchlist?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete("/watchlist", { data: { userEmail, productId } });
        Swal.fire({
          icon: "success",
          title: "Removed from watchlist",
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["watchlist", userEmail]);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to remove item",
        });
      }
    }
  };

  if (isLoading || userLoading) return <p>Loading your watchlist...</p>;
  if (isError) return <p>Failed to load watchlist.</p>;

  if (!watchlist.length) {
    return <p className="p-4 text-center">Your watchlist is empty.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Manage Watchlist</h1>
      <table className="w-full border-collapse border border-black">
        <thead>
          <tr className="bg-gray-400">
            <th className="border border-gray-300 p-2 text-left">Product Name</th>
            <th className="border border-gray-300 p-2 text-left">Market Name</th>
            <th className="border border-gray-300 p-2 text-left">Date Added</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map(({ productId, productName, marketName, addedAt }) => (
            <tr key={productId} className="hover:bg-gray-300">
              <td className="border border-gray-300 p-2">{productName}</td>
              <td className="border border-gray-300 p-2">{marketName}</td>
              <td className="border border-gray-300 p-2">
                {new Date(addedAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button
                  onClick={() => navigate("/allProductsApproved")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  title="Add More"
                >
                  ➕ Add More
                </button>
                <button
                  onClick={() => handleRemove(productId, productName)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  title="Remove from Watchlist"
                >
                  ❌ Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWatchList;
