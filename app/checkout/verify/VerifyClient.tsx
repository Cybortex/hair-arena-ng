"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SITE, naira } from "@/lib/site";
import { btn, btnDark, card, wrap } from "@/lib/ui";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") || searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!reference) {
      setError("No transaction reference found in callback.");
      setLoading(false);
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/paystack/verify?ref=${encodeURIComponent(reference!)}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setSuccess(true);
          setAmount(data.amount);
        } else {
          setError(data.error || "Payment verification failed or was cancelled.");
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Network error during verification";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [reference]);

  if (loading) {
    return (
      <div className={`${wrap} py-20 text-center`}>
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-magenta border-t-transparent" />
        <h1 className="mt-6 text-2xl font-bold">Verifying your payment...</h1>
        <p className="mt-2 text-ink/70">Connecting with Paystack to confirm your transaction.</p>
      </div>
    );
  }

  if (error || !success) {
    return (
      <div className={`${wrap} py-16 text-center`}>
        <div className={`mx-auto max-w-md ${card} p-8`}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
            ✕
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink">Payment Incomplete</h1>
          <p className="mt-2 text-sm text-red-700">{error || "We could not verify your payment."}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/shop" className={btn}>
              Return to Shop
            </Link>
            <a
              href={`${SITE.wa}?text=${encodeURIComponent(
                `Hello Hair Arena, I had an issue with payment reference: ${reference || "N/A"}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={btnDark}
            >
              Contact Support on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${wrap} py-16 text-center`}>
      <div className={`mx-auto max-w-lg ${card} p-8 shadow-sm`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-ink">Order Confirmed!</h1>
        <p className="mt-2 text-ink/80">Thank you for ordering with {SITE.name}. Your payment was received successfully.</p>

        <div className="mt-6 rounded-2xl border border-line bg-blush/40 p-4 text-left text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-ink/70">Reference:</span>
            <span className="font-mono font-bold text-ink">{reference}</span>
          </div>
          {amount && (
            <div className="flex justify-between">
              <span className="text-ink/70">Amount Paid:</span>
              <span className="font-bold text-magenta">{naira(amount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-ink/70">Status:</span>
            <span className="font-bold text-emerald-700">Paid &amp; Processing</span>
          </div>
        </div>

        <p className="mt-5 text-xs text-ink/70">
          A receipt has been sent to your email. We will contact you on WhatsApp / phone with tracking updates when your package is dispatched.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`${SITE.wa}?text=${encodeURIComponent(
              `Hello Hair Arena, I just completed order ${reference}. Looking forward to dispatch details!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btn}
          >
            Notify on WhatsApp
          </a>
          <Link href="/shop" className={btnDark}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
