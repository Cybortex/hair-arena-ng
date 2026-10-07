"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, naira, SITE } from "@/lib/site";
import { btn, btnLine, card, wrap } from "@/lib/ui";

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const variantParam = searchParams.get("variant");

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const selectedVariant = product.variants?.find((v) => v.label === variantParam);

  const price = selectedVariant
    ? selectedVariant.price
    : product.status === "sale" && product.salePrice
    ? product.salePrice
    : product.price;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePayOnline(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone || !address) {
      setError("Please fill in your name, email, phone, and delivery address.");
      return;
    }

    setLoading(true);
    try {
      const reference = `HA-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          email,
          amount: price,
          customerName: name,
          customerPhone: phone,
          items: [
            {
              slug: product.slug,
              name: product.name,
              variantLabel: selectedVariant?.label,
              price,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.authorizationUrl) {
        throw new Error(data.error || "Failed to initialize payment.");
      }

      // Redirect to Paystack secure checkout
      window.location.href = data.authorizationUrl;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment initialization failed";
      setError(msg);
      setLoading(false);
    }
  }

  const waOrderMsg = `Hello Hair Arena, I'd like to order the ${product.name}${
    selectedVariant ? ` (${selectedVariant.label})` : ""
  } at ${naira(price)}. My name is ${name || "[Name]"} and my delivery address is ${
    address || "[Address]"
  }.`;

  return (
    <div className={`${wrap} py-10`}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="rule text-3xl font-extrabold md:text-4xl">Secure Checkout</h1>
        <Link href={`/shop/${product.slug}`} className="text-sm font-semibold text-magenta underline underline-offset-4">
          ← Back to item
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handlePayOnline} className={`${card} p-6`}>
          <h2 className="text-xl font-bold">1. Delivery Information</h2>
          <p className="mt-1 text-sm text-ink/70">Enter your details so we can dispatch your hair promptly.</p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amaka Bello"
                className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink focus:border-magenta focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-ink">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink focus:border-magenta focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080 1234 5678"
                  className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink focus:border-magenta focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink">Delivery Address</label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, Area, City, State"
                className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink focus:border-magenta focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink">Special Instructions (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Call before dispatch, cap size preference"
                className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink focus:border-magenta focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-xl font-bold">2. Payment Method</h2>
            <p className="mt-1 text-sm text-ink/70">Pay securely online via Paystack, or finalize via WhatsApp.</p>

            <button
              type="submit"
              disabled={loading}
              className={`${btn} mt-4 w-full`}
            >
              {loading ? "Redirecting to Paystack..." : `Pay ${naira(price)} with Paystack (Card / Transfer)`}
            </button>

            <div className="mt-3 text-center">
              <span className="text-xs text-ink/50">— OR —</span>
            </div>

            <a
              href={`${SITE.wa}?text=${encodeURIComponent(waOrderMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnLine} mt-2 w-full text-center`}
            >
              Order &amp; Pay via WhatsApp
            </a>
          </div>
        </form>

        <div className="h-fit space-y-6">
          <div className={`${card} p-6`}>
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="mt-4 border-b border-line pb-4">
              <p className="font-bold text-ink">{product.name}</p>
              {selectedVariant && (
                <p className="mt-0.5 text-sm text-ink/70">Option: {selectedVariant.label}</p>
              )}
              <p className="mt-2 text-2xl font-extrabold text-magenta">{naira(price)}</p>
            </div>

            <div className="mt-4 space-y-2 text-sm text-ink/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{naira(price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated on dispatch / Worldwide</span>
              </div>
              <div className="flex justify-between border-t border-line pt-2 font-bold text-ink">
                <span>Total</span>
                <span>{naira(price)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-pink/40 bg-pink/5 p-5 text-sm text-ink/80">
            <h3 className="font-bold text-ink">Buyer Protection &amp; Guarantee</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>100% authentic quality weaves, frontals, and human hair wigs.</li>
              <li>Bank card, USSD, and instant bank transfer supported via Paystack.</li>
              <li>Hand-delivered in Abuja and dispatched worldwide.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
