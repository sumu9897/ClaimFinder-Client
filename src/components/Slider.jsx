import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Slider = () => {
  const slides = [
    {
      text: 'Welcome to WhereIsIt! A Place to Find and Recover Lost Items',
      bgImage: 'url(https://i.ibb.co.com/qJs3p4c/lost1.jpg)', 
    },
    {
      text: 'Lost Something? Use Our Search Features to Reclaim It',
      bgImage: 'url(https://i.ibb.co.com/86JNc58/lost2.jpg)', 
    },
    {
      text: 'Found Something? Help Others by Reporting It',
      bgImage: 'url(/path-to-image3.jpg)', 
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <motion.div
      className="slider relative overflow-hidden rounded-lg mb-10 shadow-lg h-64"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="w-full h-full bg-cover bg-center flex items-center justify-center text-white text-2xl font-bold transition-all duration-1000"
        style={{
          backgroundImage: slides[activeIndex].bgImage,
        }}
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {slides[activeIndex].text}
        </motion.div>
      </div>
      {/* Optional: Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === activeIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Slider;
