import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const MyItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return; // Prevent fetching if user email is not available
    const fetchMyItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/myItems/${user.email}`
        );
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchMyItems();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/items/${id}`);
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Items</h1>
      {items.length ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">
                  <button
                    onClick={() => navigate(`/updateItems/${item._id}`)}
                    className="text-blue-500 mr-2"
                  >
                    Update
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No items found.</div>
      )}
    </div>
  );
};

export default MyItemsPage;
