'use client';

import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { formatPercentage } from '@/utils/formatting';

interface InvestorRelationsProps {
  investorInterest: number;
  totalEquity: number;
  totalRaised: number;
}

export function InvestorRelations({ investorInterest, totalEquity, totalRaised }: InvestorRelationsProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Investor Relations
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Investor Interest</Typography>
          <Typography variant="h6">{formatPercentage(investorInterest)}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">Your Equity</Typography>
          <Typography variant="h6">{formatPercentage(totalEquity / 100)}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">Total Raised</Typography>
          <Typography variant="h6">
            {totalRaised > 0 ? `$${(totalRaised / 1000).toFixed(0)}k` : '$0'}
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Investor Interest Level
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={investorInterest * 100} 
          sx={{ height: 24, borderRadius: 1 }}
        />
      </Box>
    </Box>
  );
}