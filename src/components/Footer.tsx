'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import {
  Instagram,
  Pinterest,
  Facebook,
  Send,
} from '@mui/icons-material';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#07080F',
        color: '#FFF',
        pt: { xs: 8, md: 12 },
        pb: 6,
        borderTop: '1px solid rgba(230, 197, 148, 0.2)',
      }}
    >
      <Container maxWidth="xl">
        {/* Newsletter Section */}
        <Box
          sx={{
            backgroundColor: 'rgba(20, 23, 36, 0.9)',
            border: '1px solid rgba(230, 197, 148, 0.25)',
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            mb: 8,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230, 197, 148, 0.15) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <Typography variant="overline" sx={{ color: '#E6C594', letterSpacing: '0.2em', fontWeight: 700 }}>
            THE NUIT PRIVÉ CLUB
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 700,
              color: '#FFF',
              mt: 0.5,
              mb: 1.5,
              fontSize: { xs: '1.8rem', md: '2.6rem' },
            }}
          >
            Enjoy 15% OFF Your First Haute Silk Order
          </Typography>
          <Typography variant="body2" sx={{ color: '#A5AAB8', maxWidth: 520, mx: 'auto', mb: 4 }}>
            Subscribe to receive private collection previews, secret luxury gift sales, and expert Mulberry silk care advice.
          </Typography>

          {!subscribed ? (
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: 1.5,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              <TextField
                placeholder="Enter your email address..."
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: 'rgba(11, 13, 23, 0.9)',
                      color: '#FFF',
                      borderRadius: 30,
                      px: 1,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Send />}
                sx={{ px: 4, py: 1.2, whiteSpace: 'nowrap' }}
              >
                Join Privé
              </Button>
            </Box>
          ) : (
            <Alert severity="success" sx={{ maxWidth: 450, mx: 'auto', backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#FFF' }}>
              Welcome to the Nuit Privé Club! Check your inbox for your 15% OFF code <strong>LUMINA15</strong>.
            </Alert>
          )}
        </Box>

        {/* Footer Navigation Columns */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#E6C594',
                mb: 1,
              }}
            >
              LUMINA NUIT
            </Typography>
            <Typography variant="body2" sx={{ color: '#A5AAB8', lineHeight: 1.8, mb: 3, pr: { md: 4 } }}>
              Haute couture nightdresses, silk slips, and luxury sleepwear hand-crafted from 22 Momme Grade 6A Mulberry silk.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#E6C594', border: '1px solid rgba(230, 197, 148, 0.3)' }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: '#E6C594', border: '1px solid rgba(230, 197, 148, 0.3)' }}>
                <Pinterest />
              </IconButton>
              <IconButton sx={{ color: '#E6C594', border: '1px solid rgba(230, 197, 148, 0.3)' }}>
                <Facebook />
              </IconButton>
            </Stack>
          </Grid>

          {/* Collections */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
              COLLECTIONS
            </Typography>
            <Stack spacing={1.2}>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Mulberry Silk Slips
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Ethereal Kimono Robes
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                French Chantilly Lace
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Micro-Velvet Lounge
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Bridal Sleepwear
              </Typography>
            </Stack>
          </Grid>

          {/* Atelier Services */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
              SERVICES
            </Typography>
            <Stack spacing={1.2}>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Custom Gift Atelier
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Dreamscape Fit Quiz
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Smart Size Advisor
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Silk Care Masterclass
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Bridal Monogramming
              </Typography>
            </Stack>
          </Grid>

          {/* Customer Care */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
              CUSTOMER CARE
            </Typography>
            <Stack spacing={1.2}>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Worldwide Express Shipping
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                30-Day Easy Returns
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Track Order
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', cursor: 'pointer', '&:hover': { color: '#E6C594' } }}>
                Contact Concierge
              </Typography>
            </Stack>
          </Grid>

          {/* Eco Guarantee */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
              SUSTAINABILITY
            </Typography>
            <Stack spacing={1.2}>
              <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                100% Organic Mulberry
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                OEKO-TEX® Certified Dyes
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                Zero Plastic Packaging
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                Ethical Atelier Craft
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(230, 197, 148, 0.15)', mb: 4 }} />

        {/* Bottom copyright */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
            © 2026 LUMINA NUIT Haute Couture Nightwear. All rights reserved. Built with Next.js & MUI.
          </Typography>
          <Typography variant="caption" sx={{ color: '#E6C594', letterSpacing: '0.05em' }}>
            ✨ Crafted for Ethereal Dreams & Pure Silk Comfort ✨
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
