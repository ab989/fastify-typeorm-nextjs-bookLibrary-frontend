import api from './api';

export const getAuthors = async () => {
  const response = await api.get(`/authors`);
  return response.data;
};

export const getAuthor = async (id: string) => {
  const response = await api.get(`/authors/${id}`);
  return response.data;
};

export const createAuthor = async (name: string) => {
  const response = await api.post(`/authors`, { name });
  return response.data;
};

export const updateAuthor = async (id: string, name: string) => {
  const response = await api.put(`/authors/${id}`, { name });
  return response.data;
};

export const deleteAuthor = async (id: string) => {
  const response = await api.delete(`/authors/${id}`);
  return response.data;
};
