"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { confirmPayment } from "@/app/lib/actions";

// types
type paymentType = "paid" | "not paid" | null;

function PaymentSuccessPage() {
    const params = useSearchParams();
    const sessionId = params.get("session_id");
    const [paymentStatus, setPaymentStatus] = useState<paymentType>(null);

    useEffect(() => {
        confirmPayment(sessionId!).then(res => setPaymentStatus(res!));
    }, []);

    return (
        <div className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="w-full">
                    <h1 className="mb-3 text-2xl text-center">
                        <span className="text-green-700">
                            Payment Successful
                        </span>
                    </h1>
                    <p className="text-center">Thank you for paying</p>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <PaymentSuccessPage />
        </Suspense>
    );
}
