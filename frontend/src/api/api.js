import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export const api = {
  // Upload Resume
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    // Added /resume prefix to match backend
    const response = await apiClient.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get AI Career Roadmap
  getRoadmap: async (userData) => {
    // Added /roadmap prefix and fixed endpoint to /generate
    const response = await apiClient.post('/roadmap/generate', userData);
    return response.data;
  }
};