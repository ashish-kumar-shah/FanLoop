import React, { useContext, useEffect, useState } from "react";
import serviceContext from "../Context/ServicesContext";
import { useParams } from "react-router-dom";

const ViewPost = () => {
  const { getPostById } = useContext(serviceContext);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const {id} = useParams()
  useEffect(() => {
    if (!id) return;

    getPostById(id)
      .then((res) => {
        setPost(res?.post || res); // depends on your API structure
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setError("Could not load post.");
      });
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-center text-gray-400 mt-10">Loading post...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6 bg-gray-50 min-h-screen">
      <PostItem post={post} />
    </div>
  );
};

const PostItem = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % post.content.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? post.content.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full max-w-md bg-white rounded-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.profilePic}
            alt="User"
            className="w-9 h-9 rounded-full object-cover object-top"
          />
          <p className="text-sm font-semibold">{post.user?.username}</p>
        </div>
        <span className="text-gray-400 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Carousel */}
      {post.content?.length > 0 && (
        <div className="relative w-full aspect-square bg-black overflow-hidden">
          <div
            className="w-full h-full flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {post.content.map((media, i) => (
              <div key={i} className="w-full flex-shrink-0 h-full">
                {media.type === "video" ? (
                  <video
                    src={media.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={media.url}
                    alt="Post media"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ))}
          </div>

          {post.content.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white rounded-full px-2 py-1"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white rounded-full px-2 py-1"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Dots */}
      {post.content.length > 1 && (
        <div className="flex justify-center gap-1 py-2">
          {post.content.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === currentIndex ? "bg-black" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between px-4 py-3">
        <div className="flex gap-4 text-gray-600">
          <span className="material-symbols-outlined hover:text-red-500 cursor-pointer">
            favorite
          </span>
          <span className="material-symbols-outlined cursor-pointer">
            comment
          </span>
          <span className="material-symbols-outlined cursor-pointer">
            share
          </span>
        </div>
        <span className="material-symbols-outlined cursor-pointer">save</span>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3 text-sm">
        <p className="mb-1">
          <span className="font-semibold mr-2">{post.user?.username}</span>
          {post.caption?.length > 100
            ? `${post.caption.slice(0, 100)}...`
            : post.caption}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ViewPost;
