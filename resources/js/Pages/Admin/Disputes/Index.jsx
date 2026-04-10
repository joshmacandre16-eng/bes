import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";

export default function AdminDisputesIndex({ disputes = [] }) {
    return (
        <AdminLayout title="Disputes">
            <Head title="Disputes" />

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Customer Disputes
                </h1>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-red-50">
                            <tr>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Dispute ID
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Order
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Buyer
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Seller
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Issue
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Status
                                </th>
                                <th className="px-8 py-6 text-right text-lg font-bold text-gray-900">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {disputes.map((dispute) => (
                                <tr
                                    key={dispute.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-8 py-6 font-bold">
                                        DSP-{dispute.id}
                                    </td>
                                    <td className="px-8 py-6 font-semibold">
                                        #{dispute.order_id}
                                    </td>
                                    <td className="px-8 py-6">
                                        {dispute.buyer_name}
                                    </td>
                                    <td className="px-8 py-6">
                                        {dispute.seller_name}
                                    </td>
                                    <td className="px-8 py-6 text-sm max-w-xs">
                                        {dispute.reason}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                dispute.status === "open"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : dispute.status ===
                                                        "resolved"
                                                      ? "bg-green-100 text-green-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {dispute.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-red-600">
                                        ₱{dispute.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
