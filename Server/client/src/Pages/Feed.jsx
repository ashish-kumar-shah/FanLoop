import React, { useContext, useEffect, useState, useRef } from "react";
import Reel from "../Component/Reel/Reel";
import PostContext from "../Context/PostContext";

const Feed = () => {
  const { getPost } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const loaderRef = useRef(null);

  // 🧠 Utility to remove duplicates by _id
  const mergeUniquePosts = (existing, incoming) => {
    const existingIds = new Set(existing.map((p) => p._id));
    return [...existing, ...incoming.filter((p) => !existingIds.has(p._id))];
  };

  const fetchPosts = async () => {
    try {
      const res = await getPost(page);
      const fetched = res?.data?.posts || [];

      if (fetched.length < 5) setHasMore(false);

      const newPosts = mergeUniquePosts(posts, fetched);
      setPosts(newPosts);
      applyFilter(newPosts, roleFilter);
    } catch (err) {
      console.error("Failed to load posts", err);
      setHasMore(false);
    }
  };

  // 🔁 Fetch on page change
  useEffect(() => {
    fetchPosts();
  }, [page]);

  // 👁️ Setup infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // 🧠 Filter logic
  const applyFilter = (postList, role) => {
    const result = postList.filter((p) => {
      const hasVideo = p.content?.some((c) => c.type === "video");
      if (!hasVideo) return false;
      if (role === "All") return true;
      return p.user?.role?.toLowerCase() === role.toLowerCase();
    });
    setFilteredPosts(result);
  };

  // ✋ Handle filter button click
  const handleFilter = (role) => {
    setRoleFilter(role);
    applyFilter(posts, role);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-2 justify-start items-center">
      {/* Filter Buttons */}
      <div className="w-full h-20 flex items-center justify-center gap-4 px-4">
        {["All", "Public", "Celebrity"].map((role) => (
          <button
            key={role}
            onClick={() => handleFilter(role)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              roleFilter === role
                ? "bg-blue-600 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Reel List */}
      <div className="w-full flex flex-col items-center gap-6 pb-20 bg-white">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item) => {
            const video = item.content.find((c) => c.type === "video");
            if (!video?.url) return null;

            return (
              <Reel
                key={item._id}
                videoSrc={video.url}
                user={{
                  name: item.user?.name || "Unknown",
                  avatar:
                    item.user?.profilePic?.replace(/^hhttps/, "https") ||
                    "https://i.pravatar.cc/150",
                }}
              />
            );
          })
        ) : (
          <p className="text-gray-500 mt-4">No reels available.</p>
        )}

        {hasMore && (
          <div
            ref={loaderRef}
            className="w-6 h-6 mt-6 bg-gray-300 animate-pulse rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
