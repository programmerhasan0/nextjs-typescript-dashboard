import { Metadata } from "next";
import { fetchCustomers } from "@/app/lib/data";
import CustomerTable from "@/app/ui/customers/customer-list-table";
import { AddCustomer } from "@/app/ui/customers/buttons";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Customers",
};

const Page: React.FC<{}> = async () => {
    const customers = await fetchCustomers();

    return (
        <>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>
                        Customers
                    </h1>
                </div>
                <div className="mt-4 flex items-center flex-row-reverse justify-between gap-2 md:mt-8">
                    <AddCustomer />
                </div>
                <Suspense>
                    <CustomerTable customers={customers} />
                </Suspense>
            </div>
        </>
    );
};

export default Page;
