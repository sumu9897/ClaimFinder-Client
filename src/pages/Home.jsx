import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

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
        <title>Home | Whereisit</title>
      </Helmet>
      {/* Banner Section */}
      <motion.div
        className="slider mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="carousel">
          <div className="slide bg-blue-500 text-white p-10">Slide 1: Welcome to WhereIsIt!</div>
          <div className="slide bg-green-500 text-white p-10">Slide 2: Lost Something? Find it Here!</div>
          <div className="slide bg-red-500 text-white p-10">Slide 3: Found Something? Report it Now!</div>
        </div>
      </motion.div>

      {/* Latest Find & Lost Items Section */}
      <motion.section
        className="latest-items mb-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Latest Find & Lost Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="card border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <button
                className="text-blue-500 mt-2"
                onClick={() => navigate(`/items/${item._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        <button
          className="block mx-auto mt-6 bg-blue-500 text-white px-8 py-3 rounded-tr-2xl rounded-bl-2xl"
          onClick={() => navigate('/allItems')}
        >
          See All
        </button>
      </motion.section>

      {/* Extra Section 1: About Us */}
      <motion.section
        className="about-us mb-10 mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">About WhereIsIt</h2>
        <p className="text-gray-700">
          WhereIsIt is your go-to platform to report and recover lost items. Our mission is to connect finders
          and seekers efficiently and securely.
        </p>
      </motion.section>

      {/* Extra Section 2: How It Works */}
      <motion.section
        className="how-it-works mb-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Report lost or found items with detailed information.</li>
          <li>Browse and search for items using our platform.</li>
          <li>Contact the reporter securely to recover your item.</li>
        </ul>
      </motion.section>
    </div>
  );
};

export default Home;
