"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Heart, ShoppingBag, PhoneCall } from "lucide-react";
import { useCart, useWishlist } from "@/hooks/useStore";

interface MobileBottomNavProps {
  onCartClick?: () => void;
}

export default function MobileBottomNav({ onCartClick }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Menu", href: "/shop", icon: Grid },
    { name: "Wishlist", href: "/wishlist", icon: Heart, badge: wishlistCount },
    { name: "Bag", href: "/cart", icon: ShoppingBag, badge: cartCount, isCart: true },
    { name: "Contact", href: "/contact", icon: PhoneCall },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121018]/95 backdrop-blur-lg border-t border-[#D4AF37]/30 lg:hidden shadow-2xl">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCart && onCartClick) {
            return (
              <button
                key={item.name}
                onClick={onCartClick}
                className={`flex flex-col items-center justify-center relative py-1 transition-colors ${
                  isActive ? "text-[#D4AF37]" : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="relative">
                  <Icon size={20} className={isActive ? "text-[#D4AF37]" : ""} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#900C3F] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border border-black">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold mt-1 tracking-tight">{item.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center relative py-1 transition-colors ${
                isActive ? "text-[#D4AF37]" : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? "text-[#D4AF37]" : ""} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#900C3F] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border border-black">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold mt-1 tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
