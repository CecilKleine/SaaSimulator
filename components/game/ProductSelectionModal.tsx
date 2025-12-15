'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { PRODUCT_TEMPLATES, ProductTemplate } from '@/types/productTemplates';

interface ProductSelectionModalProps {
  open: boolean;
  onSelect: (productId: string) => void;
}

export function ProductSelectionModal({ open, onSelect }: ProductSelectionModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = () => {
    if (selectedId) {
      onSelect(selectedId);
      setSelectedId(null);
    }
  };

  const getComplexityLabel = (complexity: number): string => {
    if (complexity <= 2) return 'Simple';
    if (complexity <= 3) return 'Moderate';
    if (complexity <= 4) return 'Complex';
    return 'Very Complex';
  };

  const getComplexityColor = (complexity: number): 'success' | 'warning' | 'error' | 'info' => {
    if (complexity <= 2) return 'success'; // Green for simple
    if (complexity <= 3) return 'info'; // Blue for moderate
    if (complexity <= 4) return 'warning'; // Orange for complex
    return 'error'; // Red for very complex
  };

  const getRevenueLabel = (potential: number): string => {
    if (potential >= 1.5) return 'High';
    if (potential >= 1.3) return 'Medium-High';
    if (potential >= 1.1) return 'Medium';
    return 'Low-Medium';
  };

  return (
    <Dialog 
      open={open} 
      fullScreen
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" component="div">
          Choose Your Product
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Select the B2B SaaS product you want to build. Each product has unique features and characteristics.
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: (theme) => theme.palette.background.paper,
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.primary.main,
            borderRadius: '6px',
            border: '2px solid',
            borderColor: (theme) => theme.palette.background.paper,
            '&:hover': {
              background: (theme) => theme.palette.primary.dark,
            },
          },
          // Firefox scrollbar styling
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(96, 165, 250, 0.8) rgba(30, 41, 59, 0.4)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 1,
            maxWidth: { md: '1200px', lg: '1400px' },
            mx: 'auto',
          }}
        >
          {PRODUCT_TEMPLATES.map((template) => (
            <Box
              key={template.id}
              sx={{
                display: 'flex',
                minHeight: '300px',
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  border: selectedId === template.id ? 2 : 1,
                  borderColor: selectedId === template.id ? 'primary.main' : 'divider',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 4,
                  },
                }}
                onClick={() => setSelectedId(template.id)}
              >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {template.name}
                      </Typography>
                      <Chip label={template.category} size="small" sx={{ mb: 1 }} />
                    </Box>
                    {selectedId === template.id && (
                      <Chip label="Selected" color="primary" size="small" />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                    {template.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                    <Chip
                      label={`Complexity: ${getComplexityLabel(template.estimatedComplexity)}`}
                      color={getComplexityColor(template.estimatedComplexity)}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Revenue Potential: ${getRevenueLabel(template.revenuePotential)}`}
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`${template.features.length} Features`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSelect}
          disabled={!selectedId}
          fullWidth
        >
          Start Building {selectedId ? PRODUCT_TEMPLATES.find(t => t.id === selectedId)?.name : 'Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
