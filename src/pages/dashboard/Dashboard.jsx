import React, { useEffect, useState, useContext } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress, 
  Paper,
  Divider,
  useTheme,
  Avatar,
  Stack
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getTasks } from '../../services/taskService';
import { TASK_STATUS } from '../../utils/constants';
import { AuthContext } from '../../context/AuthContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress thickness={4} size={50} sx={{ mb: 2 }} />
      <Typography color="text.secondary">Loading portal intelligence...</Typography>
    </Box>
  );

  // Metrics calculation
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === TASK_STATUS.PENDING).length;
  const inProgress = tasks.filter(t => t.status === TASK_STATUS.IN_PROGRESS).length;
  const completed = tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length;
  const overdue = tasks.filter(t => t.status === TASK_STATUS.OVERDUE).length;

  const cardData = [
    { title: 'Total Assignments', value: total, icon: <AssignmentIcon />, color: '#1e40af', bg: '#dbeafe' },
    { title: 'Pending Approval', value: pending, icon: <WarningAmberIcon />, color: '#92400e', bg: '#fef3c7' },
    { title: 'Active Tasks', value: inProgress, icon: <AutorenewIcon />, color: '#0369a1', bg: '#e0f2fe' },
    { title: 'Accomplished', value: completed, icon: <CheckCircleOutlineIcon />, color: '#166534', bg: '#dcfce7' },
    { title: 'Critical/Overdue', value: overdue, icon: <WarningAmberIcon />, color: '#991b1b', bg: '#fee2e2' },
  ];

  const pieData = [
    { name: 'Pending', value: pending, color: '#f59e0b' },
    { name: 'In Progress', value: inProgress, color: '#0ea5e9' },
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'Overdue', value: overdue, color: '#ef4444' }
  ];

  const barData = [
    { name: 'Jan', tasks: 4 },
    { name: 'Feb', tasks: 3 },
    { name: 'Mar', tasks: total || 5 },
    { name: 'Apr', tasks: 2 },
  ];

  return (
    <Box sx={{ pb: 8 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom color="text.primary">
            Portal Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, <strong>{currentUser?.name}</strong>. Here's what's happening in Amravati District today.
          </Typography>
        </Box>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 1.5, 
            px: 3, 
            borderRadius: 4, 
            bgcolor: '#1e3a8a', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <TrendingUpIcon size="small" />
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>SYSTEM UPTIME</Typography>
            <Typography variant="body2" fontWeight="bold">99.9% Operational</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                  borderColor: card.color
                }
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar 
                  sx={{ 
                    bgcolor: card.bg, 
                    color: card.color,
                    width: 52,
                    height: 52,
                    borderRadius: 3
                  }}
                >
                  {card.icon}
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="800" color="text.primary">
                    {card.value}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 5, 
              border: '1px solid #e2e8f0',
              height: '100%' 
            }}
          >
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight="bold">Performance Analytics</Typography>
                <Typography variant="caption" color="text.secondary">Monthly task completion trends</Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="tasks" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 5, 
              border: '1px solid #e2e8f0',
              height: '100%' 
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="bold">Task Distribution</Typography>
              <Typography variant="caption" color="text.secondary">Current status of all portal tasks</Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie 
                    data={pieData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={80} 
                    outerRadius={120} 
                    paddingAngle={5}
                    dataKey="value" 
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <Typography variant="h4" fontWeight="bold">{total}</Typography>
                <Typography variant="caption" color="text.secondary">TOTAL</Typography>
              </Box>
            </Box>
            
            <Stack spacing={2} sx={{ mt: 2 }}>
              {pieData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                    <Typography variant="body2" color="text.secondary" fontWeight="500">{item.name}</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight="bold">
                    {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

