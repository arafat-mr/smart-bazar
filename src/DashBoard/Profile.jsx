import React, { useState } from "react";
import useUserInfo from "../Hooks/useUserInfo";
import UpdateProfileModal from "./UpdateProfileModal";
import LoadingSpinner from "../Optionals/LoadingSpinner";

const Profile = () => {
  const { userInfo, refetch } = useUserInfo();
  const [modalOpen, setModalOpen] = useState(false);

  if (!userInfo)
    return (
      
        <LoadingSpinner />
      
    );

  const {
    name = "N/A",
    email = "N/A",
    photoURL,
    role = "N/A",
    contactNumber = "N/A",
    address = "N/A",
    bio = "N/A",
    createdAt,
  } = userInfo;

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <img
          src={photoURL || "https://via.placeholder.com/200?text=No+Image"}
          alt={name}
          className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-pink-400"
        />
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            {name}
          </h2>
          <p>Email: {email}</p>
          <p>Role: {role}</p>
          <p>Contact: {contactNumber}</p>
          <p>Address: {address}</p>
          <p>Bio: {bio}</p>
          <p>
            Joined:{" "}
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          className="px-6 py-2 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600 transition"
          onClick={() => setModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      <UpdateProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userInfo={userInfo}
        // refreshUser={refreshUser}
        refetch={refetch}
      />
    </div>
  );
};

export default Profile;
