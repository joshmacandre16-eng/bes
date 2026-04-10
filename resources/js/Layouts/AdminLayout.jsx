import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Shield,
    Users,
    TrendingUp,
    Settings,
    FileText,
    Home,
} from "lucide-react";

export default function AdminLayout({ children, title = "Admin Dashboard" }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen bg-gray-100 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl w-72 ease-in-out transition duration-300`}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <Link
                            href="/admin/dashboard"
                            className="text-2xl font-bold text-white flex items-center gap-2"
                        >
                            <Shield size={28} className="text-orange-400" />
                            Admin Panel
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-1 rounded-md text-gray-300 hover:text-white"
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
                    <nav className="mt-8 px-4 space-y-2">
                        <Link
                            href="/admin/dashboard"
                            className="group flex items-center px-3 py-3 text-base font-medium rounded-xl text-white bg-orange-500/20 mb-2"
                        >
                            <Home className="mr-4 h-6 w-6" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/users"
                            className="group flex items-center px-3 py-3 text-base font-medium rounded-xl text-gray-300 hover:text-white hover:bg-gray-700 mb-2"
                        >
                            <Users className="mr-4 h-6 w-6" />
                            Users
                        </Link>
                        <Link
                            href="/admin/sellers"
                            className="group flex items-center px-3 py-3 text-base font-medium rounded-xl text-gray-300 hover:text-white hover:bg-gray-700 mb-2"
                        >
                            <TrendingUp className="mr-4 h-6 w-6" />
                            Sellers
                        </Link>
                        <Link
                            href="/admin/disputes"
                            className="group flex items-center px-3 py-3 text-base font-medium rounded-xl text-gray-300 hover:text-white hover:bg-gray-700 mb-2"
                        >
                            <FileText className="mr-4 h-6 w-6" />
                            Disputes
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="group flex items-center px-3 py-3 text-base font-medium rounded-xl text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                            <Settings className="mr-4 h-6 w-6" />
                            Settings
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
                <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
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
                                    <span className="text-sm font-semibold text-gray-900">
                                        Total Users: 245
                                    </span>
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                                        A
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
                        {children}
                    </main>

                    <footer className="bg-gray-900 text-white py-6 border-t">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                            <p>
                                &copy; 2024 Admin Panel - AgriShop Marketplace
                            </p>
                            <p className="mt-1 text-orange-300">
                                Managing CPSU agri marketplace ecosystem
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
