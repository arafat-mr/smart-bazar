import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Unauthorized = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="min-h-screen flex justify-center items-center bg-transparent backdrop-blur-sm px-4"
    >
      <div className="rounded-2xl shadow-2xl p-6 md:p-12 max-w-3xl w-full text-center space-y-6 border border-white/20 bg-white/10 backdrop-blur-lg text-white">
        <h3 className="text-2xl md:text-4xl font-bold text-yellow-300 animate-pulse drop-shadow-md">
          Unauthorized Access
        </h3>

        <p className="text-sm md:text-lg text-white/80">
          Sorry! You don’t have permission to view this page.
        </p>

        <div>
         <img
  className="w-full md:w-2/3 max-h-64 object-cover object-center mx-auto  rounded-2xl shadow-lg"
  src="https://i.ibb.co/cK5Pk4x9/7081413.jpg"
  alt="Unauthorized Access"
/>
        </div>

        <Link
          to="/dashBoard"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
