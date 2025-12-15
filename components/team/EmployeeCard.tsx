'use client';

import React from 'react';
import { Paper, Typography, Box, Chip, Button, Divider } from '@mui/material';
import { Employee } from '@/types/employee';
import { formatCurrency, formatPercentage } from '@/utils/formatting';

interface EmployeeCardProps {
  employee: Employee;
  onFire: (id: string) => void;
}

const roleColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'default'> = {
  engineer: 'primary',
  designer: 'secondary',
  sales: 'success',
  marketing: 'warning',
  operations: 'default',
};

export function EmployeeCard({ employee, onFire }: EmployeeCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {employee.name}
        </Typography>
        <Chip 
          label={employee.role.toUpperCase()} 
          size="small"
          color={roleColors[employee.role] || 'default'}
        />
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">Salary:</Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(employee.salary)}/mo
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">Productivity:</Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatPercentage(employee.productivity)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Status:</Typography>
          <Chip
            label={employee.onboardingComplete ? 'Productive' : 'Onboarding...'}
            size="small"
            color={employee.onboardingComplete ? 'success' : 'warning'}
            variant="outlined"
          />
        </Box>
      </Box>
      
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={() => onFire(employee.id)}
      >
        Fire Employee
      </Button>
    </Paper>
  );
}