import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemCard from '../components/itemCard';

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    handleFilterByCategory();
  }, [selectedCategory, sortOption, searchQuery]);

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
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortOption('');
    setFilteredItems(items);
  };

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
        {filteredItems.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllItemsPage;
