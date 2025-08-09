import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../Optionals/LoadingSpinner";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?page=${page}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, reason }) =>
      axiosSecure.patch(`/products/${id}`, { status, rejectionReason: reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      Swal.fire("Updated!", "Product status has been updated.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update status.", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      Swal.fire("Deleted!", "Product has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete product.", "error");
    },
  });

  const handleApprove = (id) => {
    updateStatusMutation.mutate({ id, status: "approved" });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Reason",
      background:'#083344',
      color:'#ffff',
      input: "textarea",
      inputPlaceholder: "Write rejection reason here...",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status: "rejected", reason: result.value });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-product/${id}`); 
  };

  if (isLoading) return <div className="p-6"><LoadingSpinner/></div>;

  return (
    <div className="p-6 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Vendor</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b text-center">
                <td className="p-2 truncate">{p.itemName}</td>
                <td className="p-2  truncate">{p.vendorEmail}</td>
                <td className="p-2 capitalize truncate">{p.status}</td>
                <td className="p-2 space-x-2 truncate ">
                  {p.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(p._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleUpdate(p._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    disabled={page === 0}
    className="px-3 py-1 border rounded bg-white text-black disabled:opacity-50"
  >
    Prev
  </button>

  <button
    className="px-3 py-1 border rounded bg-blue-800 text-white"
    disabled
  >
    {page + 1}
  </button>

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
    disabled={page === totalPages - 1}
    className="px-3 py-1 border rounded bg-white text-black disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default AllProducts;
