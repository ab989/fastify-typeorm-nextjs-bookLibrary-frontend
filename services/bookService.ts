import axios from 'axios';

const BASE_URL = process.env.API_URL || 'http://localhost:3001';

export const getBooks = async () => {
  const response = await axios.get(`${BASE_URL}/books`);
  return response.data;
};

export const getBook = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (title: string, authorId: string) => {
  const response = await axios.post(`${BASE_URL}/books`, { title, authorId });
  return response.data;
};

export const updateBook = async (id: string, title: string, authorId: string) => {
  const response = await axios.put(`${BASE_URL}/books/${id}`, { title, authorId });
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/books/${id}`);
  return response.data;
};
