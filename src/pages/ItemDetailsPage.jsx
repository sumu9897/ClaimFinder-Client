import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;

  return item ? (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <img src={item.thumbnail} alt={item.title} className="w-full h-96 object-cover rounded-md mb-4" />
      <p className="text-gray-700">{item.description}</p>
      <div className="mt-4">
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
        <p><strong>Contact:</strong> {item.contact}</p>
      </div>
    </div>
  ) : (
    <div className="text-center">Item not found.</div>
  );
};

export default ItemDetailsPage;
