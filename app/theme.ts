'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa', // Brighter blue for dark theme
    },
    secondary: {
      main: '#a78bfa', // Brighter purple for dark theme
    },
    success: {
      main: '#34d399', // Brighter green for dark theme
    },
    error: {
      main: '#f87171', // Softer red for dark theme
    },
    warning: {
      main: '#fbbf24', // Brighter amber for dark theme
    },
    background: {
      default: '#0f172a', // Dark slate background
      paper: '#1e293b', // Slightly lighter for paper/cards
    },
    text: {
      primary: '#f1f5f9', // Light gray for primary text
      secondary: '#cbd5e1', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default gradient
        },
      },
    },
  },
});

export default theme;
