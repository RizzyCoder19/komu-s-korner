"use client";

import { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import SizeGuideModal from "@/components/SizeGuideModal";
import { STORE_INFO } from "@/lib/data";
import { ShieldCheck, Truck, RotateCcw, Search, Ruler } from "lucide-react";

export default function StaticInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId) return;
    setTrackResult(`Reservation ${trackId.toUpperCase()} is currently CONFIRMED and undergoing inspection at Komu's Atelier. Estimated delivery in 2 business days.`);
  };

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen pt-28 pb-20 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-luxury border border-gray-100 space-y-6">
            {slug === "size-guide" && (
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Atelier Service</span>
                <h1 className="text-3xl font-bold font-heading text-gray-900">Bespoke Size & Fitting Guide</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every gown and saree in Komu's dress menu is crafted for a tailored fit. You can open our interactive measurement table below or request custom alterations during order reservation.
                </p>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="bg-[#D4AF37] hover:bg-[#B59325] text-white font-bold text-xs px-6 py-3.5 rounded-2xl inline-flex items-center gap-2"
                >
                  <Ruler size={16} />
                  <span>Open Interactive Measurement Table</span>
                </button>
              </div>
            )}

            {slug === "shipping" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Delivery Info</span>
                <h1 className="text-3xl font-bold font-heading text-gray-900">Express Courier & Fitting Delivery</h1>
                <p>All dress menu reservations placed with Komu's Korner are dispatched within 24 hours via express insured courier.</p>
                <ul className="list-disc list-inside space-y-2 pt-2">
                  <li>Standard Express Fitting: 2 to 3 business days ($0 - Free)</li>
                  <li>Same-Day Atelier Pickup: Available at Fifth Avenue Studio</li>
                  <li>International Insured Dispatch: 4 to 6 business days</li>
                </ul>
              </div>
            )}

            {slug === "returns" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Atelier Guarantee</span>
                <h1 className="text-3xl font-bold font-heading text-gray-900">7-Day Fit Guarantee & Returns</h1>
                <p>We want you to feel extraordinary in your chosen dress. If the fit or shade needs adjustment, we provide complimentary exchange or fitting alterations within 7 days of delivery.</p>
              </div>
            )}

            {slug === "track-order" && (
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Reservation Status</span>
                <h1 className="text-3xl font-bold font-heading text-gray-900">Track Your Dress Order Reservation</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Enter your Order Booking ID (e.g. KK-492019) to view real-time fitting & dispatch status.
                </p>

                <form onSubmit={handleTrackOrder} className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    placeholder="Enter Booking ID (e.g. KK-123456)"
                    required
                    className="flex-1 p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="bg-[#121212] hover:bg-[#D4AF37] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Track Status
                  </button>
                </form>

                {trackResult && (
                  <div className="p-4 bg-amber-50 border border-[#D4AF37]/40 rounded-2xl text-xs text-gray-800 space-y-1">
                    <p className="font-bold text-[#D4AF37]">Status Verified:</p>
                    <p>{trackResult}</p>
                  </div>
                )}
              </div>
            )}

            {!["size-guide", "shipping", "returns", "track-order"].includes(slug) && (
              <div className="space-y-4">
                <h1 className="text-3xl font-bold font-heading text-gray-900">Komu's Korner Policies</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Komu's Korner respects your privacy and is dedicated to maintaining high standards of luxury service and authenticity across our dress menu catalog.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <SizeGuideModal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} />
      <Footer />
    </>
  );
}
