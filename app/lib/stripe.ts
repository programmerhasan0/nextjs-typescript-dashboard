import Stripe from "stripe";

const stripeFrontend = await import("@stripe/stripe-js");
const stripe = new Stripe(String(process.env.STRIPE_SECRET));

export default stripe;
export const stripeInstace = await stripeFrontend.loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);
