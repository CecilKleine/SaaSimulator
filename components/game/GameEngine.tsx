'use client';

import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useGameState } from './GameStateProvider';

export function GameEngine() {
  const { gameState, setPaused, setGameSpeed } = useGameState();

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button
        variant="contained"
        onClick={() => setPaused(!gameState.isPaused)}
      >
        {gameState.isPaused ? '▶️ Play' : '⏸️ Pause'}
      </Button>
      <ButtonGroup variant="outlined">
        <Button
          variant={gameState.gameSpeed === 1 ? 'contained' : 'outlined'}
          onClick={() => setGameSpeed(1)}
        >
          1x
        </Button>
        <Button
          variant={gameState.gameSpeed === 2 ? 'contained' : 'outlined'}
          onClick={() => setGameSpeed(2)}
        >
          2x
        </Button>
        <Button
          variant={gameState.gameSpeed === 4 ? 'contained' : 'outlined'}
          onClick={() => setGameSpeed(4)}
        >
          4x
        </Button>
      </ButtonGroup>
    </div>
  );
}
