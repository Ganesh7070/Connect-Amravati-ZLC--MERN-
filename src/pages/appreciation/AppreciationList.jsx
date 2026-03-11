import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Avatar, 
  Button, 
  Grid, 
  CircularProgress,
  Stack,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import RefreshIcon from '@mui/icons-material/Refresh';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { getAppreciations } from '../../services/appreciationService';
import { formatDate } from '../../utils/helpers';

const AppreciationList = () => {
  const [appreciations, setAppreciations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppreciations();
  }, []);

  const fetchAppreciations = async () => {
    setLoading(true);
    try {
      const data = await getAppreciations();
      setAppreciations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={50} thickness={4} color="warning" />
      <Typography sx={{ mt: 2 }} color="text.secondary">Loading district honors...</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            Honors & Accolades
          </Typography>
          <Typography variant="body2" color="text.secondary">Celebrating excellence and dedicated public service across Amravati</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Refresh Honors">
            <IconButton onClick={fetchAppreciations} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button 
            variant="contained" 
            startIcon={<StarIcon />}
            sx={{ 
              borderRadius: 3, 
              fontWeight: 'bold',
              px: 3,
              background: 'linear-gradient(90deg, #f59e0b, #d97706)',
              boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.3)',
              '&:hover': { background: 'linear-gradient(90deg, #d97706, #b45309)' }
            }}
          >
            Nominate Peer
          </Button>
        </Stack>
      </Box>

      {appreciations.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 8, 
            textAlign: 'center', 
            borderRadius: 5, 
            border: '2px dashed #fbbf24',
            bgcolor: 'rgba(255, 251, 235, 0.5)'
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 60, color: '#f59e0b', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" fontWeight="bold" color="#92400e">No Recent Accolades</Typography>
          <Typography variant="body2" color="#b45309">Exemplary service records will be showcased here.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {appreciations.map((appr) => (
            <Grid item xs={12} key={appr.id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 6, 
                  border: '1px solid #ffedd5',
                  bgcolor: 'white',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 20px 25px -5px rgba(251, 191, 36, 0.1)',
                    borderColor: '#fcd34d'
                  }
                }}
              >
                {/* Decorative Badge */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -15, 
                    right: 30, 
                    bgcolor: '#f59e0b', 
                    color: 'white', 
                    px: 3, 
                    py: 1, 
                    borderRadius: 4, 
                    fontSize: '0.7rem', 
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <MilitaryTechIcon sx={{ fontSize: 16 }} /> Distinguished
                </Box>

                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                    <Avatar 
                      sx={{ 
                        width: 72, 
                        height: 72, 
                        bgcolor: '#fffbeb', 
                        color: '#f59e0b',
                        border: '2px solid #fef3c7'
                      }}
                    >
                      <EmojiEventsIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" fontWeight="900" sx={{ color: '#1e293b', mb: 0.5 }}>
                        Performance Excellence
                      </Typography>
                      <Typography variant="body2" color="#64748b" fontWeight="600">
                        Sanctioned by Honorable <strong>{appr.fromUser.name}</strong>
                      </Typography>
                    </Box>
                    <Typography variant="caption" fontWeight="800" sx={{ color: '#94a3b8', mt: 1 }}>
                      {formatDate(appr.createdAt)}
                    </Typography>
                  </Box>

                  <Box 
                    sx={{ 
                      p: 4, 
                      bgcolor: '#fffaf0', 
                      borderRadius: 5, 
                      borderLeft: '8px solid #f59e0b',
                      mb: 4,
                      position: 'relative'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontStyle: 'italic', 
                        color: '#451a03', 
                        lineHeight: 1.6,
                        fontWeight: '500',
                        fontSize: '1.2rem'
                      }}
                    >
                      "{appr.message}"
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography variant="subtitle2" fontWeight="800" color="#64748b">RECIPIENT:</Typography>
                      <Chip 
                        label={appr.toUser.name} 
                        sx={{ 
                          bgcolor: '#1e3a8a', 
                          color: 'white', 
                          fontWeight: '800',
                          px: 1,
                          height: 32,
                          '& .MuiChip-label': { px: 2 }
                        }} 
                      />
                    </Stack>
                    <Button 
                      variant="text" 
                      endIcon={<KeyboardDoubleArrowRightIcon />} 
                      sx={{ fontWeight: '800', color: '#1e3a8a' }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AppreciationList;

