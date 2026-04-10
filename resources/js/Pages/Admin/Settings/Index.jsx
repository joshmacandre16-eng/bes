import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";

export default function AdminSettingsIndex() {
    return (
        <AdminLayout title="Settings">
            <Head title="Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 space-y-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Platform Settings
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-bold mb-4">
                                Delivery Fee
                            </label>
                            <div className="flex gap-4 items-end">
                                <input
                                    type="number"
                                    className="flex-1 p-4 border border-gray-200 rounded-2xl text-2xl font-bold focus:ring-2 focus:ring-orange-500"
                                />
                                <span className="text-xl font-bold text-gray-600">
                                    per km
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-bold mb-4">
                                Minimum Payout
                            </label>
                            <div className="flex gap-4 items-end">
                                <input
                                    type="number"
                                    className="flex-1 p-4 border border-gray-200 rounded-2xl text-2xl font-bold focus:ring-2 focus:ring-orange-500"
                                />
                                <span className="text-xl font-bold text-gray-600">
                                    ₱
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Email Settings
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-2">
                                    SMTP Host
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2">
                                    From Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Security
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                    />
                                    <span className="font-bold">
                                        Require Seller Verification
                                    </span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                    />
                                    <span className="font-bold">
                                        Enable QR Scanning
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white py-6 px-12 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all mx-auto text-center max-w-max cursor-pointer">
                Save All Changes
            </div>
        </AdminLayout>
    );
}
