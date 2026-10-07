import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("ref");

    if (!reference) {
      return NextResponse.json({ error: "Reference query parameter required" }, { status: 400 });
    }

    const paystackRes = await verifyPaystackTransaction(reference);

    if (!paystackRes.status || !paystackRes.data) {
      return NextResponse.json(
        { error: paystackRes.message || "Failed to verify transaction" },
        { status: 400 }
      );
    }

    const tx = paystackRes.data;
    const isSuccess = tx.status === "success";

    // Update Convex order status if Convex is linked
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (isSuccess && convexUrl) {
      try {
        const client = new ConvexHttpClient(convexUrl);
        await client.mutation(api.orders.markPaid, {
          reference: tx.reference,
          paystackReference: String(tx.id),
        });
      } catch (err) {
        console.error("Failed to update order in Convex:", err);
      }
    }

    return NextResponse.json({
      success: isSuccess,
      status: tx.status,
      amount: tx.amount / 100, // convert from kobo to Naira
      reference: tx.reference,
      paidAt: tx.paid_at,
      channel: tx.channel,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
