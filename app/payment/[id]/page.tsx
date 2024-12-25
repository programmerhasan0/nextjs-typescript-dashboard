import AcmeLogo from "@/app/ui/acme-logo";
import PaymentForm from "@/app/ui/payment/form";
import { Metadata } from "next";
import { fetchInvoiceByIdWithCustomers } from "@/app/lib/data";
import Image from "next/image";
import { InvoiceWithCustomer } from "@/app/lib/definitions";

export const metadata: Metadata = {
    title: "Payment",
};
const Page: React.FC<{ params: Promise<{ id: string }> }> = async props => {
    const params = await props.params;
    const id = params.id;

    const invoiceData: InvoiceWithCustomer | any =
        await fetchInvoiceByIdWithCustomers(id);
    return (
        <main className="flex items-center justify-center md:h-screen">
            <PaymentForm invoiceData={invoiceData} />
        </main>
    );
};

export default Page;
