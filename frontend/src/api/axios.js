
import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://e-commerce-games.onrender.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
