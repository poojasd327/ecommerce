'use client';

import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack, Chip } from '@mui/material';
import { AutoAwesome, CardGiftcard, Shield, LocalShipping, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenQuiz: () => void;
  onOpenGiftBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenQuiz,
  onOpenGiftBuilder,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '85vh', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0B0D17 0%, #141724 50%, #0B0D17 100%)',
      }}
    >
      {/* Background Image with Ambient Dark Vignette */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '100%', md: '55%' },
          height: '100%',
          backgroundImage: 'url(/images/hero_nightdress.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.65,
          maskImage: {
            xs: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            md: 'linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          },
          WebkitMaskImage: {
            xs: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            md: 'linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          },
          zIndex: 1,
        }}
      />

      {/* Radial Gold Ambient Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 197, 148, 0.12) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  icon={<Star sx={{ color: '#E6C594 !important', fontSize: 16 }} />}
                  label="HAUTE COUTURE SLEEPWEAR 2026"
                  sx={{
                    backgroundColor: 'rgba(230, 197, 148, 0.12)',
                    color: '#E6C594',
                    border: '1px solid rgba(230, 197, 148, 0.3)',
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    py: 1.8,
                    px: 1,
                  }}
                />
              </Box>

              {/* Headline */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.2rem' },
                  lineHeight: 1.1,
                  mb: 2.5,
                  fontWeight: 700,
                }}
              >
                Ethereal Silk &{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #FFF 0%, #E6C594 50%, #F3D0D7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontStyle: 'italic',
                  }}
                >
                  Couture Nightdresses
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body1"
                sx={{
                  color: '#A5AAB8',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: 540,
                }}
              >
                Hand-crafted from 22 Momme pure Grade 6A Mulberry Silk and French Chantilly lace. 
                Experience midnight comfort engineered to hydrate your skin and elevate your nightly ritual.
              </Typography>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onExploreClick}
                  sx={{
                    py: 1.8,
                    px: 4,
                    fontSize: '1rem',
                  }}
                >
                  Explore Collection
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={onOpenQuiz}
                  startIcon={<AutoAwesome />}
                  sx={{
                    py: 1.8,
                    px: 3.5,
                    fontSize: '0.95rem',
                  }}
                >
                  Dreamscape Fit Quiz
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={onOpenGiftBuilder}
                  startIcon={<CardGiftcard />}
                  sx={{
                    py: 1.8,
                    px: 3,
                    fontSize: '0.95rem',
                    borderColor: 'rgba(243, 208, 215, 0.4)',
                    color: '#F3D0D7',
                    '&:hover': {
                      borderColor: '#F3D0D7',
                      backgroundColor: 'rgba(243, 208, 215, 0.1)',
                    },
                  }}
                >
                  Gift Builder
                </Button>
              </Stack>

              {/* Value Propositions */}
              <Grid container spacing={3} sx={{ pt: 2, borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Shield sx={{ color: '#E6C594', fontSize: 24 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 600 }}>
                        22 Momme Silk
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                        100% Grade 6A Organic
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocalShipping sx={{ color: '#E6C594', fontSize: 24 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 600 }}>
                        Express Shipping
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                        Free on orders over ₹1,999
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AutoAwesome sx={{ color: '#F3D0D7', fontSize: 24 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 600 }}>
                        Luxury Packaging
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                        Signature gold foil box
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
