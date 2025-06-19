import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

 export const getUserProfile = async (username)=>{
try {
    
  const response = await API.get(`/userprofile/${username}`)
  return response.data

} catch (error) {
     throw error
}
}

export const searchUserByQuery = async (query) => {
  if (!query) return [];

  try {
    const response = await API.get(`/searchuser?q=${encodeURIComponent(query)}`);
    if (response.data.success) {
      return response.data.data; // list of matching users
    } else {
      console.error("Search failed:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};


export const createFollower = async (following) => {
  try {
    const response = await API.post('/createfollower', { following });
    return response.data;
  } catch (error) {
    console.error("Error creating follower:", error?.response?.data || error.message);
    throw error?.response?.data || new Error('Failed to create follower');
  }
};

export const getFollowing = async () => {
  try {
    const response = await API.get('/getmyfollowing'); // backend route: GET /following
    return response.data.following; // returns array of following users
  } catch (error) {
    console.error('Failed to fetch following:', error);
    return [];
  }
};


export const updateProfilePic = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await API.patch("/updateavtar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update profile picture:", error);
    throw error;
  }
};

// Update Name
export const updateName = async (name) => {
  try {
    const response = await API.patch("/updatename", { name });
    return response.data;
  } catch (error) {
    console.error("Failed to update name:", error);
    throw error;
  }
};

// Update Email
export const updateEmail = async (email) => {
  try {
    const response = await API.patch("/updateemail", { email });
    return response.data;
  } catch (error) {
    console.error("Failed to update email:", error);
    throw error;
  }
};


export const getPostById = async (postId) => {
  try {
    const response = await API.get(`/getpostbyid/${postId}`);
    return response.data.post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
};

export const dummyAccount = async ()=>{
  try {
    const response = await API.post(`/createdummyaccount`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
}

export const getNotifications = async () => {
  try {
    const res = await API.get("/getnotification");
    return res.data.notifications; // adjust based on your backend response
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return [];
  }
};

// Mark all notifications as seen
export const markNotificationsAsSeen = async (notificationId ) => {
  try {
    const res = await API.patch("/setseen",{notificationId });
    return res.data;
  } catch (err) {
    console.error("Error marking notifications as seen:", err);
    return null;
  }
};


export const addComment = (postId, text) =>
  API.post("/comment", { postId, text });

export const getComments = (postId) =>
  API.get(`/comments/${postId}`);

export const toggleLike = (postId) =>
  API.post("/like", { postId });

export const getLikes = (postId) =>
  API.get(`/likes/${postId}`);