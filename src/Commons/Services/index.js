import axios from "axios";
const getBaseURL = () => process.env.REACT_APP_URL || "http://localhost:3030/api-docs/";

const pureClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000
});



export default pureClient;
