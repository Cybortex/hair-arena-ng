import { Suspense } from "react";
import VerifyClient from "./VerifyClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Verification | The Hair Arena",
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-ink/70">Verifying payment with Paystack...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
