import { Metadata } from "next";
import { fetchCustomers } from "@/app/lib/data";
import CustomerTable from "@/app/ui/customers/customer-list-table";

export const metadata: Metadata = {
    title: "Customers",
};

const Page: React.FC<{}> = async () => {
    const customers = await fetchCustomers();

    return (
        <>
            <CustomerTable customers={customers} />
        </>
    );
};

export default Page;
