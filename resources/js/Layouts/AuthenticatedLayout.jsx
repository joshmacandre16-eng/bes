import { Head } from "@inertiajs/react";

export default function AuthenticatedLayout({ children, header }) {
    return (
        <>
            <Head title="AgriShop - Marketplace" />
            <div className="min-h-screen bg-gray-50">
                {header && (
                    <header className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </>
    );
}
