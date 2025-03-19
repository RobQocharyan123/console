import axios from "axios";
import { useNavigate } from "react-router-dom";
const getBaseURL = () => process.env.REACT_APP_URL;

const pureClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000
});

pureClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

pureClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.log("Unauthorized access - possibly redirect to login");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default pureClient;
