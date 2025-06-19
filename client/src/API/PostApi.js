import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_POST_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



export const uploadPost = async (payload, onProgress) => {
  const formData = new FormData();
  formData.append("caption", payload.caption);

  for (let file of payload.content) {
    formData.append("files", file); // Multiple files with same field name
  }

  try {
    const response = await API.post("/createPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function (progressEvent) {
        const total = progressEvent.total;
        const current = progressEvent.loaded;

        if (total) {
          const percentCompleted = Math.round((current * 100) / total);
          console.log("Upload progress:", percentCompleted); // 🔍 Check if this logs
          if (onProgress) onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getPost = async (page=1)=>{
    try {
       const response = await API.get(`/getPost?page=${page}`);
        return response
    } catch (error) {
        return error.message
    }
}
