"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const measurements = [
  { size: "XS", bust: "31 - 32.5\"", waist: "24 - 25.5\"", hips: "34 - 35.5\"" },
  { size: "S", bust: "33 - 34.5\"", waist: "26 - 27.5\"", hips: "36 - 37.5\"" },
  { size: "M", bust: "35 - 36.5\"", waist: "28 - 29.5\"", hips: "38 - 39.5\"" },
  { size: "L", bust: "37 - 39.0\"", waist: "30 - 32.0\"", hips: "40 - 42.0\"" },
  { size: "XL", bust: "40 - 42.0\"", waist: "33 - 35.0\"", hips: "43 - 45.0\"" },
  { size: "XXL", bust: "43 - 45.0\"", waist: "36 - 38.0\"", hips: "46 - 48.0\"" },
];

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden border border-[#D4AF37]/20"
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="text-[#D4AF37]" size={20} />
              <h3 className="text-xl font-bold font-heading text-gray-900">Komu's Size Fitting Guide</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            All Komu's Korner dresses are tailored with precision fit. Use a soft measuring tape around the fullest parts of your body.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#FAF9F6] text-gray-700 font-semibold border-b border-gray-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{row.size}</td>
                    <td className="py-3 px-4 text-gray-600">{row.bust}</td>
                    <td className="py-3 px-4 text-gray-600">{row.waist}</td>
                    <td className="py-3 px-4 text-gray-600">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Need custom alterations?</span>
            <span className="font-semibold text-[#D4AF37]">Complimentary for Order Reservations</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
