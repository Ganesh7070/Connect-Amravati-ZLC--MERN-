import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  const data = response.data;
  return {
    token: data.token,
    user: {
      id: data.id,
      name: data.name,
      username: data.username,
      role: data.role
    }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};
