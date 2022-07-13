import axios from "axios";
const token = localStorage.getItem("encodedToken");

export const getCall = async (endPoint) => {
  const response = await axios.get(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 201 || response.status === 200) {
    return response.data;
  }
};

export const postCall = async (endPoint, requestBody) => {
  const response = await axios.post(endPoint, requestBody, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 201 || response.status === 200) {
    return response.data;
  }
};

export const deleteCall = async (endPoint) => {
  const response = await axios.delete(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 201 || response.status === 200) {
    return response.data;
  }
};
