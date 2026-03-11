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
  CircularProgress,
  IconButton,
  Divider,
  Stack,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../services/taskService';
import { getUsers } from '../../services/userService';
import { TASK_PRIORITY } from '../../utils/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import SaveIcon from '@mui/icons-material/Save';

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '',
    assignedToId: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setFetchingUsers(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch(e) { 
        console.error(e);
        setError("Could not load user list. Please check your connection.");
      } finally {
        setFetchingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createTask(formData);
      navigate('/tasks');
    } catch(e) {
      setError("Failed to allocate task. Please verify all fields are correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={() => navigate('/tasks')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="800">Assign New Task</Typography>
            <Typography variant="body2" color="text.secondary">Allocate official duties to district officers</Typography>
          </Box>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Basic Info */}
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="800" color="primary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Task Specifications
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>
              <TextField
                required
                fullWidth
                label="Formal Title"
                placeholder="e.g., Weekly Review Meeting for Revenue Dept"
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
                rows={5}
                label="Objective & Background"
                placeholder="Provide detailed context and expected deliverables..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            {/* Logistics Section */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Priority Level</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  label="Priority Level"
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {Object.values(TASK_PRIORITY).map((priority) => (
                    <MenuItem key={priority} value={priority} sx={{ fontWeight: priority === 'HIGH' ? 'bold' : 'normal' }}>
                      {priority}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Completion Deadline"
                name="dueDate"
                InputLabelProps={{ shrink: true }}
                value={formData.dueDate}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="800" color="primary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Officer Assignment
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>
              <FormControl fullWidth required disabled={fetchingUsers}>
                <InputLabel>Designated Officer</InputLabel>
                <Select
                  name="assignedToId"
                  value={formData.assignedToId}
                  label="Designated Officer"
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {users.length === 0 ? (
                    <MenuItem disabled>No officers available</MenuItem>
                  ) : (
                    users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1" fontWeight="600">{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{user.role} • {user.taluka || 'District Office'}</Typography>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button 
                  variant="text" 
                  color="inherit"
                  onClick={() => navigate('/tasks')} 
                  disabled={loading}
                  sx={{ borderRadius: 3, fontWeight: 'bold' }}
                >
                  Discard Changes
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading || fetchingUsers}
                  startIcon={loading ? <CircularProgress size={20} /> : <AssignmentAddIcon />}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 3, 
                    fontWeight: 'bold',
                    boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.2)' 
                  }}
                >
                  Allocate Assignment
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTask;

