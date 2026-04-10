import React, { useState } from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";
import { DollarSign, Download, Calendar, TrendingUp } from "lucide-react";

export default function PayoutsIndex({ payouts = [], earnings = {} }) {
    const [tab, setTab] = useState("pending");

    const tabs = [
        {
            id: "pending",
            label: "Pending",
            count: payouts.filter((p) => p.status === "pending").length,
        },
        {
            id: "paid",
            label: "Paid",
            count: payouts.filter((p) => p.status === "paid").length,
        },
        {
            id: "rejected",
            label: "Rejected",
            count: payouts.filter((p) => p.status === "rejected").length,
        },
    ];

    const filteredPayouts = payouts.filter(
        (p) => tab === "pending" || p.status === tab,
    );

    return (
        <SellerLayout title="Payouts">
            <Head title="Payouts" />

            <div className="space-y-10">
                {/* Earnings Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign size={32} />
                            <div>
                                <p className="text-green-100 text-sm uppercase tracking-wide font-semibold">
                                    Total Earnings
                                </p>
                                <p className="text-4xl font-bold">
                                    ₱{earnings.total?.toLocaleString() || "0"}
                                </p>
                            </div>
                        </div>
                        <div className="text-sm opacity-90 space-y-1">
                            <p>
                                Available: ₱
                                {earnings.available?.toLocaleString() || "0"}
                            </p>
                            <p>
                                Pending: ₱
                                {earnings.pending?.toLocaleString() || "0"}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h3 className="font-bold text-xl mb-4">Last Month</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Orders</span>
                                <span>{earnings.last_month?.orders || 0}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Earnings</span>
                                <span className="font-bold text-green-700">
                                    ₱
                                    {earnings.last_month?.amount?.toLocaleString() ||
                                        "0"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition flex items-center gap-3 justify-center">
                            <Download size={20} />
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Payout History */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-1 bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex bg-white rounded-3xl -m-1">
                            {tabs.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id)}
                                    className={`flex-1 py-4 px-6 font-bold rounded-3xl transition-all ${
                                        tab === t.id
                                            ? "bg-emerald-600 text-white shadow-lg transform scale-105"
                                            : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
                                    }`}
                                >
                                    {t.label}
                                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                                        {t.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {filteredPayouts.map((payout) => (
                            <div
                                key={payout.id}
                                className="p-8 hover:bg-gray-50 transition"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className={`w-3 h-3 rounded-full ${payout.status === "paid" ? "bg-green-500" : payout.status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}
                                            />
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900 mb-1">
                                                    Payout #{payout.id}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Requested{" "}
                                                    {new Date(
                                                        payout.created_at,
                                                    ).toLocaleDateString()}{" "}
                                                    • Amount ₱
                                                    {payout.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">
                                                    Method
                                                </span>
                                                <p className="font-semibold">
                                                    {payout.method}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">
                                                    Account
                                                </span>
                                                <p className="font-mono bg-gray-100 px-3 py-1 rounded-xl text-xs">
                                                    {payout.account_last4}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 min-w-[120px]">
                                        <span
                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                payout.status === "paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : payout.status ===
                                                        "pending"
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {payout.status.toUpperCase()}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {payout.processed_at
                                                ? new Date(
                                                      payout.processed_at,
                                                  ).toLocaleDateString()
                                                : "Pending"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredPayouts.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-lg border border-gray-100">
                        <DollarSign className="w-24 h-24 mx-auto mb-8 text-gray-300" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No payout history
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Your earnings will appear here once available for
                            withdrawal
                        </p>
                        <div className="max-w-md mx-auto space-y-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                                <span>Earn from product sales</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                                <Calendar className="w-6 h-6 text-blue-600" />
                                <span>Request payout when minimum reached</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SellerLayout>
    );
}
