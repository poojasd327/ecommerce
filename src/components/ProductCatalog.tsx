'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Chip,
} from '@mui/material';
import { Search, RestartAlt } from '@mui/icons-material';
import { Product, CategoryType } from '@/types/ecommerce';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchQuery: (query: string) => void;
  onQuickViewProduct: (product: Product) => void;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Silk Slips',
  'Ethereal Robes',
  'Lace Chemises',
  'Velvet & Lounge',
  'Bridal Sleepwear',
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchQuery,
  onQuickViewProduct,
}) => {
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const fabrics = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      const firstWord = p.fabric.split(' ')[0];
      if (firstWord) set.add(firstWord);
    });
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      // Fabric Filter
      if (selectedFabric !== 'All' && !product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchTagline = product.tagline.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchFabric = product.fabric.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchCategory && !matchFabric) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0; // featured
    });
  }, [products, activeCategory, selectedFabric, searchQuery, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    setSelectedFabric('All');
    onSearchQuery('');
    setSortBy('featured');
  };

  return (
    <Box id="catalog-section" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#0B0D17' }}>
      <Container maxWidth="xl">
        {/* Header Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#E6C594',
              letterSpacing: '0.2em',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            HAUTE COUTURE CATALOG
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              color: '#FFF',
              fontWeight: 700,
              mt: 0.5,
              mb: 1.5,
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' },
            }}
          >
            Curated Ethereal Nightwear
          </Typography>
          <Typography variant="body1" sx={{ color: '#A5AAB8', maxWidth: 600, mx: 'auto' }}>
            Discover pure 22 Momme Mulberry silk slips, tailored kimono robes, French Chantilly chemises, and plush micro-velvet lounge sets.
          </Typography>
        </Box>

        {/* Category Navigation Tabs */}
        <Box sx={{ borderBottom: '1px solid rgba(230, 197, 148, 0.15)', mb: 4 }}>
          <Tabs
            value={activeCategory}
            onChange={(_, val) => onSelectCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#E6C594',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                color: '#A5AAB8',
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                py: 2,
                '&.Mui-selected': {
                  color: '#E6C594',
                },
              },
            }}
          >
            {CATEGORIES.map((cat) => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        {/* Filter Controls Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 5,
            p: 2.5,
            backgroundColor: 'rgba(20, 23, 36, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: 4,
            border: '1px solid rgba(230, 197, 148, 0.15)',
          }}
        >
          {/* Search Box */}
          <TextField
            placeholder="Search by keyword, fabric or design..."
            value={searchQuery}
            onChange={(e) => onSearchQuery(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, minWidth: { md: 300 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#E6C594' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'rgba(11, 13, 23, 0.8)',
                  color: '#FFF',
                  borderRadius: 20,
                },
              },
            }}
          />

          {/* Fabric Dropdown */}
          <TextField
            select
            label="Fabric Type"
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
            size="small"
            sx={{ minWidth: 160 }}
            slotProps={{
              input: {
                sx: {
                  backgroundColor: 'rgba(11, 13, 23, 0.8)',
                  color: '#FFF',
                  borderRadius: 20,
                },
              },
            }}
          >
            {fabrics.map((fab) => (
              <MenuItem key={fab} value={fab}>
                {fab === 'All' ? 'All Fabrics' : fab}
              </MenuItem>
            ))}
          </TextField>

          {/* Sort By Dropdown */}
          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
            slotProps={{
              input: {
                sx: {
                  backgroundColor: 'rgba(11, 13, 23, 0.8)',
                  color: '#FFF',
                  borderRadius: 20,
                },
              },
            }}
          >
            <MenuItem value="featured">Featured Collection</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="reviews">Most Reviewed</MenuItem>
          </TextField>

          {/* Active Filter Counter / Reset Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${filteredProducts.length} Items`}
              size="small"
              sx={{ backgroundColor: 'rgba(230, 197, 148, 0.15)', color: '#E6C594', fontWeight: 700 }}
            />
            {(activeCategory !== 'All' || selectedFabric !== 'All' || searchQuery) && (
              <Button
                size="small"
                onClick={handleResetFilters}
                startIcon={<RestartAlt />}
                sx={{ color: '#F3D0D7', textTransform: 'none' }}
              >
                Reset
              </Button>
            )}
          </Box>
        </Box>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                <ProductCard product={product} onQuickView={onQuickViewProduct} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              px: 3,
              backgroundColor: 'rgba(20, 23, 36, 0.4)',
              borderRadius: 4,
              border: '1px border-dashed rgba(230, 197, 148, 0.2)',
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: '#FFF', mb: 1 }}>
              No Nightdresses Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#A5AAB8', mb: 3 }}>
              We couldn't find any nightdress matching your criteria. Try adjusting your search query or filters.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleResetFilters}>
              View All Nightwear
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};
