import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const MyItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
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

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/items/${selectedItem._id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== selectedItem._id));
      setNotification('Item deleted successfully!');
    } catch (error) {
      setNotification('Failed to delete the item.');
      console.error('Failed to delete item:', error);
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Items</h1>

      {notification && (
        <div className="mb-4 p-3 text-center bg-green-200 text-green-700 rounded">
          {notification}
        </div>
      )}

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
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                    className="text-red-500"
                  >
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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemsPage;
