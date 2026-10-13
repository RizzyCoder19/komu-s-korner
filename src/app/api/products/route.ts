import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const search = searchParams.get("search")?.toLowerCase();
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : Infinity;
  const sort = searchParams.get("sort") || "featured";

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (collection) {
    filtered = filtered.filter((p) => p.collection.toLowerCase() === collection.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.fabric.toLowerCase().includes(search)
    );
  }

  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "newest") {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered,
  });
}
