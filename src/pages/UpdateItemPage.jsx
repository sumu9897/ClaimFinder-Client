import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FaTag, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaPen, FaImage } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateItemPage = () => {
    const axiosSecure = useAxiosSecure()
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [dateLost, setDateLost] = useState(new Date());

  // Fetch existing item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axiosSecure.get(`/items/${id}`);
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
    const updatedData = {
      postType: itemData.postType,
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      location: itemData.location,
      dateLost,
      thumbnail: itemData.thumbnail,
    };

    try {
      await axiosSecure.put(`/items/${id}`, updatedData,);
      toast.success('Item updated successfully!');
      navigate('/myItems');
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item. Please try again.');
    }
  };

  if (!itemData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <Helmet>
        <title>Update Item</title>
      </Helmet>
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Update Lost & Found Item</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="post_type" className="text-gray-700 flex items-center gap-2">
                <FaTag /> Post Type
              </label>
              <select
                name="postType"
                id="post_type"
                value={itemData.postType}
                onChange={(e) => setItemData({ ...itemData, postType: e.target.value })}
                className="border w-full p-2 rounded-md"
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" className="text-gray-700 flex items-center gap-2">
                <FaPen /> Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={itemData.title}
                onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dateLost" className="text-gray-700 flex items-center gap-2">
                <FaCalendarAlt /> Date Lost
              </label>
              <DatePicker
                selected={dateLost}
                onChange={(date) => setDateLost(date)}
                className="border p-2 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="category" className="text-gray-700 flex items-center gap-2">
                <FaTag /> Category
              </label>
              <select
                name="category"
                id="category"
                value={itemData.category}
                onChange={(e) => setItemData({ ...itemData, category: e.target.value })}
                className="border w-full p-2 rounded-md"
              >
                <option value="Gadgets">Gadgets</option>
                <option value="Documents">Documents</option>
                <option value="Pets">Pets</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={itemData.location}
                onChange={(e) => setItemData({ ...itemData, location: e.target.value })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact" className="text-gray-700 flex items-center gap-2">
                <FaPhoneAlt /> Contact Information
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={itemData.contact}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="thumbnail" className="text-gray-700 flex items-center gap-2">
              <FaImage /> Thumbnail
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={itemData.thumbnail}
              onChange={(e) => setItemData({ ...itemData, thumbnail: e.target.value })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="text-gray-700 flex items-center gap-2">
              <FaPen /> Description
            </label>
            <textarea
              id="description"
              name="description"
              value={itemData.description}
              onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
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
