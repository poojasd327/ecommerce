'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProductCatalog } from '@/components/ProductCatalog';
import { WishlistSection } from '@/components/WishlistSection';
import { BrandStorySection } from '@/components/BrandStorySection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { DreamscapeFitQuiz } from '@/components/DreamscapeFitQuiz';
import { LuxuryGiftBoxBuilder } from '@/components/LuxuryGiftBoxBuilder';
import { SizeAdvisorModal } from '@/components/SizeAdvisorModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/ecommerce';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isGiftBuilderOpen, setIsGiftBuilderOpen] = useState<boolean>(false);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const handleQuickViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleExploreClick = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ backgroundColor: '#0B0D17', minHeight: '100vh', color: '#FFF' }}>
      {/* Sticky Navbar */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenGiftBuilder={() => setIsGiftBuilderOpen(true)}
        onSelectCategory={setActiveCategory}
        onSearchQuery={setSearchQuery}
      />

      {/* Cinematic Hero */}
      <HeroSection
        onExploreClick={handleExploreClick}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenGiftBuilder={() => setIsGiftBuilderOpen(true)}
      />

      {/* Haute Product Catalog */}
      <ProductCatalog
        products={PRODUCTS}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        onQuickViewProduct={handleQuickViewProduct}
      />

      {/* Saved Wishlist Section */}
      <WishlistSection onQuickView={handleQuickViewProduct} />

      {/* Brand & Mulberry Silk Craftsmanship Story */}
      <BrandStorySection />

      {/* Customer Reviews & Testimonials */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
      />

      <DreamscapeFitQuiz
        open={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onQuickView={handleQuickViewProduct}
      />

      <LuxuryGiftBoxBuilder
        open={isGiftBuilderOpen}
        onClose={() => setIsGiftBuilderOpen(false)}
      />

      <SizeAdvisorModal
        open={isSizeAdvisorOpen}
        onClose={() => setIsSizeAdvisorOpen(false)}
      />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </Box>
  );
}
