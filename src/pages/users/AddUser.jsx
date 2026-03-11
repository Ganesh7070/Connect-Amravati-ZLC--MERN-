import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Paper,
  IconButton,
  Divider,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userService';
import { ROLES } from '../../utils/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: '',
    district: 'Amravati',
    taluka: '',
    village: ''
  });
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
      await createUser(formData);
      navigate('/users');
    } catch (error) {
      setError('Registration failed. Please check if the username already exists or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/users')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="800">Recruit Official</Typography>
          <Typography variant="body2" color="text.secondary">Onboard new personnel to the district digital ecosystem</Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Identity Section */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <PersonIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="800" color="text.primary">OFFICIAL IDENTITY</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Full Official Name"
                    placeholder="e.g. Rajesh Kumar Patil"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Designated Role</InputLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      label="Designated Role"
                      onChange={handleChange}
                      sx={{ borderRadius: 3 }}
                    >
                      {Object.values(ROLES).map((role) => (
                        <MenuItem key={role} value={role}>{role.replace('_', ' ')}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Access Section */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2, mt: 2 }}>
                <SecurityIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="800" color="text.primary">PORTAL ACCESS</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    placeholder="e.g. rajesh_p"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Initial Credentials (Password)"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Jurisdiction Section */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2, mt: 2 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="800" color="text.primary">JURISDICTIONAL AREA</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Taluka / Subdivision"
                    placeholder="e.g. Achalpur"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Village / Ward"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button 
                  variant="text" 
                  color="inherit" 
                  onClick={() => navigate('/users')}
                  sx={{ borderRadius: 3, fontWeight: 'bold' }}
                >
                  Discard
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 3, 
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
                    boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.2)'
                  }}
                >
                  Register Official
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddUser;

