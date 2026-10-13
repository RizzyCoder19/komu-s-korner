import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-light text-[#CD7F32] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          404
        </h1>
        <p className="text-xl text-[#E8DCC8] mb-2">Page Not Found</p>
        <p className="text-[#8E8279] mb-8 max-w-md mx-auto">
          The page you are looking for does not exist. Perhaps you would like to explore our collection.
        </p>
        <Link href="/" className="inline-block px-8 py-3 border border-[#CD7F32] text-[#CD7F32] text-xs tracking-[0.3em] uppercase hover:bg-[#CD7F32] hover:text-[#0B0B0B] transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}

