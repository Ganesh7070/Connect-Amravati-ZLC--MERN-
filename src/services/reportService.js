import api from './api';

export const getCompletedTasksReport = async () => {
  const response = await api.get('/reports/completed');
  return response.data;
};

export const getOverdueTasksReport = async () => {
  const response = await api.get('/reports/overdue');
  return response.data;
};

export const getUserPerformanceReport = async () => {
  const response = await api.get('/reports/performance');
  return response.data;
};
