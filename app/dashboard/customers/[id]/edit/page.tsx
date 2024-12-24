import { fetchCustomerById } from "@/app/lib/data";
import { CustomerForm } from "@/app/lib/definitions";
import EditForm from "@/app/ui/customers/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

const Page: React.FC<{
    params: Promise<{ id: string }>;
}> = async props => {
    const params = await props.params;
    const id = params.id;

    const customerData: CustomerForm | any = await fetchCustomerById(id);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Customers", href: "/dashboard/customers" },
                    {
                        label: "Edit Customer Data",
                        href: ``,
                        active: true,
                    },
                ]}
            />
            <EditForm customer={customerData} />
        </main>
    );
};

export default Page;
