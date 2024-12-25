import stripe from "@/app/lib/stripe";
import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
    const session_id = req.nextUrl.searchParams.get("session_id");

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id!);

        if (session.payment_status === "paid") {
            const invoiceId = session.metadata?.invoiceId;
            await sql`UPDATE invoices SET status = 'paid' WHERE id=${invoiceId}`;

            return Response.json({ success: true });
        }
    } catch (error) {
        console.log(error);
    }

    return Response.json({ success: true });
}
