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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/mint-lease-logo.svg', sizes: '180x180', type: 'image/svg+xml' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/mint-lease-logo.svg',
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
              z-index: 9999 !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
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
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#047857" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mint Lease" />
        
        {/* Enhanced mobile web app tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Mint Lease" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Performance hints */}
        <meta name="prerender" content="allow" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Touch and interaction optimization */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        
        {/* PWA theme colors for different contexts */}
        <meta name="theme-color" content="#047857" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#065f46" media="(prefers-color-scheme: dark)" />
        
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
              "logo": "https://mintlease.com/mint-lease-logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-516-549-1999",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "areaServed": "East Coast US"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "East Coast",
                "addressRegion": "Multiple States",
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

        {/* Theme script - runs before body render */}
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

        {/* Emergency visibility fix script */}
        <script
          async
          dangerouslySetInnerHTML={{
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
                  
                  // Visibility fix applied
                });
                
                // Also run after a short delay in case of late rendering
                setTimeout(function() {
                  document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(function(el) {
                    el.style.opacity = '1';
                  });
                }, 100);
              }
            `
          }}
        />

        {/* Performance monitoring script */}
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              // Critical performance monitoring (development only)
              if ('performance' in window && 'PerformanceObserver' in window && window.location.hostname === 'localhost') {
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

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1216448333007169');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1216448333007169&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Signals Gateway Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(a,h,e,v,n,t,s)
                {if(a.cbq)return;n=a.cbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!a._cbq)a._cbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=h.createElement(e);t.async=!0;
                t.src=v;s=h.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://sgw.stape.im/sdk/680486402008299964/events.js');
                cbq('setHost', 'https://sgw.stape.im/');
                cbq('init', '680486402008299964');
                cbq('track', 'PageView');
                
                // Override cbq to validate data before tracking
                const originalCbq = window.cbq;
                window.cbq = function() {
                  const args = Array.from(arguments);
                  if (args[0] === 'track' && args[1] === 'Lead' && args[2]) {
                    const data = args[2];
                    // Only track if we have valid first_name and last_name
                    if (data.first_name && data.last_name && 
                        typeof data.first_name === 'string' && data.first_name.length > 0 &&
                        typeof data.last_name === 'string' && data.last_name.length > 0) {
                      return originalCbq.apply(this, arguments);
                    } else {
                      console.log('Skipping analytics tracking - invalid name data');
                      return;
                    }
                  }
                  return originalCbq.apply(this, arguments);
                };
            `
          }}
        />
        {/* End Signals Gateway Pixel Code */}
      </head>
      <body className={`antialiased overflow-x-hidden max-w-full ${inter.variable} ${sourceSerif.variable} font-sans mint-background`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-emerald text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Main app content with global background */}
        <div id="main-content" className="min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
