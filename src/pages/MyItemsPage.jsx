import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>My Items</title>
      </Helmet>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
        <p className="text-gray-500">View, update, or delete items you have added.</p>
      </div>

      {notification && (
        <div className="mb-4 p-3 text-center bg-green-100 border border-green-300 text-green-700 rounded-md">
          {notification}
        </div>
      )}

      {items.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 text-gray-600 font-semibold">Title</th>
                <th className="text-left p-4 text-gray-600 font-semibold">Category</th>
                <th className="text-left p-4 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="p-4 text-gray-700">{item.title}</td>
                  <td className="p-4 text-gray-700">{item.category}</td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/updateItems/${item._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">You haven't added any items yet.</div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{selectedItem?.title}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemsPage;
