'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Close,
  Favorite,
  FavoriteBorder,
  ShoppingBagOutlined,
  ExpandMore,
  LocalShipping,
  VerifiedUser,
  AutoAwesome,
  Straighten,
  FlashOn,
} from '@mui/icons-material';
import { Product, ColorOption } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onOpenSizeAdvisor: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  open,
  onClose,
  onOpenSizeAdvisor,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setActiveImage(product.image);
      setQuantity(1);
    }
  }, [product]);

  if (!product || !selectedColor) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#141724',
            backgroundImage: 'none',
            border: '1px solid rgba(230, 197, 148, 0.25)',
            borderRadius: 4,
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: 'rgba(11, 13, 23, 0.7)',
            color: '#FFF',
            '&:hover': { backgroundColor: 'rgba(11, 13, 23, 0.95)' },
          }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Grid container spacing={4}>
            {/* Left Image Gallery */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  pt: '130%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  mb: 2,
                  border: '1px solid rgba(230, 197, 148, 0.2)',
                }}
              >
                <Box
                  component="img"
                  src={selectedColor.image || activeImage}
                  alt={product.name}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Thumbnails */}
              {product.detailImages && product.detailImages.length > 0 && (
                <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1 }}>
                  {product.detailImages.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      sx={{
                        width: 65,
                        height: 75,
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: activeImage === img ? '2px solid #E6C594' : '1px solid rgba(255,255,255,0.2)',
                        opacity: activeImage === img ? 1 : 0.6,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  ))}
                </Stack>
              )}
            </Grid>

            {/* Right Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Category & Momme Pill */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{ backgroundColor: 'rgba(230, 197, 148, 0.15)', color: '#E6C594', fontWeight: 700 }}
                  />
                  {product.fabricDensity && (
                    <Chip
                      icon={<AutoAwesome sx={{ fontSize: '14px !important', color: '#F3D0D7 !important' }} />}
                      label={product.fabricDensity}
                      size="small"
                      sx={{ backgroundColor: 'rgba(243, 208, 215, 0.15)', color: '#F3D0D7', fontWeight: 700 }}
                    />
                  )}
                </Box>

                {/* Title & Tagline */}
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                    fontWeight: 700,
                    color: '#FFF',
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#A5AAB8', fontStyle: 'italic', mb: 2 }}>
                  "{product.tagline}"
                </Typography>

                {/* Price & Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                    <Typography variant="h4" sx={{ color: '#E6C594', fontWeight: 800 }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </Typography>
                    {product.originalPrice && (
                      <Typography variant="body1" sx={{ color: '#A5AAB8', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: '#E6C594' }} />
                    <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 600 }}>
                      {product.rating}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                      ({product.reviewsCount} reviews)
                    </Typography>
                  </Box>
                </Box>

                {/* Stock scarcity banner */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(211, 47, 47, 0.15)',
                    border: '1px solid rgba(211, 47, 47, 0.3)',
                    mb: 3,
                  }}
                >
                  <FlashOn sx={{ color: '#FF5252', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#FF8A80', fontWeight: 600 }}>
                    ⚡ Only {product.stockCount} pieces in stock. Order within 2 hrs for express dispatch.
                  </Typography>
                </Box>

                {/* Color Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                    Color: <Box component="span" sx={{ color: '#E6C594', fontWeight: 700 }}>{selectedColor.name}</Box>
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    {product.colors.map((color) => (
                      <Tooltip key={color.name} title={color.name} arrow>
                        <Box
                          onClick={() => setSelectedColor(color)}
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: color.hex,
                            cursor: 'pointer',
                            border: selectedColor.name === color.name ? '3px solid #E6C594' : '2px solid rgba(255,255,255,0.2)',
                            boxShadow: selectedColor.name === color.name ? '0 0 10px rgba(230, 197, 148, 0.8)' : 'none',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Stack>
                </Box>

                {/* Size Selection + Size Advisor Trigger */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#FFF' }}>
                      Select Size: <Box component="span" sx={{ color: '#E6C594', fontWeight: 700 }}>{selectedSize}</Box>
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Straighten sx={{ fontSize: 16 }} />}
                      onClick={onOpenSizeAdvisor}
                      sx={{ color: '#F3D0D7', textTransform: 'none', fontSize: '0.8rem' }}
                    >
                      Smart Size Advisor
                    </Button>
                  </Box>

                  <Stack direction="row" spacing={1.2}>
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'contained' : 'outlined'}
                        onClick={() => setSelectedSize(size)}
                        sx={{
                          minWidth: 46,
                          height: 40,
                          borderRadius: 2,
                          backgroundColor: selectedSize === size ? '#E6C594' : 'transparent',
                          color: selectedSize === size ? '#0B0D17' : '#FFF',
                          borderColor: selectedSize === size ? '#E6C594' : 'rgba(230, 197, 148, 0.3)',
                          fontWeight: 700,
                          '&:hover': {
                            backgroundColor: selectedSize === size ? '#F5E6CC' : 'rgba(230, 197, 148, 0.1)',
                          },
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Stack>
                </Box>

                {/* Quantity + Add to Bag & Wishlist */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  {/* Quantity Counter */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid rgba(230, 197, 148, 0.3)',
                      borderRadius: 30,
                      px: 1,
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      sx={{ minWidth: 30, color: '#FFF' }}
                    >
                      -
                    </Button>
                    <Typography variant="body1" sx={{ px: 1.5, color: '#FFF', fontWeight: 700 }}>
                      {quantity}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => setQuantity(quantity + 1)}
                      sx={{ minWidth: 30, color: '#FFF' }}
                    >
                      +
                    </Button>
                  </Box>

                  {/* Add to Bag Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddToCart}
                    startIcon={<ShoppingBagOutlined />}
                    sx={{ py: 1.5, fontSize: '1rem' }}
                  >
                    Add to Shopping Bag
                  </Button>

                  {/* Wishlist Button */}
                  <IconButton
                    onClick={() => toggleWishlist(product)}
                    sx={{
                      border: '1px solid rgba(230, 197, 148, 0.3)',
                      color: isWishlisted ? '#E6C594' : '#FFF',
                      borderRadius: '50%',
                    }}
                  >
                    {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Stack>

                {/* Collapsible Accordions for Details */}
                <Box sx={{ mt: 'auto' }}>
                  <Accordion sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
                    <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E6C594' }} />}>
                      <Typography variant="subtitle2" sx={{ color: '#FFF' }}>
                        🌿 Craftsmanship & Fabric Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 1 }}>
                        {product.description}
                      </Typography>
                      <ul>
                        {product.features.map((feat, i) => (
                          <li key={i}>
                            <Typography variant="caption" sx={{ color: '#F8F9FA' }}>
                              {feat}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
                    <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E6C594' }} />}>
                      <Typography variant="subtitle2" sx={{ color: '#FFF' }}>
                        🧼 Wash & Silk Care Guide
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {product.careInstructions.map((care, i) => (
                          <li key={i}>
                            <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                              {care}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderTop: '1px solid rgba(230, 197, 148, 0.15)' }}>
                    <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E6C594' }} />}>
                      <Typography variant="subtitle2" sx={{ color: '#FFF' }}>
                        🚚 Express Shipping & Returns
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                        Free DHL Express worldwide delivery on orders over ₹1,999. Delivered in signature gold-embossed box within 2-4 business days. Complimentary 30-day hassle-free returns.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
