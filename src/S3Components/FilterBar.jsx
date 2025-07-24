import React, { useState } from 'react';
const FilterBar = ({ onFilterChange }) => {
   const [selectedType, setSelectedType] = useState('');
    const handleChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    onFilterChange(value); // Call parent function to filter data
  };

  return (
    <div className="flex gap-4 items-center">
      <button className="text-orange-400 border border-orange-500 px-3 py-1 rounded-md hover:bg-orange-500 hover:text-white transition">
        🔍 Filter
      </button>
      <div className="text-white text-sm">File Type:</div>
      <select className="bg-gray-800 text-white px-2 py-1 rounded-md" value={selectedType}
        onChange={handleChange}>
        <option value="">All Files</option>
        <option value="image">Images</option>
        <option value="document">Documents</option>
        <option value="video">Videos</option>
      </select>
    </div>
  );
};

export default FilterBar;
