import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import useUserInfo from "../Hooks/useUserInfo";


const AddToWatchlistButton = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {userInfo} = useUserInfo();

  const handleAddToWatchlist = async () => {
    if (!product || !user?.email) return;

    const watchItem = {
      userEmail: user.email,
      productId: product._id, 
    };

    try {
      const res = await axiosSecure.post("/watchlist", watchItem);
      if (res.data.message === "Added to watchlist") {
        Swal.fire("Added!", "Item added to your watchlist.", "success");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire("Info", "Item already in your watchlist.", "info");
      } else {
        Swal.fire("Error", "Failed to add to watchlist.", "error");
      }
    }
  };

  const isDisabled = userInfo?.role === "admin" || userInfo?.role === "vendor";
  const buttonTitle = isDisabled
    ? userInfo?.role === "admin"
      ? "Admins cannot use watchlist"
      : "Vendors cannot use watchlist"
    : "Add this item to your watchlist";

  return (
    <button
      onClick={handleAddToWatchlist}
      disabled={isDisabled}
      title={buttonTitle}
      className={`${
        isDisabled
          ? "  px-6   py-3 text-center font-semibold bg-pink-500 text-white  rounded-full shadow-lg hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse    text-sm  cursor-not-allowed opacity-60"
          : "bg-yellow-400 hover:bg-yellow-500"
      } text-white font-medium py-2 px-4 rounded-lg transition`}
    >
      Add to Watchlist
    </button>
  );
};

export default AddToWatchlistButton;
