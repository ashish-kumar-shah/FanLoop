import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_USER_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const registerUser = async (data) => {
  try {
   


    const response = await API.post('/register', data);
    return response.data; // contains user data or token
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Registration failed. Please try again.'
    );
  }
};

// Login an existing user
export const loginUser = async (data) => {
  try {
    const response = await API.post('/login', data);
    return response.data; // contains user data or token
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Login failed. Please check credentials.'
    );
  }
};

export const checkUsername = async (username) => {
  try {
    const response = await API.get(`/check-username?username=${username}`);
    return response.data; // expected: { available: true } or { available: false }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Username check failed. Try again later.'
    );
  }
};


export const authenticatedUser = async () => {
  try {
    const response = await API.get("/authenticate");
    
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch authenticated user data');
  }
};
export const logout = async () => {
  try {
    const response = await API.get("/logout", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);  // helpful for debugging
    throw new Error("Failed to logout");
  }
};
