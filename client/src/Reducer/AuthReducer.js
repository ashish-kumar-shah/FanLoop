export const authReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case "LOGIN_FAILED":
    case "REGISTER_FAILED":
    case "AUTH_FAILED":
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case "LOGOUT":
  return { ...state, user: null, isAuthenticated: false, loading: false };

    case "USERNAME_CHECK":
      return { ...state, usernameAvailable: action.payload };
    default:
      return state;
  }
};
