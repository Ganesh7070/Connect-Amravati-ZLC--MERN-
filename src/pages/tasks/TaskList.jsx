import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress, 
  IconButton, 
  Stack, 
  Tooltip,
  useTheme,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getTasks } from '../../services/taskService';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StatusBadge from '../../components/common/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
    { 
      field: 'title', 
      headerName: 'Detailed Task Title', 
      flex: 1.5, 
      minWidth: 250,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="600" color="text.primary">
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'assignedToName', 
      headerName: 'Designated Officer', 
      flex: 1, 
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      )
    },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 120,
      renderCell: (params) => <StatusBadge status={params.row.priority} type="priority" />
    },
    { 
      field: 'status', 
      headerName: 'Current Status', 
      width: 140,
      renderCell: (params) => <StatusBadge status={params.row.status} />
    },
    { 
      field: 'dueDate', 
      headerName: 'Deadline', 
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" color={new Date(params.row.dueDate) < new Date() && params.row.status !== 'Completed' ? 'error.main' : 'text.secondary'} fontWeight="bold">
          {formatDate(params.row.dueDate)}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Tooltip title="View Detailed Progress">
          <IconButton 
            size="small" 
            sx={{ 
              bgcolor: 'rgba(30, 58, 138, 0.05)', 
              color: '#1e3a8a',
              '&:hover': { bgcolor: '#1e3a8a', color: 'white' }
            }} 
            onClick={() => navigate(`/tasks/${params.row.id}`)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // Quick Stats
  const taskStats = [
    { label: 'Active', count: tasks.filter(t => t.status === 'In Progress').length, color: '#0ea5e9', icon: <AutorenewIcon fontSize="small" /> },
    { label: 'Completed', count: tasks.filter(t => t.status === 'Completed').length, color: '#10b981', icon: <TaskAltIcon fontSize="small" /> },
    { label: 'Overdue', count: tasks.filter(t => t.status === 'Overdue').length, color: '#ef4444', icon: <ErrorOutlineIcon fontSize="small" /> },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 4, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom>Task Directory</Typography>
          <Typography variant="body2" color="text.secondary">Monitor and track district-wide administrative assignments</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={fetchTasks}
            sx={{ borderRadius: 3, fontWeight: 'bold' }}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/tasks/create')}
            sx={{ 
              borderRadius: 3, 
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            New Allocation
          </Button>
        </Stack>
      </Box>

      {/* Stats Summary Area */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {taskStats.map((stat, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Card variant="outlined" sx={{ borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ py: '16px !important', px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ bgcolor: `${stat.color}15`, color: stat.color, p: 1, borderRadius: 2, display: 'flex' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="subtitle2" fontWeight="700" color="text.secondary">{stat.label}</Typography>
                </Stack>
                <Typography variant="h5" fontWeight="800" color={stat.color}>{stat.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Table Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          width: '100%', 
          borderRadius: 5, 
          overflow: 'hidden', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <DataGrid
          rows={tasks}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              sx: { p: 2, borderBottom: '1px solid #f1f5f9' }
            }
          }}
          loading={loading}
          disableRowSelectionOnClick
          autoHeight
          sx={{ 
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#f8fafc',
              color: '#475569',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.5px'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f1f5f9'
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: '#f8fafc'
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default TaskList;

