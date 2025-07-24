export const FILE_TYPE_MAP = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'],
  document: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.csv', '.txt', '.ppt', '.pptx'],
  video: ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
  // You can add more categories if needed
};

export function filterFilesByType(files, type) {
  const allowedExtensions = FILE_TYPE_MAP[type];

  if (!allowedExtensions) {
    // If type is unknown, return files not matching any known extensions
    const knownExtensions = Object.values(FILE_TYPE_MAP).flat();
    return files.filter(file => {
      const ext = getFileExtension(file.Key);
      return !knownExtensions.includes(ext);
    });
  }

  return files.filter(file => {
    const ext = getFileExtension(file.Key);
    return allowedExtensions.includes(ext);
  });
}

function getFileExtension(filename) {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase();
}
