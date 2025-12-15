'use client';

import React from 'react';
import { Paper, Typography, Box, Chip, List, ListItem } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';

export function EventHistory() {
  const { gameState } = useGameState();
  const { eventHistory } = gameState.events;

  if (eventHistory.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Event History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No events yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Event History ({eventHistory.length})
      </Typography>
      <List>
        {eventHistory.slice(-10).reverse().map((event) => (
          <ListItem key={event.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {event.title}
              </Typography>
              <Chip 
                label={event.type} 
                size="small" 
                variant="outlined"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}