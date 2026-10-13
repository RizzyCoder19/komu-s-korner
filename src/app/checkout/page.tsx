"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationToast from "@/components/NotificationToast";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useCart, useOrders } from "@/hooks/useStore";
import { OrderReservation } from "@/lib/types";
import { STORE_INFO } from "@/lib/data";
import { CheckCircle2, ShieldCheck, Printer, Sparkles, MessageCircle, Mail, PhoneCall } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("New York");
  const [fittingType, setFittingType] = useState<"delivery" | "atelier">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "upi">("cod");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<OrderReservation | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string>("");
  const [mailtoLink, setMailtoLink] = useState<string>("");
  const [smsLink, setSmsLink] = useState<string>("");

  // Quick Demo Auto-Fill
  const handleQuickFill = () => {
    setCustomerName("Sophia Montgomery");
    setPhone("+91 98922 66145");
    setEmail("bhaitmkc@gmail.com");
    setAddress("450 Park Avenue, Apt 18B");
    setCity("New York");
    setNotes("Please ensure XS sample fitting is included.");
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || cart.length === 0) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email: email || "bhaitmkc@gmail.com",
          address,
          city,
          items: cart,
          notes,
          fittingType,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success && data.reservation) {
        setConfirmedReservation(data.reservation);
        
        const wa = data.whatsappUrl || `https://wa.me/919892266145?text=Reservation%20${data.reservation.orderId}`;
        const mail = data.mailtoUrl || `mailto:bhaitmkc@gmail.com?subject=Reservation%20${data.reservation.orderId}`;
        const sms = data.smsUrl || `sms:+919892266145?body=Reservation%20${data.reservation.orderId}`;

        setWhatsappLink(wa);
        setMailtoLink(mail);
        setSmsLink(sms);
        addOrder(data.reservation);
        clearCart();

        // 1. Auto open WhatsApp
        if (wa) {
          window.open(wa, "_blank");
        }

        // 2. Auto trigger Mailto link to send email to bhaitmkc@gmail.com
        setTimeout(() => {
          if (mail) {
            window.location.href = mail;
          }
        }, 800);
      }
    } catch {
      // fallback
      const mockOrder: OrderReservation = {
        orderId: `KK-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName,
        phone,
        email: email || "bhaitmkc@gmail.com",
        address,
        city,
        items: cart,
        subtotal: cartTotal,
        discount: 0,
        total: cartTotal,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        estimatedDelivery: "3 business days",
        notes,
      };
      setConfirmedReservation(mockOrder);
      const fallbackWa = `https://wa.me/919892266145?text=${encodeURIComponent(`Reservation ${mockOrder.orderId} for ${mockOrder.customerName}`)}`;
      const fallbackMail = `mailto:bhaitmkc@gmail.com?subject=${encodeURIComponent(`New Dress Reservation ${mockOrder.orderId}`)}&body=${encodeURIComponent(`Order ${mockOrder.orderId} from ${mockOrder.customerName}`)}`;
      const fallbackSms = `sms:+919892266145?body=${encodeURIComponent(`Order ${mockOrder.orderId} from ${mockOrder.customerName}`)}`;

      setWhatsappLink(fallbackWa);
      setMailtoLink(fallbackMail);
      setSmsLink(fallbackSms);
      addOrder(mockOrder);
      clearCart();

      window.open(fallbackWa, "_blank");
      setTimeout(() => {
        window.location.href = fallbackMail;
      }, 800);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <NotificationToast />

      {/* Printable Professional Receipt */}
      {confirmedReservation && (
        <div id="printable-receipt" className="hidden">
          <div style={{ border: "2px solid #D4AF37", padding: "30px", margin: "0 auto", maxWidth: "800px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #000", paddingBottom: "15px", marginBottom: "20px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0", fontFamily: "Cinzel, serif" }}>KOMU'S KORNER</h1>
                <p style={{ fontSize: "12px", margin: "4px 0", fontStyle: "italic" }}>Haute Couture & Regal Collection</p>
                <p style={{ fontSize: "11px", margin: "0" }}>{STORE_INFO.address} | Notification Email: bhaitmkc@gmail.com</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>OFFICIAL RESERVATION RECEIPT</h2>
                <p style={{ fontSize: "14px", fontWeight: "bold", color: "#900C3F", margin: "4px 0" }}>{confirmedReservation.orderId}</p>
                <p style={{ fontSize: "11px", margin: "0" }}>Date: {new Date(confirmedReservation.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div style={{ marginBottom: "20px", fontSize: "13px", lineHeight: "1.6" }}>
              <p><strong>Customer Name:</strong> {confirmedReservation.customerName}</p>
              <p><strong>Phone / WhatsApp:</strong> {confirmedReservation.phone}</p>
              <p><strong>Fitting Address:</strong> {confirmedReservation.address}, {confirmedReservation.city}</p>
              <p><strong>Estimated Fitting Delivery:</strong> {confirmedReservation.estimatedDelivery}</p>
            </div>

            <h3 style={{ fontSize: "14px", borderBottom: "1px solid #000", paddingBottom: "6px", marginBottom: "10px" }}>RESERVED DRESS MENU ITEMS</h3>
            <table style={{ width: "100%", fontSize: "12px", textAlign: "left", borderCollapse: "collapse", marginBottom: "20px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ccc" }}>
                  <th style={{ padding: "8px" }}>Item Description</th>
                  <th style={{ padding: "8px" }}>Size</th>
                  <th style={{ padding: "8px" }}>Color</th>
                  <th style={{ padding: "8px" }}>Qty</th>
                  <th style={{ padding: "8px", textAlign: "right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {confirmedReservation.items.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px", fontWeight: "bold" }}>{item.product.name}</td>
                    <td style={{ padding: "8px" }}>{item.size}</td>
                    <td style={{ padding: "8px" }}>{item.color}</td>
                    <td style={{ padding: "8px" }}>{item.quantity}</td>
                    <td style={{ padding: "8px", textAlign: "right" }}>${(item.product.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: "right", fontSize: "16px", fontWeight: "bold", borderTop: "2px solid #000", paddingTop: "10px" }}>
              Total Estimated Amount: ${confirmedReservation.total.toLocaleString()}
            </div>

            <div style={{ marginTop: "30px", borderTop: "1px border-dashed #666", paddingTop: "15px", fontSize: "11px", display: "flex", justifyContent: "space-between" }}>
              <span>WhatsApp: +91 98922 66145 | Email: bhaitmkc@gmail.com</span>
              <span>Official Atelier Stamp: SEALED & VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen pt-24 pb-20 bg-[#0C0B0E] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Confirmed Order Voucher */}
          {confirmedReservation ? (
            <div className="bg-[#14131A] rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#D4AF37]/40 max-w-3xl mx-auto space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#900C3F]/20 text-[#D4AF37] mx-auto flex items-center justify-center border border-[#D4AF37]/40">
                  <CheckCircle2 size={36} />
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                  Reservation Voucher Confirmed
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Thank You, {confirmedReservation.customerName}!
                </h1>
                <p className="text-xs sm:text-sm text-gray-300">
                  Your reservation <strong className="text-[#D4AF37]">{confirmedReservation.orderId}</strong> is confirmed. Automatic notifications initialized for WhatsApp (<strong className="text-emerald-400">+91 98922 66145</strong>), Email (<strong className="text-amber-300">bhaitmkc@gmail.com</strong>), and SMS.
                </p>
              </div>

              {/* Multi-Channel Notification Bar */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Owner Alert & Dispatch Status</p>
                  <p className="text-xs text-gray-300">If your device didn't auto-launch WhatsApp or Email, tap below to send directly to the owner:</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <MessageCircle size={16} />
                      <span>Send via WhatsApp (+91 98922 66145)</span>
                    </a>
                  )}
                  {mailtoLink && (
                    <a
                      href={mailtoLink}
                      className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <Mail size={16} />
                      <span>Send via Gmail (bhaitmkc@gmail.com)</span>
                    </a>
                  )}
                  {smsLink && (
                    <a
                      href={smsLink}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <PhoneCall size={16} />
                      <span>Send via SMS (+91 98922 66145)</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Reserved Items */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs text-[#D4AF37] uppercase tracking-widest">Reserved Dress Menu Items</h3>
                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 overflow-hidden bg-white/5">
                  {confirmedReservation.items.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-900 shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-white">{item.product.name}</p>
                          <p className="text-[11px] text-gray-400">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#D4AF37]">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-xs transition-colors"
                >
                  <Printer size={16} />
                  <span>Print Professional Receipt</span>
                </button>
                <Link
                  href="/shop"
                  className="flex-1 bg-[#900C3F] hover:bg-[#C70039] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-xs transition-colors border border-[#D4AF37]/40"
                >
                  <span>Browse More Dresses</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#14131A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/25 space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                        Simplified Reservation
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                        Contact & Fitting Details
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickFill}
                      className="bg-white/10 hover:bg-white/20 text-[#D4AF37] font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-[#D4AF37]/40"
                    >
                      <Sparkles size={14} />
                      <span>1-Click Auto-Fill</span>
                    </button>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Sophia Montgomery"
                          required
                          className="w-full p-3 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98922 66145"
                          required
                          className="w-full p-3 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email Address (Owner Alert Target: bhaitmkc@gmail.com)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. bhaitmkc@gmail.com"
                        className="w-full p-3 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Fitting Delivery Address *</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address, Apartment or Suite"
                        required
                        className="w-full p-3 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Fitting Method */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Fitting Preference</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFittingType("delivery")}
                          className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                            fittingType === "delivery"
                              ? "bg-[#900C3F] text-white border-[#900C3F] shadow-md"
                              : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <span>Doorstep Courier Fitting</span>
                          <span className="text-[10px] opacity-70">Dispatched in 24 Hours</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFittingType("atelier")}
                          className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                            fittingType === "atelier"
                              ? "bg-[#900C3F] text-white border-[#900C3F] shadow-md"
                              : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <span>Boutique Atelier Fitting</span>
                          <span className="text-[10px] opacity-70">Fifth Avenue Studio</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Fitting Instructions / Notes</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special size alteration notes..."
                        rows={2}
                        className="w-full p-3 text-xs bg-white/5 border border-white/10 rounded-xl text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || cart.length === 0}
                      className="w-full bg-[#900C3F] hover:bg-[#C70039] text-white font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-sm border border-[#D4AF37]/40"
                    >
                      <MessageCircle size={18} />
                      <span>{submitting ? "Confirming Reservation..." : "Submit Reservation & Alert Owner (+91 98922 66145 / bhaitmkc@gmail.com)"}</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Items Summary */}
              <div className="bg-[#14131A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/25 h-fit space-y-6">
                <h3 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3">
                  Reservation Items ({cart.length})
                </h3>

                <div className="divide-y divide-white/10 max-h-80 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-900 shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400">{item.size} • {item.color} • Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-[#D4AF37]">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>Estimated Cost</span>
                    <span className="font-bold text-white">${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Atelier Fitting Inspection</span>
                    <span>Complimentary</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={16} className="text-[#D4AF37]" />
                  <span>Immediate alerts triggered for WhatsApp, Gmail & SMS.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />
      <Footer />
    </>
  );
}
