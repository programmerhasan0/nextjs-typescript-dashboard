"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import type { InvoiceWithCustomer } from "@/app/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentForm() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

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
