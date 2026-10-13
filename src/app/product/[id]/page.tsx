"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import SizeGuideModal from "@/components/SizeGuideModal";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { products, STORE_INFO } from "@/lib/data";
import { Product, Review } from "@/lib/types";
import { useCart, useWishlist } from "@/hooks/useStore";
import { Star, Heart, ShoppingBag, ShieldCheck, Ruler, Check, Send, ChevronRight, Printer, Sparkles, MessageCircle } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const product = products.find((p) => p.id === id || p.sku === id) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "Standard");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "Default");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"details" | "fabric" | "shipping" | "reviews">("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSize(product.sizes[0] || "Standard");
    setSelectedColor(product.colors[0]?.name || "Default");
  }, [product]);

  // Color selection updates preview image dynamically!
  const handleColorSelect = (colorObj: { name: string; hex: string; image?: string }) => {
    setSelectedColor(colorObj.name);
    if (colorObj.image) {
      setSelectedImage(colorObj.image);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewText) return;

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: reviewName, text: reviewText, rating: reviewRating }),
      });
      const data = await res.json();
      if (data.success && data.review) {
        setLocalReviews((prev) => [data.review, ...prev]);
        setReviewSubmitted(true);
        setReviewName("");
        setReviewText("");
      }
    } catch {
      // fallback
    }
  };

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      {/* Hidden Printable Official Receipt Container */}
      <div id="printable-receipt" className="hidden">
        <div style={{ border: "2px solid #D4AF37", padding: "30px", margin: "0 auto", maxWidth: "800px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #000", paddingBottom: "15px", marginBottom: "20px" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0", fontFamily: "Cinzel, serif" }}>KOMU'S KORNER</h1>
              <p style={{ fontSize: "12px", margin: "4px 0", fontStyle: "italic" }}>Dark Romance & Haute Couture Royalty</p>
              <p style={{ fontSize: "11px", margin: "0" }}>{STORE_INFO.address} | Phone: {STORE_INFO.phone}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>OFFICIAL DRESS RECEIPT</h2>
              <p style={{ fontSize: "12px", margin: "4px 0" }}>SKU: {product.sku || "KK-001"}</p>
              <p style={{ fontSize: "11px", margin: "0" }}>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <img src={selectedImage} alt={product.name} style={{ width: "160px", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            <div style={{ flex: 1, fontSize: "13px", lineHeight: "1.6" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 10px 0" }}>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Selected Color:</strong> {selectedColor}</p>
              <p><strong>Selected Size:</strong> {selectedSize}</p>
              <p><strong>Fabric Composition:</strong> {product.fabric}</p>
              <p><strong>Quantity:</strong> {quantity}</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#800020", marginTop: "10px" }}>
                Price Total: ${(product.price * quantity).toLocaleString()}
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px border-dashed #666", paddingTop: "15px", fontSize: "11px", lineHeight: "1.5" }}>
            <p><strong>Care & Handling:</strong> {product.careInstructions?.join(", ") || "Professional Dry Clean Only."}</p>
            <p><strong>Boutique Guarantee:</strong> Certified 100% Authentic Silk & Tailored Fitting Inspection Included.</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px", borderTop: "2px solid #000", paddingTop: "15px" }}>
            <span style={{ fontSize: "11px" }}>Komu's Concierge WhatsApp: +91 98922 66145</span>
            <span style={{ fontSize: "12px", fontWeight: "bold", border: "2px solid #D4AF37", padding: "4px 12px" }}>ATELIER SEALED</span>
          </div>
        </div>
      </div>

      <main className="min-h-screen pt-28 pb-20 bg-[#090809] text-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-white">Dress Menu</Link>
            <ChevronRight size={12} />
            <span className="text-[#D4AF37] font-semibold truncate">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-[#141118] border border-[#D4AF37]/30 shadow-2xl shadow-[#900C3F]/20">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 badge-new">New Arrival</span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-4 right-4 badge-gold">Royalty Bestseller</span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === img ? "border-[#D4AF37] scale-95 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Options Column */}
            <div className="bg-[#141118] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#D4AF37]/25 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                    {product.category} • SKU: {product.sku || "KK-000"}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-full border transition-all ${
                      isWishlisted ? "bg-[#900C3F] border-[#900C3F] text-white" : "bg-white/5 border-white/10 text-gray-300 hover:text-rose-400"
                    }`}
                  >
                    <Heart size={18} className={isWishlisted ? "fill-white" : ""} />
                  </button>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center text-amber-400 text-sm">
                    <Star size={16} className="fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-bold text-white">{product.rating}</span>
                  </div>
                  <span className="text-gray-700">|</span>
                  <span className="text-xs text-gray-400">{product.reviews} Couture Reviews</span>
                  <span className="text-gray-700">|</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} /> Atelier In Stock
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-white/10">
                <span className="text-3xl font-extrabold text-[#D4AF37]">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                <span className="text-xs text-gray-400">Fitting & Inspection Included</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Selection - Click dynamically updates main preview image */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase text-gray-300">
                      Color Shade: <span className="text-[#D4AF37] font-normal">{selectedColor}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 italic">Click swatch to update preview</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorSelect(c)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === c.name ? "border-[#D4AF37] scale-110 shadow-lg shadow-[#D4AF37]/20" : "border-white/20 hover:border-white/40"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={`Select ${c.name}`}
                      >
                        {selectedColor === c.name && (
                          <Check size={16} className={c.hex === "#FFFFF0" || c.hex === "#F7E7CE" ? "text-gray-900" : "text-white"} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-gray-300">Select Fitting Size</label>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler size={14} />
                    <span>Size Guide Chart</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-5 py-2.5 text-xs font-semibold rounded-2xl border transition-all ${
                        selectedSize === s
                          ? "bg-[#900C3F] text-white border-[#900C3F] shadow-md"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Quantity</label>
                <div className="inline-flex items-center border border-white/20 rounded-xl bg-white/5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 text-sm font-bold text-gray-300 hover:bg-white/10 rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2 text-sm font-bold text-gray-300 hover:bg-white/10 rounded-r-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all text-xs"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#900C3F] hover:bg-[#C70039] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-luxury hover:shadow-lg active:scale-95 text-xs border border-[#D4AF37]/40"
                >
                  <span>Reserve & Fitting Request</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Print Receipt & WhatsApp Direct */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <button
                  onClick={handlePrintReceipt}
                  className="text-gray-300 hover:text-[#D4AF37] flex items-center gap-1.5 font-semibold transition-colors"
                >
                  <Printer size={15} className="text-[#D4AF37]" />
                  <span>Print Professional Receipt</span>
                </button>

                <a
                  href={`https://wa.me/919892266145?text=${encodeURIComponent(`Hi Komu's Korner, I am interested in inquiring about "${product.name}" (SKU: ${product.sku || "KK-001"}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Query</span>
                </a>
              </div>
            </div>
          </div>

          {/* Specification Tabs */}
          <div className="bg-[#141118] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D4AF37]/20 mb-16">
            <div className="flex border-b border-white/10 gap-8 mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "details" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Silhouette & Details
              </button>
              <button
                onClick={() => setActiveTab("fabric")}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "fabric" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Fabric & Care Info
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "shipping" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Reservation & WhatsApp Policy
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "reviews" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                Client Reviews ({product.reviews + localReviews.length})
              </button>
            </div>

            {activeTab === "details" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl font-light">
                <p>{product.description}</p>
                <p><strong className="text-white">Fitting Note:</strong> {product.fittingNote || "Designed for a standard tailored fit."}</p>
              </div>
            )}

            {activeTab === "fabric" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-300 max-w-3xl font-light">
                <p><strong className="text-white">Primary Fabric:</strong> {product.fabric}</p>
                {product.careInstructions && (
                  <div>
                    <strong className="block text-white mb-2">Care Instructions:</strong>
                    <ul className="list-disc list-inside space-y-1">
                      {product.careInstructions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-300 max-w-3xl font-light">
                <p>All dress menu reservations placed through Komu's Korner generate an instant WhatsApp notification to concierge at <strong className="text-emerald-400">+91 98922 66145</strong>.</p>
                <p>Doorstep fitting delivery or boutique pickup is confirmed immediately upon booking.</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8 max-w-3xl">
                <form onSubmit={handleReviewSubmit} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="font-bold text-sm text-white">Write a Client Review for {product.name}</h4>
                  {reviewSubmitted ? (
                    <p className="text-xs text-emerald-400 font-semibold">Thank you! Your review has been submitted.</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Your Name"
                          required
                          className="w-full p-3 text-xs bg-white/10 border border-white/10 rounded-xl text-white"
                        />
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full p-3 text-xs bg-white/10 border border-white/10 rounded-xl font-bold text-white"
                        >
                          <option value={5} className="bg-[#121212]">5 Stars - Excellent</option>
                          <option value={4} className="bg-[#121212]">4 Stars - Very Good</option>
                        </select>
                      </div>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience wearing this dress..."
                        required
                        rows={3}
                        className="w-full p-3 text-xs bg-white/10 border border-white/10 rounded-xl text-white"
                      />
                      <button
                        type="submit"
                        className="bg-[#900C3F] hover:bg-[#C70039] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <Send size={14} />
                        <span>Publish Review</span>
                      </button>
                    </>
                  )}
                </form>

                <div className="space-y-4">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-white">{rev.name}</span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Recommendations */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold font-heading text-white mb-8">
                You May Also Like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={(prod) => setQuickViewProduct(prod)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <Footer />
    </>
  );
}
