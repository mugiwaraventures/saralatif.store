import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sara Latif | Fine Art Photography",
  description: "Curated collection of fine art photography prints. Museum-quality prints on archival paper, shipped worldwide.",
  keywords: ["fine art", "photography", "prints", "art gallery", "Sara Latif"],
  openGraph: {
    title: "Sara Latif | Fine Art Photography",
    description: "Curated collection of fine art photography prints",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-24">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
