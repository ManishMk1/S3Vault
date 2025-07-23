
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
const UploadZone = ({onFilesAccepted}) => {
   const onDrop = useCallback(acceptedFiles => {
    onFilesAccepted(acceptedFiles)
  }, [onFilesAccepted])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
    <div className="mt-6 border border-dashed border-gray-600 p-8 rounded-lg text-center text-white cursor-pointer hover:bg-gray-800 transition">
      <span className="text-white/70">⬆️ Drop files or click to upload</span>
    </div>
    </div>
  );
};

export default UploadZone;
