import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E6C594', // Champagne Gold
      light: '#F5E6CC',
      dark: '#C89C5D',
      contrastText: '#0B0D17',
    },
    secondary: {
      main: '#F3D0D7', // Silk Rose
      light: '#FAECEF',
      dark: '#D89BA6',
      contrastText: '#0B0D17',
    },
    background: {
      default: '#0B0D17', // Midnight Obsidian
      paper: '#141724', // Deep Velvet Navy
    },
    text: {
      primary: '#F8F9FA',
      secondary: '#A5AAB8',
    },
    divider: 'rgba(230, 197, 148, 0.15)',
    action: {
      hover: 'rgba(230, 197, 148, 0.08)',
      selected: 'rgba(230, 197, 148, 0.16)',
    },
  },
  typography: {
    fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    subtitle1: {
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      fontSize: '0.85rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.03em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0B0D17',
          color: '#F8F9FA',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(230, 197, 148, 0.3) #0B0D17',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(230, 197, 148, 0.3)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#E6C594',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #E6C594 0%, #C89C5D 100%)',
          color: '#0B0D17',
          boxShadow: '0 4px 20px rgba(230, 197, 148, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #F5E6CC 0%, #E6C594 100%)',
            boxShadow: '0 6px 25px rgba(230, 197, 148, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: '#E6C594',
          color: '#E6C594',
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(230, 197, 148, 0.08)',
            borderColor: '#F5E6CC',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(20, 23, 36, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(230, 197, 148, 0.12)',
          borderRadius: 20,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'rgba(230, 197, 148, 0.35)',
            boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(230, 197, 148, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141724',
          backgroundImage: 'none',
          border: '1px solid rgba(230, 197, 148, 0.2)',
          borderRadius: 24,
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme);
