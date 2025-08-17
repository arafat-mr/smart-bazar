import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const AllUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const usersPerPage = 10;

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0); 
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&search=${debouncedSearch}`);
      return res.data;
    },
  });

  const users = data.users || [];
  const totalPages = Math.ceil((data.total || 0) / usersPerPage);

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => axiosSecure.patch(`/users/${id}`, { role }),
    onSuccess: () => {
      Swal.fire("Updated!", "User role has been updated.", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update user role.", "error");
    },
  });

  const handleRoleChange = (id, newRole) => {
    if (id === user._id && newRole === "admin") {
      Swal.fire("Warning!", "You cannot change your own role as an admin.", "warning");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make this user a ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update role",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ id, role: newRole });
      }
    });
  };

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="p-6 bg-transparent backdrop-blur-2xl rounded-xl shadow-md">
      <div className="flex justify-between">

     
      <h2 className="text-xl md:text-2xl font-bold mb-4">All Users</h2>

      {/* 🔍 Search Input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="border px-3 md:px-10 py-2 rounded w-full max-w-xs"
        />
      </div>
 </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem, index) => (
              <tr key={userItem._id} className="border-b text-center">
                <td className="p-2">{page * usersPerPage + index + 1}</td>
                <td className="p-2">{userItem.name}</td>
                <td className="p-2">{userItem.email}</td>
                <td className="p-2 capitalize">{userItem.role}</td>
                <td className="p-2 space-x-2 truncate">
                  {userItem.email === user.email ? (
                    <span className="text-gray-400">—</span>
                  ) : (
                    <>
                      {userItem.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(userItem._id, "admin")}
                          className="bg-purple-600 text-white px-3 py-1 rounded"
                        >
                          Make Admin
                        </button>
                      )}
                      {userItem.role !== "vendor" && (
                        <button
                          onClick={() => handleRoleChange(userItem._id, "vendor")}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Make Vendor
                        </button>
                      )}
                      {userItem.role !== "user" && (
                        <button
                          onClick={() => handleRoleChange(userItem._id, "user")}
                          className="bg-gray-600 text-white px-3 py-1 rounded"
                        >
                          Demote to User
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-black font-semibold">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-white text-black rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
          className="px-3 py-1 bg-white text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
