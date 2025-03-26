'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata needs to be in a separate file or handled differently when using 'use client'
// This is a workaround for demonstration purposes
const siteTitle = "Othaim E-Commerce";
const siteDescription = "A simple e-commerce application built with Next.js";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          {children}
        </main>
      </body>
    </html>
  );
}