import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress, 
  IconButton, 
  Stack,
  Chip,
  Avatar,
  Tooltip,
  Divider,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getUsers, deleteUser } from '../../services/userService';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this official? This action will be logged.')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const columns = [
    { 
      field: 'id', 
      headerName: 'EMP ID', 
      width: 90,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'name', 
      headerName: 'Official Name & Rank', 
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#1e3a8a', fontSize: '0.875rem' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="700" color="text.primary">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{params.row.username}
            </Typography>
          </Box>
        </Stack>
      )
    },
    { 
      field: 'role', 
      headerName: 'Designation', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          sx={{ 
            fontWeight: 'bold', 
            bgcolor: params.value === 'SYSTEM_ADMIN' ? '#f1f5f9' : '#eff6ff',
            color: params.value === 'SYSTEM_ADMIN' ? '#334155' : '#1e40af',
            border: '1px solid',
            borderColor: params.value === 'SYSTEM_ADMIN' ? '#e2e8f0' : '#dbeafe'
          }} 
        />
      )
    },
    { 
      field: 'jurisdiction', 
      headerName: 'Jurisdiction', 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const parts = [];
        if (params.row.district) parts.push(params.row.district);
        if (params.row.taluka) parts.push(params.row.taluka);
        const text = parts.join(' / ') || 'District Level';
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <MapIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography variant="body2" color="text.secondary">{text}</Typography>
          </Stack>
        );
      }
    },
    { 
      field: 'status', 
      headerName: 'System Status', 
      width: 130,
      renderCell: (params) => (
        <Chip 
          label={params.value || 'Active'} 
          variant="outlined"
          size="small"
          color="success"
          sx={{ borderRadius: 1.5, fontWeight: 'bold' }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Management',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Profile">
            <IconButton 
              size="small" 
              sx={{ color: '#1e3a8a', bgcolor: 'rgba(30,58,138,0.05)' }} 
              onClick={() => navigate(`/users/edit/${params.row.id}`)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deactivate User">
            <IconButton 
              size="small" 
              sx={{ color: '#ef4444', bgcolor: 'rgba(239,68,68,0.05)' }} 
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // User Stats
  const userStats = [
    { label: 'Total Personnel', count: users.length, icon: <SupervisedUserCircleIcon />, color: '#1e3a8a' },
    { label: 'Administrative', count: users.filter(u => u.role === 'SYSTEM_ADMIN').length, icon: <AdminPanelSettingsIcon />, color: '#64748b' },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 4, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>Member Registry</Typography>
          <Typography variant="body2" color="text.secondary">Manage district administration hierarchy and access controls</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => navigate('/users/add')}
          sx={{ 
            borderRadius: 3, 
            fontWeight: 'bold', 
            py: 1.2, 
            px: 3,
            background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.2)' 
          }}
        >
          Add Official
        </Button>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {userStats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card variant="outlined" sx={{ borderRadius: 4, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ py: '20px !important' }}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar sx={{ bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 3 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="800">{stat.count}</Typography>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
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
          rows={users}
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

export default UserList;

