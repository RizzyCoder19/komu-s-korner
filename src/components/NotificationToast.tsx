"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";

interface ToastItem {
  id: string;
  message: string;
}

export default function NotificationToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      if (customEvent.detail?.message) {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message: customEvent.detail.message }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
      }
    };

    window.addEventListener("komu-toast", handleToast);
    return () => window.removeEventListener("komu-toast", handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto bg-[#121212] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#D4AF37]/40 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-[#D4AF37] shrink-0" />
              <p className="text-xs sm:text-sm font-medium tracking-wide">{toast.message}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
