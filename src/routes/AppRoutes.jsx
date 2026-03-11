import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';

// Auth Pages
import Login from '../pages/auth/Login';

// Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Users
import UserList from '../pages/users/UserList';
import AddUser from '../pages/users/AddUser';
import EditUser from '../pages/users/EditUser';

// Tasks
import TaskList from '../pages/tasks/TaskList';
import CreateTask from '../pages/tasks/CreateTask';
import TaskDetails from '../pages/tasks/TaskDetails';

// Announcements
import AnnouncementList from '../pages/announcements/AnnouncementList';
import CreateAnnouncement from '../pages/announcements/CreateAnnouncement';

// Appreciations
import AppreciationList from '../pages/appreciation/AppreciationList';

// Notifications
import Notifications from '../pages/notifications/Notifications';

// Reports
import TaskReports from '../pages/reports/TaskReports';

// Profile
import Profile from '../pages/profile/Profile';

import { ROLES } from '../utils/constants';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={
          <ProtectedRoute allowedRoles={[ROLES.SYSTEM_ADMIN]}>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="/users/add" element={
          <ProtectedRoute allowedRoles={[ROLES.SYSTEM_ADMIN]}>
            <AddUser />
          </ProtectedRoute>
        } />
        <Route path="/users/edit/:id" element={
          <ProtectedRoute allowedRoles={[ROLES.SYSTEM_ADMIN]}>
            <EditUser />
          </ProtectedRoute>
        } />

        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/create" element={
          <ProtectedRoute allowedRoles={[ROLES.COLLECTOR, ROLES.DEPUTY_COLLECTOR, ROLES.SDO, ROLES.TEHSILDAR]}>
            <CreateTask />
          </ProtectedRoute>
        } />
        <Route path="/tasks/:id" element={<TaskDetails />} />

        <Route path="/announcements" element={<AnnouncementList />} />
        <Route path="/announcements/create" element={
          <ProtectedRoute allowedRoles={[ROLES.COLLECTOR, ROLES.DEPUTY_COLLECTOR]}>
            <CreateAnnouncement />
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/appreciation" element={<AppreciationList />} />
        
        <Route path="/reports" element={<TaskReports />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
