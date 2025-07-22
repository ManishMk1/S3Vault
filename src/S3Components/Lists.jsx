// FileExplorer.jsx
import React from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import UploadZone from "./UploadZone";

const Lists = () => {
  return (
    <div style={{ backgroundColor: '#111111' }} className=" p-4 rounded-xl shadow-md w-full max-w-screen-xl mx-auto my-4">
      {/* Path */}
      <div className="flex items-center justify-between mb-4 border-b-1 border-gray-700 pb-2">
    <div className="text-white text-sm mb-2">/</div>
     <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          📁 New Folder
        </button>
      </div>
      

      <div className="flex  items-center justify-end gap-4">
        {/* Search */}
        <SearchBar />
    
        {/* Filter & File Type */}
        <FilterBar />

        {/* New Folder Button */}
       
      </div>

      {/* Upload Box */}
      <UploadZone />
    </div>
  );
};

export default Lists;
