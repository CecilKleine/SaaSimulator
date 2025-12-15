'use client';

import React from 'react';
import { Paper, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';
import { FeatureTimeline } from './FeatureTimeline';
import { formatPercentage } from '@/utils/formatting';

export function ProductPanel() {
  const { gameState } = useGameState();
  const { product } = gameState;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Product Development
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Left Column - Stats and Metrics */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {Math.round(product.overallProgress)}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={product.overallProgress} sx={{ height: 24, borderRadius: 1 }} />
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Milestone
              </Typography>
              <Chip 
                label={product.currentMilestone.toUpperCase()} 
                color="secondary"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Product Maturity
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {formatPercentage(product.maturity)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Product Quality
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {formatPercentage(product.quality)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Product-Market Fit
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {formatPercentage(product.productMarketFit)}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Right Column - Feature Timeline */}
        <Box>
          <FeatureTimeline />
        </Box>
      </Box>
    </Paper>
  );
}
