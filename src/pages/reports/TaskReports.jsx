import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Paper, 
  CircularProgress,
  Stack,
  Avatar,
  Divider,
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SpeedIcon from '@mui/icons-material/Speed';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { getUserPerformanceReport } from '../../services/reportService';

const ReportStat = ({ title, value, icon, color, subtitle }) => (
  <Card variant="outlined" sx={{ height: '100%', borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}15`, color: color, borderRadius: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="subtitle2" fontWeight="700" color="text.secondary">
          {title}
        </Typography>
      </Stack>
      <Typography variant="h4" fontWeight="800" gutterBottom>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary" fontWeight="500">
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const TaskReports = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const data = await getUserPerformanceReport();
      const formattedData = Object.keys(data).map(key => ({
        name: key.length > 15 ? key.substring(0, 12) + '...' : key,
        fullName: key,
        completed: data[key].COMPLETED || 0,
        pending: data[key].PENDING || 0 || data[key].IN_PROGRESS || 0,
        overdue: data[key].OVERDUE || 0
      }));
      setPerformanceData(formattedData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    alert('Generating encrypted analytical dossier (Mock)');
  };

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CircularProgress size={50} thickness={4} />
      <Typography sx={{ mt: 2 }} color="text.secondary">Generating administrative reports...</Typography>
    </Box>
  );

  const totalCompleted = performanceData.reduce((acc, curr) => acc + curr.completed, 0);
  const totalPending = performanceData.reduce((acc, curr) => acc + curr.pending, 0);
  const totalOverdue = performanceData.reduce((acc, curr) => acc + curr.overdue, 0);
  const totalTasks = totalCompleted + totalPending + totalOverdue;
  const efficiency = totalTasks > 0 ? ((totalCompleted / totalTasks) * 100).toFixed(1) : 0;

  return (
    <Box sx={{ pb: 6 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
            Administrative Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Operational efficiency and official performance trends across the district
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          onClick={handleExport}
          sx={{ 
            borderRadius: 3, 
            fontWeight: 'bold', 
            px: 3,
            background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.2)'
          }}
        >
          Export Datasheet
        </Button>
      </Box>

      {/* Stats Quick Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <ReportStat 
            title="Total Allocations" 
            value={totalTasks} 
            icon={<TrendingUpIcon />} 
            color="#1e3a8a" 
            subtitle="Cumulative record of tasks"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ReportStat 
            title="Success Rate" 
            value={`${efficiency}%`} 
            icon={<SpeedIcon />} 
            color="#10b981" 
            subtitle="Overall completion ratio"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ReportStat 
            title="Active Operations" 
            value={totalPending} 
            icon={<AssignmentTurnedInIcon />} 
            color="#f59e0b" 
            subtitle="Tasks currently in pipeline"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ReportStat 
            title="Critical Delays" 
            value={totalOverdue} 
            icon={<WarningAmberIcon />} 
            color="#ef4444" 
            subtitle="Exceeded deadline threshold"
          />
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
        <Typography variant="h6" fontWeight="800" sx={{ mb: 1 }}>Performance Dispersion</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>Status breakdown across active designated officials</Typography>
        
        <Box sx={{ width: '100%', height: 450 }}>
          <ResponsiveContainer>
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} name="Fulfilled" />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={24} name="In Queue" />
              <Bar dataKey="overdue" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={24} name="Delinquent" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskReports;

