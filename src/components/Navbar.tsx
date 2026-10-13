"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Sparkles, Crown } from "lucide-react";
import { navLinks, products, STORE_INFO } from "@/lib/data";
import { useCart, useWishlist } from "@/hooks/useStore";
import MegaMenu from "./MegaMenu";

interface NavbarProps {
  onCartClick?: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const searchResults = searchTerm.trim()
    ? products
        .filter((p) =>
          `${p.name} ${p.category} ${p.fabric}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchFocused(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar - Dark Romance */}
      <div className="bg-[#120E16] text-[#F3E5AB] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-widest font-medium flex items-center justify-center gap-2 border-b border-[#D4AF37]/25 shadow-lg">
        <Sparkles size={13} className="text-[#D4AF37] animate-pulse" />
        <span>Komu's Atelier: WhatsApp Concierge ({STORE_INFO.phone}) | Dark Romance Couture Access</span>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-[#090809]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#D4AF37]/20" : "bg-[#090809]/85 backdrop-blur-sm py-4 border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-[#1A1420] text-[#D4AF37] flex items-center justify-center font-bold text-lg shadow-xl group-hover:scale-105 transition-transform border border-[#D4AF37]/50 shadow-[#900C3F]/30">
                <Crown size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight leading-none group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
                  Komu's Korner
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mt-0.5">
                  Dark Romance & Couture
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.name === "Dress Menu" ? (
                    <div
                      onMouseEnter={() => setMegaMenuOpen(true)}
                      onMouseLeave={() => setMegaMenuOpen(false)}
                      className="py-2"
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-gray-300 hover:text-[#D4AF37] transition-colors"
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={14} className="text-[#D4AF37]" />
                      </Link>
                      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-xs uppercase font-bold tracking-wider text-gray-300 hover:text-[#D4AF37] transition-colors py-2 block"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar - Live Autocomplete */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  value={searchTerm}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchFocused(true);
                  }}
                  placeholder="Search dresses, velvet gowns..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:bg-[#141118] focus:outline-none focus:border-[#D4AF37] transition-all"
                />
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </form>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {searchFocused && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#141118] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden z-50 p-2"
                  >
                    <div className="text-[10px] uppercase font-bold text-[#D4AF37] px-3 py-1.5 tracking-wider">
                      Matching Couture ({searchResults.length})
                    </div>
                    <div className="divide-y divide-white/5">
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          onClick={() => setSearchFocused(false)}
                          className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <div className="relative w-10 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-900">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                            <p className="text-[10px] text-[#D4AF37] font-medium">{item.category}</p>
                          </div>
                          <span className="text-xs font-bold text-white">${item.price.toLocaleString()}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions: Wishlist & Bag */}
            <div className="flex items-center gap-3">
              <Link
                href="/wishlist"
                className="relative p-2.5 text-gray-300 hover:text-rose-400 hover:bg-white/5 rounded-full transition-all"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#900C3F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={onCartClick}
                className="relative p-2.5 bg-[#900C3F] hover:bg-[#C70039] text-white rounded-full transition-all shadow-lg shadow-[#900C3F]/40 border border-[#D4AF37]/30 group"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#090809]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#141118] text-white z-50 p-6 flex flex-col justify-between shadow-2xl border-r border-[#D4AF37]/30 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#900C3F] text-[#D4AF37] flex items-center justify-center font-bold text-base">
                      <Crown size={16} />
                    </div>
                    <span className="font-bold text-lg font-heading" style={{ fontFamily: "'Cinzel', serif" }}>Komu's Korner</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="mb-6 relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search dress menu..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </form>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm uppercase font-bold tracking-wider text-gray-300 hover:text-[#D4AF37] transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-gray-400 space-y-1">
                <p className="font-bold text-[#D4AF37]">WhatsApp Concierge</p>
                <p>{STORE_INFO.phone}</p>
                <p>{STORE_INFO.email}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
