import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Package,
    DollarSign,
    Users,
    BarChart3,
    Home,
    Plus,
    FileText,
} from "lucide-react";

export default function SellerLayout({ children, title = "Seller Dashboard" }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0 bg-white shadow-xl w-64 ease-in-out transition duration-300`}
                >
                    <div className="flex items-center justify-between p-6 border-b bg-green-50">
                        <Link
                            href="/seller/dashboard"
                            className="text-xl font-bold text-green-700 flex items-center gap-2"
                        >
                            <Package size={24} className="text-green-600" />
                            Seller Center
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-1 rounded-md text-gray-500 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <nav className="mt-8 px-4">
                        <Link
                            href="/seller/dashboard"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-900 bg-gray-100 mb-2"
                        >
                            <BarChart3 className="mr-4 h-6 w-6" />
                            Dashboard
                        </Link>
                        <Link
                            href="/seller/products"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
                        >
                            <Package className="mr-4 h-6 w-6" />
                            Products
                        </Link>
                        <Link
                            href="/seller/orders"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
                        >
                            <FileText className="mr-4 h-6 w-6" />
                            Orders
                        </Link>
                        <Link
                            href="/seller/payouts"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
                        >
                            <DollarSign className="mr-4 h-6 w-6" />
                            Payouts
                        </Link>
                        <Link
                            href="/seller/returns"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                            <svg
                                className="mr-4 h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            Returns
                        </Link>
                    </nav>
                </div>

                {/* Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
                    {/* Navbar */}
                    <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div className="text-sm font-semibold text-gray-900">
                                    Earnings: ₱
                                    {auth?.seller?.monthly_earnings || "0"}
                                </div>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    {auth?.user?.name?.charAt(0) || "S"}
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                        {children}
                    </main>

                    <footer className="bg-green-800 text-white py-6 border-t">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                            <p>
                                &copy; 2024 Seller Center - AgriShop Marketplace
                            </p>
                            <p className="mt-1 text-green-200">
                                Sell seeds, tools, uniform & earn commissions!
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
