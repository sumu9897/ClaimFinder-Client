import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';

const AllRecoveredItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recovered-items`, {
          params: { userEmail: user?.email },
        });
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recovered items:', error);
        toast.error('Failed to fetch recovered items.');
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchItems();
    }
  }, [user?.email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-306px)] flex flex-col items-center my-12">
      <h2 className="text-2xl font-semibold mb-6">All Recovered Items</h2>
      {items.length === 0 ? (
        <div className="text-center text-gray-700">
          <p>No recovered items found.</p>
          <p>Start adding your recovered items to see them here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Date Recovered</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.location}</td>
                  <td className="px-4 py-2">
                    {new Date(item.dateRecovered).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRecoveredItemsPage;
