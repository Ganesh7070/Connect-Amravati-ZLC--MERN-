import React from 'react';
import { Chip } from '@mui/material';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';

const StatusBadge = ({ status, type = 'status' }) => {
  const color = type === 'status' ? getStatusColor(status) : getPriorityColor(status);

  return (
    <Chip 
      label={status} 
      size="small" 
      color={color} 
      sx={{ 
        fontWeight: 'bold',
        px: 1,
        borderRadius: '16px',
        textTransform: 'uppercase',
        fontSize: '0.7rem'
      }} 
    />
  );
};

export default StatusBadge;
