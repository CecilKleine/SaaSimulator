'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Button,
  Paper,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { GameEvent } from '@/types/events';
import { useGameState } from '../game/GameStateProvider';

interface EventModalProps {
  event: GameEvent;
  onClose: () => void;
}

const eventTypeColors: Record<string, 'warning' | 'primary' | 'secondary' | 'success' | 'error'> = {
  market: 'warning',
  team: 'primary',
  product: 'secondary',
  financial: 'success',
  investor: 'error',
};

export function EventModal({ event, onClose }: EventModalProps) {
  const { respondToEvent } = useGameState();

  const handleOptionClick = (optionId: string) => {
    respondToEvent(event.id, optionId);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">{event.title}</Typography>
          <Chip 
            label={event.type.toUpperCase()} 
            color={eventTypeColors[event.type] || 'default'}
            size="small"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3, fontSize: '1rem' }}>
          {event.description}
        </DialogContentText>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {event.options.map((option) => (
            <Paper key={option.id} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {option.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {option.description}
              </Typography>
              
              {option.effects.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Effects:
                  </Typography>
                  <List dense>
                    {option.effects.map((effect, idx) => (
                      <ListItem key={idx} sx={{ py: 0 }}>
                        <ListItemText primary={effect.description} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              
              {option.consequences && (
                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, color: 'text.secondary' }}>
                  {option.consequences}
                </Typography>
              )}
              
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleOptionClick(option.id)}
              >
                Choose This
              </Button>
            </Paper>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}