import React, { useContext } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Grid, 
  Divider, 
  Chip, 
  Stack,
  Card,
  CardContent,
  IconButton,
  Button
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', pb: 6 }}>
      {/* Header Profile Cover */}
      <Paper 
        elevation={0} 
        sx={{ 
          height: 200, 
          borderRadius: 5, 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          mb: -10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}>
          <VerifiedUserIcon sx={{ fontSize: 300, color: 'white' }} />
        </Box>
      </Paper>

      {/* Profile Content */}
      <Box sx={{ px: { xs: 2, md: 5 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            {/* Main Info Card */}
            <Card sx={{ borderRadius: 5, overflow: 'visible', px: 2, pb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -8 }}>
                <Avatar 
                  sx={{ 
                    width: 140, 
                    height: 140, 
                    border: '6px solid white', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    bgcolor: '#1e3a8a',
                    fontSize: '3rem',
                    fontWeight: '800'
                  }}
                >
                  {currentUser.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" fontWeight="800" sx={{ mt: 2, letterSpacing: '-0.5px' }}>
                  {currentUser.name}
                </Typography>
                <Chip 
                  label={currentUser.role} 
                  color="primary" 
                  size="small" 
                  sx={{ mt: 1, fontWeight: '800', bgcolor: '#1e3a8a', px: 1 }} 
                />
                
                <Divider sx={{ width: '100%', my: 3 }} />
                
                <Stack spacing={2.5} sx={{ width: '100%', px: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#f1f5f9', color: '#64748b' }}>
                      <SecurityIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">USERNAME</Typography>
                      <Typography variant="body2" fontWeight="600">@{currentUser.username}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#f1f5f9', color: '#64748b' }}>
                      <LocationOnIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">LOCATION</Typography>
                      <Typography variant="body2" fontWeight="600">
                        {currentUser.taluka ? `${currentUser.taluka}, Amravati` : 'Amravati, Maharashtra'}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<EditIcon />}
                  sx={{ mt: 4, borderRadius: 3, py: 1, fontWeight: 'bold' }}
                >
                  Update Profile
                </Button>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Stack spacing={4} sx={{ mt: 12 }}>
              {/* Official Credentials */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #e2e8f0' }}>
                <Typography variant="h6" fontWeight="800" gutterBottom>Administrative Credentials</Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">DESIGNATION</Typography>
                    <Typography variant="body1" fontWeight="700" color="primary.main">{currentUser.role.replace('_', ' ')}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">EMPLOYEE ID</Typography>
                    <Typography variant="body1" fontWeight="700">EMP-2026-00{currentUser.id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">SERVICE CADRE</Typography>
                    <Typography variant="body1" fontWeight="700">Maharashtra State Service</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">PORTAL STATUS</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <VerifiedUserIcon sx={{ fontSize: 16, color: '#10b981' }} />
                      <Typography variant="body2" fontWeight="800" color="#10b981">VERIFIED</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Jurisdictional Details */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #e2e8f0' }}>
                <Typography variant="h6" fontWeight="800" gutterBottom>Jurisdictional Purview</Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">DISTRICT</Typography>
                    <Typography variant="body2" fontWeight="700">{currentUser.district || 'Amravati'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">SUB-DIVISION</Typography>
                    <Typography variant="body2" fontWeight="700">{currentUser.taluka || 'District Headquarter'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">VILLAGE / UNIT</Typography>
                    <Typography variant="body2" fontWeight="700">{currentUser.village || 'Administrative Unit'}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
