import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Divider, 
  CircularProgress, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  IconButton,
  Stack,
  Avatar,
  Chip,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../../services/taskService';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import UpdateIcon from '@mui/icons-material/Update';
import { TASK_STATUS } from '../../utils/constants';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const data = await getTaskById(id);
      setTask(data);
      setStatus(data.status);
      setRemark(data.remark || '');
    } catch (e) {
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    setSuccess(false);
    try {
      await updateTask(id, { status, remark });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchTask();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={50} thickness={4} />
      <Typography sx={{ mt: 2 }} color="text.secondary">Retrieving assignment details...</Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', pb: 6 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/tasks')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="800">Assignment Intel</Typography>
          <Typography variant="body2" color="text.secondary">Detailed status and management for Task #{id}</Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Main Content Area */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: 'white', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight="800" sx={{ mb: 1, color: '#1e293b' }}>
                  {task.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.light' }}>
                    {task.assignedByName?.charAt(0)}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    Issued by <strong>{task.assignedByName}</strong>
                  </Typography>
                </Stack>
              </Box>
              <Stack direction="row" spacing={1}>
                <StatusBadge status={task.priority} type="priority" />
                <StatusBadge status={task.status} />
              </Stack>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle2" fontWeight="800" color="primary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>
                Operational Objectives
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {task.description}
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 4, border: '1px solid #f1f5f9' }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">DESIGNATED OFFICER</Typography>
                  </Stack>
                  <Typography variant="body1" fontWeight="700">{task.assignedToName}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EventIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">COMPLETION DEADLINE</Typography>
                  </Stack>
                  <Typography variant="body1" fontWeight="700" color={new Date(task.dueDate) < new Date() ? 'error.main' : 'inherit'}>
                    {formatDate(task.dueDate)}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Activity/History - Visual representation of remark */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <HistoryEduIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">Officer's Remarks</Typography>
            </Stack>
            <Box sx={{ p: 3, bgcolor: '#f1f5f9', borderRadius: 3, borderLeft: '4px solid #1e3a8a' }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#334155' }}>
                {task.remark || "Confirming task receipt and initiating necessary actions. Further updates will follow standard reporting protocol."}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'right', fontWeight: 'bold', color: '#64748b' }}>
                — Updated at {formatDate(task.updatedAt || new Date())}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar / Actions Area */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 5, 
              border: '1px solid #e2e8f0', 
              bgcolor: 'white',
              position: 'sticky',
              top: 100
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <UpdateIcon color="primary" /> Update Progress
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Status updated successfully
              </Alert>
            )}

            <Stack spacing={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ fontWeight: 'bold' }}>Submission Status</InputLabel>
                <Select
                  value={status}
                  label="Submission Status"
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ borderRadius: 3, fontWeight: 'bold' }}
                >
                  {Object.values(TASK_STATUS).map((s) => (
                    <MenuItem key={s} value={s} sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                        <Typography variant="body2" fontWeight="600">{s}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Official Progress Remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Detail current progress or blockers..."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={handleUpdate}
                disabled={updating}
                startIcon={updating ? <CircularProgress size={20} /> : <UpdateIcon />}
                sx={{ 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: 'bold',
                  boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.2)'
                }}
              >
                Commit Update
              </Button>
            </Stack>

            <Box sx={{ mt: 4, p: 2, bgcolor: '#fff7ed', borderRadius: 3, border: '1px solid #ffedd5' }}>
              <Typography variant="caption" sx={{ color: '#9a3412', display: 'flex', gap: 1, fontWeight: 'medium' }}>
                <Alert color="warning" icon={false} sx={{ bgcolor: 'transparent', p: 0, fontSize: '0.75rem' }}>
                  Updating this status will immediately notify the assigning officer of your progress.
                </Alert>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskDetails;

