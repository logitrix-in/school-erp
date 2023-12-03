import axios from "axios";

///
//its a api
///
const api = axios.create({
  baseURL: "https://server.sociolinq.com/api",
  headers: { "x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90" },
  withCredentials: true,
});

export default api;
