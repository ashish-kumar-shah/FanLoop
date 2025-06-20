import React, { useContext, useEffect, useRef, useState } from "react";
import PostContext from "../../Context/PostContext";
import serviceContext from "../../Context/ServicesContext";
import { AppContext } from "../../Context/AppContext";
import Comments from "../Comment";

const PostLayout = () => {
  const { getPost } = useContext(PostContext);
  const [celebrityPosts, setCelebrityPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const res = await getPost(page);
      const allPosts = res.data?.posts || [];
      const filtered = allPosts.filter((p) => p.user?.role === "celebrity");

      setCelebrityPosts((prev) => {
        const seen = new Set(prev.map((p) => p._id));
        const unique = filtered.filter((p) => !seen.has(p._id));
        return [...prev, ...unique];
      });

      setHasMore(allPosts.length >= 5);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

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

  return (
    <div className="flex flex-col items-center gap-6 py-6 bg-gray-50 min-h-screen">
      {celebrityPosts.length > 0 ? (
        celebrityPosts.map((p) => <PostItem key={p._id} post={p} />)
      ) : (
        <p className="text-gray-500 mt-10">No celebrity posts to display.</p>
      )}
      {hasMore && <div ref={loaderRef} className="w-6 h-6 bg-gray-400 animate-pulse rounded-full mt-4" />}
    </div>
  );
};

const PostItem = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);
  const { toggleLike, getLikes } = useContext(serviceContext);
  const { User } = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await getLikes(post._id);
        setLikeCount(res.data?.count || 0);
        const userList = res.data?.users || [];
        setLiked(userList.includes(User?.user?._id));
      } catch (err) {
        console.error("Error fetching likes:", err);
        setLikeCount(0);
        setLiked(false);
      }
    };
    fetchLikes();
  }, [post._id, User]);

  const handleLike = async () => {
    try {
      const res = await toggleLike(post._id);
      setLiked(res.data?.liked);
      setLikeCount((prev) => (res.data?.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  useEffect(() => {
    const observers = [];
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.6 }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [post.content]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % post.content.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? post.content.length - 1 : prev - 1));

  return (
    <div className="w-full max-w-md bg-white rounded-md border border-gray-200 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={post.user?.profilePic} alt="User" className="w-9 h-9 rounded-full object-cover object-top" />
          <p className="text-sm font-semibold">{post.user?.username}</p>
        </div>
        <span className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Media */}
      {post.content?.length > 0 && (
        <div className="relative w-full aspect-square bg-black overflow-hidden">
          <div className="w-full h-full flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {post.content.map((media, i) => (
              <div key={i} className="w-full flex-shrink-0 h-full">
                {media.url.includes(".mp4") ? (
                  <video ref={(el) => (videoRefs.current[i] = el)} src={media.url} controls muted className="w-full h-full object-contain" />
                ) : (
                  <img src={media.url} alt="Post media" className="w-full h-full object-contain" />
                )}
              </div>
            ))}
          </div>

          {post.content.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white rounded-full px-2 py-1">‹</button>
              <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white rounded-full px-2 py-1">›</button>
            </>
          )}
        </div>
      )}

      {/* Dots */}
      {post.content?.length > 1 && (
        <div className="flex justify-center gap-1 py-2">
          {post.content.map((_, idx) => (
            <div key={idx} className={`h-2 w-2 rounded-full ${idx === currentIndex ? "bg-black" : "bg-gray-300"}`}></div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between px-4 py-3">
        <div className="flex gap-4 text-gray-600">
          <span
            className={`material-symbols-outlined cursor-pointer hover:scale-125 transition ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            favorite
          </span>
          <span className="material-symbols-outlined cursor-pointer" onClick={() => setShowComments((prev) => !prev)}>comment</span>
        </div>
        <span className="text-sm text-gray-500">{likeCount} likes</span>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3 text-sm">
        <p className="mb-1">
          <span className="font-semibold mr-2">{post.user?.username}</span>
          {post.caption?.length > 100 ? `${post.caption.slice(0, 100)}...` : post.caption}
        </p>
        <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleTimeString()}</p>
      </div>

      {showComments && <div className="px-4 pb-4"><Comments postId={post._id} /></div>}
    </div>
  );
};

export default PostLayout;
