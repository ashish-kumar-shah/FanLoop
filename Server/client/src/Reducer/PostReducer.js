export const postReducer = (post, action) => {
  switch (action.type) {
    case "SET_POST_STATE_SUCCESSFULLY":
      return {
        content: action.payload.content,
        caption: action.payload.caption,
      };

    case "UPLOAD_POST_SUCCESS":
    case "UPLOAD_POST_FAILED":
      return {
        ...post,
        ...action.payload,
      };

    case "GET_POST_SUCCESS":
      return action.payload; // assume payload is an array of posts

    case "GET_POST_FAILED":
      return []; // return empty array to avoid `.map` error

    default:
      return post; // instead of null
  }
};
