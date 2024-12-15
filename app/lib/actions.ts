"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { CreateInvoice, UpdateInvoice, AddCustomer } from "@/app/lib/zodSchema";
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
        await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
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

export const addCustomer = async (prevState: State, formData: FormData) => {
    console.log("Entering the function");

    // const obj = {
    //     name: formData.get("name"),
    //     email: formData.get("email"),
    //     phone: formData.get("phone"),
    //     image_url: formData.get("image"),
    //     status: formData.get("status"),
    // };

    // console.log(obj);

    const validatedFields = AddCustomer.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        image_url: formData.get("image"),
        status: formData.get("status"),
    });

    console.log("logging after validation", validatedFields.data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields Failed to Create Invoice.",
        };
    }

    const { name, email, phone, image_url, status } = validatedFields.data;

    try {
        await sql`INSERT INTO customers (name, email, image_url, status, phone) VALUES (${name}, ${email}, ${image_url}, ${status}, ${phone})`;
        return { message: "Customer Added." };
    } catch (err) {
        return { message: "Database Error : Failed to add customers" };
    }

    revalidatePath("/dashboard/customers");
    redirect("/dashboard/customers");
};
