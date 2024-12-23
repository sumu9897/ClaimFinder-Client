import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const { _id, title, description, thumbnail, category, location, dateLost } = item;

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description.slice(0, 100)}...</p>
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-xs text-gray-500">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-xs text-gray-500">
            <strong>Date Lost:</strong> {new Date(dateLost).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/items/${_id}`}
          className="block mt-4 text-blue-500 font-medium hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
