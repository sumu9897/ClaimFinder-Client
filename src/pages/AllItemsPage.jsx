import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemCard from '../components/itemCard';

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    handleFilterByCategory();
  }, [selectedCategory, searchQuery]);

  const fetchAllItems = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/allItems');
      setItems(data);
      setFilteredItems(data);
      extractCategories(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const extractCategories = (items) => {
    const uniqueCategories = [...new Set(items.map(item => item.category))];
    setCategories(uniqueCategories);
  };

  const handleFilterByCategory = () => {
    let result = [...items];

    // Filter by selected category
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(result);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setFilteredItems(items);
    setCurrentPage(1); // Reset to the first page
  };

  // Get current items for the active page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='p-4 md:p-10 mx-auto'>
      <div className="flex flex-wrap items-center gap-4 mb-6 px-4 md:px-12">
        {/* Filter by Category */}
        <select
          className="border rounded-md p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Filter By Category</option>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search by Title */}
        <input
          type="text"
          placeholder="Enter Job Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 flex-1"
        />

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllItemsPage;
