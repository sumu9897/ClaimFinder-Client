import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Slider from '../components/Slider';

const Home = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latestItems?limit=6`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching latest items:', error);
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
        className="latest-items-section my-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Latest Lost & Found Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="item-card bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 truncate">{item.title}</h3>
              <p className="text-gray-600 mt-2">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="text-gray-600 mt-2 line-clamp-3">
                <strong>Description:</strong> {item.description.substring(1,35)}...
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
          className="block mx-auto mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate('/allItems')}
        >
          See All Items
        </button>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="about-us-section bg-gray-100 py-12 px-6 rounded-lg shadow-md mb-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">About ClaimFinder</h2>
        <p className="text-center text-gray-700 max-w-4xl mx-auto">
          ClaimFinder is an innovative platform designed to connect individuals who have lost or found items. Our
          mission is to provide a secure, efficient, and seamless process to reunite lost items with their rightful
          owners.
        </p>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works-section py-12 px-6 bg-white rounded-lg shadow-md mb-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="step-card bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Report Lost or Found Items</h3>
            <p>Provide detailed information about the item and its location.</p>
          </div>
          <div className="step-card bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Search and Browse</h3>
            <p>Find items using our powerful search and filtering options.</p>
          </div>
          <div className="step-card bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Connect Securely</h3>
            <p>Communicate with the item reporter through secure channels.</p>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials-section py-12 px-6 bg-blue-600 text-white rounded-lg shadow-md"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="testimonial bg-blue-500 p-6 rounded-lg shadow-sm">
            <p>
              "I was able to find my lost phone within days thanks to ClaimFinder. This platform is a lifesaver!"
            </p>
            <span className="block mt-4 text-right font-semibold">- Jane Doe</span>
          </div>
          <div className="testimonial bg-blue-500 p-6 rounded-lg shadow-sm">
            <p>
              "Reporting a lost item was so simple, and the community support is amazing. Highly recommend!"
            </p>
            <span className="block mt-4 text-right font-semibold">- John Smith</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
