'use client';

import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  LinearProgress,
  TextField,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
import {
  Close,
  ShoppingBagOutlined,
  DeleteOutlined,
  LocalShipping,
  ConfirmationNumber,
  AutoAwesome,
  ArrowForward,
} from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    discountCode,
    applyDiscount,
    total,
    freeShippingThreshold,
    amountLeftForFreeShipping,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleApplyDiscount = () => {
    setCodeError('');
    if (!inputCode) return;
    const success = applyDiscount(inputCode);
    if (!success) {
      setCodeError('Invalid code. Try LUMINA15 or DREAM20');
    }
  };

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const finalTotal = total + shippingFee;

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 450 },
            backgroundColor: '#0B0D17',
            color: '#FFF',
            borderLeft: '1px solid rgba(230, 197, 148, 0.2)',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(230, 197, 148, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBagOutlined sx={{ color: '#E6C594' }} />
          <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 600 }}>
            Your Shopping Bag
          </Typography>
          <Chip label={`${cart.length} items`} size="small" sx={{ backgroundColor: 'rgba(230, 197, 148, 0.2)', color: '#E6C594' }} />
        </Box>
        <IconButton onClick={() => setIsCartOpen(false)} sx={{ color: '#FFF' }}>
          <Close />
        </IconButton>
      </Box>

      {/* Free Shipping Progress */}
      <Box sx={{ p: 2, backgroundColor: 'rgba(20, 23, 36, 0.8)', borderBottom: '1px solid rgba(230, 197, 148, 0.15)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocalShipping sx={{ color: '#E6C594', fontSize: 20 }} />
          <Typography variant="caption" sx={{ color: '#F8F9FA', fontWeight: 600 }}>
            {amountLeftForFreeShipping === 0 ? (
              <span style={{ color: '#4CAF50' }}>🎉 You unlocked Free Express Worldwide Delivery!</span>
            ) : (
              `Add ₹${amountLeftForFreeShipping.toLocaleString('en-IN')} more for Free Express Delivery`
            )}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #E6C594 0%, #F3D0D7 100%)',
            },
          }}
        />
      </Box>

      {/* Items Container */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2.5 }}>
        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingBagOutlined sx={{ fontSize: 60, color: 'rgba(230, 197, 148, 0.3)', mb: 2 }} />
            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', color: '#FFF', mb: 1 }}>
              Your Bag is Empty
            </Typography>
            <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 3 }}>
              Explore our haute couture nightwear collection and discover pure silk luxury.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setIsCartOpen(false)}>
              Discover Collections
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      p: 1.5,
                      backgroundColor: 'rgba(20, 23, 36, 0.7)',
                      borderRadius: 3,
                      border: '1px solid rgba(230, 197, 148, 0.12)',
                    }}
                  >
                    <Box
                      component="img"
                      src={item.selectedColor.image || item.product.image}
                      alt={item.product.name}
                      sx={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 2 }}
                    />

                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 600, pr: 1 }}>
                          {item.product.name}
                        </Typography>
                        <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ color: '#A5AAB8' }}>
                          <DeleteOutlined sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>

                      <Typography variant="caption" sx={{ color: '#E6C594', mb: 1 }}>
                        Color: {item.selectedColor.name} | Size: {item.selectedSize}
                      </Typography>

                      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Quantity controls */}
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20 }}>
                          <Button size="small" onClick={() => updateQuantity(item.id, -1)} sx={{ minWidth: 24, color: '#FFF', p: 0 }}>
                            -
                          </Button>
                          <Typography variant="caption" sx={{ px: 1, color: '#FFF', fontWeight: 700 }}>
                            {item.quantity}
                          </Typography>
                          <Button size="small" onClick={() => updateQuantity(item.id, 1)} sx={{ minWidth: 24, color: '#FFF', p: 0 }}>
                            +
                          </Button>
                        </Box>

                        <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700 }}>
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        )}
      </Box>

      {/* Footer Order Summary */}
      {cart.length > 0 && (
        <Box sx={{ p: 2.5, backgroundColor: 'rgba(20, 23, 36, 0.95)', borderTop: '1px solid rgba(230, 197, 148, 0.2)' }}>
          {/* Promo Code Input */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="Promo Code (e.g. LUMINA15)"
                size="small"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: <ConfirmationNumber sx={{ color: '#E6C594', mr: 1, fontSize: 18 }} />,
                    sx: { backgroundColor: 'rgba(11, 13, 23, 0.8)', color: '#FFF', borderRadius: 20, fontSize: '0.85rem' },
                  },
                }}
              />
              <Button variant="outlined" size="small" onClick={handleApplyDiscount}>
                Apply
              </Button>
            </Box>
            {discountCode && (
              <Chip
                label={`Code ${discountCode} applied!`}
                color="secondary"
                size="small"
                onDelete={() => applyDiscount('')}
                sx={{ mt: 1 }}
              />
            )}
            {codeError && (
              <Typography variant="caption" sx={{ color: '#FF5252', display: 'block', mt: 0.5 }}>
                {codeError}
              </Typography>
            )}
          </Box>

          <Divider sx={{ borderColor: 'rgba(230, 197, 148, 0.15)', mb: 1.5 }} />

          {/* Breakdown */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: '#A5AAB8' }}>Subtotal</Typography>
              <Typography variant="body2" sx={{ color: '#FFF' }}>₹{subtotal.toLocaleString('en-IN')}</Typography>
            </Box>
            {discount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: '#F3D0D7' }}>Discount ({discountCode})</Typography>
                <Typography variant="body2" sx={{ color: '#F3D0D7' }}>-₹{discount.toFixed(2)}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: '#A5AAB8' }}>Express Delivery</Typography>
              <Typography variant="body2" sx={{ color: shippingFee === 0 ? '#4CAF50' : '#FFF' }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 700 }}>Total</Typography>
              <Typography variant="h5" sx={{ color: '#E6C594', fontWeight: 800 }}>
                ${finalTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => {
              setIsCartOpen(false);
              onOpenCheckout();
            }}
            sx={{ py: 1.5, fontSize: '1rem' }}
          >
            Express Checkout
          </Button>
        </Box>
      )}
    </Drawer>
  );
};
