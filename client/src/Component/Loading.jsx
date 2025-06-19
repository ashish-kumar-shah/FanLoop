import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-extrabold tracking-wide mb-6">
        Fan<span className="text-blue-500">Loop</span>
      </h1>

      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:.1s]"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:.2s]"></span>
      </div>

      <p className="mt-4 text-gray-400 text-sm tracking-widest uppercase">Loading...</p>
    </div>
  );
};

export default Loading;
