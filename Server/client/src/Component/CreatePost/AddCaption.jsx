import React, { useContext } from "react";
import PostContext from "../../Context/PostContext";

const AddCaption = () => {
  const { newPost, setnewPost } = useContext(PostContext);

  const handleChange = (e) => {
    setnewPost({ ...newPost, caption: e.target.value });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Caption
      </label>
      <textarea
        value={newPost.caption || ""}
        onChange={handleChange}
        placeholder="Write something interesting..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition"
        rows={5}
      />
      <div className="text-sm text-gray-400 mt-2 text-right">
        {(newPost.caption || "").length}/500
      </div>
    </div>
  );
};

export default AddCaption;
