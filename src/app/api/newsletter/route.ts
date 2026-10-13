import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Welcome to Komu's Korner VIP Circle!",
      couponCode: "KOMU15",
      discount: "15% OFF",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
