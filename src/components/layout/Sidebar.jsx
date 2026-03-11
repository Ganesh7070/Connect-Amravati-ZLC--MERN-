import React, { useContext } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Paper,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShieldIcon from '@mui/icons-material/Shield';

import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: Object.values(ROLES) },
    { text: 'User Management', icon: <PeopleIcon />, path: '/users', roles: [ROLES.SYSTEM_ADMIN] },
    { text: 'Task Allocation', icon: <AddTaskIcon />, path: '/tasks/create', roles: [ROLES.COLLECTOR, ROLES.DEPUTY_COLLECTOR, ROLES.SDO, ROLES.TEHSILDAR] },
    { text: 'Task Tracking', icon: <ListAltIcon />, path: '/tasks', roles: Object.values(ROLES) },
    { text: 'Announcements', icon: <CampaignIcon />, path: '/announcements', roles: Object.values(ROLES) },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications', roles: Object.values(ROLES) },
    { text: 'Appreciation', icon: <EmojiEventsIcon />, path: '/appreciation', roles: Object.values(ROLES) },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports', roles: [ROLES.COLLECTOR, ROLES.DEPUTY_COLLECTOR, ROLES.SDO] },
  ];

  const filteredNavItems = navItems.filter((item) => currentUser && item.roles.includes(currentUser.role));

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#ffffff',
    }}>
      {/* Brand Header */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        borderBottom: '1px solid #f1f5f9'
      }}>
        <Avatar 
          sx={{ 
            bgcolor: '#1e3a8a', 
            width: 40, 
            height: 40,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        >
          <ShieldIcon fontSize="small" />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="800" color="#1e3a8a" sx={{ lineHeight: 1.2 }}>
            e-CHAVADI
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Govt. of Maharashtra
          </Typography>
        </Box>
      </Box>

      {/* Navigation List */}
      <List sx={{ flexGrow: 1, py: 3, px: 2 }}>
        <Typography variant="caption" sx={{ px: 2, mb: 2, display: 'block', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Menu
        </Typography>
        {filteredNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <ListItem disablePadding key={item.text} sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (handleDrawerToggle) handleDrawerToggle();
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.2,
                  px: 2,
                  backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                  color: isActive ? '#1e3a8a' : '#475569',
                  transition: 'all 0.2s ease',
                  '&:after': isActive ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    width: 4,
                    height: 20,
                    bgcolor: '#1e3a8a',
                    borderRadius: '0 4px 4px 0'
                  } : {},
                  '&:hover': {
                    backgroundColor: isActive ? '#f1f5f9' : '#f8fafc',
                    color: '#1e3a8a',
                    transform: 'translateX(4px)'
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? '#1e3a8a' : '#64748b', 
                  minWidth: 40,
                  transition: 'color 0.2s'
                }}>
                  {React.cloneElement(item.icon, { fontSize: 'small' })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 800 : 500,
                    fontSize: '0.9rem',
                    letterSpacing: isActive ? '0.2px' : '0'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Support/Status */}
      <Box sx={{ p: 2 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderRadius: 4, 
            bgcolor: '#f8fafc', 
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" fontWeight="bold" color="#64748b">SYSTEM SECURITY</Typography>
            <Chip label="Active" size="small" color="success" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 'bold' }} />
          </Box>
          <Divider />
          <ListItemButton
            onClick={handleLogout}
            sx={{
              p: 1,
              px: 1.5,
              borderRadius: 3,
              color: '#ef4444',
              '&:hover': { bgcolor: '#fee2e2' },
            }}
          >
            <ListItemIcon sx={{ color: '#ef4444', minWidth: 32 }}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.85rem' }} />
          </ListItemButton>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            border: 'none',
            boxShadow: '10px 0 15px -3px rgba(0,0,0,0.05)'
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: '1px solid #f1f5f9',
            boxShadow: 'none'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

