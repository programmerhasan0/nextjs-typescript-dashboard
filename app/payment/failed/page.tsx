"use client";

import { Suspense } from "react";

function PaymentFailedPage() {
    return (
        <div className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="w-full">
                    <h1 className="mb-3 text-2xl text-center">
                        <span className="text-red-600">Payment Failed</span>
                    </h1>
                    <p className="text-center">Please try again</p>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <PaymentFailedPage />
        </Suspense>
    );
}
