import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaBullseye, FaEye } from "react-icons/fa"; // Importing icons

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500); // Delay animation on load
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000 ease-in-out`}
    >
      <Helmet>
        <title>About</title>
      </Helmet>
      <div
        className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-center transform ${
          isVisible ? "translate-y-0" : "translate-y-8"
        } transition-transform duration-700 ease-out`}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          About ClaimFinder
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          ClaimFinder is a platform designed to help people easily report and
          recover lost items. Whether you’ve lost your wallet, keys, or any
          other item, ClaimFinder connects you to a network of people and
          institutions to help you retrieve it. Our mission is to provide an
          easy and secure way to track and claim lost items, ensuring that no
          valuable possession is left behind.
        </p>
        <div className="text-left space-y-6">
          <div className="flex items-center">
            <FaBullseye className="text-indigo-500 text-2xl mr-3" />
            <h2 className="text-2xl font-medium text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg">
            We aim to bridge the gap between lost items and their owners by
            creating a transparent, fast, and efficient process for reporting
            and recovering lost belongings.
          </p>
          <div className="flex items-center">
            <FaEye className="text-indigo-500 text-2xl mr-3" />
            <h2 className="text-2xl font-medium text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-600 text-lg">
            To be the go-to platform for lost and found items globally, enabling
            a safer, more connected world where nothing valuable goes missing
            for long.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
