import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`);
        setItemData(response.data);
      } catch (error) {
        console.error('Failed to fetch item data:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/items/${id}`, itemData);
      navigate('/myItems');
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  if (!itemData) return <div className="text-center">Loading...</div>;

  return (
    <form className="container mx-auto p-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Update Item</h1>
      <label className="block mb-2">Title:</label>
      <input
        type="text"
        value={itemData.title}
        onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default UpdateItemPage;
