import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-heading" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Komu's Korner — Haute Couture & Royal Dress Menu",
  description: "Exquisite royal gowns, Zardozi ethnic Anarkalis, and gala cocktail dresses. Experience luxury dressmaking and private fitting reservations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${playfair.variable}`}>
      <body className="bg-[#090909] text-white antialiased selection:bg-[#900C3F] selection:text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
