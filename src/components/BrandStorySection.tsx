'use client';

import React from 'react';
import { Container, Box, Typography, Grid, Card } from '@mui/material';
import { Spa, Diamond, Park, Recycling } from '@mui/icons-material';

export const BrandStorySection: React.FC = () => {
  const pillars = [
    {
      icon: <Diamond sx={{ fontSize: 36, color: '#E6C594' }} />,
      title: '22 Momme Grade 6A Silk',
      desc: 'We strictly source 100% organic Mulberry silk harvested at peak density. Hypoallergenic, friction-free, and clinically proven to lock in skin moisture.',
    },
    {
      icon: <Spa sx={{ fontSize: 36, color: '#F3D0D7' }} />,
      title: 'French Calais Lace Ateliers',
      desc: 'Our lace chemises feature authentic French Calais Chantilly lace, hand-trimmed by master seamstresses with century-old scalloped embroidery technique.',
    },
    {
      icon: <Park sx={{ fontSize: 36, color: '#E6C594' }} />,
      title: 'Zero Synthetic Fibers',
      desc: 'No polyester blends, no toxic dyes. Every Lumina Nuit nightdress is dyed using OEKO-TEX® certified botanical pigments gentle on sensitive skin.',
    },
    {
      icon: <Recycling sx={{ fontSize: 36, color: '#F3D0D7' }} />,
      title: 'Eco Luxury Packaging',
      desc: 'Delivered in recyclable matte navy boxes with soy ink stamping and FSC-certified tissue paper.',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#141724', borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant="overline"
              sx={{ color: '#E6C594', letterSpacing: '0.2em', fontWeight: 700 }}
            >
              CRAFTSMANSHIP & PHILOSOPHY
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                color: '#FFF',
                fontWeight: 700,
                mt: 1,
                mb: 3,
                fontSize: { xs: '2.2rem', md: '3rem' },
              }}
            >
              The Science & Elegance of Mulberry Silk Nightwear
            </Typography>
            <Typography variant="body1" sx={{ color: '#A5AAB8', lineHeight: 1.8, mb: 3 }}>
              Sleep is the ultimate luxury ritual. Standard cotton and polyester nightwear absorb natural skin oils and create facial sleep creases. Lumina Nuit nightdresses are designed with liquid-smooth 22 Momme Grade 6A Mulberry silk to nourish skin cells while you dream.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={3}>
              {pillars.map((pillar, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      backgroundColor: 'rgba(11, 13, 23, 0.7)',
                      borderColor: 'rgba(230, 197, 148, 0.2)',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{pillar.icon}</Box>
                    <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', color: '#FFF', mb: 1 }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A5AAB8', lineHeight: 1.6 }}>
                      {pillar.desc}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
