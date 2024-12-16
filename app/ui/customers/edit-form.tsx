"use client";

import Link from "next/link";
import {
    CheckIcon,
    UserCircleIcon,
    AtSymbolIcon,
    PhoneIcon,
    PhotoIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { addCustomer } from "@/app/lib/actions";
import type { State, CustomerForm } from "@/app/lib/definitions";
import { useActionState } from "react";

const EditForm: React.FC<{ customer: CustomerForm }> = ({ customer }) => {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(addCustomer, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter customer name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                step="0.01"
                                placeholder="Enter full Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                                defaultValue={customer.name}
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="name-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Email Address */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter customer email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                step="0.01"
                                placeholder="Enter email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                                defaultValue={customer.email}
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="email-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium"
                    >
                        Enter customer phone
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                step="0.01"
                                placeholder="Enter phone number"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="phone-error"
                                defaultValue={customer.phone}
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <div
                            id="phone-error"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state.errors?.phone &&
                                state.errors.phone.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Customer Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the Customer status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="active"
                                    name="status"
                                    type="radio"
                                    value="active"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="status-error"
                                    defaultChecked={
                                        customer.status === "active"
                                    }
                                />
                                <label
                                    htmlFor="active"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Active <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="inactive"
                                    name="status"
                                    type="radio"
                                    value="inactive"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="status-error"
                                    defaultChecked={
                                        customer.status === "inactive"
                                    }
                                />
                                <label
                                    htmlFor="inactive"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Inactive <XMarkIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        id="status-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.status &&
                            state.errors.status.map((error: string) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={error}
                                >
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Add Customer</Button>
            </div>
        </form>
    );
};

export default EditForm;
