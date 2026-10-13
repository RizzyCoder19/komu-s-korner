"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Cocktail Collection",
    subtitle: "Sovereign Glamour & Midnight Silks",
    description: "Hand-beaded gowns fashioned from pure French tulle and velvet.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&q=85",
    link: "/shop?category=Evening+Gowns",
  },
  {
    id: 2,
    title: "Bridal Elegance",
    subtitle: "Heirloom Pearls & Royal Handloom",
    description: "Custom wedding lehengas adorned with pearls and Swarovski crystals.",
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=1600&q=85",
    link: "/shop?category=Bridal+Couture",
  },
  {
    id: 3,
    title: "Royal Ethnic",
    subtitle: "Zardozi Heritage & Royal Anarkalis",
    description: "Traditional Zari threadwork reimagined for modern royalty.",
    image: "https://images.unsplash.com/photo-1583391733952-6c78f5e27d2c?w=1600&q=85",
    link: "/shop?category=Ethnic+Wear",
  },
  {
    id: 4,
    title: "Modern Couture",
    subtitle: "Fluid Silhouettes & Tailored Suits",
    description: "Bold power suits and bias-cut silk slip dresses for galas.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&q=85",
    link: "/shop?category=Party+Wear",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-[85vh] sm:h-[92vh] w-full overflow-hidden bg-[#090909]">
      {/* Background Image Carousel with Ken Burns Zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay Gradient for Editorial Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0E] via-[#0C0B0E]/60 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              <Sparkles size={13} />
              <span>{slide.subtitle}</span>
            </div>

            <h1
              className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight leading-none font-heading"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {slide.title}
            </h1>

            <p className="text-xs sm:text-base text-gray-300 font-light max-w-lg leading-relaxed">
              {slide.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href={slide.link}
                className="bg-[#900C3F] hover:bg-[#C70039] text-white text-xs sm:text-sm font-extrabold py-4 px-8 rounded-2xl flex items-center gap-2 shadow-2xl border border-[#D4AF37]/40 transition-all hover:scale-105"
              >
                <span>Explore {slide.title}</span>
                <ArrowRight size={18} className="text-[#D4AF37]" />
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold py-4 px-8 rounded-2xl border border-white/20 transition-all"
              >
                Book Private Fitting
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Indicators */}
        <div className="absolute bottom-6 right-4 sm:right-8 z-30 flex items-center gap-4">
          <div className="flex gap-2">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/40 hover:bg-white"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-1 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
