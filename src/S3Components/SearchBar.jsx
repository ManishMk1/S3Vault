const SearchBar = () => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Search files and folders..." style={{ backgroundColor: '#0a0a0a' }}
        className=" text-white px-4 py-2 rounded-md w-1/4 border border-gray-700 focus:outline-none text-sm"
      />
    </div>
  );
};

export default SearchBar;
