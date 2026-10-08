import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMINA NUIT | Haute Couture Nightdresses & Luxury Mulberry Silk Sleepwear',
  description: 'Discover luxury silk nightdresses, gowns, kimono robes, and Chantilly lace chemises hand-crafted from 22 Momme pure Grade 6A Mulberry silk.',
  keywords: ['nightdress', 'silk nightgown', 'luxury sleepwear', 'mulberry silk slip', 'kimono robe', 'lace chemise', 'bridal sleepwear'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        <ThemeRegistry>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
