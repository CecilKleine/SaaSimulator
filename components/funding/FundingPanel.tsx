'use client';

import React, { useState } from 'react';
import { Paper, Typography, Box, Button, ButtonGroup, Chip, Divider, List, ListItem } from '@mui/material';
import { useGameState } from '../game/GameStateProvider';
import { InvestorRelations } from './InvestorRelations';
import { formatCurrency, formatPercentage } from '@/utils/formatting';
import { FundingOffer } from '@/types/funding';
import { AlertModal } from '../ui/AlertModal';

export function FundingPanel() {
  const { gameState, startFundraising, acceptFundingOffer } = useGameState();
  const { funding } = gameState;
  const { activeRound, totalEquity, totalRaised } = funding;
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

  const investorInterest = activeRound?.investorInterest || 0;

  const handleStartFundraising = (roundType: 'seed' | 'seriesA') => {
    if (activeRound) {
      setAlert({
        title: 'Active Round',
        message: 'You already have an active funding round!',
      });
      return;
    }
    startFundraising(roundType);
  };

  const handleAcceptOffer = (offerId: string) => {
    if (acceptFundingOffer(offerId)) {
      setAlert({
        title: 'Funding Accepted',
        message: 'Funding accepted! Cash added to your balance.',
      });
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Funding & Investors
        </Typography>
        
        <InvestorRelations
          investorInterest={investorInterest}
          totalEquity={totalEquity}
          totalRaised={totalRaised}
        />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Start Fundraising
          </Typography>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => handleStartFundraising('seed')}
              disabled={!!activeRound}
            >
              Start Seed Round
            </Button>
            <Button
              onClick={() => handleStartFundraising('seriesA')}
              disabled={!!activeRound || totalRaised === 0}
            >
              Start Series A
            </Button>
          </ButtonGroup>
        </Box>
        
        {activeRound && (
          <Box sx={{ mb: 3 }}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Active Funding Round: {activeRound.roundType.toUpperCase()}
              </Typography>
              <Chip 
                label={activeRound.status} 
                color={activeRound.status === 'completed' ? 'success' : 'primary'}
                variant="outlined"
              />
            </Box>
            
            {activeRound.offers.length > 0 ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Funding Offers
                </Typography>
                {activeRound.offers.map((offer: FundingOffer) => (
                  <Paper key={offer.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        {formatCurrency(offer.amount)} Investment
                      </Typography>
                      <Chip
                        label={`${formatPercentage(offer.equityPercent / 100)} Equity`}
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Valuation:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(offer.valuation)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Equity:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatPercentage(offer.equityPercent / 100)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => handleAcceptOffer(offer.id)}
                    >
                      Accept Offer
                    </Button>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Waiting for investor offers... (Check back in a month)
              </Typography>
            )}
          </Box>
        )}
        
        {funding.rounds.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Funding History
            </Typography>
            <List dense>
              {funding.rounds.map((round) => (
                <ListItem key={round.id}>
                  <Typography variant="body2">
                    {round.roundType.toUpperCase()} - {round.status}
                    {round.status === 'completed' && ' - Funds received'}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>

      <AlertModal
        isOpen={!!alert}
        title={alert?.title || ''}
        message={alert?.message || ''}
        onClose={() => setAlert(null)}
      />
    </>
  );
}