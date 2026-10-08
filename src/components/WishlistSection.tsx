'use client';

import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/ecommerce';

interface WishlistSectionProps {
  onQuickView: (product: Product) => void;
}

export const WishlistSection: React.FC<WishlistSectionProps> = ({ onQuickView }) => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) return null;

  return (
    <Box id="wishlist-section" sx={{ py: 8, backgroundColor: '#141724', borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Favorite sx={{ color: '#E6C594', fontSize: 28 }} />
          <Box>
            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', color: '#FFF' }}>
              Your Saved Favorites ({wishlist.length})
            </Typography>
            <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
              Quick access to your curated wishlist pieces
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {wishlist.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductCard product={product} onQuickView={onQuickView} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
