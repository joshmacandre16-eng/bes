import { Head } from "@inertiajs/react";

export default function GuestLayout({
    children,
    title = "AgriShop - Marketplace",
}) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
                {children}
            </div>
        </>
    );
}
