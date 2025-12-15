'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';
import { formatCurrency, formatRunway, formatDate } from '@/utils/formatting';

export function StatsPanel() {
  const { gameState } = useGameState();
  
  const runwayColor = gameState.runway > 6 ? 'success.main' : gameState.runway > 3 ? 'warning.main' : 'error.main';

  const StatCard = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ color: color || 'text.primary', fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
      <StatCard label="Date" value={formatDate(gameState.startDate, gameState.currentTime)} />
      <StatCard label="Cash" value={formatCurrency(gameState.money)} color="success.main" />
      <StatCard label="Runway" value={formatRunway(gameState.runway)} color={runwayColor} />
      <StatCard label="Monthly Expenses" value={formatCurrency(gameState.monthlyExpenses)} />
      <StatCard label="Monthly Revenue" value={formatCurrency(gameState.monthlyRevenue)} color="success.main" />
      <StatCard label="Burn Rate" value={formatCurrency(gameState.burnRate)} />
    </Box>
  );
}