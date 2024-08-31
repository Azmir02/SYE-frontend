import axios from "axios";

export const UploadCoverpicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/getcoverpicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "done";
  } catch (error) {
    return error.response.data.message;
  }
};
