import axios from "axios";

export const getCall = async (endPoint) => {
  const token = localStorage.getItem("encodedToken");
  const response = await axios.get(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 201 || response.status === 200) {
    return response.data;
  }
};
