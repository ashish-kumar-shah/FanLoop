import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import serviceContext from "../Context/ServicesContext";
import LogOut from "../Component/LogOut";

const Setting = () => {
  const { User } = useContext(AppContext);
  const { updateEmail, updateName, updateProfilePic } = useContext(serviceContext);

  const [profilePicFile, setProfilePicFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(User?.user?.profilePic || "");
  const [name, setName] = useState(User?.user?.name || "");
  const [email, setEmail] = useState(User?.user?.email || "");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return setErrors((prev) => ({ ...prev, profilePic: "Invalid image file" }));
    }
    setErrors((prev) => ({ ...prev, profilePic: null }));
    setProfilePicFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleUpdateProfilePic = async () => {
    if (!profilePicFile) {
      return setErrors((prev) => ({ ...prev, profilePic: "Please select an image" }));
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", profilePicFile);
      await updateProfilePic(profilePicFile);
      setSuccess("Profile picture updated successfully");
    } catch (err) {
      setErrors((prev) => ({ ...prev, profilePic: "Update failed. Try again." }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!name.trim()) {
      return setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
    }
    try {
      setLoading(true);
      await updateName(name.trim());
      setSuccess("Name updated successfully");
    } catch (err) {
      setErrors((prev) => ({ ...prev, name: "Failed to update name" }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!validateEmail(email)) {
      return setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    }
    try {
      setLoading(true);
      await updateEmail(email.trim());
      setSuccess("Email updated successfully");
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: "Failed to update email" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Profile Settings</h1>

      {success && <div className="text-green-600 font-medium text-center">{success}</div>}

      {/* Profile Picture Upload */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={previewURL}
          alt="Preview"
          className="w-20 h-20 rounded-full object-cover object-top border border-gray-400 aspect-square"
        />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
          />
          {errors.profilePic && <p className="text-sm text-red-500 mt-1">{errors.profilePic}</p>}
          <button
            onClick={handleUpdateProfilePic}
            disabled={loading}
            className="mt-2 w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            Update Profile Pic
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        <button
          onClick={handleUpdateName}
          disabled={loading}
          className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60"
        >
          Update Name
        </button>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        <button
          onClick={handleUpdateEmail}
          disabled={loading}
          className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 disabled:opacity-60"
        >
          Update Email
        </button>
      </div>
      <LogOut/>
    </div>
  );
};

export default Setting;
