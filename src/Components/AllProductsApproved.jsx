import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";
import LoadingSpinner from "../Optionals/LoadingSpinner";

const AllApprovedProducts = () => {
  const axios = useAxios();

  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["productsApproved", { sort, startDate, endDate, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (sort) params.append("sort", sort);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      params.append("page", page);
      params.append("limit", 12);

      const res = await axios.get(`/productsApproved?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
    retry: 2,
    staleTime: 1000 * 60,
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 12);

  if (isLoading)
    return (
      <div className="text-center text-green-800 mt-10">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        {error?.message || "Something went wrong while loading products."}
      </p>
    );

  return (
    <div className="rubik min-h-screen  w-full p-6 md:p-10 lg:p-14 rounded-md shadow-md">
      <h1 className="text-lg md:text-3xl font-bold mb-6 text-gray-900">
        🛍️ All Approved Products
      </h1>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="input input-bordered border-black bg-transparent text-gray-900"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Created Date(Default)</option>
          <option value="priceAsc">Price Low to High</option>
          <option value="priceDesc">Price High to Low</option>
        </select>

        <input
          type="date"
          className="input input-bordered bg-transparent border-black  text-gray-900"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          className="input input-bordered border-black bg-transparent text-gray-900"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />

        <button
          onClick={() => setPage(0)}
          className="btn btn-outline border-black btn-secondary text-gray-900 hover:bg-white btn-sm"
        >
          Apply Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const latestPriceObj = product.prices?.[0];
          const latestPrice = latestPriceObj?.price ?? "N/A";
          const latestDate = latestPriceObj?.date ?? "N/A";

          return (
            <div
              key={product._id}
              className=" text-gray-900 border border-white rounded-lg shadow-md p-4 flex flex-col"
              style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
            >
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-52 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{product.itemName}</h3>
              <p className="mb-1">🏪 Market: {product.marketName}</p>
              <p className="mb-1">👨‍🌾 Vendor: {product.vendorName}</p>
              <p className="mb-2">💵 Price: ৳{latestPrice} / kg</p>
              <p className="mb-4">📅 Date: {latestDate}</p>

              <Link
                to={`${product._id}`}
                className=" px-6  py-3 text-center font-semibold bg-pink-500 text-white  rounded-full shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
                style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
              >
                🔍 View Details
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
          disabled={page === 0}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          Prev
        </button>
        <span className="flex items-center px-2 text-green-800">
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
          disabled={page + 1 >= totalPages}
          onClick={() =>
            setPage((old) => (old + 1 < totalPages ? old + 1 : old))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllApprovedProducts;
