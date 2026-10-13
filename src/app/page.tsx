"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import NewArrivals from "@/components/NewArrivals";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import FashionFilmSection from "@/components/FashionFilmSection";
import Lookbook from "@/components/Lookbook";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import MobileBottomNav from "@/components/MobileBottomNav";
import LoadingScreen from "@/components/LoadingScreen";
import Cursor from "@/components/Cursor";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <Cursor />
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen bg-[#090909] text-white">
        <Hero />
        <FeaturedCollections />
        <NewArrivals />
        <CraftsmanshipSection />
        <FashionFilmSection />
        <Lookbook />
        <Testimonials />
        <Newsletter />
      </main>

      <MobileBottomNav onCartClick={() => setCartOpen(true)} />
      <Footer />
    </>
  );
}
