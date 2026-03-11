import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/userService';
import { ROLES } from '../../utils/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: '',
    district: '',
    taluka: '',
    village: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setFormData({
          name: data.name,
          username: data.username,
          role: data.role,
          district: data.district || 'Amravati',
          taluka: data.taluka || '',
          village: data.village || ''
        });
      } catch (err) {
        setError('Failed to load official profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateUser(id, formData);
      navigate('/users');
    } catch (error) {
      setError('Update failed. Please check network connectivity or try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={50} thickness={4} />
      <Typography sx={{ mt: 2 }} color="text.secondary">Retrieving official profile...</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/users')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="800">Edit Registry</Typography>
          <Typography variant="body2" color="text.secondary">Update administrative credentials and jurisdictional details</Typography>
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
                <Grid item xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Institutional Username (Permanent)"
                    name="username"
                    value={formData.username}
                    helperText="Username cannot be modified after registration"
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
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 3, 
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
                    boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.2)'
                  }}
                >
                  Commit Changes
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditUser;
