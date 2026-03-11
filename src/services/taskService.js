import api from './api';

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, updatedData) => {
  let finalTask = null;
  if (updatedData.status) {
    const statusEnum = updatedData.status.toUpperCase().replace(' ', '_');
    const response = await api.put(`/tasks/${id}/status`, { status: statusEnum });
    finalTask = response.data;
  }
  if (updatedData.remark && updatedData.remark.trim() !== '') {
    await api.post(`/tasks/${id}/remarks`, { remark: updatedData.remark });
  }
  return finalTask || { id };
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
};
