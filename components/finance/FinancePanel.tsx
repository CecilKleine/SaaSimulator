'use client';

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';
import { formatCurrency } from '@/utils/formatting';
import { ExpenseBreakdown } from './ExpenseBreakdown';

export function FinancePanel() {
  const { gameState } = useGameState();

  const StatCard = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography 
        variant="h5" 
        sx={{ color: color || 'text.primary', fontWeight: 'bold' }}
      >
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Financial Overview
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        <StatCard label="Cash Balance" value={formatCurrency(gameState.money)} color="success.main" />
        <StatCard label="Monthly Revenue" value={formatCurrency(gameState.monthlyRevenue)} color="success.main" />
        <StatCard label="Monthly Expenses" value={formatCurrency(gameState.monthlyExpenses)} color="error.main" />
        <StatCard label="Burn Rate" value={formatCurrency(gameState.burnRate)} />
      </Box>
      
      <ExpenseBreakdown />
    </Paper>
  );
}