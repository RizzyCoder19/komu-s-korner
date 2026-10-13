"use client";

import Link from "next/link";
import { footerLinks, STORE_INFO } from "@/lib/data";
import { Phone, Mail, MapPin, Camera, Globe, Share2, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-[#121212] text-[#D4AF37] flex items-center justify-center font-bold text-xl font-heading shadow-md border border-[#D4AF37]">
                K
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold font-heading text-white tracking-tight leading-none">
                  Komu's Korner
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Dress Menu & Couture
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-light">
              An exclusive digital dress showcase and boutique menu for luxury gowns, designer ethnic wear, cocktail dresses, and bridal couture.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#D4AF37] shrink-0" />
                <span>{STORE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37] shrink-0" />
                <span>{STORE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37] shrink-0" />
                <span>{STORE_INFO.email}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors" aria-label="Instagram">
                <Camera size={16} />
              </a>
              <a href="https://facebook.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors" aria-label="Facebook">
                <Globe size={16} />
              </a>
              <a href="https://komuskorner.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors" aria-label="Share">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Menu Col */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
              Dress Menu
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.menu.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
              Services & Fitting
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
              Atelier Story
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & accepted payment icons */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Komu's Korner Couture. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              <span>Direct Booking & Fitting Concierge</span>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 font-bold">VISA</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 font-bold">MC</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 font-bold">UPI</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 font-bold">APPLE PAY</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 font-bold">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
