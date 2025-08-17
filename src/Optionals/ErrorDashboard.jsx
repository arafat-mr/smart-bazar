import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ErrorDashbOard = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="min-h-screen flex justify-center items-center bg-transparent backdrop-blur-sm px-4"
    >
      <div className="rounded-2xl shadow-2xl p-6 md:p-12 max-w-3xl w-full text-center space-y-6 border border-white/20 bg-white/10 backdrop-blur-lg text-white">
        <h3 className="text-2xl md:text-4xl font-bold text-black animate-bounce drop-shadow-md">
          Oops! Page Not Found
        </h3>

        <div>
          <img
            className="w-full md:w-2/3 mx-auto rounded-md shadow-lg"
            src="https://i.ibb.co/gMW5wMfj/HTML-Yeti-404-Page.gif"
            alt="404 error"
          />
        </div>

        <Link
          to="/dashBoard"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorDashbOard;
