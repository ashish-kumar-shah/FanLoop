import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import serviceContext from "../Context/ServicesContext";

const Search = () => {
  const { searchUserByQuery } = useContext(serviceContext)
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      searchUserByQuery(query)
        .then((data) => {
          setResults(data || []);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, searchUserByQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br  p-8 flex flex-col items-center">
      <div className="w-full max-w-xl relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users by name or username..."
          className="w-full py-4 pl-14 pr-4 rounded-3xl border border-indigo-300 shadow-lg text-gray-900 text-lg font-medium placeholder-gray-400  outline-none transition"
          autoComplete="off"
        />
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <div className="w-full max-w-xl mt-8 space-y-4">
        {loading && (
          <div className="text-center text-indigo-600 font-semibold animate-pulse">
            Searching...
          </div>
        )}

        {!loading && results.length === 0 && query.trim() && (
          <div className="text-center text-gray-500 font-medium">
            No users found matching "{query}"
          </div>
        )}

        {!loading &&
          results.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer select-none "
              onClick={() => {
                navigate(`/profile/${user.username}`)
              }}
            >
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover object-top border-2 border-indigo-400 aspect-square"
                loading="lazy"
              />
              <div className="info">
                <h3 className="text-lg font-semibold text-indigo-900 w-fit ">
                  {user.username}
                </h3>
                <p className="text-sm text-indigo-600  w-24  ">{user.name || "No full name"}</p>
              </div>
              <div className="flex justify-end items-center w-full font-bold">
               <span>
                 {user.role}
               </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
