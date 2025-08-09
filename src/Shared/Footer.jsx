import React from "react";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-10 px-5 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Logo + Info */}
      <aside className="text-center md:text-left max-w-md">
        <div className="flex justify-center md:justify-start items-center gap-2 mb-3">
          <img
            className="w-10"
            src="https://i.ibb.co/dsmt140F/a-basket-brimming-with-vegetables-free-png-removebg-preview.png"
            alt="Smart Bazar Logo"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-lime-400 to-yellow-300 bg-clip-text text-transparent">
            Smart Bazar
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-gray-300">
          Your trusted marketplace for fresh vegetables and more.
          <br />
          Serving quality and value since 2020.
        </p>

        <div className="mt-3 text-sm text-gray-400 space-y-1">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:contact@smartbazar.com"
              className="underline text-white"
            >
              contact@smartbazar.com
            </a>
          </p>
          <p>📍 Location: Dhaka, Bangladesh</p>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Smart Bazar — All rights reserved —
          ArafatMr
        </p>
      </aside>

      {/* Terms & Policy */}
      <div className="text-sm text-gray-300 text-center md:text-left space-y-2">
        <p>
          <a href="#" className="hover:text-white transition">
            Terms and Conditions
          </a>
        </p>
        <p>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Social Icons */}
      <nav>
        <div className="flex gap-6 text-gray-400">
          <a
            href="https://github.com/arafat-mr"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            <BsGithub size={26} />
          </a>
          <a
            href="https://www.facebook.com/share/1GtzAe3ho9/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            <FaFacebook size={26} />
          </a>
          <a
            href="https://www.instagram.com/4rafat.mr?igsh=MW83ZnkybW0wZjkycg=="
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            <BsInstagram size={26} />
          </a>
          <a
            href="https://youtube.com/@arafatmr-n3i?si=8NfuSWk5w2WlRYrg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
            aria-label="YouTube"
          >
            <FaYoutube size={26} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
