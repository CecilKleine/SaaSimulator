'use client';

import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GameStateProvider } from '@/components/game/GameStateProvider';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ProductPanel } from '@/components/product/ProductPanel';
import { TeamPanel } from '@/components/team/TeamPanel';
import { FundingPanel } from '@/components/funding/FundingPanel';
import { FinancePanel } from '@/components/finance/FinancePanel';
import { EventModal } from '@/components/events/EventModal';
import { EventHistory } from '@/components/events/EventHistory';
import { useGameState } from '@/components/game/GameStateProvider';
import { ProductSelectionModal } from '@/components/game/ProductSelectionModal';
import { PanelGrid } from '@/components/game/PanelGrid';
import type { PanelType } from '@/components/game/PanelCard';

function GameOverDialog({ reason }: { reason?: string }) {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <Typography variant="h4" color="error">
          Game Over
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {reason || 'Your startup has failed.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.location.reload()} variant="contained" autoFocus>
          Start New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function GameContent() {
  const { gameState, setPaused, selectProduct } = useGameState();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [previousEventCount, setPreviousEventCount] = React.useState(0);
  const [activePanel, setActivePanel] = useState<PanelType | null>(null);
  
  // Check if product has been selected
  const productSelected = !!gameState.product.productTemplateId;
  
  const currentEvent = gameState.events.pendingEvents.find(e => e.id === selectedEvent || selectedEvent === null);
  
  React.useEffect(() => {
    // Auto-pause when a new event appears
    if (gameState.events.pendingEvents.length > previousEventCount) {
      setPaused(true);
      setPreviousEventCount(gameState.events.pendingEvents.length);
    }
    
    // Auto-show first pending event
    if (gameState.events.pendingEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(gameState.events.pendingEvents[0].id);
    }
  }, [gameState.events.pendingEvents, selectedEvent, previousEventCount, setPaused]);

  const handleNewGame = () => {
    window.location.reload();
  };

  const handleProductSelect = (productId: string) => {
    selectProduct(productId);
  };

  const handlePanelClick = (panelType: PanelType) => {
    setActivePanel(panelType);
  };

  const handleBackToOverview = () => {
    setActivePanel(null);
  };

  const renderPanelView = () => {
    switch (activePanel) {
      case 'finance':
        return <FinancePanel />;
      case 'product':
        return <ProductPanel />;
      case 'team':
        return <TeamPanel />;
      case 'funding':
        return <FundingPanel />;
      case 'events':
        return <EventHistory />;
      default:
        return null;
    }
  };

  // Show product selection modal if no product selected
  if (!productSelected) {
    return (
      <Box sx={{ minHeight: '100vh', p: 2, backgroundColor: 'background.default' }}>
        <ProductSelectionModal open={true} onSelect={handleProductSelect} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {currentEvent && (
        <EventModal
          event={currentEvent}
          onClose={() => {
            setSelectedEvent(null);
            // Remove the closed event from tracking
            setPreviousEventCount(gameState.events.pendingEvents.length - 1);
            // Auto-select next event if available
            const nextEvent = gameState.events.pendingEvents.find(e => e.id !== currentEvent.id);
            if (nextEvent) {
              setSelectedEvent(nextEvent.id);
            } else {
              // No more events, allow resuming (player can manually resume)
              // Keep paused so player can review before continuing
            }
          }}
        />
      )}
      
      <Dashboard onNewGame={handleNewGame} />
      
      <Box sx={{ flex: 1, p: 3 }}>
        {activePanel ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton onClick={handleBackToOverview} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" fontWeight="bold">
                {activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}
              </Typography>
            </Box>
            {renderPanelView()}
          </Box>
        ) : (
          <PanelGrid onPanelClick={handlePanelClick} />
        )}
      </Box>
      
      {gameState.gameOver && (
        <GameOverDialog reason={gameState.gameOverReason} />
      )}
    </Box>
  );
}

export default function GamePage() {
  return (
    <GameStateProvider initialConfig={{ startingMoney: 100000, difficulty: 'medium' }}>
      <GameContent />
    </GameStateProvider>
  );
}
