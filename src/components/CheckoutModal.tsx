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
  CircularProgress,
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Shield,
  AutoAwesome,
  AccountBalanceWallet,
  Lock,
  WhatsApp,
} from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://amazing-remove-solve-gone.trycloudflare.com';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  const { cart, total, clearCart } = useCart();
  const [tab, setTab] = useState<number>(0);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Shipping Form State
  const [name, setName] = useState('Pooja Devaraj');
  const [email, setEmail] = useState('pooja.sd0415@gmail.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [address, setAddress] = useState('124 Indiranagar, 100 Feet Road');
  const [city, setCity] = useState('Bengaluru');
  const [country, setCountry] = useState('India');
  const [zip, setZip] = useState('560038');

  // Helper to dynamically load Razorpay Checkout Script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay payment SDK. Please check your internet connection.');
      }

      // 1. Create order on Express Backend
      const orderRes = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total),
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          items: cart.map(i => ({ id: i.product.id, name: i.product.name, quantity: i.quantity, price: i.product.price, selectedSize: i.selectedSize, selectedColor: i.selectedColor.name })),
          notes: {
            customer_name: name,
            customer_email: email,
            customer_phone: phone,
            shipping_address: `${address}, ${city}, ${zip}, ${country}`,
          },
        }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json().catch(() => ({}));
        throw new Error(errorData.message || `Backend server returned status ${orderRes.status}`);
      }

      const orderData = await orderRes.json();
      if (!orderData.success || !orderData.order) {
        throw new Error(orderData.message || 'Unable to initialize order with payment server.');
      }

      const order = orderData.order;
      const keyId = orderData.key_id;

      // 2. Open Razorpay Checkout modal
      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'LUMINA NUIT',
        description: 'Luxury Mulberry Silk Sleepwear Checkout',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            setIsLoading(true);
            // 3. Verify payment signature on backend
            const verifyRes = await fetch(`${BACKEND_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setOrderNumber(response.razorpay_order_id || order.id);
              setPaymentId(response.razorpay_payment_id);
              if (verifyData.whatsapp?.clickToChatUrl) {
                setWhatsappUrl(verifyData.whatsapp.clickToChatUrl);
              }
              setIsOrdered(true);
              clearCart();

              try {
                confetti({
                  particleCount: 140,
                  spread: 85,
                  origin: { y: 0.6 },
                  colors: ['#E6C594', '#F3D0D7', '#FFFFFF', '#C89C5D'],
                });
              } catch (e) {
                console.log('Confetti triggered');
              }
            } else {
              setErrorMessage(verifyData.message || 'Payment verification failed.');
            }
          } catch (err: any) {
            setErrorMessage(err.message || 'Error verifying payment with server.');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone.replace(/[^0-9]/g, '') || '9876543210',
        },
        theme: {
          color: '#E6C594',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setErrorMessage(resp.error?.description || 'Payment failed or was cancelled.');
        setIsLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Payment initialization failed:', err);
      setErrorMessage(
        err.message || 'Could not connect to payment backend. Please make sure the server is running on port 5001.'
      );
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === 0) {
      // Razorpay Checkout Gateway
      handleRazorpayPayment();
    } else {
      // Direct mock flow for alternative methods
      const randomOrder = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrder);
      setPaymentId('SIMULATED_' + Date.now());
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
    }
  };

  const handleCloseAll = () => {
    setIsOrdered(false);
    setErrorMessage('');
    setIsLoading(false);
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
                label="ENCRYPTED 256-BIT SECURE CHECKOUT"
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

            {errorMessage && (
              <Alert
                severity="error"
                onClose={() => setErrorMessage('')}
                sx={{ mb: 3, backgroundColor: 'rgba(244, 67, 54, 0.15)', color: '#ff8a80' }}
              >
                {errorMessage}
              </Alert>
            )}

            <DialogContent sx={{ px: { xs: 1, sm: 3 } }}>
              <form onSubmit={handlePlaceOrder}>
                <Grid container spacing={4}>
                  {/* Shipping & Payment Left */}
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1.5 }}>
                      1. Shipping Address & Contact
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
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          fullWidth
                          size="small"
                          slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
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
                      <Grid size={{ xs: 12, sm: 6 }}>
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
                      <Grid size={{ xs: 12, sm: 6 }}>
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
                      <Tab
                        label="Razorpay Gateway"
                        icon={<AccountBalanceWallet sx={{ fontSize: 18 }} />}
                        iconPosition="start"
                      />
                      <Tab label="Apple Pay " />
                      <Tab label="EMI / Pay Later" />
                    </Tabs>

                    {tab === 0 && (
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 2.5,
                          backgroundColor: 'rgba(11, 13, 23, 0.9)',
                          border: '1px solid rgba(230, 197, 148, 0.25)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Lock sx={{ color: '#4CAF50', fontSize: 20 }} />
                          <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 700 }}>
                            Razorpay Unified Gateway
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 1.5, fontSize: '0.85rem' }}>
                          Supports UPI (Google Pay, PhonePe, Paytm), All Major Debit & Credit Cards, NetBanking, and Wallets.
                        </Typography>
                        <Chip
                          label="Instant 256-Bit Verification"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(230, 197, 148, 0.15)',
                            color: '#E6C594',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    )}

                    {tab === 1 && (
                      <Alert severity="info" sx={{ backgroundColor: 'rgba(230, 197, 148, 0.1)', color: '#FFF' }}>
                        Press 'Place Order' to authenticate via Apple TouchID / FaceID.
                      </Alert>
                    )}

                    {tab === 2 && (
                      <Alert severity="info" sx={{ backgroundColor: 'rgba(243, 208, 215, 0.1)', color: '#FFF' }}>
                        Pay in 3 interest-free payments of ₹{(total / 3).toFixed(0)}.
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
                              ₹{item.product.price * item.quantity}
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
                            ₹{total.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesome />}
                        sx={{ py: 1.6, fontSize: '1.05rem' }}
                      >
                        {isLoading
                          ? 'Connecting Razorpay...'
                          : tab === 0
                          ? `Pay ₹${total.toFixed(2)} with Razorpay`
                          : `Place Order (₹${total.toFixed(2)})`}
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
              Payment Verified!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1 }}>
              Order ID: {orderNumber}
            </Typography>
            {paymentId && (
              <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 3 }}>
                Razorpay Payment ID: <strong>{paymentId}</strong>
              </Typography>
            )}

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

            {whatsappUrl && (
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<WhatsApp sx={{ color: "#25D366" }} />}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "#25D366",
                    color: "#25D366",
                    backgroundColor: "rgba(37, 211, 102, 0.1)",
                    "&:hover": { borderColor: "#25D366", backgroundColor: "rgba(37, 211, 102, 0.2)" },
                    py: 1.2,
                    px: 3,
                    fontWeight: 700,
                  }}
                >
                  View Order Receipt on WhatsApp 💬
                </Button>
              </Box>
            )}
            <Button variant="contained" color="primary" onClick={handleCloseAll} size="large">
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
