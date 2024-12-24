import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import type { CustomerStatus } from "@/app/lib/definitions";

const CustomerStatus: React.FC<{ status: CustomerStatus }> = ({ status }) => {
    return (
        <span
            className={clsx(
                "inline-flex items-center rounded-full px-2 py-1 text-xs",
                {
                    "bg-red-500 text-white": status === "inactive",
                    "bg-green-500 text-white": status === "active",
                }
            )}
        >
            {status === "inactive" ? (
                <>
                    Inactive
                    <XMarkIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === "active" ? (
                <>
                    Active
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
        </span>
    );
};

export default CustomerStatus;
