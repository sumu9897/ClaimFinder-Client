import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaTag, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaPen, FaImage } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddItemPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [dateLost, setDateLost] = useState(new Date());
  const [formValues, setFormValues] = useState({
    postType: "",
    title: "",
    description: "",
    category: "",
    location: "",
    contact: "",
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isFormValid = Object.values(formValues).every((field) => field.trim() !== "") && dateLost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      dateLost,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      await axiosSecure.post(`/add-item`, formData);
      toast.success("Item added successfully!");
      navigate("/myItems");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4">
      <Helmet>
        <title>Add Item</title>
      </Helmet>

      <section className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center">
          Add Lost & Found Item
        </h2>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 flex items-center gap-2">
                <FaTag /> Post Type
              </label>
              <select
                name="postType"
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
              <label className="text-gray-700 flex items-center gap-2">
                <FaPen /> Title
              </label>
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
  <label className="text-gray-700 flex items-center gap-2">
    <FaCalendarAlt /> Date Lost
  </label>
  <DatePicker
    selected={dateLost}
    onChange={(date) => setDateLost(date)}
    className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-300"
  />
</div>

<div>
  <label className="text-gray-700 flex items-center gap-2">
    <FaTag /> Category
  </label>
  <select
    name="category"
    value={formValues.category}
    onChange={handleInputChange}
    className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-300"
  >
    <option value="">Select Category</option>
    <option value="Gadgets">Gadgets</option>
    <option value="Documents">Documents</option>
    <option value="Pets">Pets</option>
  </select>
</div>


            <div>
              <label className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                className="border w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 flex items-center gap-2">
                <FaPhoneAlt /> Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formValues.contact}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className="border w-full p-2 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 flex items-center gap-2">
              <FaImage /> Thumbnail URL
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formValues.thumbnail}
              onChange={handleInputChange}
              className="border w-full p-2 rounded-md"
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-700 flex items-center gap-2">
              <FaPen /> Description
            </label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              className="border w-full p-2 rounded-md"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-8 py-2.5 text-white rounded-md transition ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
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
