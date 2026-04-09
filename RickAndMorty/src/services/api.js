import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const getCharacter = async (id) => {
  try {
    const { data } = await api.get(`/card/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
};

export const getAllCharacters = async () => {
  try {
    const { data } = await api.get(`/card`);
    return data;
  } catch (error) {
    console.error(`Error fetching all characters:`, error);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post('/user/login', { email, password });
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  const { email, password } = userData;
  try {
    const { data } = await api.post('/user/signup', { email, password });
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export default api;
