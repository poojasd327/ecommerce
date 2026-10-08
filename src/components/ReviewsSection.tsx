'use client';

import React from 'react';
import { Container, Box, Typography, Grid, Card, Rating, Avatar, Chip } from '@mui/material';
import { Verified } from '@mui/icons-material';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Victoria S.',
      location: 'London, UK',
      rating: 5,
      title: 'Unbelievable 22 Momme Silk Quality',
      review:
        'The Seraphine Royal Gown is breathtaking. The silk is so heavy and soft, it literally glides on skin. I woke up with hydrated skin and zero pillow creases!',
      product: 'Seraphine Royal Mulberry Silk Gown',
      avatar: 'VS',
    },
    {
      id: 2,
      name: 'Camilla M.',
      location: 'Paris, France',
      rating: 5,
      title: 'Stunning Bridal Morning Dress',
      review:
        'Bought the Pearl Backless gown for my wedding morning photos. The lace detail on the V-back is sheer artistry. My photographer couldn’t stop complimenting it!',
      product: 'Séraphine Pearl Backless Gown',
      avatar: 'CM',
    },
    {
      id: 3,
      name: 'Genevieve R.',
      location: 'New York, USA',
      rating: 5,
      title: 'The Gift Packaging is Pure Magic',
      review:
        'Received the custom gift box with the lavender candle and silk mask for my birthday. Opening the gold-embossed box filled with rose petals was an unforgettable moment.',
      product: 'Nocturne Champagne Set + Gift Box',
      avatar: 'GR',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#0B0D17', borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="VERIFIED CLIENT TESTIMONIALS"
            sx={{ backgroundColor: 'rgba(230, 197, 148, 0.15)', color: '#E6C594', fontWeight: 700, mb: 1.5 }}
          />
          <Typography
            variant="h2"
            sx={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', color: '#FFF', fontWeight: 700, mb: 2 }}
          >
            Loved by 15,000+ Women Worldwide
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Typography variant="h3" sx={{ color: '#E6C594', fontWeight: 800 }}>
              4.9
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              <Rating value={5} readOnly size="small" sx={{ color: '#E6C594' }} />
              <Typography variant="caption" sx={{ color: '#A5AAB8', display: 'block' }}>
                Based on 1,420+ 5-Star Reviews
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {reviews.map((rev) => (
            <Grid key={rev.id} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(20, 23, 36, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(230, 197, 148, 0.2)',
                  p: 3,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Rating value={rev.rating} readOnly size="small" sx={{ color: '#E6C594' }} />
                  <Chip
                    icon={<Verified sx={{ fontSize: '14px !important', color: '#4CAF50 !important' }} />}
                    label="Verified Buyer"
                    size="small"
                    sx={{ backgroundColor: 'rgba(76, 175, 80, 0.12)', color: '#4CAF50', fontWeight: 600, fontSize: '0.7rem' }}
                  />
                </Box>

                <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', color: '#FFF', fontWeight: 600, mb: 1 }}>
                  "{rev.title}"
                </Typography>

                <Typography variant="body2" sx={{ color: '#A5AAB8', lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                  {rev.review}
                </Typography>

                <Box sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#E6C594', color: '#0B0D17', fontWeight: 700 }}>
                    {rev.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 600 }}>
                      {rev.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#E6C594' }}>
                      {rev.product} • {rev.location}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
