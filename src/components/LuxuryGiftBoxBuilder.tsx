'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Card,
  Checkbox,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import { Close, CardGiftcard, ShoppingBagOutlined } from '@mui/icons-material';
import { PRODUCTS, GIFT_BOX_ADDONS } from '@/data/products';
import { Product, GiftBoxAddon } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';

interface LuxuryGiftBoxBuilderProps {
  open: boolean;
  onClose: () => void;
}

export const LuxuryGiftBoxBuilder: React.FC<LuxuryGiftBoxBuilderProps> = ({ open, onClose }) => {
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedAddons, setSelectedAddons] = useState<GiftBoxAddon[]>([GIFT_BOX_ADDONS[0]]);
  const [ribbonColor, setRibbonColor] = useState<string>('Burgundy Ribbon');
  const [recipientName, setRecipientName] = useState<string>('Eleanor');
  const [customMessage, setCustomMessage] = useState<string>(
    'May your nights be wrapped in pure silk and sweetest dreams.'
  );

  const ribbonOptions = [
    { name: 'Burgundy Ribbon', hex: '#5C1329' },
    { name: 'Gold Champagne', hex: '#E6C594' },
    { name: 'Rose Blush', hex: '#D89BA6' },
    { name: 'Midnight Noir', hex: '#111111' },
  ];

  const handleToggleAddon = (addon: GiftBoxAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id) ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
  };

  const giftBoxBasePrice = 25; // Luxury gold foil box fee
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalGiftPrice = selectedProduct.price + giftBoxBasePrice + addonsTotal;

  const handleAddGiftBoxToBag = () => {
    addToCart(
      {
        ...selectedProduct,
        name: `[Gift Box] ${selectedProduct.name} (${selectedAddons.length} Extras)`,
        price: totalGiftPrice,
      },
      selectedProduct.colors[0],
      selectedProduct.sizes[0],
      1
    );
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="body"
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
      <Box sx={{ position: 'relative', p: { xs: 2, sm: 4 } }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16, color: '#FFF', zIndex: 10 }}
        >
          <Close />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            icon={<CardGiftcard sx={{ color: '#F3D0D7 !important', fontSize: 16 }} />}
            label="HAUTE GIFT ATELIER"
            sx={{
              backgroundColor: 'rgba(243, 208, 215, 0.15)',
              color: '#F3D0D7',
              fontWeight: 700,
              fontSize: '0.75rem',
              mb: 1,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 700,
              color: '#FFF',
            }}
          >
            Custom Luxury Gift Box Creator
          </Typography>
          <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
            Build an unforgettable gift experience wrapped in silk tissue, dried rose petals, and hand-stamped gold foil.
          </Typography>
        </Box>

        <DialogContent sx={{ p: 0 }}>
          <Grid container spacing={4}>
            {/* Left Column: Customization Controls */}
            <Grid size={{ xs: 12, md: 7 }}>
              {/* Step 1: Select Main Product */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1.5 }}>
                  1. Select Hero Nightwear Piece
                </Typography>
                <Grid container spacing={2}>
                  {PRODUCTS.slice(0, 4).map((prod) => (
                    <Grid key={prod.id} size={{ xs: 6, sm: 3 }}>
                      <Card
                        onClick={() => setSelectedProduct(prod)}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: selectedProduct.id === prod.id ? 'rgba(230, 197, 148, 0.2)' : 'rgba(11, 13, 23, 0.6)',
                          borderColor: selectedProduct.id === prod.id ? '#E6C594' : 'rgba(255,255,255,0.1)',
                          p: 1,
                          textAlign: 'center',
                        }}
                      >
                        <Box
                          component="img"
                          src={prod.image}
                          sx={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 2, mb: 1 }}
                        />
                        <Typography noWrap variant="caption" sx={{ color: '#FFF', fontWeight: 600, display: 'block' }}>
                          {prod.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#E6C594', fontWeight: 700 }}>
                          ${prod.price}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Step 2: Select Extras Addons */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1.5 }}>
                  2. Add Luxury Sleep Accompaniments
                </Typography>
                <Grid container spacing={2}>
                  {GIFT_BOX_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <Grid key={addon.id} size={{ xs: 12, sm: 6 }}>
                        <Card
                          onClick={() => handleToggleAddon(addon)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            cursor: 'pointer',
                            backgroundColor: isChecked ? 'rgba(230, 197, 148, 0.15)' : 'rgba(11, 13, 23, 0.6)',
                            borderColor: isChecked ? '#E6C594' : 'rgba(255,255,255,0.1)',
                          }}
                        >
                          <Checkbox checked={isChecked} sx={{ color: '#E6C594', '&.Mui-checked': { color: '#E6C594' } }} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#FFF', fontSize: '0.85rem' }}>
                              {addon.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                              {addon.description}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" sx={{ color: '#E6C594', fontWeight: 700, ml: 1 }}>
                            +${addon.price}
                          </Typography>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              {/* Step 3: Ribbon & Message */}
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 1.5 }}>
                  3. Satin Ribbon & Gold Foil Handwritten Note
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#FFF', mb: 1, display: 'block' }}>
                    Satin Ribbon Color: <strong style={{ color: '#E6C594' }}>{ribbonColor}</strong>
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    {ribbonOptions.map((rib) => (
                      <Chip
                        key={rib.name}
                        label={rib.name}
                        onClick={() => setRibbonColor(rib.name)}
                        sx={{
                          backgroundColor: rib.hex,
                          color: '#FFF',
                          border: ribbonColor === rib.name ? '2px solid #E6C594' : '1px solid rgba(255,255,255,0.3)',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      label="Recipient Name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      fullWidth
                      size="small"
                      slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      label="Handwritten Card Message"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
                      slotProps={{ input: { sx: { color: '#FFF', backgroundColor: 'rgba(11, 13, 23, 0.8)' } } }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Right Column: Gift Box Realtime Preview */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(11, 13, 23, 0.9)',
                  borderRadius: 3,
                  p: 3,
                  border: '1px solid rgba(230, 197, 148, 0.3)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#E6C594', fontWeight: 700, mb: 2 }}>
                  Live Gift Box Preview
                </Typography>

                <Box
                  component="img"
                  src="/images/gift_box_packaging.jpg"
                  alt="Luxury Packaging"
                  sx={{
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                    borderRadius: 3,
                    mb: 2.5,
                    border: '1px solid rgba(230, 197, 148, 0.2)',
                  }}
                />

                {/* Summary breakdown */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                    <Typography variant="body2" sx={{ color: '#FFF' }}>
                      {selectedProduct.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E6C594' }}>
                      ${selectedProduct.price}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                    <Typography variant="body2" sx={{ color: '#FFF' }}>
                      Gold Foil Box & Satin Ribbon
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E6C594' }}>
                      +${giftBoxBasePrice}
                    </Typography>
                  </Box>

                  {selectedAddons.map((addon) => (
                    <Box key={addon.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                      <Typography variant="caption" sx={{ color: '#A5AAB8' }}>
                        + {addon.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#E6C594' }}>
                        +${addon.price}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ borderColor: 'rgba(230, 197, 148, 0.2)', my: 1.5 }} />

                {/* Card Message Preview */}
                <Box sx={{ backgroundColor: 'rgba(20, 23, 36, 0.9)', p: 2, borderRadius: 2, mb: 3 }}>
                  <Typography variant="caption" sx={{ color: '#E6C594', letterSpacing: '0.05em', fontWeight: 700 }}>
                    DEAR {recipientName.toUpperCase()},
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#F3D0D7', fontStyle: 'italic', mt: 0.5 }}>
                    "{customMessage}"
                  </Typography>
                </Box>

                {/* Total & Action */}
                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#FFF' }}>
                      Total Gift Package:
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#E6C594', fontWeight: 800 }}>
                      ${totalGiftPrice}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleAddGiftBoxToBag}
                    startIcon={<ShoppingBagOutlined />}
                  >
                    Add Custom Gift Box to Bag
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
