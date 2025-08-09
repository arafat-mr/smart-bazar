import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PriceComparison from "./PriceComparison";
import ReviewsSection from "./ReviewsSection";
import useUserInfo from "../Hooks/useUserInfo";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from '../Optionals/LoadingSpinner'
const MarketDetails = () => {
  const { marketName } = useParams();
  const {user}=useAuth()
  const navigate = useNavigate();
  const axios = useAxiosSecure();
  const location = useLocation();
  const marketImage = location.state?.image;

  const { userInfo, isLoading: userLoading } = useUserInfo();
  const userEmail = userInfo?.email || null;
  const userRole = userInfo?.role || "user";

  const [addingIds, setAddingIds] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["marketDetails", marketName],
    queryFn: async () => {
      const res = await axios.get(`/market-details/${marketName}`);
      return res.data.products || [];
    },
  });

  const marketDescription = products[0]?.marketDescription || "";

  const handleAddToWatchlist = async (productId, productName, marketName) => {
    if (!userEmail) {
      Swal.fire({
        icon: "warning",
        title: "Please login first.",
      });
      return;
    }

    try {
      setAddingIds((prev) => new Set(prev).add(productId));
      const res = await axios.post("/watchlist", {
        userEmail,
        productId,
        productName,
        marketName,
      });
      Swal.fire({
        icon: "success",
        title: res.data.message || "Added to watchlist",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already in watchlist",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add to watchlist",
        });
      }
    } finally {
      setAddingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const openBuyModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setIsBuyModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading || userLoading)
    return <div className="text-center mt-6"><LoadingSpinner/></div>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-6">Failed to load details.</p>
    );

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto text-black">
      {/* Banner */}
      <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-center md:flex-row-reverse items-center md:items-center lg:gap-8 gap-6 mb-10 px-2">
        {marketImage && (
          <img
            src={marketImage}
            alt={`${marketName} Market`}
            className="w-full md:max-w-md rounded-lg object-cover"
            style={{ maxHeight: "300px" }}
          />
        )}
        <div className="md:flex-1 text-center md:text-left px-2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            🏪 {marketName}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {marketDescription || "No description available."}
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6 text-lg md:text-3xl px-2">
        <h1>
          All Products{" "}
          <span className="text-sm sm:text-lg">(Price based on latest date)</span>
        </h1>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="px-2">No approved products found for this market.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-2">
          {products.map((product) => {
            const latestPrice = [...product.prices].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )[0];

            const vendorInfo = product.vendorName || product.vendorEmail;

            const disableWatchlistBtn =
              userRole === "admin" || userRole === "vendor" || addingIds.has(product._id);

            const handleAddClick = () => {
              handleAddToWatchlist(product._id, product.itemName, product.marketName);
            };

            return (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow duration-300 w-full"
              >
                <img
                  src={product.image}
                  alt={product.itemName}
                  className="w-full max-w-full h-48 sm:h-40 md:h-44 lg:h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-center">
                  {product.itemName}
                </h3>
                <p className="text-xs sm:text-sm text-black text-center mb-2 truncate">
                  Vendor: {vendorInfo}
                </p>

                {latestPrice ? (
                  <p className="text-green-700 font-bold text-center mb-3 text-sm sm:text-base">
                    ৳{latestPrice.price}/kg
                  </p>
                ) : (
                  <p className="text-red-500 text-center mb-3 text-sm sm:text-base">
                    No price data
                  </p>
                )}

                <div className="flex gap-2 mt-auto">
                  <button
                    className="btn btn-sm btn-primary flex-1 py-2 text-sm sm:text-base flex items-center justify-center gap-1"
                    onClick={() => openBuyModal(product)}
                  >
                    🛒 <span>Buy</span>
                  </button>
                  <button
                    className="btn btn-sm btn-outline flex-1 py-2 text-xs sm:text-sm flex items-center justify-center gap-1 whitespace-nowrap"
                    onClick={handleAddClick}
                    disabled={disableWatchlistBtn}
                    title={
                      disableWatchlistBtn
                        ? userRole === "admin" || userRole === "vendor"
                          ? "Admins and vendors cannot add to watchlist"
                          : "Adding..."
                        : "Add to Watchlist"
                    }
                  >
                    ⭐ <span> Watchlist</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ====== REVIEWS SECTION ====== */}
      <div className="mt-12 px-2">
        <ReviewsSection marketName={marketName} />
      </div>

      {/* ====== PRICE COMPARISON SECTION ====== */}
      <div className="mt-12 px-2">
        <PriceComparison marketName={marketName} products={products} />
      </div>

      {/* ====== SIMPLE BUY MODAL ====== */}
      {isBuyModalOpen && selectedProduct && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md px-4">

          <div className="bg-[#ece1fe] rounded-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
              onClick={closeBuyModal}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Buy Product</h2>

            <div className="mb-4">
              <div className="w-full">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.itemName}
                className="h-64 w-full object-cover object-center rounded-md mb-2"
                />
                </div>
              <h3 className="text-lg font-semibold">{selectedProduct.itemName}</h3>
              <p className="text-black">
                Price: ৳
                {
                  [...selectedProduct.prices]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.price || "N/A"
                }
                /kg
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium mb-1">
                Quantity (kg)
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="text-right font-semibold text-green-700 mb-4">
              Total: ৳
              {(
                quantity *
                ([...selectedProduct.prices]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.price || 0)
              ).toFixed(2)}
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn btn-outline" onClick={closeBuyModal}>
                Cancel
              </button>
               <button
    className="btn btn-primary"
    onClick={() => {
      const latestPrice =
        [...selectedProduct.prices].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0]?.price || 0;

      const totalAmount = (quantity * latestPrice).toFixed(2);

      Swal.fire({
        icon: "info",
        title: `You will be charged ৳${totalAmount}`,
        showConfirmButton: true,
      }).then(() => {
        // Navigate to payment page with all data
        navigate(`/payment/${selectedProduct._id}`, {
          state: {
            amount: totalAmount,
            quantity,
            pricePerKg: latestPrice,
            productName: selectedProduct.itemName,
            productImage: selectedProduct.image,
            vendorEmail: selectedProduct.vendorEmail,
            marketName: selectedProduct.marketName,
            userEmail:user.email
          },
        });
      });
    }}
  >
    Proceed to Pay
  </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDetails;
