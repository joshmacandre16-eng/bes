import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { ShoppingCart, User, Heart, Search, Home } from "lucide-react";

export default function BuyerLayout({ children, title = "Buyer Dashboard" }) {
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
                    <div className="flex items-center justify-between p-6 border-b">
                        <Link
                            href="/buyer/dashboard"
                            className="text-xl font-bold text-green-700 flex items-center gap-2"
                        >
                            <ShoppingCart
                                size={24}
                                className="text-green-600"
                            />
                            AgriShop
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
                            href="/buyer/dashboard"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-900 bg-gray-100 mb-2"
                        >
                            <Home className="mr-4 h-6 w-6" />
                            Dashboard
                        </Link>
                        <Link
                            href="/buyer/products"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
                        >
                            <Search className="mr-4 h-6 w-6" />
                            Products
                        </Link>
                        <Link
                            href="/buyer/cart"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
                        >
                            <ShoppingCart className="mr-4 h-6 w-6" />
                            Cart
                        </Link>
                        <Link
                            href="/buyer/orders"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
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
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            Orders
                        </Link>
                        <Link
                            href="/buyer/profile/edit"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                            <User className="mr-4 h-6 w-6" />
                            Profile
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
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/buyer/cart"
                                        className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                    >
                                        <ShoppingCart size={20} />
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            3
                                        </span>
                                    </Link>
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        {auth?.user?.name?.charAt(0) || "U"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="bg-green-800 text-white py-6 border-t">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                            <p>
                                &copy; 2024 AgriShop Marketplace. CPSU Hinobaan
                                Campus Exclusive. All rights reserved.
                            </p>
                            <p className="mt-1 text-green-200">
                                Buy fresh agri products, seeds, tools & more!
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
