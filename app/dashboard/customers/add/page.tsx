import AddForm from "@/app/ui/customers/add-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Customer",
};

const Page: React.FC = async () => {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Customers", href: "/dashboard/customers" },
                    {
                        label: "Add Customer",
                        href: "/dashboard/customers/add",
                        active: true,
                    },
                ]}
            />
            <AddForm />
        </main>
    );
};

export default Page;
