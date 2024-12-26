"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function PaymentForm() {
    const params = useSearchParams();
    const sessionId = params.get("session_id");

    useEffect(() => {
        const sessionDetails = async () => {
            const res = await fetch(
                `/api/confirm-payment?session_id=${sessionId}`
            );
            const data = await res.json();

            if (data.success) {
                console.log("Success");
            }
        };

        sessionDetails();
    }, []);

    return (
        <div className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="w-full">
                    <h1 className="mb-3 text-2xl text-center">
                        <span>Payment Successful</span>
                    </h1>
                    <p className="text-center">Thank you for paying</p>
                </div>
            </div>
        </div>
    );
}

export default function PaymentFormWithSuspense() {
    return (
        <Suspense>
            <PaymentForm />
        </Suspense>
    );
}
