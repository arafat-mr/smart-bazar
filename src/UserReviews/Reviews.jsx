import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8,
  },
  onscreen: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  hover: {
    rotateX: 5,
    rotateY: 10,
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const starContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500 } },
};

const pulseAnimation = {
  animate: {
    color: ["#16a34a", "#22c55e", "#16a34a"], 
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Jhankar Mahbub",
      role: "Admin & Market Manager",
      image:
        "https://i.ibb.co/xtkKZpJ3/images-q-tbn-ANd9-Gc-SD-MILXn5-t-MGu-L53z-C9yiswl3-Wt-Rw-E-ko-Q-s.jpg",
      rating: 5,
      review:
        "Our vegetable markets are efficiently managed with great attention to freshness and fair pricing — a true admin’s pride.",
    },
    {
      id: 2,
      name: "Shafayat Mohammad",
      role: "Frequent Shopper & Food Enthusiast",
      image:
        "https://i.ibb.co/Y7NTzRkD/Whats-App-Image-2025-05-23-at-06-06-15-8c36778c.jpg",
      rating: 4,
      review:
        "Freshness and variety are unmatched! I always find the best seasonal vegetables here at great prices.",
    },
    {
      id: 3,
      name: "Shifat Mahmud",
      role: "Vendor & Farmer",
      image: "https://i.ibb.co/rfXqWJRP/mypic2.jpg",
      rating: 4,
      review:
        "Selling here has boosted my business. The market is well-organized and attracts many loyal customers.",
    },
    {
      id: 4,
      name: "Mohammad Naeem",
      role: "Local Shopper & Food Blogger",
      image:
        "https://i.ibb.co/235nzTL5/Whats-App-Image-2025-05-23-at-05-52-23-2fefe4f3.jpg",
      rating: 5,
      review:
        "The community vibe and fresh stock keep me coming back. It's my favorite place to shop local vegetables.",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <motion.h3
          className="text-lg md:text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-center font-semibold"
          {...pulseAnimation}
        >
          What People Say About Our Vegetable Markets
        </motion.h3>
      </motion.div>

      <div className="w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {reviews.map(({ id, name, role, image, rating, review }) => (
          <motion.div
            key={id}
            className="card bg-green-900 shadow-md rounded-lg flex flex-col justify-center items-center p-6"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="w-full flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
                <img src={image} alt={name} className="object-cover w-full h-full" />
              </div>
            </div>
            <p className="text-green-100 text-center font-medium mb-4">{review}</p>
            <p className="text-green-200 text-center font-bold">{`- ${name}`}</p>
            <p className="text-green-300 text-center text-sm font-semibold mb-3">{role}</p>
            <motion.div
              className="flex justify-center gap-1 text-yellow-400"
              variants={starContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  variants={starVariants}
                  animate={{
                    y: [0, -6, 0], // float up and down 6px
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "loop",
                    delay: i * 0.15, 
                  }}
                >
                  <FaStar className={i < rating ? "text-yellow-400" : "text-green-600"} />
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
