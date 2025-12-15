'use client';

import React from 'react';
import { Box, Typography, Paper, LinearProgress, Chip, Button, ButtonGroup } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';

export function FeatureList() {
  const { gameState, prioritizeFeature } = useGameState();
  const { features } = gameState.product;

  const sortedFeatures = [...features].sort((a, b) => a.priority - b.priority);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Product Features
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sortedFeatures.map((feature) => (
          <Paper key={feature.id} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {feature.name}
              </Typography>
              <Chip label={`Priority: ${feature.priority}`} size="small" color="primary" variant="outlined" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {feature.description}
            </Typography>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={feature.progress} 
                sx={{ height: 24, borderRadius: 1 }}
              />
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontWeight: 'bold',
                  color: 'text.primary',
                }}
              >
                {Math.round(feature.progress)}%
              </Typography>
            </Box>
            <ButtonGroup size="small" variant="outlined">
              <Button
                onClick={() => prioritizeFeature(feature.id, Math.max(1, feature.priority - 1))}
                disabled={feature.priority === 1}
              >
                ↑ Increase Priority
              </Button>
              <Button
                onClick={() => prioritizeFeature(feature.id, feature.priority + 1)}
              >
                ↓ Decrease Priority
              </Button>
            </ButtonGroup>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
