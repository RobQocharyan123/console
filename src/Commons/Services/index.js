import axios from "axios";
const getBaseURL = () =>
  process.env.REACT_APP_URL || "https://back-fzs9.onrender.com";

const pureClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000
});

export default pureClient;
