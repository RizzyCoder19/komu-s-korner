import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id || p.sku === id);

  if (!product) {
    return NextResponse.json({ success: false, error: "Dress not found in menu" }, { status: 404 });
  }

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  return NextResponse.json({
    success: true,
    product,
    related,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  if (!body.name || !body.text || !body.rating) {
    return NextResponse.json({ success: false, error: "Missing required review fields" }, { status: 400 });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    name: body.name,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    rating: Number(body.rating),
    text: body.text,
    date: "Just now",
    verifiedBuyer: true,
    dressId: id,
  };

  return NextResponse.json({
    success: true,
    message: "Thank you! Your review has been published.",
    review: newReview,
  });
}
