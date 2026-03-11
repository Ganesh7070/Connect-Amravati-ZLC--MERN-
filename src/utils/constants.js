export const ROLES = {
  COLLECTOR: 'COLLECTOR',
  DEPUTY_COLLECTOR: 'DEPUTY_COLLECTOR',
  SDO: 'SDO',
  TEHSILDAR: 'TEHSILDAR',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  STAFF: 'STAFF' // Just in case it's used elsewhere
};

export const TASK_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue'
};

export const TASK_PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

export const BASE_URL = 'http://localhost:8080/api';
