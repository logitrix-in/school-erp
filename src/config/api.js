import axios from "axios";

const api = axios.create({
    baseURL: 'https://web-production-a472.up.railway.app/api',
    headers: { 'x-api-key': 'a8518942-17ea-44a6-b4e1-a974189a9a90' },
    withCredentials: true
});


export default api;

