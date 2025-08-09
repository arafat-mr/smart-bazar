import { Link } from 'react-router'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ErrorPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="min-h-screen flex justify-center items-center bg-white px-4"
    >
      <div className="rounded-2xl shadow-xl p-6 md:p-12 max-w-3xl w-full text-center space-y-6 border border-pink-300">
        <h3 className="text-2xl md:text-4xl font-bold text-pink-600 animate-bounce">
          Oops! Page Not Found
        </h3>

        <div>
          <img
            className="w-full md:w-2/3 mx-auto rounded-md"
            src="https://i.ibb.co/gMW5wMfj/HTML-Yeti-404-Page.gif"
            alt="404 error"
          />
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90 transition font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
