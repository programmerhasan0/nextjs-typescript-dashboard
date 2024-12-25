import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET));

export default stripe;
