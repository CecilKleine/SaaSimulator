'use client';

import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ConfirmModal } from '../ui/ConfirmModal';

interface GameMenuProps {
  onNewGame: () => void;
}

export function GameMenu({ onNewGame }: GameMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewGameClick = () => {
    handleClose();
    setShowConfirm(true);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ minWidth: 'auto', px: 2 }}
      >
        ☰ Menu
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleNewGameClick}>Start New Game</MenuItem>
      </Menu>

      <ConfirmModal
        isOpen={showConfirm}
        title="Start New Game"
        message="Are you sure you want to start a new game? All progress will be lost."
        onConfirm={() => {
          setShowConfirm(false);
          onNewGame();
        }}
        onCancel={() => setShowConfirm(false)}
        confirmText="Start New Game"
        cancelText="Cancel"
      />
    </>
  );
}
