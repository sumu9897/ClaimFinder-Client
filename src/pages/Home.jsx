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
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Home | ClaimFinder</title>
      </Helmet>

      {/* Banner/Slider Section */}
      <Slider/>

      {/* Latest Items Section */}
      <motion.section
        className="latest-items mb-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Latest Lost & Found Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="card bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Description:</strong> {item.description}
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
          className="block mx-auto mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          onClick={() => navigate('/allItems')}
        >
          See All Items
        </button>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="about-us bg-gray-100 py-10 rounded-lg mb-10 shadow-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">About WhereIsIt</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          WhereIsIt is an innovative platform designed to connect individuals who have lost or found items. 
          Our mission is to provide a secure, efficient, and seamless process to reunite lost items with their owners.
        </p>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works py-10 rounded-lg mb-10 shadow-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Report Lost or Found Items</h3>
            <p>Provide detailed information about the item and its location.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Search and Browse</h3>
            <p>Find items using our powerful search and filtering options.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Connect Securely</h3>
            <p>Communicate with the item reporter through secure channels.</p>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials py-10 bg-blue-600 text-white rounded-lg shadow-md"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="testimonial p-6 bg-blue-500 rounded-lg shadow-sm">
            <p>
              "I was able to find my lost phone within days thanks to WhereIsIt. This platform is a lifesaver!"
            </p>
            <span className="block mt-4 text-right font-semibold">- Jane Doe</span>
          </div>
          <div className="testimonial p-6 bg-blue-500 rounded-lg shadow-sm">
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
