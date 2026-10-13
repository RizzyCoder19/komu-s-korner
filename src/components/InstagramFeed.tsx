"use client";

import Image from "next/image";
import { instagramPosts } from "@/lib/data";
import { Camera, Heart } from "lucide-react";

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-[#121212] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-2">
          <Camera size={16} />
          <span>Follow #KomusKorner</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
          @KomusKorner.Couture on Instagram
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square w-full overflow-hidden bg-gray-900 block"
          >
            <Image
              src={post.image}
              alt="Instagram dress post"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white z-10">
              <Heart size={20} className="fill-white text-white" />
              <span className="text-xs font-bold">{post.likes.toLocaleString()}</span>
              {post.tag && <span className="text-[10px] text-[#D4AF37] font-semibold">{post.tag}</span>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
