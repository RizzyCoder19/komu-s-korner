"use client";

import { useState } from "react";
import { Sparkles, Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [coupon, setCoupon] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-[#D4AF37]": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setCoupon(data.couponCode);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section className="py-20 bg-[#FAF9F6] border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#121212] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/30 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E6C687] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span>Join Komu's VIP Circle</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-3">
            Receive Exclusive Dress Access & 15% Off
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Subscribe to receive private invitations to new gown drops, fashion show edits, and secret VIP discount codes.
          </p>

          {status === "success" ? (
            <div className="bg-white/10 border border-[#D4AF37]/40 rounded-2xl p-6 max-w-md mx-auto space-y-2">
              <CheckCircle size={32} className="text-[#D4AF37] mx-auto" />
              <h3 className="text-lg font-bold text-white">You're Subscribed to Komu's Circle!</h3>
              <p className="text-xs text-gray-300">
                Use your exclusive coupon code at checkout:
              </p>
              <div className="inline-block bg-[#D4AF37] text-black font-extrabold text-sm px-4 py-2 rounded-xl tracking-widest mt-2">
                {coupon || "KOMU15"}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-11 pr-4 py-3.5 text-xs bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#D4AF37] hover:bg-[#B59325] text-white font-bold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-luxury hover:shadow-lg shrink-0"
              >
                {status === "loading" ? "Subscribing..." : "Join VIP Circle"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
