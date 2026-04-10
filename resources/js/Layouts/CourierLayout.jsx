import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Truck, MapPin, Clock, List, Home } from "lucide-react";

export default function CourierLayout({
    children,
    title = "Courier Dashboard",
}) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0 bg-white shadow-xl w-64 ease-in-out transition duration-300`}
                >
                    <div className="flex items-center justify-between p-6 border-b bg-blue-50">
                        <Link
                            href="/courier/dashboard"
                            className="text-xl font-bold text-blue-700 flex items-center gap-2"
                        >
                            <Truck size={24} className="text-blue-600" />
                            Courier Pro
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
                            href="/courier/dashboard"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-900 bg-gray-100 mb-2"
                        >
                            <Home className="mr-4 h-6 w-6" />
                            Dashboard
                        </Link>
                        <Link
                            href="/courier/tasks"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 mb-2"
                        >
                            <List className="mr-4 h-6 w-6" />
                            Tasks
                        </Link>
                        <Link
                            href="/courier/scan"
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
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                />
                            </svg>
                            Scan
                        </Link>
                        <Link
                            href="/courier/history"
                            className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                            <Clock className="mr-4 h-6 w-6" />
                            History
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
                                <div className="text-sm font-semibold text-blue-900">
                                    Active Tasks: 5
                                </div>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    {auth?.user?.name?.charAt(0) || "C"}
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                        {children}
                    </main>

                    <footer className="bg-blue-800 text-white py-6 border-t">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                            <p>
                                &copy; 2024 Courier Pro - AgriShop Marketplace
                            </p>
                            <p className="mt-1 text-blue-200">
                                Fast delivery for agri essentials across campus!
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
