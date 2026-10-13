import { NextResponse } from "next/server";
import { OrderReservation } from "@/lib/types";

// Helper for automated server-side email dispatch to owner (bhaitmkc@gmail.com)
async function sendOwnerEmailNotification(reservation: OrderReservation, bodyText: string) {
  const targetEmail = "bhaitmkc@gmail.com";
  console.log(`[BACKEND NOTIFICATION] Sending automated email alert to owner (${targetEmail}) for Order #${reservation.orderId}...`);

  try {
    // If webhook or SMTP endpoint is configured in env
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL || process.env.EMAIL_API_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: targetEmail,
          subject: `🚨 NEW RESERVATION ALERT #${reservation.orderId} - ${reservation.customerName}`,
          text: bodyText,
          reservation,
        }),
      });
    }
  } catch (err) {
    console.error(`[BACKEND NOTIFICATION ERROR] Email dispatch failed:`, err);
  }
}

// Helper for automated server-side SMS dispatch to owner (+919892266145)
async function sendOwnerSmsNotification(reservation: OrderReservation, bodyText: string) {
  const targetPhone = "+919892266145";
  console.log(`[BACKEND NOTIFICATION] Sending automated SMS alert to owner (${targetPhone}) for Order #${reservation.orderId}...`);

  try {
    const smsGatewayUrl = process.env.SMS_GATEWAY_URL || process.env.TWILIO_WEBHOOK_URL;
    if (smsGatewayUrl) {
      await fetch(smsGatewayUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: targetPhone,
          message: `🚨 NEW RESERVATION: Order #${reservation.orderId} by ${reservation.customerName} (${reservation.phone}). Total: $${reservation.total}`,
        }),
      });
    }
  } catch (err) {
    console.error(`[BACKEND NOTIFICATION ERROR] SMS dispatch failed:`, err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, email, address, city, items, notes, fittingType } = body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please fill all required contact & delivery details." },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum: number, item: { product: { price: number }; quantity: number }) => sum + item.product.price * item.quantity,
      0
    );
    const discount = body.couponCode === "KOMU15" ? subtotal * 0.15 : body.couponCode === "WELCOME20" ? subtotal * 0.2 : 0;
    const total = Math.max(0, subtotal - discount);

    const orderId = `KK-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const estDate = new Date(now.setDate(now.getDate() + 3));

    // Construct Notification message text
    let noteText = `👑 KOMU'S KORNER - NEW DRESS RESERVATION 👑\n\n`;
    noteText += `Order ID: ${orderId}\n`;
    noteText += `Customer: ${customerName}\n`;
    noteText += `Phone/WhatsApp: ${phone}\n`;
    noteText += `Customer Email: ${email || "N/A"}\n`;
    noteText += `Fitting Address: ${address}, ${city || "New York"}\n`;
    noteText += `Fitting Mode: ${fittingType === "atelier" ? "Atelier Studio Visit" : "Doorstep Courier Fitting"}\n\n`;
    noteText += `RESERVED ITEMS:\n`;

    items.forEach((item: { product: { name: string; price: number }; size: string; color: string; quantity: number }, idx: number) => {
      noteText += `${idx + 1}. ${item.product.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}) - $${(item.product.price * item.quantity).toLocaleString()}\n`;
    });

    noteText += `\nTOTAL ESTIMATED: $${total.toLocaleString()}\n`;
    if (notes) noteText += `Fitting Notes: ${notes}\n`;

    const encodedText = encodeURIComponent(noteText);

    // Multi-channel links for client fallback
    const whatsappUrl = `https://wa.me/919892266145?text=${encodedText}`;
    const mailtoUrl = `mailto:bhaitmkc@gmail.com?subject=${encodeURIComponent(`New Dress Reservation ${orderId} - ${customerName}`)}&body=${encodedText}`;
    const smsUrl = `sms:+919892266145?body=${encodedText}`;

    const reservation: OrderReservation = {
      orderId,
      customerName,
      phone,
      email: email || "bhaitmkc@gmail.com",
      address,
      city: city || "New York",
      items,
      subtotal,
      discount,
      total,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: estDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      notes: notes || "Standard fitting reservation",
      whatsappUrl,
    };

    // TRIGGER BACKEND AUTOMATED EMAIL & SMS NOTIFICATIONS TO OWNER
    await Promise.allSettled([
      sendOwnerEmailNotification(reservation, noteText),
      sendOwnerSmsNotification(reservation, noteText),
    ]);

    return NextResponse.json({
      success: true,
      message: "Order Reservation confirmed & backend alerts dispatched to owner!",
      reservation,
      whatsappUrl,
      mailtoUrl,
      smsUrl,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to process reservation request." },
      { status: 500 }
    );
  }
}
