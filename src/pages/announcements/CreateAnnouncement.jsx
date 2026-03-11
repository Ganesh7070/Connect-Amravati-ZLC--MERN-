import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  CircularProgress, 
  MenuItem,
  IconButton,
  Divider,
  Stack,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CampaignIcon from '@mui/icons-material/Campaign';
import SendIcon from '@mui/icons-material/Send';
import { createAnnouncement } from '../../services/announcementService';
import { ROLES } from '../../utils/constants';

const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', message: '', targetRole: 'ALL' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createAnnouncement(formData);
      navigate('/announcements');
    } catch (error) {
      console.error(error);
      setError('System failure while broadcasting announcement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/announcements')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="800">Draft Bulletin</Typography>
          <Typography variant="body2" color="text.secondary">Create and broadcast official communications to the district</Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <CampaignIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">Announcement Details</Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField 
                required 
                fullWidth 
                label="Headline / Title" 
                placeholder="e.g. Mandatory Administrative Review for the upcoming quarter"
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                required 
                fullWidth 
                multiline 
                rows={6} 
                label="Detailed Proclamation" 
                placeholder="Write the official message content here..."
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                select
                required 
                fullWidth 
                label="Target Audience Scope" 
                name="targetRole" 
                value={formData.targetRole} 
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              >
                <MenuItem value="ALL" sx={{ fontWeight: 'bold' }}>All District Personnel (Public)</MenuItem>
                <Divider sx={{ my: 1 }} />
                {Object.values(ROLES).map((r) => (
                  <MenuItem key={r} value={r}>{r.replace('_', ' ')}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button 
                  variant="text" 
                  color="inherit"
                  onClick={() => navigate('/announcements')} 
                  disabled={loading}
                  sx={{ borderRadius: 3, fontWeight: 'bold' }}
                >
                  Discard
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 3, 
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
                    boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.2)'
                  }}
                >
                  Broadcast Bulletin
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateAnnouncement;

