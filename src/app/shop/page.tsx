"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";
import { SlidersHorizontal, Grid, List, X, Search, RotateCcw } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = ["All", "Evening Gowns", "Party Wear", "Ethnic Wear", "Bridal Couture", "Dresses", "Suits & Co-ords"];
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setMaxPrice(10000);
    setSelectedSizes([]);
    setSortBy("featured");
    router.push("/shop");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "All" && !p.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
      // Search filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesFabric = p.fabric.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesFabric) return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [selectedCategory, searchTerm, maxPrice, selectedSizes, sortBy]);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen pt-24 pb-20 bg-[#0C0B0E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-6 bg-[#14131A] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Boutique Catalogue
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-1 mb-2">
              Komu's Dress Menu
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl font-light">
              Explore available gowns, ethnic sets, cocktail dresses, and tailored suits. Select any dress for direct reservation & fitting.
            </p>
          </div>

          {/* Mobile Horizontal Category Pills (Amazon/Flipkart Style) */}
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar lg:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#900C3F] text-white border border-[#D4AF37]/40 shadow-lg"
                    : "bg-white/5 text-gray-300 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter & Sort Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#14131A] p-4 rounded-2xl shadow-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#900C3F] text-white px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37]/30"
              >
                <SlidersHorizontal size={15} />
                <span>Filter</span>
              </button>

              <span className="text-xs text-gray-400">
                Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> dresses
              </span>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="featured" className="bg-[#121212]">Featured</option>
                  <option value="price-asc" className="bg-[#121212]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#121212]">Price: High to Low</option>
                  <option value="rating" className="bg-[#121212]">Highest Rated</option>
                  <option value="newest" className="bg-[#121212]">New Arrivals</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex border border-white/10 rounded-xl bg-white/5 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-[#900C3F] text-white" : "text-gray-400"
                  }`}
                  aria-label="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-[#900C3F] text-white" : "text-gray-400"
                  }`}
                  aria-label="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block space-y-6">
              <div className="bg-[#14131A] p-6 rounded-3xl shadow-2xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-[#D4AF37]" />
                    <span>Filter Dress Menu</span>
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Category List */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-3">Categories</h4>
                  <div className="space-y-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                          selectedCategory === cat
                            ? "bg-[#900C3F] text-white shadow-md border border-[#D4AF37]/30"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{cat}</span>
                        {cat === "All" && <span className="opacity-60">({products.length})</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2 text-xs font-semibold text-gray-300">
                    <span>Max Price</span>
                    <span className="text-[#D4AF37] font-bold">${maxPrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                          selectedSizes.includes(size)
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Listing Grid - Optimized 2-column mobile layout */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="bg-[#14131A] rounded-3xl p-12 text-center shadow-2xl border border-white/10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-400">
                    <Search size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white">No dresses match your filters</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Try adjusting your category selection, increasing max price limit, or clearing active filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-[#900C3F] hover:bg-[#C70039] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors inline-block border border-[#D4AF37]/30"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <MobileBottomNav onCartClick={() => setCartOpen(true)} />
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-gray-400">Loading Dress Menu...</div>}>
      <ShopContent />
    </Suspense>
  );
}
