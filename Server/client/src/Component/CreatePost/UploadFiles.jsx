import React, { useContext } from "react";
import PostContext from "../../Context/PostContext";

const UploadFiles = () => {
  const { newPost, setnewPost } = useContext(PostContext);
  const selectedFiles = newPost.content || [];

  const handleFileChange = (e) => {
    let files = Array.from(e.target.files);

    files = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > 5) {
      alert("You can upload a maximum of 5 files.");
      files = files.slice(0, 5 - selectedFiles.length);
    }

    const updatedFiles = [...selectedFiles, ...files];

    setnewPost({ ...newPost, content: updatedFiles });

    e.target.value = "";
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setnewPost({ ...newPost, content: updatedFiles });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 border rounded-lg bg-gray-50">
      <label htmlFor="multiple_files" className="block mb-2 font-semibold">
        Upload images or videos (max 5 files)
      </label>
      <input
        id="multiple_files"
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm border rounded cursor-pointer"
      />

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 font-medium">Selected Files ({selectedFiles.length}/5):</p>
          <ul className="max-h-48 overflow-y-auto border rounded p-2 bg-white">
            {selectedFiles.map((file, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between py-1 px-2 mb-1 rounded hover:bg-gray-100"
              >
                <span className="truncate max-w-xs" title={file.name}>
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red-600 hover:text-red-800 font-bold text-lg"
                  aria-label={`Remove ${file.name}`}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
