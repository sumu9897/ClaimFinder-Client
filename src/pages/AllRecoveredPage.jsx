import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllRecoveredPage = () => {
  const [recoveredItems, setRecoveredItems] = useState([]);

  useEffect(() => {
    const fetchRecoveredItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recoveredItems`);
        setRecoveredItems(response.data);
      } catch (error) {
        console.error('Failed to fetch recovered items:', error);
      }
    };
    fetchRecoveredItems();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Recovered Items</h1>
      {recoveredItems.length ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Recovered By</th>
            </tr>
          </thead>
          <tbody>
            {recoveredItems.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.recoveredBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No recovered items found.</div>
      )}
    </div>
  );
};

export default AllRecoveredPage;
