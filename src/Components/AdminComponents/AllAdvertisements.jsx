import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["allAdvertisements", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements/all?page=${page}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: (updatedAd) =>
      axiosSecure.put(`/advertisements/${updatedAd._id}`, updatedAd),
    onSuccess: () => {
      Swal.fire("Updated!", "Advertisement status updated.", "success");
      queryClient.invalidateQueries(["allAdvertisements", page]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update advertisement.", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (adId) => axiosSecure.delete(`/advertisements/${adId}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Advertisement deleted.", "success");
      queryClient.invalidateQueries(["allAdvertisements", page]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete advertisement.", "error");
    },
  });

  const handleStatusChange = (ad, newStatus) => {
    Swal.fire({
      title: `Change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutation.mutate({ ...ad, status: newStatus });
      }
    });
  };

  const handleDelete = (ad) => {
    Swal.fire({
      title: "Are you sure you want to delete this ad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(ad._id);
      }
    });
  };

  if (isLoading) return <p>Loading advertisements...</p>;

  const { ads = [], total = 0 } = data || {};
  const pageCount = Math.ceil(total / limit);

  return (
    <div className="p-6 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md">
      <h2 className="text-2xl font-bold mb-4">All Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2 ">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b text-center">
                <td className="p-2 truncate">{ad.title}</td>
                <td className="p-2 truncate">{ad.description}</td>
                <td className="p-2 space-x-2 truncate">
                  {(ad.status === "approved" || ad.status === "rejected") ? (
                    <button
                      onClick={() => handleDelete(ad)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleStatusChange(ad, "approved")}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(ad, "rejected")}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDelete(ad)}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-gray-100 text-black rounded">
          Page {page + 1} of {pageCount}
        </span>
        <button
          onClick={() => setPage((old) => (old + 1 < pageCount ? old + 1 : old))}
          disabled={page + 1 >= pageCount}
          className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllAdvertisements;
