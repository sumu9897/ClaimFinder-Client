import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaTh, FaList } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const AllRecoveredItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableLayout, setIsTableLayout] = useState(false);

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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100vh-306px)] flex flex-col items-center my-12">
        <Helmet>
            <title>All Recovered Item</title>
        </Helmet>
      <h2 className="text-2xl font-semibold mb-6">All Recovered Items</h2>
      {items.length === 0 ? (
        <div className="text-center text-gray-700">
          <p>No recovered items found.</p>
          <p>Start adding your recovered items to see them here.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-end w-full px-4 mb-6">
            <button
              onClick={() => setIsTableLayout(false)}
              className={`flex items-center px-4 py-2 border rounded-l-md ${
                !isTableLayout
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <FaTh className="mr-2" />
              Grid View
            </button>
            <button
              onClick={() => setIsTableLayout(true)}
              className={`flex items-center px-4 py-2 border rounded-r-md ${
                isTableLayout
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <FaList className="mr-2" />
              Table View
            </button>
          </div>

          {isTableLayout ? (
            <div className="overflow-x-auto w-full">
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
                        {item.dateRecovered
                          ? new Date(item.dateRecovered).toLocaleDateString()
                          : 'Date Not Available'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white shadow-md rounded-md p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date Recovered:</strong>{' '}
                    {item.dateRecovered
                      ? new Date(item.dateRecovered).toLocaleDateString()
                      : 'Date Not Available'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllRecoveredItemsPage;
