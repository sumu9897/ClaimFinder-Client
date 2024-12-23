import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddItemPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [dateLost, setDateLost] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const postType = form.post_type.value;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const contact = form.contact.value;
    const thumbnail = form.thumbnail.files[0];

    const formData = {
        postType,
        title,
        description,
        category,
        location,
        dateLost,
        contact,
        userEmail : user?.email,
        userName : user?.displayName,
        thumbnail ,


    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-item`, formData);
      form.reset();
      toast.success('Item added successfully!');
      navigate('/myItems');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Add Lost & Found Item</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="post_type" className="text-gray-700">Post Type</label>
              <select name="post_type" id="post_type" className="border p-2 rounded-md">
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
              <select name="category" id="category" className="border p-2 rounded-md">
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact" className="text-gray-700">Contact Information</label>
              <input
                type="text"
                id="contact"
                name="contact"
                defaultValue={user?.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="thumbnail" className="text-gray-700">Thumbnail</label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
