import axios from 'axios';

const BASE_URL = process.env.API_URL || 'http://localhost:3001';

export const getAuthors = async () => {
  const response = await axios.get(`${BASE_URL}/authors`);
  return response.data;
};

export const getAuthor = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/authors/${id}`);
  return response.data;
};

export const createAuthor = async (name: string) => {
  const response = await axios.post(`${BASE_URL}/authors`, { name });
  return response.data;
};

export const updateAuthor = async (id: string, name: string) => {
  const response = await axios.put(`${BASE_URL}/authors/${id}`, { name });
  return response.data;
};

export const deleteAuthor = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/authors/${id}`);
  return response.data;
};
