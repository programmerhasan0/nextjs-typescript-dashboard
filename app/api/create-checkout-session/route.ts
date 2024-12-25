import stripe from "@/app/lib/stripe";

import { NextApiRequest, NextApiResponse } from "next";
import { fetchInvoiceById } from "@/app/lib/data";
import { InvoiceForm } from "@/app/lib/definitions";

export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();
    console.log(body);

    const invoiceData: InvoiceForm = await fetchInvoiceById(body.id);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Invoice Bill",
                        },
                        unit_amount: invoiceData.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: { invoiceId: invoiceData.id },
            success_url: `${process.env.LIVE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "https://google.com",
            mode: "payment",
        });

        return Response.json({ id: session.id });
    } catch (error) {
        console.log("Api server error", error);
        return Response.json({ error: "Internal Server Error" });
    }
}
