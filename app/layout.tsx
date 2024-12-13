import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const experimental_ppr: boolean = true;

export const metadata: Metadata = {
    title: {
        template: "%s | Acme Dashboard",
        default: "Acme Dashboard",
    },
    description: "Dashboard For Institute Project By H. Hasan",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
