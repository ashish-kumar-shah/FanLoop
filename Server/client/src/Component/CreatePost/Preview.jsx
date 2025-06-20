import React, { useContext, useState, useMemo } from "react";
import PostContext from "../../Context/PostContext";

const Preview = () => {
  const { newPost } = useContext(PostContext);
  const { content = [], caption } = newPost;
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasFiles = content.length > 0;

  const previewFiles = useMemo(() => {
    return content.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
    }));
  }, [content]);

  const next = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % previewFiles.length);
  };

  const prev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + previewFiles.length) % previewFiles.length);
  };

  if (!hasFiles) {
    return (
      <div className="max-w-lg mx-auto p-6 border rounded bg-white text-center text-gray-500">
        No files uploaded.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 border rounded bg-white">
      <h3 className="mb-4 font-semibold text-center text-lg">Preview</h3>

      <div className="relative w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden">
        {previewFiles.length === 1 ? (
          <div className="w-full h-full flex items-center justify-center">
            {previewFiles[0].type.startsWith("image/") ? (
              <img
                src={previewFiles[0].url}
                alt={previewFiles[0].name}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                controls
                className="w-full h-full object-contain"
                src={previewFiles[0].url}
              />
            )}
          </div>
        ) : (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-60 transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-60 transition"
            >
              ›
            </button>

            <div className="w-full h-full flex items-center justify-center">
              {previewFiles[currentIndex].type.startsWith("image/") ? (
                <img
                  src={previewFiles[currentIndex].url}
                  alt={previewFiles[currentIndex].name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={previewFiles[currentIndex].url}
                />
              )}
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {previewFiles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 px-2">
        <h4 className="font-semibold mb-1">Caption:</h4>
        <p className="whitespace-pre-wrap break-words">
          {caption || "No caption added."}
        </p>
      </div>
    </div>
  );
};

export default Preview;
