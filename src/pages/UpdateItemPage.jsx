import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UpdateItemPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [dateLost, setDateLost] = useState(new Date());

  // Fetch existing item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`);
        setItemData(response.data);
        setDateLost(new Date(response.data.dateLost));
      } catch (error) {
        console.error('Error fetching item data:', error);
        toast.error('Failed to fetch item details.');
      }
    };
    fetchItemData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      postType: form.post_type.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      dateLost,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/items/${id}`, updatedData);
      toast.success('Item updated successfully!');
      navigate('/myItems');
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item. Please try again.');
    }
  };

  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Update Lost & Found Item</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="post_type" className="text-gray-700">Post Type</label>
              <select
                name="post_type"
                id="post_type"
                defaultValue={itemData.postType}
                className="border p-2 rounded-md"
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" className="text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={itemData.title}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dateLost" className="text-gray-700">Date Lost</label>
              <DatePicker
                selected={dateLost}
                onChange={(date) => setDateLost(date)}
                className="border p-2 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="category" className="text-gray-700">Category</label>
              <select
                name="category"
                id="category"
                defaultValue={itemData.category}
                className="border p-2 rounded-md"
              >
                <option value="Gadgets">Gadgets</option>
                <option value="Documents">Documents</option>
                <option value="Pets">Pets</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={itemData.location}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact" className="text-gray-700">Contact Information</label>
              <input
                type="text"
                id="contact"
                name="contact"
                defaultValue={itemData.contact}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={itemData.description}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Update Item
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateItemPage;
