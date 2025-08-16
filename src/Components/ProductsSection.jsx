import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from '../Optionals/LoadingSpinner'
const staticImages = [
  "https://i.ibb.co/JWSrXs8G/antonio-araujo-Vo-Rt-Yfdvzg-M-unsplash.jpg",
  "https://i.ibb.co/j91bfQwy/ian-ward-Mhj-B2-Xzw-VSM-unsplash.jpg",
  "https://i.ibb.co/6JHnsJk7/brian-matangelo-l18dknba-Q9w-unsplash.jpg",
  "https://i.ibb.co/7dNkp125/alex-hudson-m3-I92-Sg-M3-Mk-unsplash.jpg",
  "https://i.ibb.co/Q7dWhWTg/jacopo-maiarelli-g-OUx23-DNks-unsplash.jpg",
  "https://i.ibb.co/yFbjQ6D0/thomas-le-p-RJhn4-Mbs-MM-unsplash.jpg",
];

const ProductsCardSection = () => {
  const axios = useAxios();

const { data: products = [], isLoading, isError } = useQuery({
  queryKey: ["productsCard"],
  queryFn: async () => {
    const res = await axios.get("/productsCard");
    return (res.data.products || []).filter((p) => p.status === "approved");
  },
  retry: 2, 
  staleTime: 1000 * 60, 
});



  if (isLoading)
    return <div className="text-center text-white mt-10"><LoadingSpinner/></div>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load products.</p>
    );

  const marketsMap = {};
  products.forEach((product) => {
    if (!marketsMap[product.marketName]) marketsMap[product.marketName] = [];
    marketsMap[product.marketName].push(product);
  });

  const seenMarkets = new Set();
  const markets = [];
  products.forEach((product) => {
    const m = product.marketName;
    if (!seenMarkets.has(m)) {
      seenMarkets.add(m);
      markets.push([m, marketsMap[m]]);
    }
  });

  const limitedMarkets = markets.slice(0, 6);

  const getLatestDate = (products) => {
    let latest = null;
    products.forEach((product) => {
      if (Array.isArray(product.prices)) {
        product.prices.forEach(({ date }) => {
          if (!latest || new Date(date) > new Date(latest)) latest = date;
        });
      }
    });
    return latest;
  };

  const getPriceOnOrBeforeDate = (product, date) => {
    const validPrices = (product.prices || [])
      .filter((p) => new Date(p.date) <= new Date(date))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return validPrices.length > 0 ? validPrices[0].price : "N/A";
  };

  return (
    <div>
      <h1 className="text-gray-900 font-semibold text-2xl md:text-4xl  mt-5 mb-6 text-center md:text-start ">
        Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3 text-black">
        {limitedMarkets.map(([marketName, marketProducts], idx) => {
          const image = staticImages[idx % staticImages.length];
          const latestDate = getLatestDate(marketProducts);

          return (
            <motion.div
              whileHover={{ scale: 1.04, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              key={marketName}
              className=" rounded-lg shadow-lg overflow-hidden flex flex-col relative border border-white"
              style={{
                boxShadow:
                  // "0 0 20px 5px rgba(34,193,195,0.2), 0 0 40px 10px rgba(253,187,45,0.15)",
                  "0 0 15px rgba(236, 72, 153, 0.8)" 
              }}
            >
              <img
                src={image}
                alt={marketName}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">🏪 {marketName}</h3>
                <p className="text-sm mb-3">📅 Date: {latestDate}</p>
                <ul className="flex-grow mb-4">
                  {Array.isArray(marketProducts) &&
                    marketProducts.slice(0, 4).map((product) => {
                      const price = getPriceOnOrBeforeDate(product, latestDate);
                      return (
                        <li key={product._id} className="mb-1">
                          ■ {product.itemName} — ৳{price}/kg
                        </li>
                      );
                    })}
                </ul>
                <Link
                  to={`/product-details/${marketName}`}
                  state={{ image }}
                  className=" px-6  py-3 text-center  bg-pink-500 text-white  rounded-full shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
                style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
                >
                  🔍 View Details
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsCardSection;
