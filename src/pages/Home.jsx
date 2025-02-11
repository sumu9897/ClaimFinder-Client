import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Slider from "../components/Slider";

const Home = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/latestItems?limit=6`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching latest items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Home | ClaimFinder</title>
      </Helmet>

      {/* Hero Section with Slider */}
      <Slider />

      {/* Latest Items Section */}
      <motion.section
        className="my-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
          Latest Lost & Found Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-36 sm:h-40 object-cover rounded-md"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate mt-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="text-gray-600 mt-2 text-sm sm:text-base truncate">
                <strong>Description:</strong>{" "}
                {item.description.substring(1, 50)}...
              </p>
              <button
                className="mt-4 text-blue-600 font-medium hover:underline"
                onClick={() => navigate(`/items/${item._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        <button
          className="block mx-auto mt-8 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/allItems")}
        >
          See All Items
        </button>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-10 sm:py-12 bg-gray-100 rounded-lg shadow-md mb-10 text-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Report Lost Items", "Search & Browse", "Connect Securely"].map(
            (step, index) => (
              <div key={index} className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">{step}</h3>
                <p className="text-sm sm:text-base">Details about {step.toLowerCase()}.</p>
              </div>
            )
          )}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-12 sm:py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center rounded-lg shadow-lg mb-10 px-4 sm:px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Be Part of the ClaimFinder Community
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-lg opacity-90">
          Join thousands of users in helping reunite lost items with their
          rightful owners.
        </p>
        <button
          className="mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
          onClick={() => navigate("/register")}
        >
          Get Started Today
        </button>
      </motion.section>

      {/* FAQs Section */}
      <motion.section
        className="py-10 sm:py-12 bg-white rounded-lg shadow-lg mb-10 px-4 sm:px-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[{
            q: "How do I report a lost item?",
            a: 'Click on "Report Item" and fill out the details, including location and description.'
          },{
            q: "Is ClaimFinder free to use?",
            a: "Yes, our platform is completely free for all users with no hidden charges."
          },{
            q: "How can I contact the item finder?",
            a: 'Each item page has a secure "Contact Finder" button to ensure safe communication.'
          }].map((faq, index) => (
            <details key={index} className="border-b py-4 group">
              <summary className="font-bold flex justify-between items-center cursor-pointer text-sm sm:text-base">
                {faq.q}
                <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">{faq.a}</p>
            </details>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
