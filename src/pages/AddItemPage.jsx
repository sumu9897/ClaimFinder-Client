import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaTag, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaPen, FaImage } from 'react-icons/fa';

const AddItemPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [dateLost, setDateLost] = useState(new Date());
  const [formValues, setFormValues] = useState({
    postType: '',
    title: '',
    description: '',
    category: '',
    location: '',
    contact: '',
    thumbnail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isFormValid = Object.values(formValues).every((field) => field.trim() !== '') && dateLost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      dateLost,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-item`, formData);
      toast.success('Item added successfully!');
      navigate('/myItems');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <Helmet>
        <title>Add Item</title>
      </Helmet>
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Add Lost & Found Item</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-6 mt-4 items-center sm:grid-cols-2">
            <div>
              <label htmlFor="post_type" className="text-gray-700 flex items-center gap-2">
                <FaTag /> Post Type
              </label>
              <select
                name="postType"
                id="post_type"
                value={formValues.postType}
                onChange={handleInputChange}
                className="border w-full p-2 rounded-md"
              >
                <option value="">Select Post Type</option>
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
                value={formValues.title}
                onChange={handleInputChange}
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
                value={formValues.category}
                onChange={handleInputChange}
                className="border w-full p-2 rounded-md"
              >
                <option value="">Select Category</option>
                <option className='text-green-400' value="Gadgets">Gadgets</option>
                <option className='text-orange-400' value="Documents">Documents</option>
                <option className='text-blue-400' value="Pets">Pets</option>
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
                value={formValues.location}
                onChange={handleInputChange}
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
                value={formValues.contact}
                onChange={handleInputChange}
                placeholder="Contact Number"
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
              value={formValues.thumbnail}
              onChange={handleInputChange}
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
              value={formValues.description}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-8 py-2.5 leading-5 text-white rounded-md focus:outline-none ${
                isFormValid ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Add Item
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddItemPage;
