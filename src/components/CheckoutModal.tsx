'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Chip,
  Alert,
  Stack,
} from '@mui/material';
import {
  Close,
  CreditCard,
  CheckCircle,
  Shield,
  AutoAwesome,
} from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  const { cart, total, clearCart } = useCart();
  const [tab, setTab] = useState<number>(0);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Shipping Form State
  const [name, setName] = useState('Sophia Laurent');
  const [email, setEmail] = useState('sophia.laurent@example.com');
  const [address, setAddress] = useState('742 Fifth Avenue, Suite 12B');
  const [city, setCity] = useState('New York');
  const [country, setCountry] = useState('United States');
  const [zip, setZip] = useState('10019');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setIsOrdered(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E6C594', '#F3D0D7', '#FFFFFF', '#C89C5D'],
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }

    clearCart();
  };

  const handleCloseAll = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseAll}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#141724',
            border: '1px solid rgba(230, 197, 148, 0.3)',
            borderRadius: 4,
          },
        },
      }}
    >
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton onClick={handleCloseAll} sx={{ position: 'absolute', top: 16, right: 16, color: '#FFF' }}>
          <Close />
        </IconButton>

        {!isOrdered ? (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Chip
                icon={<Shield sx={{ color: '#4CAF50 !important', fontSize: 16 }} />}
                label="ENCRYPTED 256-BIT EXPRESS CHECKOUT"
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.15)',
                  color: '#4CAF50',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  mb: 1,
                }}
              />
              <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', color: '#FFF' }}>
                Complete Your Order
              </Typography>
            </Box>

            <DialogContent sx={{ px: { xs: 1, sm: 3 } }}>
              <form onSubmit={handlePlaceOrder}>
                <Grid container spacing={4}>
                  {/* Shipping & Payment Left */}
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1.5 }}>
                      1. Shipping Address
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Email Address"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Street Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="Zip Code"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1.5 }}>
                      2. Payment Method
                    </Typography>

                    <Tabs
                      value={tab}
                      onChange={(_, v) => setTab(v)}
                      sx={{
                        mb: 2,
                        '& .MuiTab-root': { color: '#A5AAB8', '&.Mui-selected': { color: '#E6C594' } },
                        '& .MuiTabs-indicator': { backgroundColor: '#E6C594' },
                      }}
                    >
                      <Tab label="Credit Card" />
                      <Tab label="Apple Pay " />
                      <Tab label="Klarna 4x $0 Interest" />
                    </Tabs>

                    {tab === 0 && (
                      <Stack spacing={2}>
                        <TextField
                          label="Card Number"
                          defaultValue="4532 •••• •••• 8892"
                          fullWidth
                          size="small"
                          slotProps={{
                            input: {
                              startAdornment: <CreditCard sx={{ color: '#E6C594', mr: 1 }} />,
                              sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' },
                            },
                          }}
                        />
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="Expiry Date"
                              defaultValue="10/28"
                              fullWidth
                              size="small"
                              slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              label="CVC / CVV"
                              defaultValue="482"
                              type="password"
                              fullWidth
                              size="small"
                              slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                            />
                          </Grid>
                        </Grid>
                      </Stack>
                    )}

                    {tab === 1 && (
                      <Alert severity="info" sx={{ backgroundColor: 'rgba(230, 197, 148, 0.1)', color: '#FFF' }}>
                        Press 'Place Order' to authenticate via Apple TouchID / FaceID.
                      </Alert>
                    )}

                    {tab === 2 && (
                      <Alert severity="info" sx={{ backgroundColor: 'rgba(243, 208, 215, 0.1)', color: '#FFF' }}>
                        Pay in 4 interest-free biweekly payments of ${(total / 4).toFixed(2)}.
                      </Alert>
                    )}
                  </Grid>

                  {/* Order Summary Right */}
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(11, 13, 23, 0.8)',
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid rgba(230, 197, 148, 0.2)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
                        Order Summary
                      </Typography>

                      <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 220, mb: 2 }}>
                        {cart.map((item) => (
                          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: '#FFF', fontSize: '0.85rem' }}>
                                {item.product.name} (x{item.quantity})
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                                Size: {item.selectedSize} | Color: {item.selectedColor.name}
                              </Typography>
                            </Box>
                            <Typography variant="subtitle2" sx={{ color: '#E6C594', fontWeight: 700 }}>
                              ${item.product.price * item.quantity}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Divider sx={{ borderColor: 'rgba(230, 197, 148, 0.2)', my: 2 }} />

                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                            Express DHL Delivery:
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                            FREE
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 700 }}>
                            Total Due:
                          </Typography>
                          <Typography variant="h4" sx={{ color: '#E6C594', fontWeight: 800 }}>
                            ${total.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={<AutoAwesome />}
                        sx={{ py: 1.6, fontSize: '1.05rem' }}
                      >
                        Place Order (${total.toFixed(2)})
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </>
        ) : (
          /* SUCCESS STATE */
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
            <CheckCircle sx={{ fontSize: 75, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h3" sx={{ fontFamily: 'Playfair Display', color: '#FFF', mb: 1 }}>
              Order Confirmed!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 3 }}>
              Order Code: {orderNumber}
            </Typography>

            <Box
              sx={{
                maxWidth: 500,
                mx: 'auto',
                backgroundColor: 'rgba(11, 13, 23, 0.8)',
                p: 3,
                borderRadius: 3,
                border: '1px solid rgba(230, 197, 148, 0.3)',
                mb: 4,
                textAlign: 'left',
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                🚚 Delivery Timeline:
              </Typography>
              <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 2 }}>
                Your order is being prepared in our gold foil signature gift box. Estimated DHL Express delivery: <strong>2 - 3 Business Days</strong> to {address}, {city}.
              </Typography>
              <Typography variant="caption" sx={{ color: '#F3D0D7', fontStyle: 'italic' }}>
                A confirmation email with real-time tracking has been sent to {email}.
              </Typography>
            </Box>

            <Button variant="contained" color="primary" onClick={handleCloseAll} size="large">
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
