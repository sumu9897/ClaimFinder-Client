import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const ItemDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState('');
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [recovering, setRecovering] = useState(false);

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

  const handleRecover = async () => {
    if (!recoveredLocation || !recoveredDate) {
      toast.error('Please fill out all fields.');
      return;
    }

    setRecovering(true);

    try {
      const recoveryData = {
        itemId: id,
        recoveredLocation,
        recoveredDate,
        recoveredBy: {
          email: user?.email,
          name: user?.name,
          image: user?.photoURL,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/recover-item`, recoveryData);
      toast.success('Item marked as recovered successfully!');
      setShowModal(false);
      navigate('/allRecovered'); // Redirect to the recovered items page.
    } catch (error) {
      console.error('Failed to recover item:', error);
      toast.error('Failed to mark item as recovered.');
    } finally {
      setRecovering(false);
    }
  };

  const handleInvalidClick = () => {
    toast.error('This item is already marked as recovered.');
  };

  if (loading) return <div className="text-center"><LoadingSpinner/></div>;

  return item ? (
    <div className="container mx-auto p-6">
        <Helmet>
            <title>Item Details</title>I
        </Helmet>
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <img src={item.thumbnail} alt={item.title} className="w-full h-96 object-cover rounded-md mb-4" />
      <p className="text-gray-700">{item.description}</p>
      <div className="mt-4">
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
        <p><strong>Contact:</strong> {item.contact}</p>
      </div>
      {!item.isRecovered && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {item.postType === 'Lost' ? 'Found This!' : 'This is Mine!'}
        </button>
      )}
      {item.isRecovered && (
        <button
          onClick={handleInvalidClick}
          className="mt-6 px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
        >
          {item.postType === 'Lost' ? 'Found This!' : 'This is Mine!'}
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Recovery Information</h2>
            <div className="mb-4">
              <label className="block mb-1">Recovered Location</label>
              <input
                type="text"
                value={recoveredLocation}
                onChange={(e) => setRecoveredLocation(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Recovered Date</label>
              <DatePicker
                selected={recoveredDate}
                onChange={(date) => setRecoveredDate(date)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Recovered By</label>
              <div className="flex items-center">
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <p>{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleRecover}
                className={`px-4 py-2 text-white rounded-md ${recovering ? 'bg-gray-600' : 'bg-blue-600'}`}
                disabled={recovering}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center">Item not found.</div>
  );
};

export default ItemDetailsPage;
