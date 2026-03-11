import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Button, 
  Chip, 
  CircularProgress,
  Stack,
  Avatar,
  Paper,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { getAnnouncements } from '../../services/announcementService';
import { formatDate } from '../../utils/helpers';

const AnnouncementList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={50} thickness={4} />
      <Typography sx={{ mt: 2 }} color="text.secondary">Fetching latest district bulletins...</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom>Official Bulletins</Typography>
          <Typography variant="body2" color="text.secondary">Stay updated with the latest circulars and announcements from the Collector Office</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Refresh Feed">
            <IconButton onClick={fetchAnnouncements} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/announcements/create')}
            sx={{ 
              borderRadius: 3, 
              fontWeight: 'bold',
              px: 3,
              background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
              boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.2)'
            }}
          >
            Broadcast
          </Button>
        </Stack>
      </Box>

      {announcements.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 8, 
            textAlign: 'center', 
            borderRadius: 5, 
            border: '2px dashed #e2e8f0',
            bgcolor: 'rgba(248, 250, 252, 0.5)'
          }}
        >
          <CampaignIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" fontWeight="bold" color="text.primary">No Active Announcements</Typography>
          <Typography variant="body2" color="text.secondary">Official proclamations will appear here once published.</Typography>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {announcements.map((item) => (
            <Card 
              key={item.id} 
              elevation={0}
              sx={{ 
                borderRadius: 5, 
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.05)',
                  borderColor: 'primary.light'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Avatar sx={{ bgcolor: '#eff6ff', color: 'primary.main', width: 56, height: 56, borderRadius: 3 }}>
                    <CampaignIcon fontSize="medium" />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                          <Typography variant="h6" fontWeight="800" color="#1e293b">
                            {item.title}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <AccessTimeIcon sx={{ fontSize: 14, color: '#64748b' }} />
                            <Typography variant="caption" fontWeight="bold" color="#64748b">
                              Published {formatDate(item.createdAt)}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.8} alignItems="center">
                            <GroupsIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                            <Chip 
                              label={item.targetRole === 'ALL' ? 'Open to All Public' : `Exclusive: ${item.targetRole}`} 
                              size="small" 
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem', 
                                fontWeight: '800',
                                bgcolor: item.targetRole === 'ALL' ? '#f0fdf4' : '#fef2f2',
                                color: item.targetRole === 'ALL' ? '#166534' : '#991b1b',
                                border: '1px solid',
                                borderColor: item.targetRole === 'ALL' ? '#bbf7d0' : '#fecaca'
                              }} 
                            />
                          </Stack>
                        </Stack>
                      </Box>
                      <IconButton size="small">
                        <MoreVertIcon sx={{ color: '#94a3b8' }} />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2, color: '#475569', lineHeight: 1.7 }}>
                      {item.message}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default AnnouncementList;

