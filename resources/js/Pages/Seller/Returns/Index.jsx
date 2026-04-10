import React from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";

export default function ReturnsIndex({ returns = [], stats = {} }) {
    return (
        <SellerLayout title="Returns">
            <Head title="Returns" />

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Returns & Refunds
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl">
                        <div className="text-4xl font-bold mb-2">
                            {stats.pending || 0}
                        </div>
                        <p className="text-orange-100 text-lg font-semibold">
                            Pending Returns
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-8 rounded-3xl shadow-2xl">
                        <div className="text-4xl font-bold mb-2">
                            {stats.approved || 0}
                        </div>
                        <p className="text-yellow-100 text-lg font-semibold">
                            Approved
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white p-8 rounded-3xl shadow-2xl">
                        <div className="text-4xl font-bold mb-2">
                            {stats.rejected || 0}
                        </div>
                        <p className="text-gray-100 text-lg font-semibold">
                            Rejected
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Return ID
                                </th>
                                <th className="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-8 py-6 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-8 py-6 text-right text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {returns.map((returnItem) => (
                                <tr
                                    key={returnItem.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-8 py-6 font-semibold text-gray-900">
                                        RET-{returnItem.id}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-semibold text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            #{returnItem.order_id}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-semibold">
                                            {returnItem.customer_name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {returnItem.customer_email}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-900">
                                        {returnItem.reason}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span
                                            className={`px-4 py-2 rounded-full text-xs font-bold capitalize ${
                                                returnItem.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : returnItem.status ===
                                                        "approved"
                                                      ? "bg-green-100 text-green-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {returnItem.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-green-700">
                                        ₱{returnItem.amount.toLocaleString()}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-green-100 rounded-xl text-green-600 hover:text-green-700 transition">
                                                <CheckCircle size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-100 rounded-xl text-red-500 hover:text-red-700 transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {returns.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-lg border border-gray-100">
                        <PackageCheck className="w-24 h-24 mx-auto mb-8 text-green-400" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No returns yet
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Great! Customers love your products.
                        </p>
                        <p className="text-lg text-gray-500">
                            Returns appear here when customers request them.
                        </p>
                    </div>
                )}
            </div>
        </SellerLayout>
    );
}
