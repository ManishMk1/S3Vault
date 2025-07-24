// FileExplorer.jsx
import React from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import UploadZone from "./UploadZone";
import { useEffect, useState } from "react";
import { FILE_TYPE_MAP } from "../Service/HelperFunction";
import {
  fetchObjects,
  uploadFileToS3,
  deleteMultipleFilesFromS3,
  downloadS3File,
  downloadMultipleFilesFromS3
} from "../Service/S3Service";
import { useNavigate } from "react-router-dom";

const Lists = () => {
  const [fileType, setFileType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const [searchList, setSearchList] = useState("");

   const handleFilterChange = (type) => {
    if (!type) {
      setFileType("");
    } else {
      setFileType(type);
    }
  };


  const handleFiles = (acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log("Accepted files:", typeof acceptedFiles);
    console.log("Accepted files:", acceptedFiles);
    uploadFileToS3(
      JSON.parse(localStorage.getItem("s3Credentials")),
      acceptedFiles[0]
    );
    setObjects((prevObjects) => [
      ...prevObjects,
      { Key: acceptedFiles[0].name }
    ]);
    console.log("Objects after upload:", objects);
  };
  const handleSelect = (fileName) => {
    if (selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter((name) => name !== fileName));
    } else {
      setSelectedFiles([...selectedFiles, fileName]);
    }
  };
  useEffect(() => {
    const checkCredentials = async () => {
      if (localStorage.getItem("s3Credentials")) {
        const storedCredentials = JSON.parse(
          localStorage.getItem("s3Credentials")
        );
        const response = await fetchObjects(storedCredentials);
        if (response.status === 200) {
          setObjects(response.data || []);
        }
      } else {
        navigate('/'); // Redirect to S3Details if no credentials are found
      }
    };
    checkCredentials();
  }, []);
  return (
    <div
      style={{ backgroundColor: "#111111" }}
      className=" p-4 rounded-xl shadow-md w-full max-w-screen-xl mx-auto my-4"
    >
      {/* Path */}
      <div className="flex items-center justify-between mb-4 border-b-1 border-gray-700 pb-2">
        <div className="text-white text-sm mb-2">/</div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          📁 New Folder
        </button>
      </div>

      <div className="flex  items-center justify-end gap-4">
        {/* Search */}
        <SearchBar addSearchTerm={setSearchList} />

        {/* Filter & File Type */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* New Folder Button */}
      </div>

      {/* Upload Box */}
      <UploadZone onFilesAccepted={handleFiles} />

      <div>
        {selectedFiles.length > 0 && (
          <div className="mt-4 transition-all duration-700 ease-out transform animate-slide-in flex items-center justify-start gap-3">
            <button
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105"
              onClick={() => {
                const credentials = JSON.parse(
                  localStorage.getItem("s3Credentials")
                );
                deleteMultipleFilesFromS3(credentials, selectedFiles);
                setSelectedFiles(prev=> prev.filter(file => !selectedFiles.includes(file)));
                setObjects(prevObjects => prevObjects.filter(object => !selectedFiles.includes(object.Key)));
              }}
            >
              🗑️ Delete Selected
            </button>
             <button
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105"
              onClick={() => {
                const credentials = JSON.parse(
                  localStorage.getItem("s3Credentials")
                );
                downloadMultipleFilesFromS3(credentials, selectedFiles);
              }}
            >
               Download Selected
            </button>
          </div>
        )}
        {/* File List */}
        <div className="mt-4">
          <h2 className="text-white text-lg font-semibold mb-2">Files</h2>
          <ul className="list-none p-0 space-y-2">
            {objects
  ?.filter((object) => {
    if (searchList && searchList.trim() !== "" ) {
      return object.Key?.toLowerCase().startsWith(searchList.trim().toLowerCase());
    }
    return true; // If filename is empty, return all
  }).filter((object) => {
    if (fileType && fileType.trim() !== "") {
      return  FILE_TYPE_MAP[fileType].includes(object.Key.slice(object.Key.lastIndexOf('.')).toLowerCase());
    }
    return true;
  }).map((object, index) => (
              <li
                key={index}
                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all
        ${selectedFiles.includes(object.Key)
                    ? "bg-blue-700/60 border border-blue-300"
                    : "bg-gray-800 hover:bg-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500"
                    checked={selectedFiles.includes(object.Key)}
                    onChange={() => handleSelect(object.Key)}
                  />
                  <span className="text-orange-500 break-all truncate max-w-[70vw]">
                    {object.Key}
                  </span>
                  <button
                    onClick={() => {
                      const credentials = JSON.parse(
                        localStorage.getItem("s3Credentials")
                      );
                      downloadS3File(credentials, object.Key);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lists;
