'use client';

import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Rating,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Visibility,
  ShoppingBagOutlined,
  FlashOn,
} from '@mui/icons-material';
import { Product, ColorOption } from '@/types/ecommerce';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const isWishlisted = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = selectedColor.image || product.image;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default quick add size M or S
    const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
    addToCart(product, selectedColor, defaultSize, 1);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          backgroundColor: 'rgba(20, 23, 36, 0.85)',
        }}
        onClick={() => onQuickView(product)}
      >
        {/* Top Badges */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.8,
            alignItems: 'flex-start',
          }}
        >
          {product.isBestSeller && (
            <Chip
              label="BEST SELLER"
              size="small"
              sx={{
                backgroundColor: 'rgba(230, 197, 148, 0.95)',
                color: '#0B0D17',
                fontWeight: 800,
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
              }}
            />
          )}
          {product.isNewArrival && (
            <Chip
              label="NEW"
              size="small"
              sx={{
                backgroundColor: 'rgba(243, 208, 215, 0.95)',
                color: '#0B0D17',
                fontWeight: 800,
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
              }}
            />
          )}
          {product.stockCount <= 5 && (
            <Chip
              icon={<FlashOn sx={{ fontSize: '12px !important', color: '#FFF !important' }} />}
              label={`Only ${product.stockCount} left`}
              size="small"
              sx={{
                backgroundColor: 'rgba(211, 47, 47, 0.85)',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '0.65rem',
              }}
            />
          )}
        </Box>

        {/* Wishlist Icon Button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 3,
            backgroundColor: 'rgba(11, 13, 23, 0.65)',
            backdropFilter: 'blur(8px)',
            color: isWishlisted ? '#E6C594' : '#FFF',
            '&:hover': {
              backgroundColor: 'rgba(11, 13, 23, 0.9)',
              color: '#E6C594',
            },
          }}
        >
          {isWishlisted ? <Favorite /> : <FavoriteBorder />}
        </IconButton>

        {/* Media Container */}
        <Box sx={{ position: 'relative', pt: '130%', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={displayImage}
            alt={product.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />

          {/* Quick View Hover Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              right: 12,
              zIndex: 2,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.3s ease',
              display: 'flex',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              size="small"
              startIcon={<Visibility />}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              sx={{
                backgroundColor: 'rgba(11, 13, 23, 0.9)',
                color: '#FFF',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(230, 197, 148, 0.4)',
                fontSize: '0.8rem',
                '&:hover': {
                  backgroundColor: '#E6C594',
                  color: '#0B0D17',
                },
              }}
            >
              Quick View
            </Button>
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          {/* Category & Fabric */}
          <Typography
            variant="caption"
            sx={{
              color: '#E6C594',
              letterSpacing: '0.08em',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              mb: 0.5,
            }}
          >
            {product.category} • {product.fabric.split(' ')[0]} {product.fabric.split(' ')[1]}
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#FFF',
              mb: 0.8,
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: '#E6C594', fontSize: 16 }} />
            <Typography variant="caption" sx={{ color: '#A5AAB8', fontSize: '0.75rem' }}>
              ({product.reviewsCount})
            </Typography>
          </Box>

          {/* Color Swatches */}
          <Box sx={{ display: 'flex', gap: 0.8, mb: 2 }}>
            {product.colors.map((color) => (
              <Tooltip key={color.name} title={color.name} arrow>
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    cursor: 'pointer',
                    border: selectedColor.name === color.name ? '2px solid #E6C594' : '1px solid rgba(255,255,255,0.3)',
                    boxShadow: selectedColor.name === color.name ? '0 0 8px rgba(230, 197, 148, 0.6)' : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>

          {/* Price & Add to Bag */}
          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" sx={{ color: '#E6C594', fontWeight: 700, fontSize: '1.15rem' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="caption"
                  sx={{ color: '#A5AAB8', textDecoration: 'line-through', ml: 0.8 }}
                >
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </Typography>
              )}
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={handleQuickAdd}
              startIcon={<ShoppingBagOutlined sx={{ fontSize: 16 }} />}
              sx={{
                borderColor: 'rgba(230, 197, 148, 0.4)',
                color: '#E6C594',
                borderRadius: 20,
                fontSize: '0.75rem',
                py: 0.5,
                px: 1.5,
                '&:hover': {
                  backgroundColor: '#E6C594',
                  color: '#0B0D17',
                  borderColor: '#E6C594',
                },
              }}
            >
              + Bag
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
