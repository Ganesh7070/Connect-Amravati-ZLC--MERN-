import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
  Tooltip,
  Divider,
  ListItemIcon,
  useTheme,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'rgba(255, 255, 255, 0.9)' : '#1e3a8a',
      color: trigger ? '#1e3a8a' : 'white',
      backdropFilter: trigger ? 'blur(10px)' : 'none',
      transition: 'all 0.3s ease-in-out',
    }
  });
}

const Header = ({ drawerWidth = 0, handleDrawerToggle }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleLogout = () => {
  //   handleMenuClose();
  //   logout();
  //   navigate('/login');
  // };

  // const handleProfile = () => {
  //   handleMenuClose();
  //   navigate('/profile');
  // };

  // const handleDashboard = () => {
  //   handleMenuClose();
  //   navigate('/dashboard');
  // };

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side: Drawer Toggle & Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {handleDrawerToggle && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                '&:hover .logo-text': { transform: 'scale(1.02)' }
              }}
              onClick={() => navigate('/')}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India" 
                style={{ 
                  height: 35, 
                  marginRight: 12, 
                  filter: 'brightness(0) invert(1)' 
                }} 
              />
              <Box className="logo-text" sx={{ transition: 'transform 0.2s' }}>
                <Typography 
                  variant="h6" 
                  noWrap 
                  sx={{ 
                    fontWeight: 800, 
                    letterSpacing: '-0.5px',
                    lineHeight: 1.2
                  }}
                >
                  AMRAVATI
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    opacity: 0.8,
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  District Administration
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side: Actions & User */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            {/* Language Selection */}
            <Tooltip title="Switch Language">
              <IconButton color="inherit" size="small">
                <LanguageIcon fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 'bold', display: { xs: 'none', md: 'block' } }}>
                  EN
                </Typography>
              </IconButton>
            </Tooltip>

            {currentUser && (
              <>
                {/* Notifications */}
                <Tooltip title="Notifications">
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="error" overlap="circular">
                      <NotificationsNoneIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {/* User Profile */}
                <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255,255,255,0.2)' }} />
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                  onClick={handleMenuOpen}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: theme.palette.secondary.main,
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="body2" fontWeight="600" sx={{ lineHeight: 1 }}>
                      {currentUser.name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {currentUser.role}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}

            {!currentUser && (
              <Button 
                variant="outlined" 
                color="inherit" 
                size="small"
                onClick={() => navigate('/login')}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: 'none',
                  px: 3,
                  borderWidth: '2px',
                  '&:hover': { borderWidth: '2px' }
                }}
              >
                Login
              </Button>
            )}

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 3,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {currentUser?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.username || currentUser?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleDashboard}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;