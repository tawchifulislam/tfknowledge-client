import {
  Fraunces,
  Inter,
  Noto_Serif_Bengali,
  Noto_Sans_Bengali,
} from 'next/font/google';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WarmUp from '@/components/layout/WarmUp';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Bengali glyphs: Fraunces and Inter have none, so these are self-hosted
// by Next and used for Bengali text on every device.
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-serif-bn',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-sans-bn',
  display: 'swap',
});

export const metadata = {
  title: 'Thirsty for Knowledge',
  description: 'A minimalist blog for curious minds',
  verification: {
    google: 'XLpyYO33DiPxz57WSmbRNp1cSATk6hBbLztjG2zv-do',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${fraunces.variable} ${inter.variable} ${notoSerifBengali.variable} ${notoSansBengali.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <WarmUp />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1C1917',
              color: '#FAFAF9',
              border: 'none',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
