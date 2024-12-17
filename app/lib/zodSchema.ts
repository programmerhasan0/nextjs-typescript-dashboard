import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: "Please Select a Customer" }),
    amount: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0" }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please Select an Invoice status",
    }),
    date: z.string(),
});

const CustomerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().min(5),
    image_url: z.string(),
    status: z.enum(["active", "inactive"], {
        message: "Please Select Between Active or Iactive",
    }),
    phone: z.string(),
});

// Invoices
export const CreateInvoice = FormSchema.omit({ id: true, date: true });
export const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Customer Services
export const AddCustomer = CustomerSchema.omit({ id: true });
export const UpdateCustomer = CustomerSchema.omit({
    id: true,
    image_url: true,
});
