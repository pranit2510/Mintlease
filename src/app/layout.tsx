import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mint Lease - Premium Auto Brokerage | Luxury Cars Delivered",
  description: "Skip the dealership hassle. We find, negotiate, and deliver luxury vehicles directly to your door with our premium concierge service. $499 fully refundable deposit.",
  keywords: "luxury car lease, auto brokerage, car delivery, premium vehicles, BMW lease, Mercedes lease, Audi lease, Tesla lease, NYC car broker",
  authors: [{ name: "Mint Lease" }],
  creator: "Mint Lease",
  publisher: "Mint Lease",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mintlease.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mint Lease - Premium Auto Brokerage",
    description: "Skip the dealership hassle. We find, negotiate, and deliver luxury vehicles directly to your door.",
    url: 'https://mintlease.com',
    siteName: 'Mint Lease',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mint Lease - Premium Auto Brokerage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mint Lease - Premium Auto Brokerage",
    description: "Skip the dealership hassle. We find, negotiate, and deliver luxury vehicles directly to your door.",
    images: ['/og-image.jpg'],
    creator: '@mintlease',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#047857',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        {/* Emergency visibility fix for Framer Motion issue */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Emergency visibility fix for Framer Motion issue */
            [style*="opacity:0"], 
            [style*="opacity: 0"],
            [style*="opacity:0;"],
            [style*="opacity: 0;"] {
              opacity: 1 !important;
            }
            /* Ensure header is visible */
            header {
              opacity: 1 !important;
              transform: none !important;
            }
            /* Ensure main content is visible */
            main {
              opacity: 1 !important;
            }
            /* RESTORE SHADOW EFFECTS FOR LUXURY DESIGN */
            .glass,
            .glass-strong,
            .luxury-card {
              /* Allow natural shadows to work */
              transition-property: transform, opacity, color, background-color, border-color, box-shadow !important;
            }
          `
        }} />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#047857" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mint Lease" />
        
        {/* Microsoft Edge/IE specific */}
        <meta name="msapplication-TileColor" content="#047857" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutomotiveBusiness",
              "name": "Mint Lease",
              "description": "Premium auto brokerage service delivering luxury vehicles",
              "url": "https://mintlease.com",
              "logo": "https://mintlease.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-MINT-LEASE",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "areaServed": "US"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://twitter.com/mintlease",
                "https://facebook.com/mintlease",
                "https://instagram.com/mintlease"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2500"
              }
            })
          }}
        />
      </head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `
        }}
      />
      <body className={`antialiased overflow-x-hidden max-w-full ${inter.variable} ${sourceSerif.variable} font-sans`} style={{ backgroundColor: '#FEF7ED', overflowX: 'hidden', maxWidth: '100vw' }}>
        {/* Emergency visibility fix script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Force visibility after page load
            if (typeof window !== 'undefined') {
              window.addEventListener('load', function() {
                // Remove all opacity 0 styles
                document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(function(el) {
                  el.style.opacity = '1';
                  el.style.visibility = 'visible';
                });
                
                // Fix header specifically
                const header = document.querySelector('header');
                if (header) {
                  header.style.opacity = '1';
                  header.style.transform = 'none';
                  header.style.visibility = 'visible';
                }
                
                // Fix all divs that might be hidden
                document.querySelectorAll('div[style*="opacity"], section[style*="opacity"]').forEach(function(el) {
                  if (parseFloat(window.getComputedStyle(el).opacity) < 0.1) {
                    el.style.opacity = '1';
                  }
                });
                
                console.log('Forced visibility fix applied');
              });
              
              // Also run after a short delay in case of late rendering
              setTimeout(function() {
                document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(function(el) {
                  el.style.opacity = '1';
                });
              }, 100);
            }
          `
        }} />
        
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-emerald text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Main app content */}
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Critical performance monitoring
              if ('performance' in window && 'PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                  }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
