import apiClient from "./axios";

// Function for making JSON requests
export const postJsonData = async (url, data) => {
    try {
      const response = await apiClient.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error('Error with JSON request:', error);
      throw error;
    }
  };
  
  // Function for making FormData requests
  export const postFormData = async (url, formData) => {
    try {
      const response = await apiClient.post(url, formData);
      // Don't set the Content-Type; let Axios and the browser handle it
      return response.data;
    } catch (error) {
      console.error('Error with FormData request:', error);
      throw error;
    }
  };