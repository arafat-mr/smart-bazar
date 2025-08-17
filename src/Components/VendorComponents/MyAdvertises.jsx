import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "../../Hooks/useUserInfo";

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfo();
  const [selectedAd, setSelectedAd] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // React Hook Form
  const { register, handleSubmit, reset } = useForm();

  // Fetch ads query
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/advertisements?vendorEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update mutation
  const updateAdMutation = useMutation({
    mutationFn: (updatedAd) =>
      axiosSecure.put(`/advertisements/${updatedAd._id}`, updatedAd),
    onSuccess: () => {
      toast.success("Advertisement updated!");
      setShowEditModal(false);
      queryClient.invalidateQueries(["advertisements", user.email]);
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  // Delete mutation
  const deleteAdMutation = useMutation({
    mutationFn: (adId) => axiosSecure.delete(`/advertisements/${adId}`),
    onSuccess: () => {
      toast.success("Advertisement deleted");
      setShowDeleteModal(false);
      queryClient.invalidateQueries(["advertisements", user.email]);
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });

  // Handle form submit for update
  const onSubmitUpdate = (data) => {
    updateAdMutation.mutate({ ...data, _id: selectedAd._id });
  };

  // Handle delete confirm
  const handleDelete = () => {
    deleteAdMutation.mutate(selectedAd._id);
  };

  if (isLoading) return <p>Loading advertisements...</p>;

  // Helper for badge classes
  const getBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500 text-white px-2 py-1 rounded";
      case "rejected":
        return "bg-red-600 text-white px-2 py-1 rounded";
      case "pending":
      default:
        return "bg-yellow-400 text-black px-2 py-1 rounded";
    }
  };

  return (
    <div className="p-6 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Advertisements</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 ">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b text-center ">
                <td className="p-2 truncate">{ad.title}</td>
                <td className="p-2 truncate">{ad.description}</td>
                <td className="p-2">
                  <span className={getBadgeClass(ad.status)}>{ad.status}</span>
                </td>
                <td className="p-2 space-x-2 truncate">
                  <button
                    onClick={() => {
                      setSelectedAd(ad);
                      reset(ad);
                      setShowEditModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAd(ad);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-white">
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showEditModal && (
        <div className="fixed inset-1 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-blue-950 p-6 rounded w-[400px] md:w-[600px] shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Update Advertisement</h3>
            <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-3">
              <input
                {...register("title", { required: true })}
                className="w-full border p-2 rounded"
                placeholder="Title"
              />
              <textarea
                {...register("description", { required: true })}
                className="w-full border p-2 rounded"
                placeholder="Description"
              />
              <select
                {...register("status")}
                className={`w-full border p-2 rounded bg-blue-950 text-white ${
                  userInfo.role === "user" || userInfo.role === "vendor"
                    ? "cursor-not-allowed"
                    : ""
                } `}
                disabled={userInfo.role === "user" || userInfo.role === "vendor"} // 🔒 Read-only
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateAdMutation.isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                >
                  {updateAdMutation.isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-1 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-blue-950 p-6 rounded w-[350px] text-center shadow-lg">
            <p className="mb-4 text-lg">Are you sure you want to delete this ad?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteAdMutation.isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              >
                {deleteAdMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
