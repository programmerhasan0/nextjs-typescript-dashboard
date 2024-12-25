"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import type { InvoiceWithCustomer } from "@/app/lib/definitions";
import Image from "next/image";
import { useState } from "react";

export default function PaymentForm({
    invoiceData,
}: {
    invoiceData: InvoiceWithCustomer;
}) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: Event | any) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            body: JSON.stringify({ id: invoiceData.id }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        const data = await res.json();

        if (data.id) {
            const stripe = await import("@stripe/stripe-js");
            const stripeInstance = await stripe.loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
            );

            if (stripeInstance) {
                stripeInstance.redirectToCheckout({ sessionId: data.id });
            }
        } else {
            alert("Error Creating Checkout Session");
        }
    };

    return (
        <form className="space-y-3" onSubmit={e => handleSubmit(e)}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="w-full">
                    {" "}
                    <Image
                        src={invoiceData.customer.image_url}
                        width={35}
                        height={35}
                        className="rounded-full ml-auto mr-auto block"
                        alt={`Image of ${invoiceData.customer.name}`}
                    />
                    <p className="text-center">{invoiceData.customer.name}</p>
                    <h1 className="mb-3 text-2xl text-center">
                        ${`${invoiceData.amount / 100}`}
                    </h1>
                </div>
                <Button className="mt-4 w-full" disabled={loading}>
                    Pay Now{" "}
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </div>
        </form>
    );
}
