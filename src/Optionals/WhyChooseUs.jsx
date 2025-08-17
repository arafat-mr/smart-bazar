import React from "react";
import { Shield, Star, Smile, Grid } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Grid className="h-10 w-10 text-purple-600" />,
      title: "Wide Selection",
      description: "Explore a vast range of products from trusted vendors at one place.",
    },
    {
      icon: <Shield className="h-10 w-10 text-pink-500" />,
      title: "Secure Payments",
      description: "All transactions are encrypted and completely secure for peace of mind.",
    },
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: "Quality Products",
      description: "We ensure only the best products reach you with top-notch quality.",
    },
    {
      icon: <Smile className="h-10 w-10 text-blue-500" />,
      title: "Customer Support",
      description: "Our friendly support team is here to help you 24/7.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-full mx-auto px-5 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Why Choose Us
        </h2>
        <p className="text-gray-700 mb-12 text-lg md:text-xl">
          We strive to provide the best experience for our customers with top-quality products, fair pricing, and excellent support.
        </p>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className=" rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
