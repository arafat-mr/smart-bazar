import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Link } from "react-router";

const AdsSection = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const limit = 3;

  const { data, isLoading } = useQuery({
    queryKey: ["advertisements", page],
    queryFn: async () => {
      const res = await axios.get(`/advertisements/home?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const controls = useAnimation();
  const x = useMotionValue(0); 
  const [isPaused, setIsPaused] = useState(false);

  const ads = data?.ads || [];
  const duplicatedAds = [...ads, ...ads];

  const startAnimation = (fromX) => {
    controls.start({
      x: [fromX, "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    if (ads.length === 0) return;

    if (isPaused) {
      controls.stop(); 
    } else {
      const currentX = x.get();
      const normalizedX = currentX <= -50 ? 0 : currentX;
      startAnimation(normalizedX);
    }
  }, [isPaused, ads, controls, x]);

  
  useEffect(() => {
    if (ads.length === 0) return;
    x.set(0);
    startAnimation(0);
  }, [page]); 

  if (isLoading)
    return (
      <p className="text-center py-10 text-lg font-medium text-gray-700">
        Loading advertisements...
      </p>
    );

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center text-yellow-600 mb-8">
        📢  Advertisements By Vendors
      </h2>

      {/* Marquee-style Scrolling Container */}
      <div
        className="overflow-hidden relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 w-max whitespace-nowrap"
          animate={controls}
          style={{ x }}
        >
          {duplicatedAds.map((ad, idx) => (
            <motion.div
              key={`${ad._id}-${idx}`} 
              whileHover={{ scale: 1.03 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl p-6 relative mx-2 sm:mx-4 max-w-full
                         w-[90vw] sm:w-[450px] md:w-[600px] lg:w-[650px]"
            >
              {/* Image & Badge */}
              <div className="relative w-full md:w-1/2 h-48 md:h-56 rounded-xl overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover border border-yellow-200 rounded-xl"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-bold">
                  🔥 UPTO 40% OFF
                </span>
              </div>

              {/* Content */}
              <div className="md:pl-6 pt-4 md:pt-0 w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-bold text-yellow-700 truncate">{ad.title}</h3>
                <p
                  className="text-gray-600 text-sm mt-2 break-words overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {ad.description}
                </p>
                <div className="mt-3">
                  <Link
                    to="/allProductsApproved"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition inline-block"
                  >
                    🛒 Visit Store
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      {data?.totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(data.totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm ${
                i + 1 === page
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-yellow-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdsSection;
