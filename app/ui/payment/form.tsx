"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import type { InvoiceWithCustomer } from "@/app/lib/definitions";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { generateStripeSession } from "@/app/lib/actions";
import { stripeInstace } from "@/app/lib/stripe";

export default function PaymentForm({
    invoiceData,
}: {
    invoiceData: InvoiceWithCustomer;
}) {
    const [loading, setLoading] = useState<boolean>(false);

    const generateStripeSessionWithId = generateStripeSession.bind(
        null,
        invoiceData.id
    );

    const [state, formAction] = useActionState(
        generateStripeSessionWithId,
        null
    );

    useEffect(() => {
        if (state?.status === 200 && state?.sessionId) {
            stripeInstace?.redirectToCheckout({ sessionId: state.sessionId });
        }
    }, [state]);

    return (
        <form
            className="space-y-3"
            action={formAction}
            onSubmit={() => setLoading(true)}
        >
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
                <Button
                    className={`mt-4 w-full ${loading && "cursor-not-allowed"}`}
                    disabled={loading}
                >
                    Pay Now{" "}
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </div>
        </form>
    );
}
