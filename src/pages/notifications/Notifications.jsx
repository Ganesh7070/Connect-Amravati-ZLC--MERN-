import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Divider, 
  Paper, 
  Button, 
  CircularProgress,
  Stack,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getNotifications, markAsRead } from '../../services/notificationService';
import { formatDate } from '../../utils/helpers';

const NotificationsLabel = ({ type }) => {
  if (type === 'TASK') return <Chip label="Task Update" size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: '#eff6ff', color: '#1e40af', fontWeight: '800' }} />;
  if (type === 'ANNOUNCEMENT') return <Chip label="Bulletin" size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: '#f0fdf4', color: '#166534', fontWeight: '800' }} />;
  if (type === 'APPRECIATION') return <Chip label="Kudos" size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: '#fffbeb', color: '#92400e', fontWeight: '800' }} />;
  return null;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    if (unread.length === 0) return;
    try {
      await Promise.all(unread.map(n => markAsRead(n.id)));
      fetchNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={50} thickness={4} />
      <Typography sx={{ mt: 2 }} color="text.secondary">Syncing with communication server...</Typography>
    </Box>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
            Alert Terminal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            System logs and administrative broadcast history
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          {unreadCount > 0 && (
            <Button 
              variant="text" 
              startIcon={<DoneAllIcon />} 
              onClick={handleMarkAllAsRead}
              sx={{ fontWeight: 'bold', color: 'primary.main', borderRadius: 2 }}
            >
              Acknowledge All
            </Button>
          )}
          <Tooltip title="Clear Read Logs">
            <IconButton sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
              <DeleteSweepIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 5, 
          overflow: 'hidden', 
          border: '1px solid #e2e8f0',
          bgcolor: 'white'
        }}
      >
        {notifications.length === 0 ? (
          <Box sx={{ p: 10, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 60, color: '#CBD5E1', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold">No New Signals</Typography>
            <Typography variant="body2" color="text.secondary">Your communication queue is currently empty.</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <ListItem 
                  onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                  sx={{ 
                    py: 3, 
                    px: 3,
                    transition: 'all 0.2s',
                    position: 'relative',
                    backgroundColor: notif.isRead ? 'transparent' : 'rgba(30, 58, 138, 0.03)',
                    '&:hover': { bgcolor: 'rgba(241, 245, 249, 0.8)', cursor: 'pointer' },
                    borderLeft: notif.isRead ? '4px solid transparent' : '4px solid #1e3a8a'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: notif.isRead ? '#f8fafc' : '#eff6ff', 
                        color: notif.isRead ? '#94a3b8' : '#1e3a8a',
                        border: '1px solid',
                        borderColor: notif.isRead ? '#e2e8f0' : '#dbeafe'
                      }}
                    >
                      {notif.message.toLowerCase().includes('task') ? <AssignmentIcon /> : 
                       notif.message.toLowerCase().includes('announcement') ? <CampaignIcon /> :
                       notif.message.toLowerCase().includes('appreciation') ? <EmojiEventsIcon /> :
                       <NotificationsIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography 
                          variant="body1" 
                          fontWeight={notif.isRead ? "500" : "800"} 
                          color={notif.isRead ? "text.secondary" : "text.primary"}
                        >
                          {notif.message}
                        </Typography>
                        {!notif.isRead && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />}
                      </Box>
                    }
                    secondary={
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                          {formatDate(notif.createdAt)}
                        </Typography>
                        <NotificationsLabel type={
                          notif.message.toLowerCase().includes('task') ? 'TASK' : 
                          notif.message.toLowerCase().includes('announcement') ? 'ANNOUNCEMENT' :
                          notif.message.toLowerCase().includes('appreciation') ? 'APPRECIATION' : null
                        } />
                      </Stack>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Notifications;

