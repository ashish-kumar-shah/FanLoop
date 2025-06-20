import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import serviceContext from "../Context/ServicesContext";

const Comments = ({ postId }) => {
  const { User } = useContext(AppContext);
  const { addComment, getComments } = useContext(serviceContext);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await getComments(postId);
      setComments(res.data?.comments || []);
    };
    if (postId) fetch();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await addComment(postId, text);
    setComments((prev) => [res.data.comment, ...prev]);
    setText("");
  };

  return (
    <div className="space-y-2 px-4 pb-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded px-3 py-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Post
        </button>
      </form>

      <div className="max-h-[200px] overflow-y-auto space-y-2">
        {comments.map((c) => (
          <div key={c._id} className="p-2 border rounded text-sm bg-gray-50">
            <strong>{c.userId?.username}</strong>: {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
