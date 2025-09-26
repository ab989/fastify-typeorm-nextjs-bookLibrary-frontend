import api from './api';

export const getBooks = async () => {
  const response = await api.get(`/books`);
  return response.data;
};

export const getBook = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (title: string, authorId: string) => {
  const response = await api.post(`/books`, { title, authorId });
  return response.data;
};

export const updateBook = async (id: string, title: string, authorId: string) => {
  const response = await api.put(`/books/${id}`, { title, authorId });
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
