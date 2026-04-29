import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletProvider } from "./context/WalletContext";
import { ToastProvider } from "./context/ToastContext";

const BASE_URL = "https://nestera.app";

const themeBootScript = `(function(){try{var key='nestera-theme';var root=document.documentElement;var stored=window.localStorage.getItem(key);var theme=stored==='light'||stored==='dark'||stored==='system'?stored:'system';var resolved=theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':theme==='system'?'light':theme;root.dataset.themePreference=theme;root.dataset.theme=resolved;root.classList.remove('light','dark');root.classList.add(resolved);root.style.colorScheme=resolved;}catch(error){document.documentElement.dataset.themePreference='system';}})();`;

export const metadata: Metadata = {
  title: {
    default: "Nestera - Decentralized Savings on Stellar",
    template: "%s | Nestera",
  },
  description: "Secure, transparent, and automated goal-based savings powered by Stellar & Soroban smart contracts.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Nestera",
    title: "Nestera - Decentralized Savings on Stellar",
    description: "Secure, transparent, and automated goal-based savings powered by Stellar & Soroban smart contracts.",
    images: [
      {
        url: "/api/og?page=home",
        width: 1200,
        height: 630,
        alt: "Nestera - Decentralized Savings on Stellar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestera - Decentralized Savings on Stellar",
    description: "Secure, transparent, and automated goal-based savings powered by Stellar & Soroban smart contracts.",
    images: ["/api/og?page=home"],
    creator: "@nestera_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="bg-[var(--color-background)] text-[var(--color-text)] antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <WalletProvider>
            <ToastProvider>
              <main id="main-content">{children}</main>
            </ToastProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
