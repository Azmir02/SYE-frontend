import axios from "axios";

export const createPost = async (
  type,
  images,
  text,
  background,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/createPost`,
      {
        type,
        images,
        text,
        background,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "done", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const createComment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/comment`,
      {
        postId,
        comment,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const SavedPost = async (postId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/savepost/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const removeposts = async (postId, token) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/removepost/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: "done", data };
  } catch (error) {
    return error.response.data.message;
  }
};
