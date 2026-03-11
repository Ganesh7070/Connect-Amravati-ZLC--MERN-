import api from './api';

export const getAppreciations = async () => {
  const response = await api.get('/appreciations');
  return response.data;
};

export const createAppreciation = async (appreciationData) => {
  const response = await api.post('/appreciations', appreciationData);
  return response.data;
};
