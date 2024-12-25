"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { transporter } from "@/app/lib/email-transports";
import {
    CreateInvoice,
    UpdateInvoice,
    AddCustomer,
    UpdateCustomer,
} from "@/app/lib/zodSchema";
import type { State } from "@/app/lib/definitions";

// Create Invoice
export const createInvoice = async (prevSate: State, formData: FormData) => {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields Failed to Create Invoice.",
        };
    }
    const { customerId, amount, status } = validatedFields.data;

    // Generating Dates and Making the amount to cents
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    try {
        const data =
            await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date}) RETURNING id`;
        const { email: customerEmail, name } = (
            await sql`SELECT * from customers WHERE id=${customerId}`
        ).rows[0];
        console.log("returning data", data.rows);
        try {
            if (status !== "paid") {
                const mail = await transporter.sendMail({
                    from: process.env.SMTP_FROM,
                    to: customerEmail,
                    subject: `Invoice of $${amount}`,
                    html: `
                    <p>Hello ${name}</p>
                    <p>Acme Dashboard owner has created a $${amount} invoice by your name</p>
                    <br/>
                    <br/>
                    <p><a href="${process.env.LIVE_URL}/payment/${data.rows[0].id}">Click Here</a> to pay online or contact him to pay manually</p>

                    <p>Regards,</p>
                    <p>Administrator</p>
                    <p>Acme Invoice Dashboard</p>
                    

                    `,
                });

                console.log(mail.messageId);
            }
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        return { message: "Database Error: Failed to Create Invoices" };
    }

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
};

// Updating a Invoice
export const updateInvoice = async (
    id: string,
    prevState: State,
    formData: FormData
) => {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Invoice.",
        };
    }

    const { customerId, amount, status } = validatedFields.data;

    const amountInCents = amount * 100;

    try {
        await sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status} WHERE id = ${id}`;
    } catch (error) {
        return { message: "Database Error : Failed to update database" };
    }

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
};

export const deleteInvoice = async (id: string) => {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath("/dashboard/invoices");
        return { message: "Deleted Invoice" };
    } catch (err) {
        return { message: "Database Error : Failed to Delete Invoice" };
    }
};

//login action
export const authenticate = async (
    prevState: string | undefined,
    formData: FormData
) => {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid Credentials";
                default:
                    return "Something Went Wrong";
            }
        }
        throw error;
    }
};

// Adding a customer
export const addCustomer = async (prevState: State, formData: FormData) => {
    const validatedFields = AddCustomer.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        image_url: "/customers/avatar_female.png",
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields Failed to Create Invoice.",
        };
    }

    const { name, email, phone, image_url, status } = validatedFields.data;

    try {
        await sql`INSERT INTO customers (name, email, image_url, status, phone) VALUES (${name}, ${email}, ${image_url}, ${status}, ${phone})`;
    } catch (err) {
        return { message: "Database Error : Failed to add customers" };
    }
    revalidatePath("/dashboard/customers");
    redirect("/dashboard/customers");
};

// Updating a customers
export const updateCustomer = async (
    id: string,
    prevState: State,
    formData: FormData
) => {
    const validatedFields = UpdateCustomer.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            erros: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields! Failed to edit customer",
        };
    }

    const { name, email, phone, status } = validatedFields.data;

    try {
        await sql`UPDATE customers SET name = ${name}, email = ${email}, phone = ${phone}, status = ${status} WHERE id = ${id}`;
    } catch (err) {
        console.log(err);
        throw new Error("Database Error : Failed to Edit Customer");
    }

    revalidatePath("/dashboard/customers");
    redirect("/dashboard/customers");
};

// Deleting a customer
export const deleteCustomerWithId = async (id: string) => {
    try {
        await sql`DELETE FROM customers WHERE id=${id}`;
        revalidatePath("/dashboard/customers");
        return { message: "Customer Deleted" };
    } catch (err) {
        return { message: "Database Error : Failed to Delete Customer" };
    }
};

// Making payment
export const makePayment = async (id: string) => {
    try {
    } catch (error) {
        console.log(error);
        console.log("Database Error : Failed to fetch");
    }
};

// Update payment status
