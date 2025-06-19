import React, { useContext, useState } from "react";
import UploadFiles from "../Component/CreatePost/UploadFiles";
import AddCaption from "../Component/CreatePost/AddCaption";
import Preview from "../Component/CreatePost/Preview";


import PostContext from "../Context/PostContext";
import { AppContext } from "../Context/AppContext";
import UploadProgres from "../Component/UploadProgres";

const CreatePost = () => {
  const { User } = useContext(AppContext);
  const { newPost, setnewPost, uploadPost } = useContext(PostContext);

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    if (step === 1 && newPost.content?.length > 0) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setIsUploading(true);
      uploadPost(newPost, setProgress)
        .then((res) => {
          console.log("Upload successful", res);
          setTimeout(() => {
            setIsUploading(false);
            setProgress(0);
          }, 5000);
        })
        .catch((err) => {
          console.log("Upload failed", err);
          setIsUploading(false);
        });

      setnewPost({ content: [], caption: "" });
      setStep(1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-white relative">
      {/* Header */}
      <div className="header w-full h-16 flex justify-between items-center p-1">
        <div className="user flex items-center p-1">
          <img
            src={User?.user?.profilePic}
            alt="user"
            className="w-10 h-10 rounded-full object-cover object-top"
          />
        </div>
        <button
          type="button"
          disabled={step === 1 && newPost.content.length === 0}
          onClick={handleNext}
          className="px-4 py-1 rounded-lg text-white bg-black disabled:opacity-50"
        >
          {step === 1 && "Next"}
          {step === 2 && "Next"}
          {step === 3 && "Upload"}
        </button>
      </div>

      {/* Upload Progress */}
      {isUploading && <UploadProgres progress={progress} />}

      {/* Step content */}
      <div className="w-full h-full content flex justify-center items-start">
        {step === 1 && <UploadFiles />}
        {step === 2 && <AddCaption />}
        {step === 3 && <Preview />}
      </div>
    </div>
  );
};

export default CreatePost;
