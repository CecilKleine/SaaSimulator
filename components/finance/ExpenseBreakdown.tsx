'use client';

import React from 'react';
import { Box, Typography, List, ListItem, Divider, Paper } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';
import { formatCurrency } from '@/utils/formatting';

export function ExpenseBreakdown() {
  const { gameState } = useGameState();
  const { employees } = gameState.team;
  
  const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const officeCost = Math.max(2000, employees.length * 500);
  
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Monthly Expense Breakdown
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Salaries:</Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(totalSalaries)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Office & Overhead:</Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(officeCost)}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" fontWeight="bold">Total Monthly Expenses:</Typography>
          <Typography variant="body1" fontWeight="bold">
            {formatCurrency(gameState.monthlyExpenses)}
          </Typography>
        </Box>
      </Box>
      
      {employees.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" gutterBottom>
            Salary Breakdown by Employee
          </Typography>
          <List dense>
            {employees.map((emp) => (
              <ListItem key={emp.id} sx={{ py: 0.5, px: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2">
                    {emp.name} ({emp.role})
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(emp.salary)}/mo
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
}