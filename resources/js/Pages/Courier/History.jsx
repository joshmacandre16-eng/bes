import React, { useState } from "react";
import CourierLayout from "@/Layouts/CourierLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";
import { Calendar, Download, Star } from "lucide-react";

export default function History({ deliveries = [], stats = {} }) {
    const [dateFilter, setDateFilter] = useState("all");

    const filteredDeliveries = deliveries.filter(
        (delivery) => dateFilter === "all" || delivery.date === dateFilter,
    );

    return (
        <CourierLayout title="Delivery History">
            <Head title="History" />

            <div className="space-y-8">
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Delivery History
                    </h1>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-2xl text-sm font-bold">
                        Total Earnings: ₱
                        {stats.total_earnings?.toLocaleString() || 0}
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4 flex-wrap">
                        <button
                            onClick={() => setDateFilter("all")}
                            className={`px-6 py-3 rounded-2xl font-bold transition ${dateFilter === "all" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            All Time ({deliveries.length})
                        </button>
                        <button
                            onClick={() => setDateFilter("today")}
                            className={`px-6 py-3 rounded-2xl font-bold transition ${dateFilter === "today" ? "bg-green-600 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            Today ({stats.today || 0})
                        </button>
                        <button
                            onClick={() => setDateFilter("week")}
                            className={`px-6 py-3 rounded-2xl font-bold transition ${dateFilter === "week" ? "bg-emerald-600 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            This Week ({stats.week || 0})
                        </button>
                        <button
                            onClick={() => setDateFilter("month")}
                            className={`px-6 py-3 rounded-2xl font-bold transition ${dateFilter === "month" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            This Month ({stats.month || 0})
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Order
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Customer
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Distance
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Time
                                </th>
                                <th className="px-8 py-6 text-right text-lg font-bold text-gray-900">
                                    Earnings
                                </th>
                                <th className="px-8 py-6 text-left text-lg font-bold text-gray-900">
                                    Rating
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredDeliveries.map((delivery) => (
                                <tr
                                    key={delivery.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-gray-900 mb-1">
                                            #{delivery.order_id}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {delivery.type}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-semibold text-gray-900">
                                            {delivery.buyer_name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {delivery.buyer_phone}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-blue-600">
                                        {delivery.distance} km
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm text-gray-900">
                                            {delivery.duration} min
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(
                                                delivery.completed_at,
                                            ).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-2xl font-bold text-green-700">
                                            ₱{delivery.earning}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    fill={
                                                        i < delivery.rating
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="text-sm font-semibold">
                                            {delivery.rating}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDeliveries.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-lg border border-gray-100">
                        <Calendar className="w-24 h-24 mx-auto mb-8 text-gray-400" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No deliveries in this period
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Your delivery history will appear here
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl transition">
                            <Download size={20} className="inline mr-2" />
                            Export All History
                        </button>
                    </div>
                )}
            </div>
        </CourierLayout>
    );
}
