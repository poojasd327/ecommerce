'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Rating,
  Stack,
} from '@mui/material';
import { Close, AutoAwesome, Replay, ShoppingBagOutlined } from '@mui/icons-material';
import { Product } from '@/types/ecommerce';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface DreamscapeFitQuizProps {
  open: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
}

export const DreamscapeFitQuiz: React.FC<DreamscapeFitQuizProps> = ({
  open,
  onClose,
  onQuickView,
}) => {
  const { addToCart } = useCart();
  const [step, setStep] = useState<number>(0);

  // Quiz Choices
  const [mood, setMood] = useState<string>('');
  const [silhouette, setSilhouette] = useState<string>('');
  const [fabric, setFabric] = useState<string>('');
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const steps = ['Sleep Mood', 'Silhouette Length', 'Fabric Sensation', 'Your Recommendation'];

  const moodOptions = [
    { id: 'ethereal', label: 'Ethereal Royalty', desc: 'Sweeping floor-length silk gowns with gold lace trim', icon: '👑' },
    { id: 'sensual', label: 'French Romance', desc: 'Delicate sheer Chantilly lace and empire busts', icon: '🌹' },
    { id: 'cozy', label: 'Plush Lounge', desc: 'Soft micro-velvet camisoles and silk-lined shorts', icon: '✨' },
    { id: 'bridal', label: 'Pearl Couture', desc: 'Opulent backless white silk with illusion lace', icon: '💍' },
  ];

  const silhouetteOptions = [
    { id: 'Floor-Length', label: 'Floor-Length Gown', desc: 'Sweeping fluid drape that moves gracefully' },
    { id: 'Midi', label: 'Midi Slip', desc: 'Classic knees-length bias cut slip' },
    { id: 'Mini', label: 'Mini Chemise', desc: 'Playful sheer lace chemise' },
    { id: 'Short', label: '2-Piece Lounge Set', desc: 'Versatile cami top and matching shorts' },
  ];

  const fabricOptions = [
    { id: 'Mulberry Silk', label: '22 Momme Mulberry Silk', desc: '100% Grade 6A pure organic Mulberry silk for skin hydration' },
    { id: 'French Lace', label: 'French Chantilly Lace', desc: 'Ornate sheer lace woven in Calais ateliers' },
    { id: 'Micro-Velvet', label: 'Plush Micro-Velvet', desc: 'Luxe velvet touch for cozy cool nights' },
  ];

  const handleFinishQuiz = () => {
    let bestMatch = PRODUCTS[0];
    if (mood === 'sensual' || silhouette === 'Mini') {
      bestMatch = PRODUCTS.find((p) => p.id === 'rose-enchantment-chemise') || PRODUCTS[3];
    } else if (mood === 'cozy' || fabric === 'Micro-Velvet') {
      bestMatch = PRODUCTS.find((p) => p.id === 'aura-velvet-lounge-set') || PRODUCTS[4];
    } else if (mood === 'bridal') {
      bestMatch = PRODUCTS.find((p) => p.id === 'seraphine-pearl-bridal-gown') || PRODUCTS[5];
    } else if (silhouette === 'Floor-Length' && fabric === 'Mulberry Silk') {
      bestMatch = PRODUCTS.find((p) => p.id === 'seraphine-burgundy-gown') || PRODUCTS[0];
    }
    setMatchedProduct(bestMatch);
    setStep(3);
  };

  const handleReset = () => {
    setStep(0);
    setMood('');
    setSilhouette('');
    setFabric('');
    setMatchedProduct(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#141724',
            border: '1px solid rgba(230, 197, 148, 0.3)',
            borderRadius: 4,
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16, color: '#FFF' }}
        >
          <Close />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Chip
            icon={<AutoAwesome sx={{ color: '#E6C594 !important', fontSize: 16 }} />}
            label="DREAMSCAPE FIT & MOOD FINDER"
            sx={{
              backgroundColor: 'rgba(230, 197, 148, 0.15)',
              color: '#E6C594',
              fontWeight: 700,
              fontSize: '0.75rem',
              mb: 1,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 700,
              color: '#FFF',
            }}
          >
            Find Your Ideal Nightwear
          </Typography>
        </Box>

        {/* Stepper Header */}
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': { color: '#A5AAB8' },
                  '& .Mui-active': { color: '#E6C594 !important' },
                  '& .Mui-completed': { color: '#E6C594 !important' },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <DialogContent sx={{ px: { xs: 1, sm: 3 } }}>
          <AnimatePresence mode="wait">
            {/* STEP 0: MOOD */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Typography variant="h6" sx={{ color: '#FFF', mb: 2, textAlign: 'center' }}>
                  What is your ideal nightwear mood?
                </Typography>
                <Grid container spacing={2}>
                  {moodOptions.map((opt) => (
                    <Grid key={opt.id} size={{ xs: 12, sm: 6 }}>
                      <Card
                        onClick={() => setMood(opt.id)}
                        sx={{
                          p: 2.5,
                          cursor: 'pointer',
                          backgroundColor: mood === opt.id ? 'rgba(230, 197, 148, 0.15)' : 'rgba(11, 13, 23, 0.6)',
                          borderColor: mood === opt.id ? '#E6C594' : 'rgba(230, 197, 148, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Typography variant="h4">{opt.icon}</Typography>
                        <Box>
                          <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 600 }}>
                            {opt.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                            {opt.desc}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!mood}
                    onClick={() => setStep(1)}
                  >
                    Next Question
                  </Button>
                </Box>
              </motion.div>
            )}

            {/* STEP 1: SILHOUETTE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Typography variant="h6" sx={{ color: '#FFF', mb: 2, textAlign: 'center' }}>
                  Which length & fit silhouette do you prefer?
                </Typography>
                <Grid container spacing={2}>
                  {silhouetteOptions.map((opt) => (
                    <Grid key={opt.id} size={{ xs: 12, sm: 6 }}>
                      <Card
                        onClick={() => setSilhouette(opt.id)}
                        sx={{
                          p: 2.5,
                          cursor: 'pointer',
                          backgroundColor: silhouette === opt.id ? 'rgba(230, 197, 148, 0.15)' : 'rgba(11, 13, 23, 0.6)',
                          borderColor: silhouette === opt.id ? '#E6C594' : 'rgba(230, 197, 148, 0.15)',
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 600, mb: 0.5 }}>
                          {opt.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                          {opt.desc}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button variant="outlined" onClick={() => setStep(0)}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!silhouette}
                    onClick={() => setStep(2)}
                  >
                    Next Question
                  </Button>
                </Box>
              </motion.div>
            )}

            {/* STEP 2: FABRIC */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Typography variant="h6" sx={{ color: '#FFF', mb: 2, textAlign: 'center' }}>
                  What tactile fabric feel do you love against your skin?
                </Typography>
                <Grid container spacing={2}>
                  {fabricOptions.map((opt) => (
                    <Grid key={opt.id} size={{ xs: 12 }}>
                      <Card
                        onClick={() => setFabric(opt.id)}
                        sx={{
                          p: 2.5,
                          cursor: 'pointer',
                          backgroundColor: fabric === opt.id ? 'rgba(230, 197, 148, 0.15)' : 'rgba(11, 13, 23, 0.6)',
                          borderColor: fabric === opt.id ? '#E6C594' : 'rgba(230, 197, 148, 0.15)',
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 600 }}>
                          {opt.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                          {opt.desc}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button variant="outlined" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!fabric}
                    onClick={handleFinishQuiz}
                  >
                    Show Recommendation ✨
                  </Button>
                </Box>
              </motion.div>
            )}

            {/* STEP 3: RESULT */}
            {step === 3 && matchedProduct && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: '#E6C594', mb: 0.5 }}>
                    99% Match For Your Sleep Profile!
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                    Based on your preference for {mood} mood, {silhouette} drape and {fabric} touch.
                  </Typography>
                </Box>

                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    backgroundColor: 'rgba(11, 13, 23, 0.8)',
                    borderColor: '#E6C594',
                    p: 2,
                    gap: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={matchedProduct.image}
                    alt={matchedProduct.name}
                    sx={{ width: { xs: '100%', sm: 220 }, height: 260, borderRadius: 3, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Chip label="PERFECT MATCH" color="primary" size="small" sx={{ width: 'fit-content', mb: 1 }} />
                    <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: '#FFF', mb: 1 }}>
                      {matchedProduct.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 2 }}>
                      {matchedProduct.tagline}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography variant="h5" sx={{ color: '#E6C594', fontWeight: 800 }}>
                        ${matchedProduct.price}
                      </Typography>
                      <Rating value={matchedProduct.rating} readOnly size="small" sx={{ color: '#E6C594' }} />
                    </Box>

                    <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingBagOutlined />}
                        onClick={() => {
                          addToCart(matchedProduct, matchedProduct.colors[0], matchedProduct.sizes[0], 1);
                          onClose();
                        }}
                      >
                        Add to Bag
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          onClose();
                          onQuickView(matchedProduct);
                        }}
                      >
                        Details
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button startIcon={<Replay />} onClick={handleReset} sx={{ color: '#A5AAB8' }}>
                    Retake Quiz
                  </Button>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
