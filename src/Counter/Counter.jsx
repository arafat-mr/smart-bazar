import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import { FaUserFriends, FaCity } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { GiFarmTractor } from "react-icons/gi";

// Stats config
const stats = [
  {
    icon: <GiFarmTractor size={50} />,
    end: 100,
    label: "Vegetables Listed in Our Collection",
  },
  {
    icon: <FaUserFriends size={40} />,
    end: 1200,
    label: "Active Customers & Vendors",
  },
  {
    icon: <FaCity size={40} />,
    end: 45,
    label: "Local Cities We Serve",
  },
  {
    icon: <IoMdEye size={40} />,
    end: 100000,
    label: "Total Visits to Our Market Platform",
  },
];

// Card motion (wiggle loop)
const wiggleCard = {
  initial: { y: 0, rotate: 0 },
  animate: {
    rotate: [0, 1.5, -1.5, 1, -1, 0],
    y: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 6,
      ease: "easeInOut",
    },
  },
  whileHover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    transition: { duration: 0.3 },
  },
  whileInView: {
    
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      bounce: 0.3,
    },
  },
};

const Counter = () => {
  const { ref, inView } = useInView({ triggerOnce: false,threshold:0.4 });

  return (
    <div>
      <h3 className="text-center text-gray-900 text-2xl font-bold mt-12">
        🛒 Our Market Impact
      </h3>

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-11/12 mx-auto"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className=" rounded-2xl shadow-xl p-6 text-center flex flex-col items-center justify-center border border-green-200 transition-all"
            variants={wiggleCard}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.5 }}
            style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
          >
            <div className="text-green-600 mb-3">{stat.icon}</div>
            <div className="text-3xl font-extrabold text-gray-800">
              {inView && <CountUp delay={0.3} duration={2.5} end={stat.end} />}+
            </div>
            <p className="text-md mt-3 text-gray-600 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
