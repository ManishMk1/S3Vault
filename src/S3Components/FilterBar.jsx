const FilterBar = () => {
  return (
    <div className="flex gap-4 items-center">
      <button className="text-orange-400 border border-orange-500 px-3 py-1 rounded-md hover:bg-orange-500 hover:text-white transition">
        🔍 Filter
      </button>
      <div className="text-white text-sm">File Type:</div>
      <select className="bg-gray-800 text-white px-2 py-1 rounded-md">
        <option>All Files</option>
        <option>Images</option>
        <option>Documents</option>
        <option>Videos</option>
      </select>
    </div>
  );
};

export default FilterBar;
