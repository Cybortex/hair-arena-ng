import { NextRequest, NextResponse } from "next/server";
import { initializePaystackPayment } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, email, amount, customerName, customerPhone, items } = body;

    if (!reference || !amount) {
      return NextResponse.json({ error: "Reference and amount are required" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
    const callbackUrl = `${siteUrl}/checkout/verify?ref=${encodeURIComponent(reference)}`;

    const paystackRes = await initializePaystackPayment({
      email: email || "customer@hairarenang.com",
      amountInNaira: amount,
      reference,
      callbackUrl,
      metadata: {
        customerName,
        customerPhone,
        items,
      },
    });

    if (!paystackRes.status || !paystackRes.data) {
      return NextResponse.json(
        { error: paystackRes.message || "Failed to initialize payment with Paystack" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: paystackRes.data.authorization_url,
      reference: paystackRes.data.reference,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
