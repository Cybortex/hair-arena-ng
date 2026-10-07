import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | The Hair Arena",
  description: "Complete your wig or frontal order securely with Paystack card, bank transfer, or USSD.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-ink/70">Loading checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
