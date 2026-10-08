'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Modal,
  Fade,
} from '@mui/material';
import {
  ShoppingBagOutlined,
  FavoriteBorderOutlined,
  Search,
  Menu as MenuIcon,
  Close as CloseIcon,
  AutoAwesome,
  CardGiftcard,
} from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenGiftBuilder: () => void;
  onSelectCategory: (cat: string) => void;
  onSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenGiftBuilder,
  onSelectCategory,
  onSearchQuery,
}) => {
  const { setIsCartOpen, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQuery(searchInput);
    setSearchOpen(false);
    // Smooth scroll to catalog
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'All Collections', category: 'All' },
    { label: 'Silk Slips', category: 'Silk Slips' },
    { label: 'Ethereal Robes', category: 'Ethereal Robes' },
    { label: 'Lace Chemises', category: 'Lace Chemises' },
    { label: 'Velvet Lounge', category: 'Velvet & Lounge' },
    { label: 'Bridal Sleepwear', category: 'Bridal Sleepwear' },
  ];

  return (
    <>
      {/* Announcement Marquee Bar */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #1F152E 0%, #2D1B36 50%, #1F152E 100%)',
          color: '#E6C594',
          py: 0.8,
          fontSize: '0.8rem',
          fontWeight: 600,
          textAlign: 'center',
          borderBottom: '1px solid rgba(230, 197, 148, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          letterSpacing: '0.04em',
        }}
      >
        <AutoAwesome sx={{ fontSize: 16, color: '#E6C594' }} />
        <span>Complimentary Express Worldwide Shipping over $200 | Use Code <strong>LUMINA15</strong> for 15% OFF</span>
        <AutoAwesome sx={{ fontSize: 16, color: '#E6C594' }} />
      </Box>

      {/* Main Glassmorphic Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(11, 13, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(230, 197, 148, 0.15)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 1, sm: 2 } }}>
            {/* Left Mobile Menu Toggle */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' }, color: '#E6C594' }}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand Logo */}
            <Box
              onClick={() => {
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  background: 'linear-gradient(135deg, #FFF 0%, #E6C594 60%, #C89C5D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.1rem' },
                }}
              >
                LUMINA NUIT
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(230, 197, 148, 0.7)',
                  letterSpacing: '0.25em',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  mt: -0.5,
                }}
              >
                Haute Couture Nightwear
              </Typography>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navLinks.map((item) => (
                <Button
                  key={item.category}
                  onClick={() => {
                    onSelectCategory(item.category);
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    color: '#F8F9FA',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    px: 1.8,
                    '&:hover': {
                      color: '#E6C594',
                      backgroundColor: 'rgba(230, 197, 148, 0.08)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
              {/* Fit Quiz CTA Button */}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={onOpenQuiz}
                startIcon={<AutoAwesome sx={{ fontSize: 16 }} />}
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  borderRadius: 20,
                  fontSize: '0.8rem',
                  py: 0.6,
                  px: 2,
                  borderColor: 'rgba(230, 197, 148, 0.5)',
                }}
              >
                Fit & Mood Quiz
              </Button>

              {/* Gift Builder CTA Button */}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={onOpenGiftBuilder}
                startIcon={<CardGiftcard sx={{ fontSize: 16 }} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderRadius: 20,
                  fontSize: '0.8rem',
                  py: 0.6,
                  px: 2,
                  background: 'linear-gradient(135deg, #F3D0D7 0%, #D89BA6 100%)',
                  color: '#0B0D17',
                }}
              >
                Gift Box
              </Button>

              {/* Search Toggle */}
              <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#F8F9FA' }}>
                <Search />
              </IconButton>

              {/* Wishlist Button */}
              <IconButton
                onClick={() => {
                  document.getElementById('wishlist-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{ color: '#F8F9FA' }}
              >
                <Badge badgeContent={wishlistCount} color="secondary">
                  <FavoriteBorderOutlined />
                </Badge>
              </IconButton>

              {/* Shopping Bag Button */}
              <IconButton
                onClick={() => setIsCartOpen(true)}
                sx={{
                  color: '#E6C594',
                  backgroundColor: 'rgba(230, 197, 148, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(230, 197, 148, 0.2)' },
                  ml: 0.5,
                }}
              >
                <Badge badgeContent={itemCount} color="primary">
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box
          sx={{
            width: 280,
            height: '100%',
            backgroundColor: '#0B0D17',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', color: '#E6C594' }}>
              LUMINA NUIT
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#F8F9FA' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((item) => (
              <ListItem
                key={item.category}
                onClick={() => {
                  onSelectCategory(item.category);
                  setMobileOpen(false);
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(230, 197, 148, 0.1)' },
                }}
              >
                <ListItemText primary={item.label} slotProps={{ primary: { color: '#F8F9FA' } }} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                onOpenQuiz();
              }}
              startIcon={<AutoAwesome />}
            >
              Take Fit & Mood Quiz
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                onOpenGiftBuilder();
              }}
              startIcon={<CardGiftcard />}
            >
              Build Luxury Gift Box
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Search Modal */}
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} closeAfterTransition>
        <Fade in={searchOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              width: { xs: '90%', sm: 600 },
              bgcolor: '#141724',
              border: '1px solid rgba(230, 197, 148, 0.3)',
              borderRadius: 4,
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              p: 3,
            }}
          >
            <form onSubmit={handleSearchSubmit}>
              <Typography variant="subtitle1" sx={{ color: '#E6C594', mb: 1.5 }}>
                Search Nightwear & Robes
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(11, 13, 23, 0.8)',
                  borderRadius: 30,
                  px: 2,
                  py: 1,
                  border: '1px solid rgba(230, 197, 148, 0.2)',
                }}
              >
                <Search sx={{ color: '#A0A5B5', mr: 1.5 }} />
                <InputBase
                  placeholder="Try 'Mulberry Silk', 'French Lace', 'Kimono Robe'..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  fullWidth
                  autoFocus
                  sx={{ color: '#FFF' }}
                />
                <Button type="submit" variant="contained" size="small" sx={{ borderRadius: 20 }}>
                  Search
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
