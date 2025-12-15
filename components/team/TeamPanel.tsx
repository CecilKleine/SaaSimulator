'use client';

import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';
import { EmployeeCard } from './EmployeeCard';
import { HiringPanel } from './HiringPanel';
import { formatCurrency, formatPercentage } from '@/utils/formatting';

export function TeamPanel() {
  const { gameState, fireEmployee } = useGameState();
  const { employees, totalMonthlySalary, totalProductivity } = gameState.team;
  const [showHiring, setShowHiring] = useState(false);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Team Management
        </Typography>
        <Button
          variant={showHiring ? 'contained' : 'outlined'}
          onClick={() => setShowHiring(!showHiring)}
        >
          {showHiring ? 'Hide Hiring' : 'Show Hiring'}
        </Button>
      </Box>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Team Size</Typography>
          <Typography variant="h6">{employees.length}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">Total Monthly Salary</Typography>
          <Typography variant="h6">{formatCurrency(totalMonthlySalary)}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">Total Productivity</Typography>
          <Typography variant="h6">{formatPercentage(totalProductivity / 10)}</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {showHiring && <HiringPanel />}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Team ({employees.length})
        </Typography>
        {employees.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No employees yet. Hire your first team member!
          </Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {employees.map((employee) => (
              <Box key={employee.id}>
                <EmployeeCard
                  employee={employee}
                  onFire={fireEmployee}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}